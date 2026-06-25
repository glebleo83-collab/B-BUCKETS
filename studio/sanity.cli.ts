import { defineCliConfig } from "sanity/cli";

// Used by the `sanity` command line tool (e.g. `npx sanity deploy`).
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  },
  // Studio will live at https://b-buckets.sanity.studio after `sanity deploy`.
  studioHost: "b-buckets",
  autoUpdates: true,
});
