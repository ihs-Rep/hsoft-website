/**
 * HSoft - Main Application Script
 * Vanilla JavaScript (Zero external dependencies)
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initCurrentYear();
  
  // Page-specific initializers
  if (document.getElementById("featured-tools-container")) {
    initHomePage();
  }
  
  if (document.getElementById("tools-catalog-container")) {
    initToolsCatalog();
  }
  
  if (document.getElementById("tool-details-container")) {
    initToolDetailsPage();
  }

  if (document.getElementById("contact-form")) {
    initContactForm();
  }
});

/**
 * Mobile Navigation Toggle
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector(".mobile-nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (!toggleBtn || !mainNav) return;

  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", !isExpanded);
    mainNav.classList.toggle("open");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mainNav.contains(e.target) && !toggleBtn.contains(e.target) && mainNav.classList.contains("open")) {
      mainNav.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
}

/**
 * Dynamic Footer Year
 */
function initCurrentYear() {
  const yearEls = document.querySelectorAll(".current-year");
  const year = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = year);
}

/**
 * Toast Notification System
 */
function showToast(message) {
  let toast = document.querySelector(".toast-notice");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }
  
  toast.textContent = message;
  toast.classList.add("show");
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

/**
 * Copy Text to Clipboard
 */
function copyToClipboard(text, successMessage = "Copied to clipboard!") {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage);
    }).catch(() => {
      fallbackCopy(text, successMessage);
    });
  } else {
    fallbackCopy(text, successMessage);
  }
}

function fallbackCopy(text, successMessage) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    showToast(successMessage);
  } catch (err) {
    showToast("Failed to copy");
  }
  document.body.removeChild(textArea);
}

/**
 * Render Tool Card Component
 */
function createToolCardHtml(tool) {
  const isReleased = tool.status === "released" && Boolean(tool.downloadUrl);
  const statusBadge = isReleased
    ? `<span class="status-badge released"><span class="dot"></span>${escapeHtml(tool.version || "Released")}</span>`
    : `<span class="status-badge coming-soon"><span class="dot"></span>Coming Soon</span>`;

  const downloadBtn = isReleased
    ? `<a href="${escapeHtml(tool.downloadUrl)}" class="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
         Download
       </a>`
    : `<button class="btn btn-secondary btn-sm btn-disabled" disabled title="Not yet released">Coming Soon</button>`;

  const osPills = Array.isArray(tool.supportedWindows) && tool.supportedWindows.length > 0
    ? tool.supportedWindows.map(os => `<span class="tool-meta-item">${escapeHtml(os)}</span>`).join("")
    : `<span class="tool-meta-item">Windows</span>`;

  return `
    <article class="tool-card">
      <div class="tool-card-header">
        <span class="tool-card-category">${escapeHtml(tool.category || "Utility")}</span>
        ${statusBadge}
      </div>
      <h3 class="tool-card-title">
        <a href="tool-details.html?id=${encodeURIComponent(tool.id)}">${escapeHtml(tool.name)}</a>
      </h3>
      <p class="tool-card-desc">${escapeHtml(tool.shortDescription || tool.description)}</p>
      <div class="tool-card-meta">
        ${osPills}
      </div>
      <div class="tool-card-footer">
        <a href="tool-details.html?id=${encodeURIComponent(tool.id)}" class="btn btn-secondary btn-sm">
          View Details
        </a>
        ${downloadBtn}
      </div>
    </article>
  `;
}

/**
 * Helper to escape HTML characters
 */
function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * HOME PAGE LOGIC
 */
