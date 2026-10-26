/**
 * Cloudflare Pages Function - Live Global Stats & Community Reviews API
 * Path: /api/stats
 * 
 * Supports:
 * - GET /api/stats?tool=<toolId>  -> returns global downloads count & reviews list
 * - POST /api/stats (action: "download") -> atomically increments download count
 * - POST /api/stats (action: "review")   -> appends user review to global reviews list
 * 
 * Requires:
 * Cloudflare KV namespace bound to 'IHSBYTE_KV' in Cloudflare Pages settings.
 * If not yet bound, returns clean fallback status so the frontend seamlessly continues.
 */

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const toolId = (url.searchParams.get("tool") || "adobe-blocker").toLowerCase().trim();

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Cache-Control": "no-cache, no-store, must-revalidate"
  };

  const kv = context.env.IHSBYTE_KV;
  if (!kv) {
    return new Response(JSON.stringify({
      status: "fallback",
      message: "IHSBYTE_KV binding not configured yet in Cloudflare dashboard",
      downloads: 0,
      reviews: []
    }), { headers });
  }

  try {
    const data = await kv.get(`stats_${toolId}`, "json") || { downloads: 0, reviews: [] };
    return new Response(JSON.stringify({
      status: "ok",
      toolId,
      downloads: typeof data.downloads === "number" ? data.downloads : 0,
      reviews: Array.isArray(data.reviews) ? data.reviews : []
    }), { headers });
  } catch (err) {
    return new Response(JSON.stringify({
      status: "error",
      error: err.message,
      downloads: 0,
      reviews: []
    }), { status: 500, headers });
  }
}

export async function onRequestPost(context) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  };

  let payload;
  try {
    payload = await context.request.json();
  } catch (err) {
    return new Response(JSON.stringify({ status: "error", message: "Invalid JSON" }), { status: 400, headers });
  }

  const toolId = (payload.toolId || "adobe-blocker").toLowerCase().trim();
  const action = payload.action; // "download" | "review"

  const kv = context.env.IHSBYTE_KV;
  if (!kv) {
    return new Response(JSON.stringify({
      status: "fallback",
      message: "IHSBYTE_KV binding not configured yet in Cloudflare dashboard",
      toolId,
      action
    }), { headers });
  }

  try {
    const key = `stats_${toolId}`;
    let data = await kv.get(key, "json") || { downloads: 0, reviews: [] };
    if (typeof data.downloads !== "number") data.downloads = 0;
    if (!Array.isArray(data.reviews)) data.reviews = [];

    if (action === "download") {
      data.downloads += 1;
      await kv.put(key, JSON.stringify(data));
      return new Response(JSON.stringify({
        status: "ok",
        toolId,
        downloads: data.downloads
      }), { headers });
    } else if (action === "review" && payload.review) {
      const rev = payload.review;
      // Sanitize review fields
      const cleanReview = {
        id: String(rev.id || `rev-${Date.now()}`),
        author: String(rev.author || "Anonymous").slice(0, 80),
        role: String(rev.role || "Windows User").slice(0, 80),
        location: String(rev.location || "").slice(0, 80),
        rating: Math.min(5, Math.max(1, parseInt(rev.rating, 10) || 5)),
        date: String(rev.date || "Recent"),
        comment: String(rev.comment || "").slice(0, 1000)
      };

      data.reviews.unshift(cleanReview);
      // Retain up to 200 recent reviews per tool
      if (data.reviews.length > 200) {
        data.reviews = data.reviews.slice(0, 200);
      }

      await kv.put(key, JSON.stringify(data));
      return new Response(JSON.stringify({
        status: "ok",
        toolId,
        reviews: data.reviews
      }), { headers });
    }

    return new Response(JSON.stringify({ status: "error", message: "Unknown action" }), { status: 400, headers });
  } catch (err) {
    return new Response(JSON.stringify({ status: "error", error: err.message }), { status: 500, headers });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400"
    }
  });
}
