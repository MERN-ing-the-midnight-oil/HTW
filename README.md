# Home Title Watcher – Marketing Website Overview

The **Home Title Watcher** marketing website serves as both a landing page for the mobile app and a platform for distributing access via promo codes.

## 🌐 Website Purpose

The main page includes:

- A brief overview of the app’s purpose: **alerting users to suspicious changes in their property title records**
- Download links for:
  - **iOS** (via the App Store)
  - **Android** (as a direct `.apk` sideload)

## 🛒 Promo Code Purchase Flow

Professionals (such as realtors) can:

- Purchase **packs of promo codes** in quantities like:
  - 5, 10, 50, 200+
- Complete payment through a system like **Stripe**
- Receive a list of **unique promo codes** post-purchase
- View, copy, or download those codes to distribute to clients

## 🔐 Promo Code Redemption

- Users enter a promo code in the mobile app (iOS or Android)
- The backend checks the code against a **MongoDB** database to ensure it is:
  - **Valid**
  - **Unused**
- If valid, the app **unlocks full access** to its services for that user

## 👤 Future Features (Optional)

The website may later support:

- User accounts for code buyers
- Login and purchase history
- Promo code usage tracking and analytics

## ⚙️ Tech Stack

- **Frontend:** Next.js (already in development)
- **Backend:** REST API using MongoDB (hosted on Heroku)
- **Payments:** Planned integration with **Stripe**
- **Data Models:** Includes `PromoCode` and `Realtor` models in MongoDB