function initHomePage() {
  const featuredContainer = document.getElementById("featured-tools-container");
  const releasesContainer = document.getElementById("latest-releases-container");

  if (typeof getAllTools !== "function") return;

  // Render Featured Tools
  const featured = getFeaturedTools();
  if (featuredContainer) {
    if (featured.length > 0) {
      featuredContainer.innerHTML = featured.map(createToolCardHtml).join("");
    } else {
      featuredContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <p>Tools are currently being prepared. Check back soon!</p>
        </div>
      `;
    }
  }

  // Render Latest Releases
  if (releasesContainer) {
    const released = getReleasedTools();
    if (released.length > 0) {
      releasesContainer.innerHTML = released.map(createToolCardHtml).join("");
    } else {
      releasesContainer.innerHTML = `
        <div class="empty-state" style="max-width: 600px; margin: 0 auto;">
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <h3>No Public Releases Yet</h3>
          <p>All HSoft utilities are currently under active development and testing. Stable builds and download packages will appear here once officially published.</p>
          <a href="tools.html" class="btn btn-secondary btn-sm">Preview Upcoming Utilities</a>
        </div>
      `;
    }
  }
}

/**
 * TOOLS DIRECTORY PAGE LOGIC (Search & Filters)
 */
function initToolsCatalog() {
  const toolsGrid = document.getElementById("tools-catalog-container");
  const searchInput = document.getElementById("tools-search-input");
  const filterContainer = document.getElementById("tools-filter-categories");
  const countDisplay = document.getElementById("tools-count-display");

  if (typeof getAllTools !== "function" || !toolsGrid) return;

  const allTools = getAllTools();
  let selectedCategory = "all";
  let searchQuery = "";

  // Render Category Filter Buttons
  if (filterContainer) {
    const categories = getCategories();
    let buttonsHtml = `<button type="button" class="filter-btn active" data-category="all">All Tools</button>`;
    categories.forEach(cat => {
      buttonsHtml += `<button type="button" class="filter-btn" data-category="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`;
    });
    filterContainer.innerHTML = buttonsHtml;

    filterContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      
      filterContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedCategory = btn.getAttribute("data-category");
      applyFilters();
    });
  }

  // Live Search Input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  function applyFilters() {
    const filtered = allTools.filter(tool => {
      const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        (tool.name && tool.name.toLowerCase().includes(searchQuery)) ||
        (tool.shortDescription && tool.shortDescription.toLowerCase().includes(searchQuery)) ||
        (tool.description && tool.description.toLowerCase().includes(searchQuery)) ||
        (tool.category && tool.category.toLowerCase().includes(searchQuery));
      return matchesCategory && matchesSearch;
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} of ${allTools.length} utilities`;
    }

    if (filtered.length > 0) {
      toolsGrid.innerHTML = filtered.map(createToolCardHtml).join("");
    } else {
      toolsGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <h3>No Utilities Found</h3>
          <p>No tools matched your search or category filter. Try clearing your search keyword or switching categories.</p>
        </div>
      `;
    }
  }

  // Initial render
  applyFilters();
}

/**
 * TOOL DETAILS PAGE LOGIC
 */
