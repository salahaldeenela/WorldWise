import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: { version: "detect" }, // Automatically detect React version
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules, // Add accessibility rules

      "react/jsx-no-target-blank": "off", // Example rule from your config
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Additional Rules to Match Create React App Behavior
      "no-unused-vars": "warn", // Highlight unused variables as warnings
      "no-console": "warn", // Highlight console logs as warnings
    },
  },
];
