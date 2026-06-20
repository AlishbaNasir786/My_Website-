package com.realestate.controllers;

import com.realestate.entity.Inquiry;
import com.realestate.entity.Property;
import com.realestate.repository.InquiryRepository;
import com.realestate.repository.PropertyRepository;
import com.realestate.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/inquiries")
public class InquiryController {

    @Autowired
    InquiryRepository inquiryRepository;

    @Autowired
    PropertyRepository propertyRepository;

    // Public endpoint: Submit inquiry/lead
    @PostMapping
    public ResponseEntity<?> createInquiry(@RequestBody Map<String, Object> request) {
        Long propertyId = Long.valueOf(request.get("propertyId").toString());
        String name = (String) request.get("customerName");
        String phone = (String) request.get("customerPhone");
        String email = (String) request.get("customerEmail");
        String message = (String) request.get("message");

        if (name == null || name.trim().isEmpty() || phone == null || phone.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Name and phone number are required"));
        }

        Property property = propertyRepository.findById(propertyId).orElse(null);
        if (property == null) {
            return ResponseEntity.notFound().build();
        }

        Inquiry inquiry = new Inquiry();
        inquiry.setProperty(property);
        inquiry.setCustomerName(name);
        inquiry.setCustomerPhone(phone);
        inquiry.setCustomerEmail(email);
        inquiry.setMessage(message);
        inquiry.setStatus("NEW");

        inquiryRepository.save(inquiry);
        return ResponseEntity.ok(inquiry);
    }

    // Secured endpoint: Get inquiries (Admins see all, Agents see theirs)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('AGENT')")
    public List<Inquiry> getInquiries() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
        
        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) {
            return inquiryRepository.findAll();
        } else {
            return inquiryRepository.findByPropertyAgentId(userDetails.getId());
        }
    }

    // Secured endpoint: Update inquiry status
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('AGENT')")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        if (status == null || status.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Status is required"));
        }

        return inquiryRepository.findById(id)
                .map(inquiry -> {
                    inquiry.setStatus(status.toUpperCase());
                    inquiryRepository.save(inquiry);
                    return ResponseEntity.ok(inquiry);
                }).orElse(ResponseEntity.notFound().build());
    }
}
