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
 * Download Counter & LocalStorage Tracking
 */
function formatNumber(num) {
  return Number(num || 0).toLocaleString();
}

function getToolDownloads(toolId) {
  if (typeof getToolById !== "function") return 0;
  const tool = getToolById(toolId);
  const base = tool && typeof tool.downloads === "number" ? tool.downloads : 0;
  const localExtra = parseInt(localStorage.getItem(`ihsbyte_user_dl_${toolId}`) || "0", 10);
  return base + (isNaN(localExtra) ? 0 : localExtra);
}

function incrementToolDownload(toolId) {
  const currentExtra = parseInt(localStorage.getItem(`ihsbyte_user_dl_${toolId}`) || "0", 10);
  const nextExtra = (isNaN(currentExtra) ? 0 : currentExtra) + 1;
  localStorage.setItem(`ihsbyte_user_dl_${toolId}`, nextExtra);
  
  const total = getToolDownloads(toolId);
  
  // Dynamically update on-screen elements
  document.querySelectorAll(`.dl-count-${toolId}`).forEach(el => {
    el.textContent = formatNumber(total);
  });
  
  return total;
}

window.handleDownloadAction = function(toolId, event) {
  const total = incrementToolDownload(toolId);
  const tool = typeof getToolById === "function" ? getToolById(toolId) : null;
  const name = tool ? tool.name : "Utility";
  showToast(`🎉 Download started! ${name} (Total: ${formatNumber(total)})`);
};

/**
 * Star Rating & Community Reviews Management
 */
