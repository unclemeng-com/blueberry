# blueberry
product for transport the excel or word data to database

## Create Database
DB Name = postgres
User=postgres
Password=postgres

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

## Excel VBA setup
```
run cmd
>mkdir C:\work\jinmeng\01_work相互参照表\plottype
```
copy config.ini to \plottype
copy data_processing_Exl2DB.XLSM to \plottype
```

# Web Tool setup
## Package
```
postgres				https://www.postgresql.org/		データーベース							
A5SQL				https://a5m2.mmatsubara.com/			DB操作,ER図を生成するもの							
Node.js				https://nodejs.org/en/download/			WEBサーバー							
VSCode				https://code.visualstudio.com/			開発用エディター							
express				http://expressjs.com/ja/			--node.jsを利用するテンプレート							
jquery				https://jquery.com/				--検索やハイライトなど便利なモジュール							
pg				https://node-postgres.com/			--PostgresDBを接続するパッケージ							
ejs				https://www.npmjs.com/package/ejs		--Node.js のViewをhtmlタグによる記載							
forever				https://www.npmjs.com/package/forever		--公開のためのツール.(エラー発生しても,サーバーを止めることなく)							
jsdom				https://www.npmjs.com/package/node-jsdom	--htmlタグ指定するためのもの
```
##Node.js Install
###Proxy Setting(needed when in some intranet)
```
npm config set proxy http://proxyuser:proxypass@サーバアドレス:ポート番号
npm config set https-proxy http://proxyuser:proxypass@サーバアドレス:ポート番号
npm config set registry http://registry.npmjs.org/
```
