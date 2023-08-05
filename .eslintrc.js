module.exports = {
  extends: ["next/core-web-vitals", "plugin:react/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ["node_modules", "dist"],
  plugins: [
    "@typescript-eslint",
    "import",
    "unused-imports",
    "react-hooks",
    "unused-imports",
  ],
  rules: {
    "unused-imports/no-unused-imports-ts": "error",
    "react/react-in-jsx-scope": "off",
    "unused-imports/no-unused-imports-ts": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
