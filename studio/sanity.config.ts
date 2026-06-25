import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

// projectId comes from studio/.env (SANITY_STUDIO_PROJECT_ID). After you create
// a free project at sanity.io/manage, copy its id into studio/.env.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "REPLACE_ME";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "default",
  title: "B-BUCKETS",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
