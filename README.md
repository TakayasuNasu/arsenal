Arsenal
===

#### Outline

- グループウェア

#### Features

- 認証
- yammer連携
- スケジュール
- todo
- 社員一覧
- 出向先をgooglemapに表示

#### Versions

- 0.0.7 [2014/05/12] 出向先をgooglemapに表示
- 0.0.6 [2014/04/29] googlemap、migrationファイル追加
- 0.0.5 [2014/04/20] 社員一括登録機能
- 0.0.4 [2014/04/05] 設定ファイル外部化
- 0.0.3 [2014/04/01] yammer認証機能追加
- 0.0.2 [2014/03/30] 管理画面機能追加
- 0.0.1 [2014/03/21]

#### Usage
- `config/` 以下に `constants.yml` を下記を参考に作成
```yml
defaults: &defaults
  ClientId: "YourClientID"
  ClientSecret: "YourClientSecret"
  Network_id: "YourNetworkID"
  Token: "YourToken"

development:
  <<: *defaults

test:
  <<: *defaults

production:
  <<: *defaults
```

- コンソールから管理者を追加(※`rake db:migrate` 実行済み)
```sh
rails c
AdminUser.create(:email => "yourEmail@test.com", :password => "yourPassword", :password_confirmation => "yourPassword")
```

#### License

- Copyright (c) 2014 kubota nasu etc

