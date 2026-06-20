package com.realestate.repository;

import com.realestate.entity.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    List<Inquiry> findByPropertyAgentId(Long agentId);
}
