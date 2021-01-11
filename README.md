# Gatsby+microCMS+NetlifyでJAMstackなブログ用サイトを作る
必要な機能は必要な時に限定して使っていくスタイルで対応。<br>
基本的にはmasterブランチで大枠となるフレームワークを形成して、Netlifyへのデプロイは「deploy-（名前）」のように管理していく。<BR>
また、デプロイ先（ここではNetlifyを想定している）の環境変数に.envに相当する値を設定する。<BR>
変数名は`GATSBY_`で始まる必要があるようだが、なぜかは忘れた。（ローカルでは動くけどNetlifyでは動かない、といったような問題だった気がする）

## 使い方
このリポジトリをforkしてNetlifyにdotenvの設定をmicroCMSで作成した内容を反映させる。

#.env

```
GATSBY_API_KEY=(your API Key)
GATSBY_SERVICE_ID=(Service ID)
```

ソースコードが変更されるため、APIはここでは設定していない

## microCMSのAPI設定時の注意
ローカルで`gatsby develop`などからGraphQLの画面を見ると、allMicrocms（API名。先頭文字は大文字になる）という命名規則があるようだ。<BR>
そのため、API名を書き換えるとコードを変更する必要があるため、APIを変更したい場合はprivateリポジトリを作ると良い。

ここでは、ソースコードを変えたくないのでAPI名はMainで統一しているが、任意で設定したい場合は該当するJSファイル全ての`allMicrocmsMain`のMainを全部変更する。<BR>

```
find . -name "*.js" -o -type d -name node_modules -prune -o -type d -name public -prune -o -type d -name .cache -prune | xargs sed -i.bak -e '-s/Main/(変更)/g'
```

掛けて置き換えると楽。<BR>
念の為、

```
find . -name "*.js" -o -type d -name node_modules -prune -o -type d -name public -prune -o -type d -name .cache -prune | xargs grep -n allMicrocmsMain 2>/dev/null
```

などで確認しておくようにしよう。

よくわからない場合は、microCMSでAPI名を作る時は`main`のみ使おう。

## 上級者向け
要はGraphQLで取得できる「allMicrocmsMain」がそれぞれ活用しているAPIサーバーの設定に変更できれば良い。<BR>
なのでこのソースはmicroCMS以外で活用することは可能。

