# LUMIWING

**Photography by Duck**

活動名Duckによる写真ポートフォリオ「LUMIWING」の初期版です。ビルド処理を使わない静的サイトなので、Cloudflare PagesまたはGitHub Pagesへそのまま公開できます。

## 収録内容

- HOME / GALLERY / STOCK PHOTOS / PHOTO JOURNAL / ABOUT / CONTACT / PRIVACY POLICY
- 提供された写真10点をWebPへ縮小・圧縮
- 販売中のヒマワリ写真には画像へ直接透かしを焼き込み
- 右クリック・ドラッグ保存の簡易抑止
- PIXTA・Adobe Stock作者ページへのリンク
- スマートフォン向けレスポンシブ表示
- AdSenseを記事ページへ追加できる構造

## 公開前に必要な設定

1. `contact.html` の問い合わせ送信先を設定する
2. 独自ドメインまたはCloudflare PagesのURLを決定する
3. AdSense承認後に広告コードと `ads.txt` を追加する
4. `privacy.html` を実際に利用する広告・解析・フォームに合わせて最終更新する
5. PIXTAの表示名を可能であればDuckへ統一する

## Cloudflare Pagesへの公開

- GitHubで新しいリポジトリを作成
- このフォルダーの中身をアップロード
- Cloudflare PagesでGitHubリポジトリを接続
- フレームワーク: `None`
- Build command: 空欄
- Build output directory: `/`

## 写真の追加

`assets/images` に縮小済みWebPを入れ、`gallery.html` の `.gallery-item` を複製します。販売作品は元画像を置かず、透かし入りプレビューだけを使ってください。

## 注意

右クリック防止は完全な画像保護ではありません。元画像を公開しないこと、縮小・圧縮・透かしを行うことが主な対策です。
