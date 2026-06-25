/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /** Sanity project id (from sanity.io/manage). */
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  /** Sanity dataset, e.g. "production". */
  readonly PUBLIC_SANITY_DATASET: string;
  /** Sanity API version date, e.g. "2025-01-01". */
  readonly PUBLIC_SANITY_API_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
