module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "eslint-config-prettier",
    "plugin:react/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  globals: {
    require: "readonly",
    process: "readonly",
    global: "readonly",
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    Calendly: "readonly",
    module: "readonly",
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["jest", "react", "react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": 0,
    "no-console": ["warn", { allow: ["error", "warn"] }],
  },
};
