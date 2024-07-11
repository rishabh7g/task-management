module.exports = {
  ignorePatterns: ["!.*", "build", "node_modules"],
  env: {
    browser: true,
    amd: true,
    node: true,
    es2021: true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": "node",
  },
  extends: [],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: [],
  rules: {},
};
