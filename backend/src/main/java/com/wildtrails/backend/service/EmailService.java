package com.wildtrails.backend.service;

import com.wildtrails.backend.security.EncryptionUtil;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendBookingEmail(String toEmail, Long bookingId) {
        try {
            String encryptedId = EncryptionUtil.encrypt(String.valueOf(bookingId));
            String link = "http://localhost:5173/Booking/" + encryptedId;

            String subject = "Your Safari Booking Confirmation";

            String htmlContent = """
                    <html>
                        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
                            <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; padding: 20px;">
                                <h2 style="color: #2E8B57;">🐾 Kumana Wildtrails - Booking Confirmation</h2>
                                <p>Thank you for booking your safari adventure with <strong>Kumana Wild Trails</strong>!</p>
                                <p>You can view your booking details using the link below:</p>
                                <a href="%s" 
                                   style="display: inline-block; background-color: #2E8B57; color: white; padding: 12px 20px;
                                          border-radius: 6px; text-decoration: none; font-weight: bold;">
                                    View Booking
                                </a>
                                <p style="margin-top: 20px; font-size: 14px; color: #555;">
                                    Please keep this link safe. You’ll need it to view or manage your booking later.
                                </p>
                                <hr/>
                                <p style="font-size: 12px; color: #999;">© 2025 Kumana WildTrails </p>
                            </div>
                        </body>
                    </html>
                    """.formatted(link);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

            helper.setTo(toEmail);
            helper.setFrom(new InternetAddress("wildtrails.booking@gmail.com", "Kumana TrailMate"));
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // ✅ true = HTML content

            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send booking confirmation email", e);
        } catch (Exception e) {
            throw new RuntimeException("Email encryption or sending failed", e);
        }
    }
}
