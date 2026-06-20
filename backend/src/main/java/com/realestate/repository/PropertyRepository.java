package com.realestate.repository;

import com.realestate.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByStatus(String status);
    List<Property> findByPropertyType(String propertyType);

    @org.springframework.data.jpa.repository.Query("SELECT p FROM Property p WHERE " +
            "(:search IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(p.descriptionEn) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
            "(:propertyType IS NULL OR p.propertyType = :propertyType) AND " +
            "(:purpose IS NULL OR p.purpose = :purpose) AND " +
            "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
            "(:maxPrice IS NULL OR p.price <= :maxPrice)")
    List<Property> searchProperties(
            @org.springframework.data.repository.query.Param("search") String search,
            @org.springframework.data.repository.query.Param("propertyType") String propertyType,
            @org.springframework.data.repository.query.Param("purpose") String purpose,
            @org.springframework.data.repository.query.Param("minPrice") java.math.BigDecimal minPrice,
            @org.springframework.data.repository.query.Param("maxPrice") java.math.BigDecimal maxPrice);
}
