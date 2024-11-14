# JDPマーケティングプレイスサンプルアプリ手順書

## 目次

1. [前提条件](#前提条件)
2. [プロジェクト構成](#プロジェクト構成)
3. [GMO Payment Gateway マルチペイメントサービスの設定](#gmo-payment-gateway-マルチペイメントサービスの設定)
4. [Amplifyコンソールでのデプロイ](#amplifyコンソールでのデプロイ)
5. [GMO Payment Gateway マルチペイメントサービスからの決済通知](#gmo-payment-gateway-マルチペイメントサービスからの決済通知)
6. [商品の登録](#商品の登録)
7. [詳細設定](#詳細設定)

## 前提条件

以下のアカウント・ツールが必要です：

- AWS アカウント
- 以下のいずれかのGitプロバイダーのアカウント
  - GitHub
  - BitBucket
  - GitLab
  - AWS CodeCommit（※注意：AWSアカウントでは使用できない場合があります）
- GMO Payment Gateway マルチペイメントサービスのアカウント

---

## プロジェクト構成

本アプリはAmplify Gen2で構築されています。

デプロイ対象のプロジェクトは以下のディレクトリ構成であることを確認してください。Gitプロバイダーに以下の構成でファイルをアップロードします：

```
プロジェクトルート/
├── amplify/
├── amplify.yml
├── build/
├── frontend/
├── package-lock.json
└── package.json
```

---
<div style="page-break-after: always;"></div>

## GMO Payment Gateway マルチペイメントサービスの設定

### 1. GMOアカウントの取得

- GMO Payment Gateway にアカウント開設を申し込む
- 申し込み後、GMOより提供される管理画面にログイン

### 2. 必要な認証情報の取得

以下の情報を取得し、安全に保管してください：

- ショップID
  - GMO-PGログイン画面の[ショップ管理画面の画面上部（ログイン画面/ログイン後画面）]より確認可能
  - 詳細は[［手順］ショップID／サイトID／契約番号の確認方法](https://mp-faq.gmo-pg.com/s/article/F00380)を参照
- ショップパスワード
  - GMO-PG管理画面の[ショップ管理]より確認可能
  - 詳細は[手順］管理画面／サイトパスワード・ショップパスワードの確認](https://mp-faq.gmo-pg.com/s/article/F00117)を参照

ショップIDとショップパスワードは、デプロイ時に環境変数として設定します。

### 3. リンクタイプ Plus機能の設定

本アプリはリンクタイプ Plus機能を使用して決済を行っています。
- 詳細は[［概要］リンクタイプPlus／リンクタイプ Plusとは](https://mp-faq.gmo-pg.com/s/article/D00766)を参照

リンクタイプ Plusの新規設定作成：
- GMO-PG管理画面よりリンクタイプ Plusの設定IDを登録する
- 詳細は[［管理画面操作］リンクタイプPlus／設定IDを登録する](https://mp-faq.gmo-pg.com/s/article/D00776)を参照

リンクタイプ Plusの設定IDは、デプロイ時に環境変数として設定します。

---
<div style="page-break-after: always;"></div>

## Amplifyコンソールでのデプロイ

### 1. AWS Amplifyコンソールへのアクセス

1. AWSマネジメントコンソールにログイン
2. 「AWS Amplify」を検索して選択
3. 新しいアプリを作成
4. 作成したGitのプロバイダーを選択
5. 次へ

### 2. リポジトリとブランチの設定

「**リポジトリとブランチを追加**」でGitプロバイダーと連携して、ソースコードをAmplifyに連携します。

### 3. アプリケーションの設定

「**アプリケーションの設定**」でデプロイする設定を行います。

必要な環境変数：

| 環境変数名 | 説明                                                                                          |
|------------|---------------------------------------------------------------------------------------------|
| DATALOCKER_USER_APP_URL | PDLのユーザ管理アプリのURL                                                                            |
| DATALOCKER_API_SERVER_HOST | PDLのAPIサーバーのURL                                                                             |
| DATALOCKER_AUTH_SERVER_HOST | PDLの認証サーバーのURL                                                                              |
| DATALOCKER_CLIENT_ID | PDLのクライアントID                                                                                |
| DATALOCKER_NFT_ID | PDLのNFT ID                                                                                  |
| GMO_HOST | GMOのAPIサーバーのURL<br>参考: [APIの接続先URL情報はどこにありますか？](https://mp-faq.gmo-pg.com/s/article/F00233) |
| GMO_LINK_PLUS_CONFIG_ID | GMOにて設定したLink Plus の設定名                                                                     |
| GMO_SHOP_ID | GMOのショップID                                                                                  |

### 4. シークレット変数の設定

デプロイが完了したら、シークレット変数を設定します。<br>
デプロイしたアプリケーションのTOPからコンソール「**ホスティング**」→「**シークレット**」で以下の環境変数を設定してください。

シークレット変数の設定内容：

| 環境変数名 | 説明 | ブランチ |
|------------|-------------------------------------|------------|
| DATALOCKER_API_SECRET_KEY | PDLのAPIシークレット | 対象ブランチ |
| DATALOCKER_CLIENT_SECRET | PDLのアプリクライアントシークレット | 対象ブランチ |
| GMO_SHOP_PASS | GMOのショップパスワード | 対象ブランチ |

※ ブランチは必ずデプロイした対象ブランチを選択してください。ブランチに「すべて」は選択しないでください。

---
<div style="page-break-after: always;"></div>

## GMO Payment Gateway マルチペイメントサービスからの決済通知

### 1. 通知URLの取得

デプロイしたアプリケーションのTOPから「デプロイしたブランチを選択」し、「デプロイされたバックエンドリソース」から対象のAPI(Lambda)を検索します。<br>
検索ボックスに「GMO」と入力し、名前[**GMONotificationFunctionXXXXX**]、入力[**AWS::Lambda::Function**]の項目を検索してクリックします。<br>
<br>
GMONotificationFunctionXXXXX のTOP画面の下部にあるタブから「**設定**」を選択し、「**関数URL**」をクリックします。<br>
関数URLに記載されているURLが通知URLとなります。<br>
ex . https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.lambda-url.ap-northeast-1.on.aws/

### 2. 通知URLの設定

GMO-PG管理画面での設定手順：

1. [ショップ管理]より「決済結果通知設定」を選択
2. 基本設定の編集ボタンをクリック
3. [**利用有無**]を「**利用する**」に設定
4. [**結果通知プログラムＵＲＬ**]に通知URLを入力
5. [**結果通知失敗連絡先メールアドレス**]を設定

---
<div style="page-break-after: always;"></div>

## 商品の登録

登録はAWSコンソールから行います。<br>
デプロイしたアプリケーションのTOPから「デプロイしたブランチを選択」して、「**データ**」から「**データマネージャー**」を選択します。<br>
「**データマネージャー**」の対象のテーブルを選択し登録を行います。<br>

### 1. 商品カテゴリー(JDPProductCategory)の登録

| 項目名 | 説明 | 入力例 |
|--------|------|--------|
| Category name | カテゴリー名 | ART |

### 2. 商品情報(JDPProduct)の登録

| 項目名 | 説明                         |
|--------|----------------------------|
| Product id | 商品を識別するためのID（例：NFT-1）      |
| Product name | 商品名                        |
| Product description | 商品の説明                      |
| Product image | 商品の画像URL                   |
| Product category | 商品カテゴリー(JDPProductCategoryに登録したものを入力)                  |
| Product price | 商品の価格                      |
| Product tax | 商品の税金                      |
| Product type | NFT: NFT商品<br>OTHER: その他商品 |

### 3. 商品在庫(JDPProductInventory)の登録

| 項目名 | 説明                                                       |
|--------|----------------------------------------------------------|
| Product id | 商品情報のID（例：NFT-1）                                         |
| Resource id | 商品在庫の識別ID<br>NFT: Token ID<br>OTHER: 適当な識別ID(RESOURCE-1) |
| App id | PDLのクライアントID（NFTの場合は必須）                                  |
| Nft id | PDLのNFT ID（NFTの場合は必須）                                    |
| Inventory status | active: 在庫あり<br>reserved: 予約済み<br>sold: 販売済み             |

---
<div style="page-break-after: always;"></div>

## 詳細設定

### 1. カスタムドメイン設定

デプロイしたアプリケーションのTOPからコンソール「**ホスティング**」→「**カスタムドメイン**」でカスタムドメインを設定できます。<br>
詳細はAWSの[公式ドキュメント](https://docs.aws.amazon.com/ja_jp/amplify/latest/userguide/custom-domains.html)を参照してください。
