# 🐾 Kumana WildTrails – Safari Experience & Booking Platform

**Kumana WildTrails** is an advanced web-based platform developed for **Kumana Wild Trails**, designed to enhance the safari experience through real-time wildlife sighting reports, SOS alerting, safari booking management, and interactive memory sharing.  
It serves as a comprehensive system for both **tourists** and **safari operators**, integrating technology with wildlife conservation and tourism management.

---

## 🌍 Overview

This platform allows:
- Tourists to **book safaris**, **share memories**, and **view booking statuses**  
- Drivers and admins to **report animal sightings** and **send SOS alerts** via an interactive map  
- Admins to **manage safaris, alerts, reports**, and view **analytics** for operations  
- A loyalty-based payment system and a customer diary to personalize the safari experience

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Vite), Tailwind CSS |
| **Backend** | Spring Boot |
| **Database** | PostgreSQL |
| **Authentication** | Firebase Authentication |Java JWT
| **Map & Location** | Google Maps API |

---

## 🧩 Key Features

### 🦁 Wildlife Sighting & Safety Reporting
- Real-time animal sightings with geolocation  
- Duplicate detection to avoid redundant entries  
- SOS alerts for emergencies (driver/admin only)  

### 🚙 Safari Booking & Management
- Tourists can book safaris with date, time, and group size  
- Admins approve or reject bookings  
- Option to proceed to payment after acceptance  

### 💳 Payments & Loyalty
- Secure payment gateway integration  
- Loyalty points system for repeat customers  

### 📊 Reports & Analytics
- Admin dashboard with summaries of wildlife activity, driver reports, user stats, booking management, driver management, package manageent and trends  

---

## 🧠 Architecture
Frontend (React + Vite)
↳ REST API calls → Backend (Spring Boot)
↳ Database (PostgreSQL)
↳ Firebase Authentication
## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or above)
- JDK 17+
- PostgreSQL Database
- Firebase Project (for authentication)
- Google Maps API Key

--
### 🔧 Frontend Setup (React + Vite)
```bash
cd frontend
npm install
npm run dev

--

### 🖥️ Backend Setup (Spring Boot)

Import the Spring Boot project into your IDE (IntelliJ / Eclipse / VS Code)

Configure application.properties:

spring.datasource.url=jdbc:postgresql://localhost:5432/wildtrails
spring.datasource.username=postgres
spring.datasource.password=yourpassword
firebase.config.path=src/main/resources/firebase-config.json


Run the Spring Boot application
It will start at: http://localhost:8080
