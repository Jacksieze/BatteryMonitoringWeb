module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "react-app",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react-hooks/exhaustive-deps": "off", // useEffect의 deps를 검사하지 않음
    "import/no-anonymous-default-export": [
      "error",
      {
        allowArray: false,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowCallExpression: true, // The true value here is for backward compatibility
        allowNew: false,
        allowLiteral: false,
        allowObject: false,
      },
    ],
    indent: ["error", 2], // 들여쓰기 2칸
    semi: ["error", "always"], // 세미콜론 항상 사용
    quotes: ["error", "double"], // 문자열은 따옴표로
    "no-unused-vars": "warn", // 사용안한 변수는 경고
    "no-console": "off", // console.log 사용가능
    eqeqeq: "error", // === 사용
  },
};
