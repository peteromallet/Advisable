module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "eslint-config-prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  globals: {
    process: "readonly",
    global: "readonly",
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    Calendly: "readonly",
    module: "readonly",
  },
  parser: "babel-eslint",
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
  },
};
