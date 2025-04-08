import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
// eslint-plugin-tailwindcss が Tailwind CSS のversion4に対応していないため、
// 以下の２つのパッケージを使用して、ESlint が Tailwind CSS を静的解析できるようにする。
import eslintParserTypeScript from '@typescript-eslint/parser';
import eslintPluginReadableTailwind from 'eslint-plugin-readable-tailwind';
// import文の順序の整列
import importPlugin from 'eslint-plugin-import';
// 未使用のimport文の削除
import unusedImports from 'eslint-plugin-unused-imports';

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
    rules: {
    // eslint-plugin-unused-importsを使用するため、無効化
    '@typescript-eslint/no-unused-vars': 'off',
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

      // 行の分割時に{``}で分割整形されるのを防ぐために、readable-tailwindでの分割整形を無効化
      'readable-tailwind/multiline': 'off',
    },
  },
  
  // eslint-plugin-importに関する設定
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always', // import groups １行空ける
          pathGroups: [
            { pattern: 'src/components/**', group: 'internal', position: 'before' },
            { pattern: 'src/lib/**', group: 'internal', position: 'before' },
          ],
        },
      ],
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
    },
  },

  // eslint-plugin-unused-importsに関する設定
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
    },
  },
];

export default eslintConfig;
