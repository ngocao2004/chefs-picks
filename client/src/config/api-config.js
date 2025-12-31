// Normalize `VITE_API_URL` coming from environment and provide a safe
// fallback for local development. If `VITE_API_URL` is not set in a
// production environment we intentionally log an error so the deploy owner
// notices and fixes the Vercel env variable (otherwise requests will fail
// or attempt to call localhost from the hosted client).
const raw = import.meta.env.VITE_API_URL;
let BASE_URL = null;

if (typeof raw === "string" && raw.trim() && raw !== "undefined") {
  BASE_URL = raw.replace(/\/+$/, "");
} else if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  // Local dev fallback
  BASE_URL = "http://localhost:5000";
} else {
  // Production but VITE_API_URL not provided — log clearly for debugging.
  // Leaving BASE_URL=null will make API_BASE_URL be '/api' which will fail
  // fast and show console output; this nudges the deployer to configure env.
  // (Do NOT put production secrets here.)
  // eslint-disable-next-line no-console
  console.error(
    "VITE_API_URL is not set. Please set VITE_API_URL to your server URL in Vercel environment variables."
  );
}

export const API_BASE_URL = BASE_URL ? `${BASE_URL}/api` : `/api`;
