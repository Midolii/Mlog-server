module.exports = {
    root: true,
    env: {
        node: true,
        es2021: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:prettier/recommended",
        "prettier",
    ],
    rules: {
        "prettier/prettier": "error",
        // Note: you must disable the base rule as it can report incorrect errors
        "require-await": "off",
        "@typescript-eslint/require-await": "off",
    },
};
