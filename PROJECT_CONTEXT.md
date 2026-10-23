# IHSByte Website — Project Context & Handoff Guide

> **Note for AI Assistant (Antigravity):**  
> This file contains the complete historical context, architectural decisions, and current state of the **IHSByte** website project. Read this file to seamlessly continue work from any workstation.

---

## 1. Brand & Project Overview
- **Brand Name:** **IHSByte** (Formerly HSoft — rebranded on October 23, 2026).
- **Tagline:** *Smart Windows Utilities & Tech Insights* (Small Tools. Smart Solutions).
- **Target Domain:** `ihsbyte.com.lk` (Apex & www configured for Cloudflare Pages).
- **Official Contact Email:** `contact@ihsbyte.com.lk`.
- **Hosting Platform:** **Cloudflare Pages** (Static site tier, continuous deployment connected to GitHub repository).
- **GitHub Repository:** `https://github.com/ihs-Rep/hsoft-website.git` (Branch: `main`).

---

## 2. Recommended AI Model Configuration
- **Model:** **Gemini 2.5 Pro** (Antigravity `pro` mode).
- **Operating System:** Windows.
- **Language / Communication:** Sinhala (User's preferred working language) with technical English terms.

---

## 3. Tech Stack & Architecture
- **Front-End:** Pure HTML5, modern CSS3 (Custom responsive styling, glassmorphism, fluid ambient glow animations), and Vanilla JavaScript (zero external runtime/framework dependencies).
- **Theme Support:** Clean Dark Mode (`html[data-theme="dark"]`) and Light Mode toggle with `localStorage` persistence (`ihsbyte_theme` / fallback `hsoft_theme`).
- **Brand Assets:**
  - `assets/images/logo.svg`: Crisp vector brand logo for Light Mode (Navy `IHS` + Electric Blue `BYTE` + 3D isometric quantum byte cube).
  - `assets/images/logo-light.svg`: Crisp vector brand logo for Dark Mode & dark footer (Pure White `IHS` + Cyan `BYTE`).
  - `assets/images/favicon.svg` & `favicon.ico`: Modern vector and multi-resolution favicon.
  - Zero blurriness: Vectors are resolution-independent across 4K, 8K, and Retina screens.

---

## 4. Software Tools Catalog (`assets/js/tools-data.js`)
All tools originate from the local suite at `D:\Antigravity`:
1. **Adobe Blocker (RELEASED v2.0):**
   - Status: `released`
   - Binary Location: `downloads/AdobeBlocker.exe` (125.5 KB, Standalone executable).
   - Source Location: `D:\Antigravity\Adobe Blocker Script\AdobeBlocker.exe`.
   - Verified SHA-256: `9DD9854F252CB9CFAAAE77929C19617EE272409A8CCC597FA6F1CAF8F2BDE48E`.
   - Functionality: One-click batch firewall and hosts blocking for Adobe applications and telemetry sinkholing.
2. **Decoy (Coming Soon):** Tamper-proof password-protected domain and content access control filter.
3. **FocusPoint (Coming Soon):** Distraction-free desktop reminder & productivity scheduler (.NET WPF).
4. **MailSafe (Coming Soon):** Automated background email backup for Outlook (PST/OST) and sensitive directories.
5. **Net Mode SMB Monitor (Coming Soon):** Network adapter switcher (QB/Internet mode) with real-time SMB traffic auditing.

---

## 5. Tech News Portal (`news.html` & `assets/js/news-data.js`)
- Dedicated news page with live search, category pills (*Windows & OS, Cybersecurity, Software Trends, Productivity & Tech, Data Protection*), and featured story banner.
- **Interactive Article Reader Modal:** Clicking any story opens an in-page distraction-free modal reader (`openArticleModal(id)`).
- Homepage features top 3 latest tech insights with direct links.

---

## 6. Page Inventory
- `index.html`: Homepage (Hero with animated ambient aurora glow, live utilities quick search, featured tools, latest tech news, core principles, CTA).
- `tools.html`: Full software directory with real-time category filters and search.
- `news.html`: Tech news portal with article modal reader.
- `tool-details.html`: Dynamic single tool view driven by URL parameter `?id=<tool-id>` with download buttons and SHA-256 checksum copy box.
- `about.html`: Brand story, mission, 4 solution domains, and development standards.
- `contact.html`: Interactive mailer for `contact@ihsbyte.com.lk` and bug report guidelines.
- `privacy.html`: Clear zero-telemetry and offline utility stance.
- `sitemap.xml` & `robots.txt`: Configured for `ihsbyte.com.lk`.

---

## 7. How to Continue Work on Another PC
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/ihs-Rep/hsoft-website.git
   cd hsoft-website
   ```
2. **Open in Antigravity:**
   - Launch Antigravity and select the cloned folder as the workspace.
   - Select the **Pro model** (Gemini 2.5 Pro).
3. **Prompt the Agent:**
   - Send: *"Read PROJECT_CONTEXT.md and continue our work."*
   - The agent will immediately understand the entire state, coding standards, brand assets, and release pipeline.
