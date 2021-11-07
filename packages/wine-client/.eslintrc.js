module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],

  rules: {
    "no-param-reassign": 1,
    "no-nested-ternary": 1,
    "react/prop-types": 1,
    "react/jsx-props-no-spreading": 1,
    "react/forbid-prop-types": 1,
    "react/require-default-props": 1,
    "jsx-a11y/control-has-associated-label": 1,
    "jsx-a11y/click-events-have-key-events": 1,
    "jsx-a11y/no-static-element-interactions": 1,
    "jsx-a11y/no-noninteractive-element-interactions": 1,
  },
};
