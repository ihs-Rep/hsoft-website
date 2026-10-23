/**
 * IHSByte - Main Application Script
 * Vanilla JavaScript (Zero external dependencies)
 * Brand: IHSByte (ihsbyte.com.lk)
 */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileMenu();
  initCurrentYear();
  initArticleModal();
  
  // Page-specific initializers
  if (document.getElementById("featured-tools-container")) {
    initHomePage();
  }
  
  if (document.getElementById("tools-catalog-container")) {
    initToolsCatalog();
  }
  
  if (document.getElementById("news-catalog-container")) {
    initNewsCatalog();
  }
  
  if (document.getElementById("tool-details-container")) {
    initToolDetailsPage();
  }

  if (document.getElementById("contact-form")) {
    initContactForm();
  }
});

/**
 * Dark / Light Theme Toggle Logic
 */
function initThemeToggle() {
  const savedTheme = localStorage.getItem("ihsbyte_theme") || localStorage.getItem("hsoft_theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme ? savedTheme : (prefersDark ? "dark" : "light");
  
  applyTheme(initialTheme);

  const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const nextTheme = isDark ? "light" : "dark";
      applyTheme(nextTheme);
      localStorage.setItem("ihsbyte_theme", nextTheme);
      showToast(`Switched to ${nextTheme === "dark" ? "Dark" : "Light"} Mode`);
    });
  });
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  if (isDark) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }

  // Explicit logo visibility guarantee for light/dark logos
  const lightLogos = document.querySelectorAll(".brand-logo.light-mode-logo");
  const darkLogos = document.querySelectorAll(".brand-logo.dark-mode-logo");

  lightLogos.forEach(img => {
    img.style.setProperty("display", isDark ? "none" : "block", "important");
  });
  darkLogos.forEach(img => {
    img.style.setProperty("display", isDark ? "block" : "none", "important");
  });
}

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
 * Render Tool Card Component
 */
function createToolCardHtml(tool) {
  const isReleased = tool.status === "released" && Boolean(tool.downloadUrl);
  const statusBadge = isReleased
    ? `<span class="status-badge released"><span class="dot"></span>${escapeHtml(tool.version || "Released")}</span>`
    : `<span class="status-badge coming-soon"><span class="dot"></span>Coming Soon</span>`;

  const downloadBtn = isReleased
    ? `<a href="${escapeHtml(tool.downloadUrl)}" class="btn btn-primary btn-sm" download>
         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
         Download (${escapeHtml(tool.fileSize || "EXE")})
       </a>`
    : `<button class="btn btn-secondary btn-sm btn-disabled" disabled title="Under active development">Coming Soon</button>`;

  const osPills = Array.isArray(tool.supportedWindows) && tool.supportedWindows.length > 0
    ? tool.supportedWindows.map(os => `<span class="tool-meta-item">${escapeHtml(os)}</span>`).join("")
    : `<span class="tool-meta-item">Windows</span>`;

  const iconHtml = tool.iconUrl
    ? `<img src="${escapeHtml(tool.iconUrl)}" alt="${escapeHtml(tool.name)} Icon" class="tool-card-icon">`
    : `<div class="tool-card-icon-placeholder"><span>${escapeHtml(tool.name.charAt(0))}</span></div>`;

  return `
    <article class="tool-card">
      <div class="tool-card-header">
        <span class="tool-card-category">${escapeHtml(tool.category || "Utility")}</span>
        ${statusBadge}
      </div>
      <div class="tool-card-identity">
        ${iconHtml}
        <div>
          <h3 class="tool-card-title">
            <a href="tool-details.html?id=${encodeURIComponent(tool.id)}">${escapeHtml(tool.name)}</a>
          </h3>
          <span style="font-size: 0.8rem; color: var(--text-light); font-weight: 500;">IHSByte Utility</span>
        </div>
      </div>
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
 * Render Tech News Card Component
 */
function createNewsCardHtml(article) {
  return `
    <article class="news-card" onclick="openArticleModal('${escapeHtml(article.id)}')">
      <div class="news-card-header">
        <span class="news-category-badge">${escapeHtml(article.category)}</span>
        <span class="news-read-time">${escapeHtml(article.readTime)}</span>
      </div>
      <h3 class="news-card-title">${escapeHtml(article.title)}</h3>
      <p class="news-card-summary">${escapeHtml(article.summary)}</p>
      <div class="news-card-footer">
        <div class="news-author-date">
          <span>${escapeHtml(article.date)}</span>
          <span>•</span>
          <span>${escapeHtml(article.author)}</span>
        </div>
        <span class="news-read-action">
          Read Story &rarr;
        </span>
      </div>
    </article>
  `;
}

/**
 * Article Reader Modal System
 */
function initArticleModal() {
  if (document.getElementById("article-reader-modal")) return;

  const modalBackdrop = document.createElement("div");
  modalBackdrop.id = "article-reader-modal";
  modalBackdrop.className = "article-modal-backdrop";
  modalBackdrop.innerHTML = `
    <div class="article-modal-container" role="dialog" aria-modal="true">
      <button type="button" class="modal-close-btn" aria-label="Close article" onclick="closeArticleModal()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div id="modal-article-content"></div>
    </div>
  `;

  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) {
      closeArticleModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeArticleModal();
    }
  });

  document.body.appendChild(modalBackdrop);
}

window.openArticleModal = function(articleId) {
  if (typeof NEWS_DATA === "undefined") return;
  const article = NEWS_DATA.find(a => a.id === articleId);
  if (!article) return;

  const contentContainer = document.getElementById("modal-article-content");
  if (!contentContainer) return;

  const tagsHtml = (article.tags || []).map(t => `<span class="tool-meta-item">#${escapeHtml(t)}</span>`).join(" ");

  contentContainer.innerHTML = `
    <div class="news-card-header" style="margin-bottom: 0.75rem;">
      <span class="news-category-badge">${escapeHtml(article.category)}</span>
      <span class="news-read-time">${escapeHtml(article.readTime)}</span>
    </div>
    <h1 style="font-size: clamp(1.6rem, 3.2vw, 2.3rem); font-weight: 850; line-height: 1.25; color: var(--text-heading); margin-bottom: 0.75rem;">
      ${escapeHtml(article.title)}
    </h1>
    <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem; display: flex; gap: 0.75rem; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
      <span>By <strong>${escapeHtml(article.author)}</strong></span>
      <span>•</span>
      <span>Published on ${escapeHtml(article.date)}</span>
    </div>
    <div class="modal-article-body">
      ${article.content}
    </div>
    <div style="margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        ${tagsHtml}
      </div>
      <button type="button" class="btn btn-secondary btn-sm" onclick="closeArticleModal()">Close Story</button>
    </div>
  `;

  const modal = document.getElementById("article-reader-modal");
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
};

