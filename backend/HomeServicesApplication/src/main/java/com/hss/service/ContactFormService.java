package com.hss.service;

import com.hss.model.ContactForm;
import com.hss.repository.ContactFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactFormService {

    @Autowired
    private ContactFormRepository contactFormRepository;

    public ContactForm saveFeedback(ContactForm contactForm) {
        return contactFormRepository.save(contactForm);
    }
}
