const encoder = new TextEncoder();

const html = (body, status = 200, headers = {}) => new Response(body, {
  status,
  headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", ...headers }
});

const escapeScriptJson = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

async function sign(secret, value) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
  return btoa(String.fromCharCode(...bytes)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) return html("OAuth 환경변수가 설정되지 않았습니다.", 503);

    if (url.pathname === "/auth") {
      const origin = env.ALLOWED_ORIGIN;
      const requestedSite = url.searchParams.get("site_id");
      if (requestedSite) {
        const requestedOrigin = requestedSite.includes("://") ? new URL(requestedSite).origin : `https://${requestedSite}`;
        if (new URL(requestedOrigin).origin !== new URL(origin).origin) return html("허용되지 않은 관리자 출처입니다.", 403);
      }
      const nonce = crypto.randomUUID();
      const state = `${nonce}.${await sign(env.GITHUB_CLIENT_SECRET, `${nonce}|${origin}`)}`;
      const target = new URL("https://github.com/login/oauth/authorize");
      target.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
      target.searchParams.set("scope", "repo,user");
      target.searchParams.set("state", state);
      return Response.redirect(target.toString(), 302);
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state") || "";
      const [nonce, signature] = state.split(".");
      const origin = env.ALLOWED_ORIGIN;
      if (!code || !nonce || signature !== await sign(env.GITHUB_CLIENT_SECRET, `${nonce}|${origin}`)) return html("OAuth state 검증에 실패했습니다.", 400);

      const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { accept: "application/json", "content-type": "application/json", "user-agent": "altibase-union-decap-cms" },
        body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code })
      });
      const result = await tokenResponse.json();
      if (!tokenResponse.ok || !result.access_token) return html("GitHub token 교환에 실패했습니다.", 502);

      const message = `authorization:github:success:${JSON.stringify({ token: result.access_token, provider: "github" })}`;
      return html(`<!doctype html><meta charset="utf-8"><title>로그인 완료</title><script>window.opener.postMessage(${escapeScriptJson(message)}, ${escapeScriptJson(origin)});window.close();<\/script><p>로그인이 완료되었습니다. 창을 닫아도 됩니다.</p>`);
    }

    return new Response("Not found", { status: 404 });
  }
};