window.closeArticleModal = function() {
  const modal = document.getElementById("article-reader-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
};

/**
 * HOME PAGE LOGIC
 */
function initHomePage() {
  const featuredContainer = document.getElementById("featured-tools-container");
  const homeNewsContainer = document.getElementById("home-news-container");

  // Render Featured Tools
  if (featuredContainer && typeof getAllTools === "function") {
    const featured = getFeaturedTools();
    if (featured.length > 0) {
      featuredContainer.innerHTML = featured.map(createToolCardHtml).join("");
    } else {
      featuredContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <p>Utilities are currently being prepared. Check back soon!</p>
        </div>
      `;
    }
  }

  // Home Quick Live Search
  const homeSearchInput = document.getElementById("home-tools-search-input");
  if (homeSearchInput && featuredContainer && typeof getAllTools === "function") {
    homeSearchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const allTools = getAllTools();
      const filtered = allTools.filter(tool => {
        return !q || 
          (tool.name && tool.name.toLowerCase().includes(q)) ||
          (tool.shortDescription && tool.shortDescription.toLowerCase().includes(q)) ||
          (tool.description && tool.description.toLowerCase().includes(q)) ||
          (tool.category && tool.category.toLowerCase().includes(q));
      });

      if (filtered.length > 0) {
        featuredContainer.innerHTML = filtered.map(createToolCardHtml).join("");
      } else {
        featuredContainer.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1;">
            <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <h3>No Utilities Found for "${escapeHtml(q)}"</h3>
            <p>Try searching for Adobe Blocker, Decoy, MailSafe, FocusPoint, or SMB Monitor.</p>
          </div>
        `;
      }
    });
  }

  // Render Latest Tech News on Home Page
  if (homeNewsContainer && typeof NEWS_DATA !== "undefined") {
    const topStories = NEWS_DATA.slice(0, 3);
    homeNewsContainer.innerHTML = topStories.map(createNewsCardHtml).join("");
  }
}

