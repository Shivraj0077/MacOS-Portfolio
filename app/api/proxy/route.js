export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new Response("Missing url parameter", { status: 400 });
  }

  // Prepend https:// if protocol is missing
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = "https://" + targetUrl;
  }

  try {
    const urlObj = new URL(targetUrl);
    const origin = urlObj.origin;
    const path = urlObj.pathname;

    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Sec-Ch-Ua": '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Linux"',
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "cross-site",
        "Upgrade-Insecure-Requests": "1",
      },
      redirect: "follow",
    });

    // If Cloudflare or site blocks server-side scraper with 403 / 503 protection
    if (!response.ok) {
      const errorHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Website Notice</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; text-align: center; }
            .card { background: #1e293b; border: 1px solid #334155; padding: 32px; rounded-radius: 16px; border-radius: 16px; max-width: 480px; width: 100%; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3); }
            h2 { margin-top: 0; color: #38bdf8; font-size: 20px; }
            p { color: #94a3b8; font-size: 14px; line-height: 1.6; }
            .url { background: #0f172a; padding: 8px 12px; border-radius: 8px; font-family: monospace; color: #e2e8f0; font-size: 12px; word-break: break-all; margin: 12px 0; }
            .btn { display: inline-flex; align-items: center; justify-content: center; background: #0284c7; color: white; padding: 12px 20px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px; margin-top: 16px; transition: background 0.2s; }
            .btn:hover { background: #0369a1; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>Website Security Notice</h2>
            <p><strong>${targetUrl}</strong> enforces strict bot/Cloudflare security protection (${response.status} ${response.statusText}).</p>
            <div class="url">${targetUrl}</div>
            <p>Click below to open the official website directly in your browser:</p>
            <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="btn">Open Original Site ↗</a>
          </div>
        </body>
        </html>
      `;
      return new Response(errorHtml, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("text/html")) {
      let html = await response.text();

      // Base tag to resolve relative paths for CSS, JS, images, etc.
      const baseTag = `<base href="${origin}${path.endsWith("/") ? path : path + "/"}">`;
      
      // Script to intercept link clicks and communicate navigation to Safari UI
      const scriptTag = `
        <script>
          (function() {
            document.addEventListener('click', function(e) {
              var a = e.target.closest('a');
              if (a && a.href) {
                var href = a.href;
                // If it's a real link, communicate to parent Safari component
                if (href.startsWith('http://') || href.startsWith('https://')) {
                  try {
                    if (window.parent && window.parent !== window) {
                      window.parent.postMessage({ type: 'SAFARI_NAVIGATE', url: href }, '*');
                    }
                  } catch(err) {}
                }
              }
            }, true);
          })();
        </script>
      `;

      if (html.includes("<head>")) {
        html = html.replace("<head>", `<head>${baseTag}`);
      } else if (html.includes("<HEAD>")) {
        html = html.replace("<HEAD>", `<HEAD>${baseTag}`);
      } else {
        html = baseTag + html;
      }

      if (html.includes("</body>")) {
        html = html.replace("</body>", `${scriptTag}</body>`);
      } else {
        html = html + scriptTag;
      }

      const headers = new Headers();
      headers.set("Content-Type", "text/html; charset=utf-8");
      headers.set("Access-Control-Allow-Origin", "*");

      return new Response(html, {
        status: 200,
        headers,
      });
    }

    // Pass through non-HTML resources
    const buffer = await response.arrayBuffer();
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Access-Control-Allow-Origin", "*");

    return new Response(buffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    const errorHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Navigation Error</title>
        <style>
          body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 20px; text-align: center; }
          .card { background: #1e293b; border: 1px solid #334155; padding: 32px; border-radius: 16px; max-width: 480px; width: 100%; }
          .btn { display: inline-block; background: #0284c7; color: white; padding: 12px 20px; border-radius: 10px; text-decoration: none; font-weight: 600; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2 style="color: #ef4444;">Unable to Load Page</h2>
          <p>Error: ${error.message}</p>
          <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="btn">Open Direct Link ↗</a>
        </div>
      </body>
      </html>
    `;
    return new Response(errorHtml, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
}
