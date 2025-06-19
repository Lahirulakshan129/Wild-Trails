package com.wildtrails.backend.config;

import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.context.annotation.Configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void initialize() throws IOException {
        FileInputStream serviceAccount =
            new FileInputStream("src/main/resources/firebase/FBAuth.json");
          //  getClass().getClassLoader().getResourceAsStream("firebase/firebase-config.json");

        FirebaseOptions options = FirebaseOptions.builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }

}
