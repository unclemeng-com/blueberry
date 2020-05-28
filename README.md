# blueberry
product for transport the excel or word data to database

## Install Postgres
1. DB Name = postgres
2. User=postgres
3. Password=postgres

## Database setup
```
run A5:SQL
run create_table_for_blueberry.sql
```
PS.
if the error message is bug, please set.
lc_messages = 'Japanese_Japan.932'
↓
lc_messages = 'en_US'
Restart Postgres Service(サービスを立ち上げ、Postgresサービスを再起動) then you can check the english message.

### It is better to restore a database
>pg_dump -h localhost -U postgres -d postgres > postgres.dump
>psql -U postgres -d postgres < postgres.dump

## Excel VBA setup
```
run cmd
>mkdir C:\work\jinmeng\01_work相互参照表\plottype

copy config.ini to \plottype
copy data_processing_Exl2DB.XLSM to \plottype
```

# Web Tool setup
## Package
```
postgres		https://www.postgresql.org/		  データーベース
A5SQL			https://a5m2.mmatsubara.com/			DB操作,ER図を生成するもの
Node.js			https://nodejs.org/en/download/			WEBサーバー
VSCode			https://code.visualstudio.com/			開発用エディター
express			http://expressjs.com/ja/			node.jsを利用するテンプレート
jquery			https://jquery.com/				検索やハイライトなど便利なモジュール
pg			https://node-postgres.com/			PostgresDBを接続するパッケージ
ejs			https://www.npmjs.com/package/ejs		Node.js のViewをhtmlタグによる記載
forever			https://www.npmjs.com/package/forever		公開用ツール.(サーバー止めず)
jsdom			https://www.npmjs.com/package/node-jsdom	htmlタグ指定するためのもの
```
## Node.js Install
```
1. Install Node.js for windows
2. Confirm the npm --version at command prompt
3. >mkdir bvapp
4. >cd bvapp
5. >npm init
6. >npm install -g express --save
If any error happened please set the proxy server
  Proxy Setting(needed when in some intranet)
  npm config set proxy http://proxyuser:proxypass(省略可)@サーバアドレス:ポート番号　例:npm config set proxy http://xsys.co.jp:8080
　npm config set https-proxy http://proxyuser:proxypass@サーバアドレス:ポート番号
　npm config set registry http://registry.npmjs.org/
7. >npm install -g jquery --save
8. >npm install -g pg --save
9. >npm install -g ejs --save
10.>npm install -g forever --save
11.>npm install -g express-generator --save
12.>express app --ejs
```
13. File Copy
Copy all file from \bvapp\app

## Open the port(If needed)
F-Secure : chose task at userinterface. Add the 3000 port.