/**
 * TECH NEWS CATALOG PAGE LOGIC
 */
function initNewsCatalog() {
  const newsGrid = document.getElementById("news-catalog-container");
  const searchInput = document.getElementById("news-search-input");
  const filterContainer = document.getElementById("news-filter-categories");
  const countDisplay = document.getElementById("news-count-display");
  const featuredBannerContainer = document.getElementById("news-featured-banner");

  if (typeof NEWS_DATA === "undefined" || !newsGrid) return;

  let selectedCategory = "all";
  let searchQuery = "";

  // Render Featured Top Banner
  if (featuredBannerContainer) {
    const featuredStory = NEWS_DATA.find(a => a.featured) || NEWS_DATA[0];
    if (featuredStory) {
      featuredBannerContainer.innerHTML = `
        <div class="featured-story-banner" onclick="openArticleModal('${escapeHtml(featuredStory.id)}')">
          <div class="featured-badge">
            <span class="pulse-dot"></span>
            Featured Analysis
          </div>
          <h2 class="featured-story-title">${escapeHtml(featuredStory.title)}</h2>
          <p class="featured-story-desc">${escapeHtml(featuredStory.summary)}</p>
          <div class="news-card-footer" style="padding-top: 1.25rem;">
            <div class="news-author-date">
              <span><strong>${escapeHtml(featuredStory.author)}</strong></span>
              <span>•</span>
              <span>${escapeHtml(featuredStory.date)}</span>
              <span>•</span>
              <span>${escapeHtml(featuredStory.readTime)}</span>
            </div>
            <span class="btn btn-primary btn-sm">Read Full Analysis &rarr;</span>
          </div>
        </div>
      `;
    }
  }

  // Category Filter Pills
  if (filterContainer) {
    const categories = Array.from(new Set(NEWS_DATA.map(a => a.category)));
    let buttonsHtml = `<button type="button" class="filter-btn active" data-category="all">All News</button>`;
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
      applyNewsFilters();
    });
  }

  // Live News Search
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyNewsFilters();
    });
  }

  function applyNewsFilters() {
    const filtered = NEWS_DATA.filter(article => {
      const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
      const matchesSearch = !searchQuery ||
        (article.title && article.title.toLowerCase().includes(searchQuery)) ||
        (article.summary && article.summary.toLowerCase().includes(searchQuery)) ||
        (article.category && article.category.toLowerCase().includes(searchQuery)) ||
        (article.tags && article.tags.some(t => t.toLowerCase().includes(searchQuery)));
      return matchesCategory && matchesSearch;
    });

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} of ${NEWS_DATA.length} articles`;
    }

    if (filtered.length > 0) {
      newsGrid.innerHTML = filtered.map(createNewsCardHtml).join("");
    } else {
      newsGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <h3>No Tech Articles Found</h3>
          <p>No stories matched your filter criteria. Try searching for Windows 11, SMB, privacy, or security.</p>
        </div>
      `;
    }
  }

  applyNewsFilters();
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
    renderToolNotFound(container, "No tool specified. Please select a utility from our catalog.");
    return;
  }

  const tool = getToolById(toolId);
  if (!tool) {
    renderToolNotFound(container, `We could not find any software tool with the ID "${escapeHtml(toolId)}". It may have been renamed or updated.`);
    return;
  }

  document.title = `${tool.name} — IHSByte Windows Utilities`;

  const isReleased = tool.status === "released" && Boolean(tool.downloadUrl);
  
  const statusBadge = isReleased
    ? `<span class="status-badge released"><span class="dot"></span>Released</span>`
    : `<span class="status-badge coming-soon"><span class="dot"></span>Under Development / Coming Soon</span>`;

  let downloadSectionHtml = "";
  if (isReleased) {
    downloadSectionHtml = `
      <a href="${escapeHtml(tool.downloadUrl)}" class="btn btn-primary" download>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Download Executable (${escapeHtml(tool.fileSize || "125.5 KB")})
      </a>
    `;
  } else {
    downloadSectionHtml = `
      <button class="btn btn-secondary btn-disabled" disabled>
        Download Unavailable (Coming Soon)
      </button>
    `;
  }

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

  let checksumHtml = "";
  if (tool.sha256) {
    checksumHtml = `
      <div class="checksum-box">
        <div class="checksum-header">
          <span>SHA-256 Checksum</span>
          <button type="button" class="btn btn-secondary btn-sm" id="copy-sha-btn" style="padding: 0.2rem 0.5rem; font-size: 0.72rem;">Copy</button>
        </div>
        <div class="checksum-value" id="sha-value-text">${escapeHtml(tool.sha256)}</div>
      </div>
    `;
  }

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

  let changelogHtml = "";
  if (Array.isArray(tool.changelog) && tool.changelog.length > 0) {
    const entries = tool.changelog.map(log => `
      <div class="changelog-entry" style="margin-bottom: 1.5rem;">
        <div style="font-weight: 700; color: var(--text-heading); margin-bottom: 0.4rem;">
          <span>Version ${escapeHtml(log.version)}</span>
          ${log.date ? `<span style="font-weight: normal; color: var(--text-muted); font-size: 0.85rem;">(${escapeHtml(log.date)})</span>` : ""}
        </div>
        <ul class="features-list">
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

  container.innerHTML = `
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
              ${tool.iconUrl ? `<img src="${escapeHtml(tool.iconUrl)}" alt="${escapeHtml(tool.name)} Icon" class="tool-detail-icon">` : ''}
              <div>
                <h1 class="tool-detail-title">${escapeHtml(tool.name)}</h1>
                <div style="margin-top: 0.35rem;">${statusBadge}</div>
              </div>
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

    <div class="container">
      <div class="detail-layout">
        <div class="detail-main-col">
          <section class="detail-section">
            <h2 class="detail-heading">Overview</h2>
            <p style="color: var(--text-main); font-size: 1.05rem; line-height: 1.7;">${escapeHtml(tool.description)}</p>
          </section>

          ${featuresHtml}
          ${changelogHtml}
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
              IHSByte software releases are 100% clean of third-party adware, malware, or intrusive telemetry.
            </p>
            <a href="privacy.html" style="font-size: 0.85rem;">Learn about our privacy and safety standards &rarr;</a>
          </div>

          <div class="sidebar-card">
            <h3 class="sidebar-title">Need Help or Found a Bug?</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;">
              Report issues, request features, or send general feedback directly to the IHSByte team.
            </p>
            <a href="contact.html" class="btn btn-secondary btn-sm" style="width: 100%;">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  `;

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
        <h2 style="font-size: 1.75rem; color: var(--text-heading); margin-bottom: 0.75rem;">Tool Not Found</h2>
        <p style="color: var(--text-muted); margin-bottom: 1.75rem;">${escapeHtml(message)}</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <a href="tools.html" class="btn btn-primary">Browse All Tools</a>
          <a href="index.html" class="btn btn-secondary">Go to Home</a>
        </div>
      </div>
    </div>
  `;

  const copyBtn = document.getElementById("copy-sha-btn");
  if (copyBtn && tool.sha256) {
    copyBtn.addEventListener("click", () => {
      copyToClipboard(tool.sha256, "SHA-256 Checksum copied!");
    });
  }
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
    
    const name = (document.getElementById("contact-name")?.value || "").trim();
    const email = (document.getElementById("contact-email")?.value || "").trim();
    const type = document.getElementById("contact-type")?.value || "general";
    const message = (document.getElementById("contact-message")?.value || "").trim();

    if (!message) {
      showToast("Please enter a message description.");
      return;
    }

    const subject = encodeURIComponent(`[IHSByte Inquiry: ${type.toUpperCase()}] from ${name || "User"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nInquiry Type: ${type}\n\nMessage:\n${message}\n\n---\nSent via IHSByte Website (ihsbyte.com.lk)`);
    const mailtoUrl = `mailto:contact@ihsbyte.com.lk?subject=${subject}&body=${body}`;

    if (noticeBox) {
      noticeBox.innerHTML = `
        <div class="notice-box notice-info" style="margin-bottom: 1.25rem; background: var(--secondary-light); border: 1px solid var(--secondary-border); padding: 1rem; border-radius: var(--radius-md);">
          <strong>Message Prepared:</strong> Opening your default mail client to send to <strong>contact@ihsbyte.com.lk</strong>. 
          If your email app didn't open automatically, <a href="${mailtoUrl}" style="text-decoration: underline; font-weight: 700; color: var(--secondary);">click here to send directly</a>.
        </div>
      `;
    }

    window.location.href = mailtoUrl;
    showToast("Opening email client for contact@ihsbyte.com.lk...");
  });
}
