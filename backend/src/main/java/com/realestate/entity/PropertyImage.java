package com.realestate.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "property_images")
@Data
public class PropertyImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Property property;

    private String url;
    private boolean isPrimary;
}
