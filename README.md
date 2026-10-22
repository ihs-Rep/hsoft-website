# HSoft — Official Website Project

**Small Tools. Smart Solutions.**

This is the complete, production-ready static website for **HSoft**, an independent brand dedicated to developing practical Windows utilities and software tools.

The project is built with standard HTML5, CSS3, and vanilla JavaScript without any heavy framework, database, or backend server requirements. It is fully optimized for free hosting on **Cloudflare Pages**.

---

## 📁 Project Structure

```text
hsoft-website/
├── index.html                   # Homepage (Hero, Featured Tools, Why HSoft, Releases, CTA)
├── tools.html                   # Software directory (Live search, Category filters, Grid)
├── tool-details.html            # Dynamic reusable tool details page (?id=tool-id)
├── about.html                   # About HSoft (Brand philosophy, Principles, Target audience)
├── contact.html                 # Contact and support guidelines / inquiries
├── privacy.html                 # Privacy policy & data transparency
├── robots.txt                   # Search crawler directives
├── sitemap.xml                  # XML sitemap for search indexing
├── assets/
│   ├── css/
│   │   └── style.css            # Complete responsive stylesheet (Modern Navy/Blue theme)
│   ├── js/
│   │   ├── tools-data.js        # Central software tools catalog data
│   │   └── main.js              # Navigation, dynamic rendering, search & filters
│   └── images/
│       ├── logo.svg             # Main SVG logo (Dark navy wordmark with blue accent)
│       ├── logo-light.svg       # Light SVG logo for dark footer background
│       ├── favicon.svg          # High-resolution SVG favicon
│       └── tool-placeholder.svg # Fallback UI preview vector graphic
└── README.md                    # Deployment and management guide
```

---

## 1. How to Open and Test the Website Locally

Because this is a pure static website, you do not need Node.js or build tools. You can run it locally in any of the following ways:

### Option A: VS Code Live Server (Recommended)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and click **"Open with Live Server"**.
4. The site will open at `http://127.0.0.1:5500`.

### Option B: Python Local Server
If you have Python installed, open your terminal / PowerShell in the project folder and run:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

### Option C: Direct Browser Opening
Double-click `index.html` directly in File Explorer.
*(Note: To test dynamic URL parameters like `tool-details.html?id=quick-hash-verifier`, a local server like Option A or Option B is recommended so that modern browser security policies handle URL parameters seamlessly).*

---

## 2. How to Edit Logo, Colours, and Website Text

### A. Editing Brand Colours
All colors are centralized in `assets/css/style.css` under the `:root` pseudo-class:
```css
:root {
  --primary: #0B1220;           /* Dark navy (Primary brand color) */
  --secondary: #3B82F6;         /* Bright blue accent */
  --secondary-hover: #2563EB;   /* Hover state for blue buttons/links */
  --bg-main: #F8FAFC;          /* Clean slate-grey background */
  --text-main: #0F172A;         /* Primary readable body text */
}
```
Changing these values instantly updates the theme across every page.

### B. Editing the Logo
The logos are high-resolution vector SVGs located at:
- `assets/images/logo.svg` (Header logo)
- `assets/images/logo-light.svg` (Footer logo)
- `assets/images/favicon.svg` (Browser tab icon)

You can open and edit these files with any text editor or vector software like Figma or Inkscape.

---

## 3. How to Add a New Software Tool

All tools are managed centrally in `assets/js/tools-data.js`. You do **not** need to create new HTML files when adding tools.

Open `assets/js/tools-data.js` and add a new tool object to the `HSOFT_TOOLS` array:

```javascript
{
  id: "my-new-tool",                        // Unique URL-friendly ID (e.g. tool-details.html?id=my-new-tool)
  name: "My New Utility",                   // Tool display name
  shortDescription: "A brief one-line description for tool cards.",
  description: "A comprehensive description of what this tool does and how it helps users.",
  category: "System Utilities",             // Category name used for filtering
  version: "1.0.0",                         // Current release version (or "" if unreleased)
  releaseDate: "October 2026",              // Release date string (or "" if unreleased)
  supportedWindows: ["Windows 11", "Windows 10 (64-bit)"],
  systemRequirements: "Windows 10/11 64-bit, 50MB free disk space.",
  features: [
    "High-speed processing engine",
    "Clean and minimalist user interface",
    "Portable zero-install executable"
  ],
  screenshots: [
    // Optional screenshots:
    // { url: "assets/images/my-tool-1.png", caption: "Main dashboard window" }
  ],
  downloadUrl: "https://github.com/your-username/my-tool/releases/download/v1.0.0/MyTool-Setup.exe",
  fileSize: "4.2 MB",
  sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  changelog: [
    {
      version: "1.0.0",
      date: "October 2026",
      changes: [
        "Initial stable public release",
        "Added multi-file support"
      ]
    }
  ],
  knownIssues: [
    "High-DPI scaling on multi-monitor setups with 200%+ scaling is being optimized."
  ],
  supportUrl: "contact.html",
  status: "released",                       // Use "released" or "coming-soon"
  isFeatured: true                          // Set to true to show on homepage
}
```

