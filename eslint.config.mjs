import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
// eslint-plugin-tailwindcss が Tailwind CSS のversion4に対応していないため、
// 以下の２つのパッケージを使用して、ESlint が Tailwind CSS を静的解析できるようにする。
import eslintParserTypeScript from '@typescript-eslint/parser';
import eslintPluginReadableTailwind from 'eslint-plugin-readable-tailwind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),

  // TypeScript用のパーサー設定
  {
    files: ['**/*.{ts,tsx,cts,mts}'],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        project: true,
      },
    },
  },

  // JSXに対するTailwind系のルール設定
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'readable-tailwind': eslintPluginReadableTailwind,
    },
    rules: {
      // Tailwindの推奨ルールを全て適用（行の分割・不要な空白の削除・クラスのソート・重複クラスの削除）
      ...eslintPluginReadableTailwind.configs.warning.rules,
      ...eslintPluginReadableTailwind.configs.error.rules,

      // prettierのルールの１つである１行の最大文字数に合わせるためにルールを上書き
      'readable-tailwind/multiline': ['warn', { printWidth: 90 }],
    },
  },
];

export default eslintConfig;
