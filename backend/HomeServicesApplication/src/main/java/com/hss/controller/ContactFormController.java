package com.hss.controller;

import com.hss.model.ContactForm;
import com.hss.service.ContactFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactFormController {

    @Autowired
    private ContactFormService contactFormService;

    @PostMapping("/submit")
    public ResponseEntity<ContactForm> submitFeedback(@RequestBody ContactForm contactForm) {
        // Debugging the incoming request body
        System.out.println("Received ContactForm: " + contactForm);

        // Ensure the mobile number is provided
        if (contactForm.getMobileNumber() == null || contactForm.getMobileNumber().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Save the feedback
        ContactForm savedFeedback = contactFormService.saveFeedback(contactForm);
        return new ResponseEntity<>(savedFeedback, HttpStatus.CREATED);
    }
}
