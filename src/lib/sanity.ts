import { createClient } from "@sanity/client";

/**
 * Single shared Sanity client. Astro pages call this at BUILD time to pull
 * products/drops from the CMS and turn them into static HTML. Values come from
 * environment variables (see .env.example) so we never hard-code project IDs.
 */
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION ?? "2025-01-01",
  // No CDN at build time so we always fetch the freshest content.
  useCdn: false,
});
