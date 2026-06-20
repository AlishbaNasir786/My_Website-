package com.realestate.controllers;

import com.realestate.entity.Property;
import com.realestate.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.realestate.entity.PropertyImage;
import com.realestate.repository.PropertyImageRepository;
import com.realestate.services.StorageService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/properties")
public class PropertyController {

    @Autowired
    PropertyRepository propertyRepository;
    
    @Autowired
    PropertyImageRepository imageRepository;
    
    @Autowired
    StorageService storageService;

    // Public endpoint: Get all active properties with optional search/filters
    @GetMapping
    public List<Property> getAllProperties(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String propertyType,
            @RequestParam(required = false) String purpose,
            @RequestParam(required = false) java.math.BigDecimal minPrice,
            @RequestParam(required = false) java.math.BigDecimal maxPrice) {
        
        if (search == null && propertyType == null && purpose == null && minPrice == null && maxPrice == null) {
            return propertyRepository.findAll();
        }
        
        String searchParam = (search != null && !search.trim().isEmpty()) ? search.trim() : null;
        String typeParam = (propertyType != null && !propertyType.trim().isEmpty()) ? propertyType.trim() : null;
        String purposeParam = (purpose != null && !purpose.trim().isEmpty()) ? purpose.trim() : null;
        
        return propertyRepository.searchProperties(searchParam, typeParam, purposeParam, minPrice, maxPrice);
    }

    // Public endpoint: Get single property details
    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        return propertyRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Admin/Agent endpoint: Create property
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('AGENT')")
    public Property createProperty(@RequestBody Property property) {
        property.setStatus("ACTIVE");
        return propertyRepository.save(property);
    }

    // Admin/Agent endpoint: Update property
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('AGENT')")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property propertyDetails) {
        return propertyRepository.findById(id)
                .map(property -> {
                    property.setTitle(propertyDetails.getTitle());
                    property.setDescriptionEn(propertyDetails.getDescriptionEn());
                    property.setPrice(propertyDetails.getPrice());
                    property.setPropertyType(propertyDetails.getPropertyType());
                    property.setPurpose(propertyDetails.getPurpose());
                    property.setAreaSize(propertyDetails.getAreaSize());
                    property.setAreaUnit(propertyDetails.getAreaUnit());
                    property.setBedrooms(propertyDetails.getBedrooms());
                    property.setBathrooms(propertyDetails.getBathrooms());
                    property.setStatus(propertyDetails.getStatus());
                    Property updatedProperty = propertyRepository.save(property);
                    return ResponseEntity.ok(updatedProperty);
                }).orElse(ResponseEntity.notFound().build());
    }

    // Admin endpoint: Delete property
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProperty(@PathVariable Long id) {
        return propertyRepository.findById(id)
                .map(property -> {
                    propertyRepository.delete(property);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }

    // Admin/Agent endpoint: Upload Image
    @PostMapping("/{id}/images")
    @PreAuthorize("hasRole('ADMIN') or hasRole('AGENT')")
    public ResponseEntity<?> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        return propertyRepository.findById(id)
                .map(property -> {
                    String url = storageService.save(file);
                    PropertyImage img = new PropertyImage();
                    img.setProperty(property);
                    img.setUrl(url);
                    img.setPrimary(false);
                    imageRepository.save(img);
                    return ResponseEntity.ok(img);
                }).orElse(ResponseEntity.notFound().build());
    }
}