Once saved, the tool will automatically appear on:
1. The **Home page** (under Featured Tools and Latest Releases if released).
2. The **Tools Directory** (`tools.html`) with search and category filtering.
3. Its own dedicated details page at `tool-details.html?id=my-new-tool`.

---

## 4. How to Update a Download URL and Version

When you publish a new version of an existing tool:
1. Open `assets/js/tools-data.js`.
2. Find the tool's entry by its `id`.
3. Update:
   - `version`: e.g., `"1.1.0"`
   - `releaseDate`: e.g., `"November 2026"`
   - `downloadUrl`: paste your new direct download URL (e.g. from GitHub Releases).
   - `fileSize`: e.g., `"4.5 MB"`.
   - `sha256`: paste the new SHA-256 hash.
   - `changelog`: prepend the new version's release notes at the top of the `changelog` array.
   - `status`: change to `"released"`.

---

## 5. How to Upload the Project to GitHub

1. Create a free account on [GitHub.com](https://github.com) if you do not have one.
2. In your GitHub account, click **New Repository**.
3. Name your repository (e.g., `hsoft-website`). Choose **Public** or **Private**, and leave "Initialize with README" unchecked.
4. In your local project directory (`d:\Antigravity\IHS Website`), run the following commands in PowerShell or Git Bash:

```bash
git init
git add .
git commit -m "Initial commit of HSoft official website"
git branch -M main
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/hsoft-website.git
git push -u origin main
```

---

## 6. How to Connect GitHub to Cloudflare Pages

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left-hand navigation sidebar, click **Workers & Pages**.
3. Click the **Create application** button, then select the **Pages** tab.
4. Click **Connect to Git**.
5. Select your GitHub account and choose your `hsoft-website` repository.
6. Click **Begin setup**.

---

## 7. Correct Cloudflare Pages Build Configuration

Because HSoft is a pure static website with no compilation needed, configure the build settings as follows:

- **Project name:** `hsoft` (or your preferred name)
- **Production branch:** `main`
- **Framework preset:** `None`
- **Build command:** *(Leave completely empty)*
- **Build output directory:** `/` *(or leave blank so it serves the repository root)*
- **Environment variables:** *(None required)*

Click **Save and Deploy**. Cloudflare Pages will deploy your site in less than 30 seconds and provide you with a free preview URL (e.g., `https://hsoft.pages.dev`).

---

## 8. How to Deploy Updates in the Future

Whenever you edit files locally (such as adding a tool to `assets/js/tools-data.js` or updating page text):
1. Commit and push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Add new utility or update release version"
   git push origin main
   ```
2. Cloudflare Pages automatically detects the push and redeploys the live site in seconds.

---

## 9. How to Connect a Custom Domain (`hsoft.lk`) in the Future

Once you purchase your domain (e.g., `hsoft.lk` from LK Domain Registry):

1. Go to your **Cloudflare Dashboard** &rarr; **Workers & Pages** &rarr; select your `hsoft` Pages project.
2. Click on the **Custom domains** tab.
3. Click **Set up a custom domain**.
4. Enter `hsoft.lk` (or `www.hsoft.lk`) and click **Continue**.
5. Follow Cloudflare's instructions:
   - If Cloudflare manages your DNS: Cloudflare configures the CNAME record automatically with free SSL.
   - If your domain DNS is managed elsewhere: Add a `CNAME` record pointing from `hsoft.lk` to `hsoft.pages.dev`.
6. Update `sitemap.xml` and `robots.txt` with your official domain:
   Replace `https://example-domain.pages.dev` with `https://hsoft.lk`.

---

## 10. Checklist: Details to Replace Before Public Launch

Before marketing the website or advertising downloads:

- [ ] **Contact Email / Form:** Update `contact.html` with your official support inbox or connect a free form endpoint (e.g. Formspree or Cloudflare Worker).
- [ ] **Real Software Tools:** Edit `assets/js/tools-data.js` to insert your actual Windows utilities and binaries.
- [ ] **Social Media Links:** In the footer of all HTML files, update or uncomment social profile URLs once registered.
- [ ] **Sitemap and Canonical Domain:** In `sitemap.xml` and `robots.txt`, update the placeholder domain with your final URL.
- [ ] **Privacy Policy:** Review `privacy.html` to ensure any future telemetry or third-party web analytics tools are accurately declared.
