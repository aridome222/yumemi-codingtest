# ゆめみ フロントエンドコーディングテスト 回答リポジトリ

本リポジトリは、株式会社ゆめみ様のフロントエンドコーディングテストの課題に対する回答実装です。

---

## 📝 課題内容

> 都道府県別の総人口推移グラフを表示する SPA（Single Page Application）を構築せよ。

[課題詳細はこちら](https://yumemi.notion.site/0e9ef27b55704d7882aab55cc86c999d)

---

## 🔗 デプロイ先

[yumemi-codingtest-beta.vercel.app](yumemi-codingtest-beta.vercel.app)

> Vercel によって継続的にデプロイされています。

---

## 🛠️ 使用技術

### フレームワーク
- Next.js 15.2.4（App Router / サーバーコンポーネント対応）
- React ^19.0.0

### UIライブラリ
- Tailwind CSS ^4

### チャート描画
- Highcharts（人口推移グラフの描画に使用）

### 開発支援ツール
- Prettier + ESLint：コードの整形と静的解析を自動化
- Vitest：テストフレームワーク
- Vercel：CI/CD + デプロイ先

---

## ⚙️ 環境構築

以下のコマンドを順に実行してください：

```bash
git clone git@github.com:aridome222/yumemi-codingtest.git
cd yumemi-codingtest
npm install
npm run dev
