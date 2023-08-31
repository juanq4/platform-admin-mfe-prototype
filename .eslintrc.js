module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:security/recommended",
    "plugin:no-unsanitized/DOM",
    "plugin:sonarjs/recommended",
    "plugin:jest-dom/recommended",
    "plugin:testing-library/react",
    "plugin:storybook/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2019,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "prettier",
    "security",
    "sonarjs",
    "jest-dom",
    "testing-library",
    "unused-imports",
  ],
  root: true,
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/explicit-module-boundary-types": ["error"],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
    "@typescript-eslint/no-use-before-define": ["error", { classes: false, functions: false }],
    "import/order": [
      "error",
      {
        "alphabetize": { order: "asc", caseInsensitive: false },
        "groups": ["builtin", "external", "internal", "index", "object", "parent", "sibling", "unknown"],
        "newlines-between": "never",
      },
    ],
    "import/namespace": [2, { allowComputed: true }],
    "import/newline-after-import": ["error", { count: 1 }],
    "import/no-duplicates": ["error", { considerQueryString: true }],
    "import/no-cycle": "error",
    "max-classes-per-file": "off",
    "no-debugger": "warn",
    "no-nested-ternary": ["error"],
    "no-unneeded-ternary": "error",
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
    ],
    "prettier/prettier": ["error"],
    "quotes": ["error", "double", { avoidEscape: true, allowTemplateLiterals: false }],
    "react/prop-types": "warn",
    "react/react-in-jsx-scope": "off", // Not required since React v17
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error",
    "security/detect-non-literal-fs-filename": "off",
    "security/detect-object-injection": "off", // turn back on later
    "sonarjs/cognitive-complexity": "error",
    "unused-imports/no-unused-imports": "error",
  },
  overrides: [
    {
      files: ["**/*.auto.test.ts"],
      rules: {
        "import/namespace": "off",
      },
    },
  ],
  settings: {
    "import/extensions": [".ts", ".tsx"],
    "react": {
      version: "detect",
    },
  },
};
