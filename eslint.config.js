import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";

// ESLint "flat config" (the modern format). It checks JS/TS/Astro files for
// bugs and accessibility issues as we code.
export default tseslint.config(
  { ignores: ["dist/", ".astro/", "node_modules/", "studio/"] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  jsxA11y.flatConfigs.recommended,
);
