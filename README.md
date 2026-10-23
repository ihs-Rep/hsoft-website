# IHSByte — Official Website Project

**Smart Windows Utilities & Tech Insights**  
Domain: `ihsbyte.com.lk` | Contact: `contact@ihsbyte.com.lk`

This is the complete, production-ready website for **IHSByte**, an independent software brand dedicated to developing lightweight, high-performance Windows desktop utilities and publishing in-depth tech analyses, Windows benchmarks, and cybersecurity advisories.

The project is built with clean HTML5, modern CSS3 (with responsive glassmorphism, animated ambient glowing headers, and dark/light modes), and vanilla JavaScript without any heavyweight runtime or external framework. It is fully optimized for continuous deployment on **Cloudflare Pages** connected to GitHub.

---

## 📁 Project Structure

```text
ihsbyte-website/
├── index.html                   # Homepage (Hero with glowing aura, quick search, featured tools, tech news, CTA)
├── tools.html                   # Software catalog (Live search, Category filters, Utilities grid)
├── news.html                    # Tech News portal (Featured story, Search, Category filter pills, Modal reader)
├── tool-details.html            # Dynamic reusable tool details page (?id=tool-id)
├── about.html                   # About IHSByte (Mission, 4 Solution Areas, Development Standards)
├── contact.html                 # Contact desk, Bug report guidelines, interactive mailer
├── privacy.html                 # Privacy policy & zero-telemetry commitments
├── robots.txt                   # Search crawler directives
├── sitemap.xml                  # XML sitemap (ihsbyte.com.lk)
├── assets/
│   ├── css/
│   │   └── style.css            # Complete modern stylesheet (Ambient glow, dark/light modes, glassmorphism)
│   ├── js/
│   │   ├── tools-data.js        # Central software tools catalog data
│   │   ├── news-data.js         # Curated tech news stories and technical deep dives
│   │   └── main.js              # Theme toggle, search & filter engines, dynamic rendering, article modal
│   └── images/
│       ├── logo.svg             # Official vector brand logo (Light Mode)
│       ├── logo-light.svg       # Official vector brand logo (Dark Mode & Footer)
│       ├── logo.png             # Crisp 4x supersampled brand logo fallback
│       ├── logo-light.png       # Crisp 4x supersampled dark brand logo fallback
│       ├── favicon.svg          # Modern vector browser favicon
│       ├── favicon.png          # High-resolution PNG favicon
│       ├── favicon.ico          # Multi-size ICO favicon
│       ├── tool-adobe-blocker.png
│       ├── tool-decoy.png
│       ├── tool-focuspoint.svg
│       ├── tool-mailsafe.png
│       └── tool-netmode-smb.png
└── README.md
```

---

## 🚀 How to Test the Website Locally

Run a simple local HTTP server via PowerShell in the project directory:
```powershell
python -m http.server 8000
```
Open `http://localhost:8000` in your web browser.