function getToolRatingData(toolId) {
  if (typeof getToolById !== "function") return { average: 0, count: 0, reviews: [], breakdown: {5:0,4:0,3:0,2:0,1:0} };
  const tool = getToolById(toolId);
  if (!tool) return { average: 0, count: 0, reviews: [], breakdown: {5:0,4:0,3:0,2:0,1:0} };

  const baseReviews = Array.isArray(tool.reviews) ? [...tool.reviews] : [];
  let userReviews = [];
  try {
    const raw = localStorage.getItem(`ihsbyte_user_revs_${toolId}`);
    if (raw) userReviews = JSON.parse(raw);
  } catch (e) {}

  const allReviews = [...userReviews, ...baseReviews];
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;

  if (allReviews.length > 0) {
    allReviews.forEach(r => {
      const score = Math.min(5, Math.max(1, parseInt(r.rating, 10) || 5));
      breakdown[score] = (breakdown[score] || 0) + 1;
      sum += score;
    });
    const avg = sum / allReviews.length;
    return {
      average: Math.round(avg * 10) / 10,
      count: allReviews.length,
      reviews: allReviews,
      breakdown
    };
  } else {
    return {
      average: 0,
      count: 0,
      reviews: [],
      breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }
}

function renderStarsHtml(rating, maxStars = 5) {
  if (!rating || rating === 0) {
    return `<span class="tool-stars-gold" style="opacity: 0.65; letter-spacing: 0px;">☆☆☆☆☆</span>`;
  }
  let stars = "";
  const rounded = Math.round(rating * 2) / 2;
  for (let i = 1; i <= maxStars; i++) {
    if (i <= rounded) {
      stars += "★";
    } else {
      stars += "☆";
    }
  }
  return `<span class="tool-stars-gold">${stars}</span>`;
}

/**
 * Render Tool Card Component
 */
function createToolCardHtml(tool) {
  const isReleased = tool.status === "released" && Boolean(tool.downloadUrl);
  const statusBadge = isReleased
    ? `<span class="status-badge released"><span class="dot"></span>${escapeHtml(tool.version || "Released")}</span>`
    : `<span class="status-badge coming-soon"><span class="dot"></span>Coming Soon</span>`;

  const downloads = getToolDownloads(tool.id);
  const ratingData = getToolRatingData(tool.id);

  const downloadBtn = isReleased
    ? `<a href="${escapeHtml(tool.downloadUrl)}" class="btn btn-primary btn-sm" download onclick="handleDownloadAction('${escapeHtml(tool.id)}', event)">
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

  const dlDisplay = isReleased 
    ? `<span class="tool-stat-downloads" title="Total downloads">
         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
         <span class="dl-count-${escapeHtml(tool.id)}">${formatNumber(downloads)}</span>
       </span>`
    : `<span class="tool-stat-downloads" style="color: var(--text-light); font-weight: 500;">Coming Soon</span>`;

  const ratingHtml = ratingData.count > 0
    ? `<div class="tool-stat-rating">
         ${renderStarsHtml(ratingData.average)}
         <span>${ratingData.average.toFixed(1)}</span>
         <span class="tool-stat-count">(${ratingData.count})</span>
       </div>`
    : `<div class="tool-stat-rating" title="No reviews yet">
         ${renderStarsHtml(0)}
         <span class="tool-stat-count">New (0)</span>
       </div>`;

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
      <div class="tool-card-stats">
        ${ratingHtml}
        ${dlDisplay}
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
 * Render Tech News Card Component with Image
 */
function createNewsCardHtml(article) {
  const sourceLabel = article.source || article.author || "IHSByte Desk";
  const locationBadge = article.location 
    ? `<div class="news-location-tag" style="font-size: 0.78rem; color: var(--text-light); margin-top: 0.25rem;">📍 ${escapeHtml(article.location)}</div>`
    : "";

  const imageHtml = article.imageUrl ? `
    <div class="news-card-img-wrap">
      <img src="${escapeHtml(article.imageUrl)}" alt="${escapeHtml(article.title)}" class="news-card-img" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80';">
    </div>
  ` : "";

  return `
    <article class="news-card" onclick="openArticleModal('${escapeHtml(article.id)}')">
      ${imageHtml}
      <div class="news-card-header">
        <span class="news-category-badge">${escapeHtml(article.category)}</span>
        <span class="news-read-time">${escapeHtml(article.readTime)}</span>
      </div>
      <h3 class="news-card-title">${escapeHtml(article.title)}</h3>
      <p class="news-card-summary">${escapeHtml(article.summary)}</p>
      <div class="news-card-footer" style="align-items: flex-start;">
        <div class="news-author-date">
          <div>
            <div style="font-weight: 600; color: var(--text-heading); font-size: 0.85rem;">
              📅 ${escapeHtml(article.date)}
            </div>
            <div style="font-size: 0.8rem; color: var(--secondary); font-weight: 500; margin-top: 0.15rem;">
              🏢 ${escapeHtml(sourceLabel)}
            </div>
            ${locationBadge}
          </div>
        </div>
        <span class="news-read-action" style="margin-top: 0.25rem;">
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

  const heroImageHtml = article.imageUrl ? `
    <div class="modal-article-hero">
      <img src="${escapeHtml(article.imageUrl)}" alt="${escapeHtml(article.title)}" class="modal-article-img" onerror="this.parentElement.style.display='none';">
    </div>
  ` : "";

  contentContainer.innerHTML = `
    ${heroImageHtml}
    <div class="news-card-header" style="margin-bottom: 0.75rem;">
      <span class="news-category-badge">${escapeHtml(article.category)}</span>
      <span class="news-read-time">${escapeHtml(article.readTime)}</span>
    </div>
    <h1 style="font-size: clamp(1.6rem, 3.2vw, 2.3rem); font-weight: 850; line-height: 1.25; color: var(--text-heading); margin-bottom: 0.75rem;">
      ${escapeHtml(article.title)}
    </h1>
    <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.45rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1.25rem;">
      <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
        <span>📅 Published Date: <strong>${escapeHtml(article.date)}</strong></span>
        <span>•</span>
        <span>⏱️ Read Time: <strong>${escapeHtml(article.readTime)}</strong></span>
      </div>
      <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; font-size: 0.88rem; color: var(--text-light);">
        <span>🏢 Original Source / Owner: <strong style="color: var(--secondary);">${escapeHtml(article.source || article.author)}</strong></span>
        ${article.location ? `<span>•</span><span>📍 Origin Location: <strong style="color: var(--text-heading);">${escapeHtml(article.location)}</strong></span>` : ''}
      </div>
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
          <div class="featured-story-grid">
            <div class="featured-story-content">
              <div class="featured-badge">
                <span class="pulse-dot"></span>
                Featured Analysis
              </div>
              <h2 class="featured-story-title">${escapeHtml(featuredStory.title)}</h2>
              <p class="featured-story-desc">${escapeHtml(featuredStory.summary)}</p>
              <div class="news-card-footer" style="padding-top: 1.25rem; align-items: flex-end; flex-wrap: wrap; gap: 1rem; border-top: none;">
                <div class="news-author-date">
                  <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap; font-size: 0.9rem;">
                    <span>📅 <strong>${escapeHtml(featuredStory.date)}</strong></span>
                    <span>•</span>
                    <span>🏢 Source: <strong style="color: var(--secondary);">${escapeHtml(featuredStory.source || featuredStory.author)}</strong></span>
                    <span>•</span>
                    <span>⏱️ ${escapeHtml(featuredStory.readTime)}</span>
                  </div>
                  ${featuredStory.location ? `<div style="font-size: 0.82rem; color: var(--text-light); margin-top: 0.35rem;">📍 Origin Location: <strong style="color: var(--text-heading);">${escapeHtml(featuredStory.location)}</strong></div>` : ''}
                </div>
                <span class="btn btn-primary btn-sm">Read Full Analysis &rarr;</span>
              </div>
            </div>
            ${featuredStory.imageUrl ? `
              <div class="featured-story-media">
                <img src="${escapeHtml(featuredStory.imageUrl)}" alt="${escapeHtml(featuredStory.title)}" class="featured-story-img" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80';">
              </div>
            ` : ''}
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
  const downloads = getToolDownloads(tool.id);
  const ratingData = getToolRatingData(tool.id);
  
  const statusBadge = isReleased
    ? `<span class="status-badge released"><span class="dot"></span>Released</span>`
    : `<span class="status-badge coming-soon"><span class="dot"></span>Under Development / Coming Soon</span>`;

  let downloadSectionHtml = "";
  if (isReleased) {
    const directExeBtn = tool.directExeUrl ? `
      <a href="${escapeHtml(tool.directExeUrl)}" class="btn btn-secondary" download onclick="handleDownloadAction('${escapeHtml(tool.id)}', event)" title="Direct Standalone Executable">
        Direct .EXE (125.5 KB)
      </a>
    ` : "";

    downloadSectionHtml = `
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <a href="${escapeHtml(tool.downloadUrl)}" class="btn btn-primary" download onclick="handleDownloadAction('${escapeHtml(tool.id)}', event)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Package (${escapeHtml(tool.fileSize || "ZIP")})
        </a>
        ${directExeBtn}
      </div>
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
  if (isReleased) {
    metaListHtml += `<div class="meta-box-item"><span class="meta-box-label">Downloads</span><span class="meta-box-val"><strong class="dl-count-${escapeHtml(tool.id)}">${formatNumber(downloads)}</strong></span></div>`;
  }
  const ratingMetaText = ratingData.count > 0 
    ? `★ ${ratingData.average.toFixed(1)} (${ratingData.count} reviews)` 
    : `Unrated (0 reviews)`;
  metaListHtml += `<div class="meta-box-item"><span class="meta-box-label">Rating</span><span class="meta-box-val">${ratingMetaText}</span></div>`;
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

  // Calculate Breakdown Percentages
  const totalReviewsCount = Math.max(1, ratingData.count);
  const bar5 = ratingData.count > 0 ? Math.round(((ratingData.breakdown[5] || 0) / totalReviewsCount) * 100) : 0;
  const bar4 = ratingData.count > 0 ? Math.round(((ratingData.breakdown[4] || 0) / totalReviewsCount) * 100) : 0;
  const bar3 = ratingData.count > 0 ? Math.round(((ratingData.breakdown[3] || 0) / totalReviewsCount) * 100) : 0;
  const bar2 = ratingData.count > 0 ? Math.round(((ratingData.breakdown[2] || 0) / totalReviewsCount) * 100) : 0;
  const bar1 = ratingData.count > 0 ? Math.round(((ratingData.breakdown[1] || 0) / totalReviewsCount) * 100) : 0;

  // Reviews List HTML
  let reviewsListHtml = "";
  if (ratingData.reviews && ratingData.reviews.length > 0) {
    reviewsListHtml = ratingData.reviews.map(r => `
      <div class="review-card">
        <div class="review-card-header">
          <div class="review-user-info">
            <div class="review-user-avatar">${escapeHtml((r.author || "U").charAt(0).toUpperCase())}</div>
            <div>
              <div class="review-user-name">
                ${escapeHtml(r.author || "Anonymous User")}
                <span class="verified-badge">✓ Verified</span>
              </div>
              <div class="review-user-role">
                ${escapeHtml(r.role || "Windows User")} ${r.location ? `• ${escapeHtml(r.location)}` : ''}
              </div>
            </div>
          </div>
          <div>
            <div class="review-stars">${renderStarsHtml(r.rating)}</div>
            <div class="review-date">${escapeHtml(r.date || "Recent")}</div>
          </div>
        </div>
        <p class="review-comment">${escapeHtml(r.comment)}</p>
      </div>
    `).join("");
  } else {
    reviewsListHtml = `
      <div class="empty-state" style="grid-column: 1 / -1; padding: 2.5rem 1.5rem; text-align: center; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">💬</div>
        <h4 style="font-size: 1.15rem; color: var(--text-heading); margin-bottom: 0.35rem; font-weight: 750;">No Community Reviews Yet</h4>
        <p style="font-size: 0.92rem; color: var(--text-muted); max-width: 500px; margin: 0 auto;">Be the first Windows user to test ${escapeHtml(tool.name)} and share your feedback below!</p>
      </div>
    `;
  }

  const liveRatingPillHtml = ratingData.count > 0
    ? `<span class="live-rating-pill">★ <span>${ratingData.average.toFixed(1)}</span> / 5.0 (${ratingData.count} reviews)</span>`
    : `<span class="live-rating-pill" style="color: var(--text-muted); background: var(--bg-subtle); border-color: var(--border-color);">★ Unrated (0 reviews)</span>`;

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
                <div class="tool-detail-badge-group">
                  ${statusBadge}
                  ${isReleased ? `
                    <span class="live-dl-badge">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      <span class="dl-count-${escapeHtml(tool.id)}">${formatNumber(downloads)}</span> Downloads
                    </span>
                  ` : ''}
                  ${liveRatingPillHtml}
                </div>
              </div>
            </div>
            <p class="tool-detail-summary">${escapeHtml(tool.shortDescription || tool.description)}</p>
            <div class="tool-detail-actions">
              ${downloadSectionHtml}
              <a href="#reviews-section" class="btn btn-secondary">
                ★ Reviews &amp; Feedback
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

          <!-- Rating & Feedback Section -->
          <section class="reviews-section" id="reviews-section">
            <h2 class="detail-heading" style="margin-bottom: 1.5rem;">User Ratings &amp; Verified Reviews</h2>
            
            <div class="rating-overview-card">
              <div class="rating-score-block">
                <div class="rating-big-num">${ratingData.count > 0 ? ratingData.average.toFixed(1) : "0.0"}</div>
                <div class="rating-big-stars">${renderStarsHtml(ratingData.average)}</div>
                <div class="rating-total-label">${ratingData.count > 0 ? `Based on ${ratingData.count} user reviews` : "No community reviews yet"}</div>
              </div>

              <div class="rating-bars-stack">
                <div class="rating-bar-row">
                  <span class="rating-bar-label">5 ★</span>
                  <div class="rating-bar-track"><div class="rating-bar-fill" style="width: ${bar5}%;"></div></div>
                  <span class="rating-bar-count">${ratingData.breakdown[5] || 0}</span>
                </div>
                <div class="rating-bar-row">
                  <span class="rating-bar-label">4 ★</span>
                  <div class="rating-bar-track"><div class="rating-bar-fill" style="width: ${bar4}%;"></div></div>
                  <span class="rating-bar-count">${ratingData.breakdown[4] || 0}</span>
                </div>
                <div class="rating-bar-row">
                  <span class="rating-bar-label">3 ★</span>
                  <div class="rating-bar-track"><div class="rating-bar-fill" style="width: ${bar3}%;"></div></div>
                  <span class="rating-bar-count">${ratingData.breakdown[3] || 0}</span>
                </div>
                <div class="rating-bar-row">
                  <span class="rating-bar-label">2 ★</span>
                  <div class="rating-bar-track"><div class="rating-bar-fill" style="width: ${bar2}%;"></div></div>
                  <span class="rating-bar-count">${ratingData.breakdown[2] || 0}</span>
                </div>
                <div class="rating-bar-row">
                  <span class="rating-bar-label">1 ★</span>
                  <div class="rating-bar-track"><div class="rating-bar-fill" style="width: ${bar1}%;"></div></div>
                  <span class="rating-bar-count">${ratingData.breakdown[1] || 0}</span>
                </div>
              </div>

              <div class="dl-metric-box">
                <div class="dl-metric-num dl-count-${escapeHtml(tool.id)}">${formatNumber(downloads)}</div>
                <div class="dl-metric-text">Total Downloads</div>
                <div style="font-size: 0.75rem; color: #10B981; font-weight: 700; margin-top: 0.4rem;">
                  ✓ Clean &amp; Tested
                </div>
              </div>
            </div>

            <!-- Community Reviews Grid -->
            <h3 style="font-size: 1.25rem; font-weight: 750; color: var(--text-heading); margin-bottom: 1.25rem;">
              Community Feedback (${ratingData.count})
            </h3>
            <div class="reviews-grid-layout" id="reviews-grid-container">
              ${reviewsListHtml}
            </div>

            <!-- Interactive Feedback Submission Form -->
            <div class="feedback-form-card" id="leave-review-card">
              <h3>Leave Your Rating &amp; Feedback</h3>
              <p>Share your experience using ${escapeHtml(tool.name)}. Your feedback helps fellow Windows users and powers our development updates.</p>

              <form id="tool-feedback-form">
                <div class="interactive-stars-wrap">
                  <span style="font-size: 0.9rem; font-weight: 650; color: var(--text-heading);">Your Rating:</span>
                  <div class="interactive-stars-group" id="interactive-star-group">
                    <button type="button" class="star-rating-btn active" data-rating="1" aria-label="1 star">★</button>
                    <button type="button" class="star-rating-btn active" data-rating="2" aria-label="2 stars">★</button>
                    <button type="button" class="star-rating-btn active" data-rating="3" aria-label="3 stars">★</button>
                    <button type="button" class="star-rating-btn active" data-rating="4" aria-label="4 stars">★</button>
                    <button type="button" class="star-rating-btn active" data-rating="5" aria-label="5 stars">★</button>
                  </div>
                  <span class="star-rating-label" id="star-score-text">5.0 / 5 (Excellent)</span>
                </div>

                <div class="form-row-dual">
                  <div class="form-group">
                    <label for="review-user-name" class="form-label">Your Name <span style="color: #EF4444;">*</span></label>
                    <input type="text" id="review-user-name" class="form-input" placeholder="e.g. Ruwan Senaratne" required autocomplete="name">
                  </div>
                  <div class="form-group">
                    <label for="review-user-role" class="form-label">Your Profession or Workstation (Optional)</label>
                    <input type="text" id="review-user-role" class="form-input" placeholder="e.g. Video Editor / IT Admin">
                  </div>
                </div>

                <div class="form-group" style="margin-bottom: 1.25rem;">
                  <label for="review-user-location" class="form-label">Location (Optional)</label>
                  <input type="text" id="review-user-location" class="form-input" placeholder="e.g. Colombo, Sri Lanka">
                </div>

                <div class="form-group" style="margin-bottom: 1.5rem;">
                  <label for="review-user-comment" class="form-label">Feedback &amp; Experience Details <span style="color: #EF4444;">*</span></label>
                  <textarea id="review-user-comment" class="form-textarea" rows="4" placeholder="How did this utility perform on your Windows PC? Any suggestions or features you'd like to see?" required></textarea>
                </div>

                <button type="submit" class="btn btn-primary" id="submit-review-btn">
                  Submit Review &amp; Feedback
                </button>
              </form>
            </div>
          </section>
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

          <div class="sidebar-card" style="border-left: 3px solid var(--secondary);">
            <h3 class="sidebar-title" style="display: flex; align-items: center; gap: 0.4rem;">
              🛡️ SmartScreen / Browser Note
            </h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 0.65rem;">
              Because Adobe Blocker is an independent, new utility modifying Windows Firewall rules without an enterprise Code Signing Certificate, Chrome or Windows SmartScreen may show an "Unrecognized / Unknown Publisher" prompt.
            </p>
            <div style="font-size: 0.84rem; background: var(--bg-subtle); padding: 0.65rem 0.85rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); color: var(--text-heading); font-weight: 550;">
              <strong>To Run:</strong> Click <em>"More info"</em> &rarr; then click <em>"Run anyway"</em>.
            </div>
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

  // Checksum Copy Event
  const copyBtn = document.getElementById("copy-sha-btn");
  if (copyBtn && tool.sha256) {
    copyBtn.addEventListener("click", () => {
      copyToClipboard(tool.sha256, "SHA-256 Checksum copied!");
    });
  }

  // Interactive Star Rating Logic
  let selectedRating = 5;
  const starButtons = document.querySelectorAll("#interactive-star-group .star-rating-btn");
  const starScoreText = document.getElementById("star-score-text");
  const ratingLabels = {
    1: "1.0 / 5 (Needs Work)",
    2: "2.0 / 5 (Fair)",
    3: "3.0 / 5 (Good)",
    4: "4.0 / 5 (Very Good)",
    5: "5.0 / 5 (Excellent)"
  };

  function updateStarUi(rating) {
    starButtons.forEach(btn => {
      const val = parseInt(btn.getAttribute("data-rating"), 10);
      if (val <= rating) {
        btn.classList.add("active");
        btn.textContent = "★";
      } else {
        btn.classList.remove("active");
        btn.textContent = "☆";
      }
    });
    if (starScoreText) {
      starScoreText.textContent = ratingLabels[rating] || `${rating}.0 / 5`;
    }
  }

  starButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      selectedRating = parseInt(btn.getAttribute("data-rating"), 10);
      updateStarUi(selectedRating);
    });

    btn.addEventListener("mouseenter", () => {
      const hoverVal = parseInt(btn.getAttribute("data-rating"), 10);
      updateStarUi(hoverVal);
    });
  });

  const starGroup = document.getElementById("interactive-star-group");
  if (starGroup) {
    starGroup.addEventListener("mouseleave", () => {
      updateStarUi(selectedRating);
    });
  }

  // Review Form Submission Handler
  const feedbackForm = document.getElementById("tool-feedback-form");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("review-user-name");
      const roleInput = document.getElementById("review-user-role");
      const locInput = document.getElementById("review-user-location");
      const commentInput = document.getElementById("review-user-comment");

      const author = (nameInput?.value || "").trim();
      const role = (roleInput?.value || "").trim() || "Windows User";
      const location = (locInput?.value || "").trim();
      const comment = (commentInput?.value || "").trim();

      if (!author || !comment) {
        showToast("Please fill in your name and comments.");
        return;
      }

      const todayStr = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(new Date());

      const newReview = {
        id: `rev-user-${Date.now()}`,
        author,
        role,
        location,
        rating: selectedRating,
        date: todayStr,
        comment
      };

      // Store in LocalStorage
      let existing = [];
      try {
        const raw = localStorage.getItem(`ihsbyte_user_revs_${tool.id}`);
        if (raw) existing = JSON.parse(raw);
      } catch (err) {}
      
      existing.unshift(newReview);
      localStorage.setItem(`ihsbyte_user_revs_${tool.id}`, JSON.stringify(existing));

      showToast("🌟 Thank you! Your review has been published.");

      // Re-render tool details page with updated reviews
      initToolDetailsPage();

      // Smooth scroll back to reviews section
      const revSec = document.getElementById("reviews-section");
      if (revSec) {
        revSec.scrollIntoView({ behavior: "smooth" });
      }
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
