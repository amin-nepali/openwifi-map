<div align="center">

# 📶 OpenWifi Map

**A crowdsourced, consent-first interactive map for public Wi-Fi hotspots.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](#)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?logo=leaflet&logoColor=white)](#)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime_DB-FFCA28?logo=firebase&logoColor=black)](#)

<p align="center">
  <a href="#about-the-project">About</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#security--consent">Consent & Safety</a> •
  <a href="#license">License</a>
</p>

</div>

---

## 📌 About The Project

**OpenWifi Map** is an open-source, web-based interactive map designed to help communities, digital nomads, and travelers discover free, community-shared Wi-Fi networks in real time. 

Unlike traditional crowdsourced password apps, **OpenWifi Map enforces an owner-consent architecture**. Network entry requires explicit confirmation from the owner or authorized venue representative, ensuring ethical sharing and compliance with local network policies.

---

## ✨ Key Features

- **🗺️ Interactive Dark-Mode Map:** Uses Leaflet.js with CartoDB dark tiles for sleek visual rendering.
- **🛡️ Consent Barrier:** Form submissions are locked until the user verifies they have administrative authority over the network.
- **📍 Precise Geolocation:** Automatic GPS lookup via the browser Geolocation API with draggable manual pin adjustments.
- **⚡ Real-Time Sync:** Powered by Firebase Realtime Database for instantaneous map updates across all active sessions.
- **📋 Copy-to-Clipboard Credentials:** One-click password copying directly from map popups.
- **💬 Venue Courtesy Notes:** Allows owners to specify access conditions (e.g., *"Available 9 AM – 6 PM"* or *"Free with cafe purchase"*).

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+ Modules)
- **Mapping Library:** [Leaflet.js](https://leafletjs.com/) (OpenStreetMap / CartoDB Dark Matter)
- **Database Backend:** [Firebase Realtime Database](https://firebase.google.com/docs/database)
- **Icons:** [FontAwesome 6](https://fontawesome.com/)

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge).
- A free [Firebase Account](https://firebase.google.com/) for setting up your database.

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/openwifi-map.git](https://github.com/your-username/openwifi-map.git)
   cd openwifi-map
