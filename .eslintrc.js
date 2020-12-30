module.exports = {
  root: true,
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/jsx-filename-extension": [
      "error",
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "import/extensions": ["off"],
    "import/no-unresolved": ["off"],
    "no-console": "off",
    "no-unused-vars": "off",
    "react/jsx-props-no-spreading": "off",
    "no-underscore-dangle": "off",
    "react/prop-types": "off",
    "import/prefer-default-export": "off",
    "react/jsx-closing-bracket-location": "off",
    "no-shadow": "off",
    "no-param-reassign": "off",
    "react/jsx-wrap-multilines": "off",
  },
}
