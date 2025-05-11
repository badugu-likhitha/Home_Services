package com.hss.repository;

import com.hss.model.ContactForm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactFormRepository extends JpaRepository<ContactForm, Long> {
}
