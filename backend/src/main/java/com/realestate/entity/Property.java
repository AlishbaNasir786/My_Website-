package com.realestate.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import java.util.List;

@Entity
@Table(name = "properties")
@Data
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agent_id")
    private User agent;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String descriptionEn;

    private BigDecimal price;
    private String propertyType; // HOUSE, PLOT, APARTMENT
    private String purpose; // SALE, RENT
    private BigDecimal areaSize;
    private String areaUnit; // MARLA, KANAL, SQ_FT
    
    private Integer bedrooms;
    private Integer bathrooms;

    private String status; // ACTIVE, PENDING, SOLD
    private boolean isFeatured;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<PropertyImage> images = new java.util.ArrayList<>();

    private LocalDateTime createdAt = LocalDateTime.now();
}
