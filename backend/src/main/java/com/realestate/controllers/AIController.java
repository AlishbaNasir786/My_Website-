package com.realestate.controllers;

import com.realestate.services.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/ai")
public class AIController {

    @Autowired
    private AIService aiService;

    @PostMapping("/generate-description")
    @PreAuthorize("hasRole('ADMIN') or hasRole('AGENT')")
    public ResponseEntity<?> generateDescription(@RequestBody Map<String, Object> propertyDetails) {
        String aiResponse = aiService.generatePropertyDescription(propertyDetails);
        return ResponseEntity.ok(Map.of("ai_content", aiResponse));
    }

    @PostMapping("/chat")
    public ResponseEntity<?> chat(@RequestBody Map<String, String> request) {
        String message = request.get("message");
        if (message == null || message.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Message is required"));
        }
        String aiResponse = aiService.chatWithConsultant(message);
        return ResponseEntity.ok(Map.of("response", aiResponse));
    }
}
