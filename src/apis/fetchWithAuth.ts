const BASE = `${process.env.NEXT_PUBLIC_BE_API_URL}${process.env.NEXT_PUBLIC_TEAM_ID}`;

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) throw new Error("refresh failed");

    const data: { accessToken: string; refreshToken: string | null } =
      await res.json();
    localStorage.setItem("accessToken", data.accessToken);
    if (data.refreshToken)
      localStorage.setItem("refreshToken", data.refreshToken);
    return data.accessToken;
  } catch {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null;
  }
}

function withAuth(init: RequestInit, token: string | null): RequestInit {
  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return { ...init, headers };
}

export async function fetchWithAuth(path: string, init: RequestInit = {}) {
  if (typeof window === "undefined") throw new Error("client only");

  const url = `${BASE}${path}`;
  const usedToken = localStorage.getItem("accessToken");
  const res = await fetch(url, withAuth(init, usedToken));
  if (res.status !== 401) return res;

  // 다른 요청이 이미 갱신했으면 그 토큰으로 바로 재시도
  const current = localStorage.getItem("accessToken");
  let newToken: string | null;
  if (current && current !== usedToken) {
    newToken = current;
  } else {
    refreshPromise ??= refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
    newToken = await refreshPromise;
  }

  if (!newToken) return res; // 호출부에서 로그인 페이지로 이동 처리
  return fetch(url, withAuth(init, newToken));
}