function initToolDetailsPage() {
  const container = document.getElementById("tool-details-container");
  if (!container || typeof getToolById !== "function") return;

  const urlParams = new URLSearchParams(window.location.search);
  const toolId = urlParams.get("id");

  if (!toolId) {
    renderToolNotFound(container, "No tool specified. Please select a tool from our catalog.");
    return;
  }

  const tool = getToolById(toolId);
  if (!tool) {
    renderToolNotFound(container, `We could not find any software tool with the ID "${escapeHtml(toolId)}". It may have been renamed or removed.`);
    return;
  }

  // Update page title
  document.title = `${tool.name} — HSoft Tools`;

  const isReleased = tool.status === "released" && Boolean(tool.downloadUrl);
  
  // Build Status Badge
  const statusBadge = isReleased
    ? `<span class="status-badge released"><span class="dot"></span>Released</span>`
    : `<span class="status-badge coming-soon"><span class="dot"></span>Under Development / Coming Soon</span>`;

  // Build Download / Action Button
  let downloadSectionHtml = "";
  if (isReleased) {
    downloadSectionHtml = `
      <a href="${escapeHtml(tool.downloadUrl)}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Download Installer
      </a>
    `;
  } else {
    downloadSectionHtml = `
      <button class="btn btn-secondary btn-disabled" disabled>
        Download Unavailable (Coming Soon)
      </button>
    `;
  }

  // Build Meta items (only show fields that actually exist)
  let metaListHtml = "";
  if (tool.category) {
    metaListHtml += `<div class="meta-box-item"><span class="meta-box-label">Category</span><span class="meta-box-val">${escapeHtml(tool.category)}</span></div>`;
  }
  if (tool.version) {
    metaListHtml += `<div class="meta-box-item"><span class="meta-box-label">Latest Version</span><span class="meta-box-val">${escapeHtml(tool.version)}</span></div>`;
  }
  if (tool.releaseDate) {
    metaListHtml += `<div class="meta-box-item"><span class="meta-box-label">Release Date</span><span class="meta-box-val">${escapeHtml(tool.releaseDate)}</span></div>`;
  }
  if (tool.fileSize) {
    metaListHtml += `<div class="meta-box-item"><span class="meta-box-label">File Size</span><span class="meta-box-val">${escapeHtml(tool.fileSize)}</span></div>`;
  }
  if (Array.isArray(tool.supportedWindows) && tool.supportedWindows.length > 0) {
    metaListHtml += `<div class="meta-box-item"><span class="meta-box-label">Supported OS</span><span class="meta-box-val">${escapeHtml(tool.supportedWindows.join(", "))}</span></div>`;
  }

  // Features list
  let featuresHtml = "";
  if (Array.isArray(tool.features) && tool.features.length > 0) {
    const items = tool.features.map(f => `<li>${escapeHtml(f)}</li>`).join("");
    featuresHtml = `
      <section class="detail-section">
        <h2 class="detail-heading">Key Features</h2>
        <ul class="features-list">${items}</ul>
      </section>
    `;
  }

  // Screenshots
  let screenshotsHtml = "";
  if (Array.isArray(tool.screenshots) && tool.screenshots.length > 0) {
    const images = tool.screenshots.map(s => `
      <div style="margin-bottom: 1.5rem;">
        <img src="${escapeHtml(s.url)}" alt="${escapeHtml(s.caption || tool.name)}" style="border-radius: var(--radius-md); border: 1px solid var(--border-color); width: 100%;">
        ${s.caption ? `<p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem; text-align: center;">${escapeHtml(s.caption)}</p>` : ""}
      </div>
    `).join("");
    screenshotsHtml = `
      <section class="detail-section">
        <h2 class="detail-heading">Screenshots</h2>
        ${images}
      </section>
    `;
  } else {
    // Show clean placeholder illustration
    screenshotsHtml = `
      <section class="detail-section">
        <h2 class="detail-heading">Interface Preview</h2>
        <img src="assets/images/tool-placeholder.svg" alt="Preview Placeholder" style="width: 100%; border-radius: var(--radius-md);">
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.75rem; text-align: center;">UI screenshots will be published with the stable release.</p>
      </section>
    `;
  }

  // Checksum box
  let checksumHtml = "";
  if (tool.sha256) {
    checksumHtml = `
      <div class="checksum-box">
        <div class="checksum-header">
          <span>SHA-256 Checksum</span>
          <button type="button" class="btn btn-secondary btn-sm" id="copy-sha-btn" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;">Copy</button>
        </div>
        <div class="checksum-value" id="sha-value-text">${escapeHtml(tool.sha256)}</div>
      </div>
    `;
  }

  // Changelog
  let changelogHtml = "";
  if (Array.isArray(tool.changelog) && tool.changelog.length > 0) {
    const entries = tool.changelog.map(log => `
      <div class="changelog-entry">
        <div class="changelog-version">
          <span>Version ${escapeHtml(log.version)}</span>
          ${log.date ? `<span class="changelog-date">(${escapeHtml(log.date)})</span>` : ""}
        </div>
        <ul class="changelog-items">
          ${(log.changes || []).map(c => `<li>${escapeHtml(c)}</li>`).join("")}
        </ul>
      </div>
    `).join("");
    changelogHtml = `
      <section class="detail-section">
        <h2 class="detail-heading">Release Changelog</h2>
        ${entries}
      </section>
    `;
  }

  // Known issues
  let knownIssuesHtml = "";
  if (Array.isArray(tool.knownIssues) && tool.knownIssues.length > 0) {
    const issues = tool.knownIssues.map(i => `<li>${escapeHtml(i)}</li>`).join("");
    knownIssuesHtml = `
      <section class="detail-section">
        <h2 class="detail-heading">Known Issues</h2>
        <ul class="changelog-items">${issues}</ul>
      </section>
    `;
  }

  // Build the complete page content
  container.innerHTML = `
    <!-- Tool Header Bar -->
    <div class="tool-detail-header">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="index.html">Home</a>
          <span class="breadcrumb-separator">/</span>
          <a href="tools.html">Tools</a>
          <span class="breadcrumb-separator">/</span>
          <span>${escapeHtml(tool.name)}</span>
        </nav>

        <div class="tool-detail-intro">
          <div class="tool-detail-main-info">
            <div class="tool-detail-title-row">
              <h1 class="tool-detail-title">${escapeHtml(tool.name)}</h1>
              ${statusBadge}
            </div>
            <p class="tool-detail-summary">${escapeHtml(tool.shortDescription || tool.description)}</p>
            <div class="tool-detail-actions">
              ${downloadSectionHtml}
              <a href="${escapeHtml(tool.supportUrl || "contact.html")}" class="btn btn-secondary">
                Support &amp; Feedback
              </a>
            </div>
          </div>

          <aside class="tool-detail-meta-box">
            ${metaListHtml || `<div class="meta-box-item"><span class="meta-box-label">Status</span><span class="meta-box-val">In Development</span></div>`}
            ${checksumHtml}
          </aside>
        </div>
      </div>
    </div>

    <!-- Main Details Body -->
    <div class="container">
      <div class="detail-layout">
        <div class="detail-main-col">
          <section class="detail-section">
            <h2 class="detail-heading">Overview</h2>
            <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.7;">${escapeHtml(tool.description)}</p>
          </section>

          ${featuresHtml}
          ${screenshotsHtml}
          ${changelogHtml}
          ${knownIssuesHtml}
        </div>

        <div class="detail-sidebar-col">
          <div class="sidebar-card">
            <h3 class="sidebar-title">System Requirements</h3>
            <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">
              ${escapeHtml(tool.systemRequirements || "Windows 10 or Windows 11 (64-bit recommended).")}
            </p>
          </div>

          <div class="sidebar-card">
            <h3 class="sidebar-title">Security &amp; Integrity</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 0.75rem;">
              HSoft software releases do not bundle third-party toolbars or unwanted adware. Always verify file SHA-256 checksums before execution.
            </p>
            <a href="privacy.html" style="font-size: 0.85rem;">Learn about our privacy and safety standards →</a>
          </div>

          <div class="sidebar-card">
            <h3 class="sidebar-title">Need Help or Found a Bug?</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;">
              Report issues, request features, or send general feedback directly to the developer.
            </p>
            <a href="contact.html" class="btn btn-secondary btn-sm" style="width: 100%;">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach Checksum Copy Button Handler
  const copyBtn = document.getElementById("copy-sha-btn");
  if (copyBtn && tool.sha256) {
    copyBtn.addEventListener("click", () => {
      copyToClipboard(tool.sha256, "SHA-256 Checksum copied!");
    });
  }
}

function renderToolNotFound(container, message) {
  container.innerHTML = `
    <div class="container" style="padding: 5rem 1.5rem; text-align: center;">
      <div class="empty-state" style="max-width: 560px; margin: 0 auto;">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h2 style="font-size: 1.75rem; color: var(--primary); margin-bottom: 0.75rem;">Tool Not Found</h2>
        <p style="color: var(--text-muted); margin-bottom: 1.75rem;">${escapeHtml(message)}</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <a href="tools.html" class="btn btn-primary">Browse All Tools</a>
          <a href="index.html" class="btn btn-secondary">Go to Home</a>
        </div>
      </div>
    </div>
  `;
}

/**
 * CONTACT FORM LOGIC
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const noticeBox = document.getElementById("contact-form-notice");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Clear and show configuration reminder notice
    if (noticeBox) {
      noticeBox.innerHTML = `
        <div class="notice-box notice-warning">
          <strong>Notice:</strong> This static website does not have an active form-processing backend connected. 
          To enable direct contact form submissions on Cloudflare Pages, integrate a free service like Formspree, Cloudflare Workers, or configure your official email address in <code>contact.html</code>.
        </div>
      `;
    }
    
    showToast("Static demo form — please see configuration note.");
  });
}
