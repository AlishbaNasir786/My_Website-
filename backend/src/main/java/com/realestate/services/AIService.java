package com.realestate.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class AIService {

    @Value("${gemini.api.key:}")
    private String apiKey;

    @Value("${gemini.api.url:https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generatePropertyDescription(Map<String, Object> propertyDetails) {
        String title    = String.valueOf(propertyDetails.getOrDefault("title",    "Luxury Property"));
        String location = String.valueOf(propertyDetails.getOrDefault("location", "DHA, Lahore"));
        String price    = String.valueOf(propertyDetails.getOrDefault("price",    ""));
        String type     = String.valueOf(propertyDetails.getOrDefault("type",     "House"));

        // Try real Gemini API first
        if (isApiKeyValid()) {
            String prompt = "You are an expert real estate copywriter in Pakistan. Based on the following property details, generate a compelling listing.\n\n"
                    + "Property: " + title + "\nLocation: " + location + "\nPrice: PKR " + price + "\nType: " + type + "\n\n"
                    + "Respond ONLY with a valid JSON object (no markdown, no code fences) containing exactly these keys:\n"
                    + "englishDescription, urduDescription, romanUrduDescription, seoKeywords, socialMediaCaption\n\n"
                    + "Use Pakistani real estate context. Keep englishDescription to 2-3 paragraphs.";

            String result = callGemini(prompt);
            if (!result.contains("\"error\"")) return result;
        }

        // Smart fallback — generate realistic content locally
        return generateFallbackContent(title, location, price, type);
    }

    public String chatWithConsultant(String userMessage) {
        if (isApiKeyValid()) {
            String prompt = "You are a professional Real Estate Consultant for Prestige Estate Pakistan. "
                    + "Help users with property investment, buying, selling, and renting. "
                    + "Focus on Pakistani cities like Lahore, Karachi, Islamabad, Rawalpindi, "
                    + "and societies like DHA, Bahria Town, Gulberg, F-sectors. "
                    + "Give concise, helpful, friendly responses.\n\nUser: " + userMessage;

            String result = callGemini(prompt);
            if (!result.contains("\"error\"")) return result;
        }

        // Fallback chatbot responses
        return generateChatFallback(userMessage);
    }

    private boolean isApiKeyValid() {
        return apiKey != null && !apiKey.isBlank()
                && !apiKey.equals("AIzaSyDemoKeyReplaceWithRealGeminiKey");
    }

    private String callGemini(String prompt) {
        try {
            String url = apiUrl + "?key=" + apiKey;

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> part = Map.of("text", prompt);
            Map<String, Object> content = Map.of("parts", List.of(part));
            Map<String, Object> requestBody = Map.of("contents", List.of(content));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
            Map<String, Object> firstCandidate = candidates.get(0);
            Map<String, Object> responseContent = (Map<String, Object>) firstCandidate.get("content");
            List<Map<String, Object>> parts = (List<Map<String, Object>>) responseContent.get("parts");
            String text = (String) parts.get(0).get("text");

            if (text != null) {
                text = text.trim();
                if (text.startsWith("```json")) text = text.substring(7);
                else if (text.startsWith("```")) text = text.substring(3);
                if (text.endsWith("```")) text = text.substring(0, text.length() - 3);
                text = text.trim();
            }
            return text;

        } catch (org.springframework.web.client.HttpClientErrorException e) {
            System.err.println("Gemini API Error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            return "{\"error\": \"" + e.getStatusCode() + "\"}";
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\": \"" + e.getMessage() + "\"}";
        }
    }

    // ─── Offline Fallback ─────────────────────────────────────────────────────

    private String generateFallbackContent(String title, String location, String price, String type) {
        String priceFormatted = price.isEmpty() ? "" : "PKR " + price;
        String loc = location.isEmpty() ? "a prime location" : location;

        String english = "Welcome to this exceptional " + type.toLowerCase() + " located in " + loc + ". "
                + "This meticulously designed property offers an unparalleled living experience, "
                + "combining modern architecture with timeless elegance. Every detail has been carefully "
                + "crafted to provide maximum comfort and luxury for the discerning homeowner.\n\n"
                + "The property features premium quality construction with high-end finishes throughout. "
                + "Situated in one of Pakistan's most sought-after neighborhoods, residents enjoy "
                + "proximity to top schools, hospitals, shopping centers, and major business districts. "
                + "The community infrastructure ensures a secure and serene lifestyle.\n\n"
                + "This is a rare opportunity to own a prestige property " + (priceFormatted.isEmpty() ? "" : "at " + priceFormatted) + ". "
                + "Whether you are looking for a family home or a sound investment, "
                + "this property delivers exceptional value and long-term appreciation potential.";

        String urdu = "یہ خوبصورت " + type + " " + loc + " میں واقع ہے۔ یہ جائیداد جدید معماری اور اعلیٰ معیار کی تعمیر کا بہترین نمونہ ہے۔ "
                + "مکین کو یہاں تمام سہولیات میسر ہیں جن میں قریبی اسکول، ہسپتال اور شاپنگ سینٹر شامل ہیں۔ "
                + "یہ پاکستان کے بہترین علاقوں میں سے ایک میں واقع ایک منفرد سرمایہ کاری کا موقع ہے۔";

        String romanUrdu = "Yeh khubsoorat " + type + " " + loc + " mein waqay hai. "
                + "Yeh jaidad jadeed mimari aur aala mayaar ki tameer ka behtareen namoona hai. "
                + "Mokin ko yahan tamam sahuliyaat meyssar hain. Pakistan ke behtareen ilaqqon mein se ek mein waqay yeh ek munfarid sarmaykari ka mauqa hai.";

        String keywords = type + " for sale " + loc + ", luxury " + type.toLowerCase() + " Pakistan, "
                + "premium property " + loc + ", real estate investment Pakistan, "
                + "DHA property, Bahria Town, Lahore real estate, Islamabad property";

        String caption = "🏡 " + title + "\n📍 " + loc + "\n"
                + (priceFormatted.isEmpty() ? "" : "💰 " + priceFormatted + "\n")
                + "✨ Premium living at its finest!\n\n"
                + "#RealEstate #Pakistan #LuxuryLiving #" + type + " #PrestigeEstate #DHA #BahriaTown #PropertyForSale";

        return "{\n"
                + "  \"englishDescription\": " + jsonStr(english) + ",\n"
                + "  \"urduDescription\": " + jsonStr(urdu) + ",\n"
                + "  \"romanUrduDescription\": " + jsonStr(romanUrdu) + ",\n"
                + "  \"seoKeywords\": " + jsonStr(keywords) + ",\n"
                + "  \"socialMediaCaption\": " + jsonStr(caption) + "\n"
                + "}";
    }

    private String generateChatFallback(String message) {
        message = message.toLowerCase();

        if (message.contains("dha") || message.contains("defence")) {
            return "DHA (Defence Housing Authority) is one of Pakistan's most prestigious residential areas. "
                    + "DHA Lahore and DHA Karachi are particularly popular for their excellent infrastructure, "
                    + "security, and high-end amenities. Properties here offer strong capital appreciation — "
                    + "typically 10-15% annually. Current prices range from 2 Crore for plots to 8+ Crore for houses. "
                    + "It's an excellent long-term investment. Would you like to see available DHA properties?";
        }
        if (message.contains("bahria")) {
            return "Bahria Town is Pakistan's largest private housing society, available in Lahore, Karachi, Islamabad, and Rawalpindi. "
                    + "It offers world-class amenities including parks, shopping malls, hospitals, and schools. "
                    + "Bahria Town Karachi is especially popular for its master-planned infrastructure. "
                    + "Prices are generally more affordable than DHA, making it ideal for first-time buyers. "
                    + "Would you like to explore Bahria Town listings?";
        }
        if (message.contains("invest") || message.contains("best area") || message.contains("recommend")) {
            return "For real estate investment in Pakistan in 2024-2025, here are the top recommendations:\n\n"
                    + "🏆 **Top Investment Areas:**\n"
                    + "1. DHA Lahore/Karachi – Highest ROI, premium security\n"
                    + "2. Bahria Town – Affordable entry point, good appreciation\n"
                    + "3. Islamabad F/G Sectors – Government-backed, stable value\n"
                    + "4. Blue World City – Emerging market, high growth potential\n\n"
                    + "💡 Tip: Plot investments typically yield 20-30% appreciation over 3 years in these areas. "
                    + "Would you like details on any specific area?";
        }
        if (message.contains("price") || message.contains("cost") || message.contains("how much")) {
            return "Pakistani property prices vary significantly by location and type:\n\n"
                    + "📊 **Average Price Ranges (2024):**\n"
                    + "• 5 Marla House DHA Lahore: 2.5–4 Crore PKR\n"
                    + "• 10 Marla House DHA: 4–8 Crore PKR\n"
                    + "• 1 Kanal House DHA: 8–20 Crore PKR\n"
                    + "• Bahria Town 5 Marla: 1.5–2.5 Crore PKR\n"
                    + "• Apartment Islamabad: 80 Lac–2 Crore PKR\n\n"
                    + "Prices fluctuate with market conditions. Browse our listings for current prices!";
        }
        if (message.contains("rent")) {
            return "Rental yields in Pakistan are typically 3-6% annually. Popular rental areas include:\n\n"
                    + "🏠 **Best Rental Markets:**\n"
                    + "• Gulberg Lahore – High demand from businesses & expats\n"
                    + "• DHA Karachi – Premium rentals, 30K–150K/month for houses\n"
                    + "• F-8, F-7 Islamabad – Diplomatic enclave proximity\n"
                    + "• Blue Area Islamabad – Commercial rental hotspot\n\n"
                    + "Would you like to explore rental listings on our platform?";
        }

        // Generic default
        return "Thank you for your inquiry! As your Prestige Estate consultant, I'm here to help you navigate Pakistan's real estate market.\n\n"
                + "I can help you with:\n"
                + "🏡 Finding the right property (House, Plot, Apartment)\n"
                + "📍 Location advice (DHA, Bahria Town, Gulberg, etc.)\n"
                + "💰 Investment strategies and price analysis\n"
                + "📋 Buying/renting process guidance\n\n"
                + "What specific aspect of real estate can I assist you with today?";
    }

    private String jsonStr(String s) {
        return "\"" + s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n") + "\"";
    }
}
