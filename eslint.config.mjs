import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const maxLines = (max) => ({
  "max-lines": ["error", { max, skipBlankLines: true, skipComments: true }],
});

export default defineConfig([
  { ignores: [".claude/**", ".next/**", "out/**", "node_modules/**", "next-env.d.ts"] },
  ...nextVitals,
  ...nextTs,
  { files: ["app/**/*.tsx"], rules: maxLines(120) },
  { files: ["components/**/*.tsx"], rules: maxLines(200) },
  { files: ["content/**/*.ts"], rules: maxLines(300) },
  { files: ["lib/**/*.ts"], rules: maxLines(80) },
  { files: ["lib/types/**/*.ts"], rules: maxLines(200) },
  { files: ["lib/hooks/**/*.ts"], rules: maxLines(40) },
]);
