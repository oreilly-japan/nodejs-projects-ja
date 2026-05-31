# 各章のコードの実行例

このページでは、本リポジトリに含まれるサンプルコードをローカルで実行する例を示します。

## はじめに

まず、本リポジトリをクローンしてください。Gitの使い方は本書の付録Bを参照してください。

```bash
$ git clone git@github.com:oreilly-japan/nodejs-projects-ja.git
```

## 2章

### 2_1

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_2/2_1/csv_app` に移動してから実行する
```

#### 実行結果

ターミナルに `Success!` と表示され、`2_1` ディレクトリ以下に `test.txt` というファイルが出力されます。

### 2_2

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_2/2_2/csv_app` に移動してから実行する
```

#### 実行結果

`Contact Name`、`Contact Number`、`Contact Email` が順に尋ねられ、続けて `Continue? [y to continue]` と表示されます。`y` を入力すると、次のユーザーデータを入力できます。Enterキーを押すと終了します。最後に `contacts.csv` が出力されます。

### 2_3

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_2/2_3/csv_app` に移動してから実行する
```

#### 実行結果

`What is your name?` と尋ねられます。名前を入力すると、ターミナルに `Hello, <NAME>` と表示されます。

### 2_4

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_2/2_4/csv_app` に移動してから実行する
```

#### 実行結果

実行結果は2_2と同じです。`Contact Name`、`Contact Number`、`Contact Email` が順に尋ねられ、最後に `contacts.csv` が出力されます。

### 2_prac

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_2/2_prac/csv_app` に移動してから実行する
```

#### 実行結果

`Contact Name`、`Contact Number`、`Contact Email` が順に尋ねられます。電話番号やメールアドレスとして不適切な形式を入力すると、バリデーションエラーが表示されます。

## 3章

### 3_1

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_3/3_1/restaurant_web_server` に移動してから実行する
```

#### 実行結果

ブラウザには以下の内容が表示されます。

- `http://localhost:3000`: `Welcome to What's Fare is Fair!`
- `http://localhost:3000/hours`: `TODO: Hours Page`
- `http://localhost:3000/menu`: `TODO: Menu Page`

### 3_2

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_3/3_2/restaurant_web_server` に移動してから実行する
```

#### 実行結果

- `http://localhost:3000`: `Welcome to What's Fare is Fair!`
- `http://localhost:3000/hours`: 

```json
{"defaultHours":{"open":11,"closed":22},"monday":{"open":null,"closed":null},"sunday":{"open":12,"closed":20}}
```

- `http://localhost:3000/menu`:

```json
[{"name":"Broccoli Pie","description":"A green pie with an earthy crust","cost":12.99},{"name":"Eggplant Smoothie","description":"A purple shake with an earthy quake","cost":5.99},{"name":"Watermelon Sushi","description":"A red roll with atmospheric sweetness","cost":8.99}]
```

### 3_3

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_3/3_3/restaurant_web_server` に移動してから実行する
```

#### 実行結果

- `http://localhost:3000`: `Welcome to What's Fare is Fair!` と書かれた太字のページ
- `http://localhost:3000/hours`: 営業時間の一覧
- `http://localhost:3000/menu`: 箇条書きのメニュー

### 3_4

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_3/3_4/restaurant_web_server` に移動してから実行する
```

#### 実行結果

- `http://localhost:3000`: 見た目が整った `Welcome to What's Fare is Fair!` のトップページ
- `http://localhost:3000/hours`: 見た目が整った営業時間の一覧
- `http://localhost:3000/menu`: 見た目が整った箇条書きのメニュー

### 3_prac

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_3/3_prac/restaurant_web_server` に移動してから実行する
```

#### 実行結果

- `http://localhost:3000/hours`: 今日の日付が強調表示されています
- `http://localhost:3000/about`: `What's Fare is Fair` の歴史説明

## 4章

### 4_1

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_4/4_1/password_manager` に移動してから実行する
```

#### 実行結果

ハッシュ化されたパスワードがターミナルに表示されます。

### 4_2

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_4/4_2/password_manager` に移動してから実行する
```

#### 実行結果

メインパスワードの入力を求められます。その後以下の選択肢が提示されます。

```txt
1. View passwords
2. Manage new password
3. Verify password
4. Exit
```

`2` を入力し、パスワード名とパスワードを入力します。その後 `1` を入力すると、先ほど入力した内容を確認できます。

`3` を入力するとメインパスワードの入力を求められます。正しいメインパスワードを入力すると、`Password verified.` と表示されます。

`4` を入力すると処理が終了します。

### 4_3

#### コマンド

```bash
$ mkdir -p ~/data/db && mongod --dbpath ~/data/db # 詳しくは付録Cを参照
$ npm i && node index # あらかじめ別のターミナルで `chapter_4/4_3/password_manager` に移動してから実行する
```

#### 実行結果

実行結果は4_2と同じです。

### 4_prac

#### コマンド

```bash
$ mkdir -p ~/data/db && mongod --dbpath ~/data/db # まだ4_3を実行していなければ実行。詳しくは付録Cを参照
$ npm i && node index # あらかじめ別のターミナルで `chapter_4/4_prac/password_manager` に移動してから実行する
```

#### 実行結果

メインパスワード、ソルトラウンド数の入力が求められます。

4_2、4_3の内容に加え、`5` を選択してパスワード名を入力すると、その名前に対応するパスワードが表示されます。

## 5章

### 5_1

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_5/5_1/food_feeds_rss_app` に移動してから実行する
```

#### 実行結果

XML本文がターミナルに表示されます。

### 5_2

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_5/5_2/food_feeds_rss_app` に移動してから実行する
```

#### 実行結果

XMLの各項目からタイトルとリンクが抽出され、ターミナルに表示されます。

### 5_3

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_5/5_3/food_feeds_rss_app` に移動してから実行する
```

#### 実行結果

リアルタイムでタイトルとリンクが表示されます。

### 5_4

#### コマンド

```bash
$ npm i && node index # あらかじめ別のターミナルで `chapter_5/5_4/food_feeds_rss_app` に移動してから実行する
```

#### 実行結果

`Add item` と表示されたら、例えば `esm,https://nodejs.org/api/esm.html` と入力します。入力した項目が出力テーブルに追加されます。

### 5_prac

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_5/5_prac/food_feeds_rss_app` に移動してから実行する
```

#### 実行結果

`Enter a keyword to filter feed items` と表示されたら、例えば `spicy` と入力します。その後 `Add item` と表示されたら、例えば `spicy food, https://jonwexler.com` と入力します。追加した項目を含め、`spicy` でフィルタリングされた結果が返されます。

## 6章

### 6_1

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_6/6_1/library_api` に移動してから実行する
```

#### 実行結果

ターミナルに `Listening at http://localhost:3000` と表示されます。`http://localhost:3000` にアクセスすると、`{"message":"ok"}` と表示されます。

### 6_2

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_6/6_2/library_api` に移動してから実行する
```

#### 実行結果

ターミナルに `Listening at http://localhost:3000` と表示されます。`http://localhost:3000/api/books/42` にアクセスすると、`{"id":"42"}` と表示されます。

### 6_3

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_6/6_3/library_api` に移動してから実行する
```

#### 実行結果

以下の `curl` を別のターミナルで実行すると、コメントに示した出力を確認できます。

```bash
$ curl http://localhost:3000/api/books/42 # {"id":"42"}
$ curl -X POST -d 'title=Frankenstein&author=Mary Shelley' http://localhost:3000/api/books/ # {"title":"Frankenstein","author":"Mary Shelley"}
$ curl -X PUT -d 'title=Frankenstein&author=Mary Shelley' http://localhost:3000/api/books/42 # {"id":"42"}
$ curl -X DELETE http://localhost:3000/api/books/42 # {"id":"42"}
```

### 6_4

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_6/6_4/library_api` に移動してから実行する
```

#### 実行結果

以下の `curl` を別のターミナルで実行すると、コメントに示した出力を確認できます。

```bash
$ curl -X POST -d 'title=Frankenstein&author=Mary Shelly' http://localhost:3000/api/books/ # {"count":0,"id":1,"....}
$ curl http://localhost:3000/api/books/1 # {"id":1,"title":"Frankenstein"...}
$ curl -X PUT -d 'title=Frankenstein&author=Mary Shelley' http://localhost:3000/api/books/1 # [1]
$ curl -X DELETE http://localhost:3000/api/books/1 # 1
```

### 6_prac

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_6/6_prac/library_api` に移動してから実行する
```

#### 実行結果

以下の `curl` を別のターミナルで実行すると、コメントに示した出力を確認できます。

```bash
$ curl -X POST -d 'title=Frankenstein&author=Mary Shelly' http://localhost:3000/api/books/ # {"id":1,"title":"Frankenstein",..., "count": 1,...}
$ curl -X POST -d 'title=Frankenstein&author=Mary Shelly' http://localhost:3000/api/books/ # {"id":1,"title":"Frankenstein",..., "count": 2,...}
$ curl -X POST -d 'title=monogatari&author=Taro' http://localhost:3000/api/books/ # {"id":2,"title":"monogatari",...}
$ curl http://localhost:3000/api/books # [{...},{...}]
```

## 7章

### 補足

7章のコードをLinux環境で実行したときに結果が空で返ってくる場合は、以下を試してください。

```bash
$ sudo apt update
$ sudo apt install -y locales hunspell-en-us
$ sudo locale-gen en_US.UTF-8
```

### 7_1

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_7/7_1/sentiment_journal` に移動してから実行する
```

#### 実行結果

`['great', 'grab', ...]` のようなスペル修正候補が表示されます。

### 7_2

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_7/7_2/sentiment_journal` に移動してから実行する
```

#### 実行結果

`['feel', 'great']` のようなリストが表示されます。

### 7_3

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_7/7_3/sentiment_journal` に移動してから実行する
```

#### 実行結果

`How do you feel?` と尋ねられます。`happy` のように入力すると、感情分析スコアが表示されます。

### 7_4

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_7/7_4/sentiment_journal` に移動してから実行する
```

#### 実行結果

`How do you feel?` と尋ねられます。`happy` や `sad` のように入力すると、感情分析スコアに応じたグラフが表示されます。

### 7_prac

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_7/7_prac/sentiment_journal` に移動してから実行する
```

#### 実行結果

`How do you feel?` と尋ねられます。`I feeeeel fine` のようにミススペルを含めて入力すると、修正後の文とセンチメントカテゴリが表示されます。

## 8章

### 補足

[Googleアカウントヘルプ](https://support.google.com/accounts/answer/185833)に従って、アプリパスワードを生成します。コード内のメールアドレスを自分のメールアドレスに変更し、パスワードも取得したアプリパスワードに変更します。`from` や `to` も自分のメールアドレスに変更してください。

### 8_1

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_8/8_1/marketing_mailer` に移動してから実行する
```

#### 実行結果

自分のメールアドレスを確認してください。`Welcome to Inn Box!` という件名のメールが届きます。

### 8_2

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_8/8_2/marketing_mailer` に移動してから実行する
```

#### 実行結果

別のターミナルで、自分のメールアドレスを入れた `curl -X POST -d "email=<YOUR_EMAIL>" http://localhost:3000/subscribe` を実行します。ターミナルに `{"message":"ok"}` と表示され、`Email from Inn Box!` という件名のメールが届きます。

### 8_3

8_2と同様に実行できます。

### 8_4

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_8/8_4/marketing_mailer` に移動してから実行する
```

#### 実行結果

`node index` を実行すると、すぐに `Email from Inn Box!` という件名のメールが届きます。

自分のメールアドレスを入れた `curl http://localhost:3000/campaign/promo1/user/{YOUR_EMAIL}/image.png` を実行すると、ターミナルに `{"message":"ok"}` と表示されます。

### 8_5

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_8/8_5/marketing_mailer` に移動してから実行する
```

#### 実行結果

メールが30秒ごとに自動で送信されます。

### 8_prac

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_8/8_prac/marketing_mailer` に移動してから実行する
```

#### 実行結果

まず以下のコマンドを実行します。

```bash
curl -X POST http://localhost:3000/subscribe \
    -H 'content-type: application/x-www-form-urlencoded' \
    --data 'email=<YOUR_EMAIL>'
```

次に、送信されたメール内のプロモーションリンクをクリックすると、ブラウザに `{"message":"ok"}` と表示されます。

届いたメールには `Unsubscribe` というテキストリンクがあります。リンクを開くと、unsubscribe処理のログがターミナルに表示されます。また、ブラウザには `{"message":"<YOUR_EMAIL> has unsubscribed"}` と表示されます。

## 9章

### 9_1

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_9/9_1/site_scraper` に移動してから実行する
```

#### 実行結果

ターミナルにHTMLが表示されます。

### 9_2

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_9/9_2/site_scraper` に移動してから実行する
```

#### 実行結果

記事のタイトルとリンクがターミナルに表示されます。

### 9_prac

#### コマンド

```bash
$ npm i && node index node # あらかじめ `chapter_9/9_prac/site_scraper` に移動してから実行する
```

#### 実行結果

`http://localhost:3000/api/articles` にアクセスすると、`node` というキーワードでフィルタリングされた記事のタイトルとURLが表示されます。

## 10章

### 10_1

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_10/10_1/app_authentication` に移動してから実行する
```

#### 実行結果

`http://localhost:3000/` にアクセスすると、`Welcome!` と表示されます。

### 10_2

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_10/10_2/app_authentication` に移動してから実行する
```

#### 実行結果

`http://localhost:3000/` にアクセスし、サインインします。ブラウザに `{"message":"Account created."}` と表示されます。

### 10_3

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_10/10_3/app_authentication` に移動してから実行する
```

#### 実行結果

実行結果は10_2と同じです。

### 10_4

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_10/10_4/app_authentication` に移動してから実行する
```

#### 実行結果

```bash
$ curl -X POST http://localhost:3000/account -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpass"}' # {"message":"Account created."} が返される
$ curl -X POST http://localhost:3000/api/auth -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpass"}' # トークンが返されるので次のコマンドで使う
$ curl http://localhost:3000/api/test -H "Accept: application/json" -H "Authorization: Bearer <YOUR_TOKEN>"
```

### 10_prac

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_10/10_prac/app_authentication` に移動してから実行する
```

#### 実行結果

```bash
$ curl -X POST http://localhost:3000/account -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpass"}' # {"message":"Account created."} が返される
$ curl -X POST http://localhost:3000/api/auth -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpass"}' # トークンが返されるので次のコマンドで使う
$ curl http://localhost:3000/api/test -H "Accept: application/json" -H "Authorization: Bearer <YOUR_TOKEN>"
```

`http://localhost:3000` にアクセスし、ログインページで `testuser`、`testpass` を入力してログインすると、`Welcome, testuser2!` と表示されたページに遷移します。

## 11章

### 11_1

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_11/11_1/coffee_queue` に移動してから実行する
$ curl -X POST -H "Content-Type: application/json" -d '{"drinkOrder":"latte"}' http://localhost:3000/slow-order
```

#### 実行結果

ターミナルに `ORDER PLACED` と表示されます。

### 11_2

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_11/11_2/coffee_queue` に移動してから実行する
$ curl -X POST -H "Content-Type: application/json" -d '{"drinkOrder":"latte", "cost":"4.50","customer":"Jon Wexler"}' http://localhost:3000/order
```

#### 実行結果

`Drink order added to queue` と表示されます。

### 11_3

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_11/11_3/coffee_queue` に移動してから実行する
```

#### 実行結果

`Received order: latte` と表示されます。

### 11_4

#### コマンド

```bash
$ npm i && node index # あらかじめ `chapter_11/11_4/coffee_queue` に移動してから実行する
$ curl -X POST -H "Content-Type: application/json" -d '{"drinkOrder":"latte"}' http://localhost:3000/order
```

#### 実行結果

`curl` を実行したターミナルには `Drink order published: latte` と表示され、`node index` を実行しているターミナルには `Received a new latte order.` と表示されます。

### 11_5

#### コマンド

```bash
$ npm i && node index # analytics_service、fulfillment_service、main_server のそれぞれのディレクトリで実行
$ curl -X POST -H "Content-Type: application/json" -d '{"drinkOrder":"latte", "cost":"4.50","customer":"Jon Wexler"}' http://localhost:3000/order
```

#### 実行結果

`analytics_service`を開いているターミナルで`Drink orders:  latte: 100%, coffee: 0%, cappuccino: 0%`のように表示されます。

`fulfillment_service`を開いているターミナルで`latte being fulfilled for Jon Wexler`のように表示されます。

`main_server`を開いているターミナルで`Drink: latte is being processed for Jon Wexler`のように表示されます。

### 11_prac1

#### コマンド

```bash
$ redis-server
$ npm i && node index # あらかじめ `chapter_11/11_prac1/coffee_queue/inventory_service` に移動してから実行する
$ redis-cli PUBLISH drink-order '{"order":"latte","customer":"Alice"}'
```

#### 実行結果

`redis-cli PUBLISH drink-order '{"order":"latte","customer":"Alice"}'` を複数回実行すると、その都度 `Order received: latte. Stock remaining: 9` のようなログが `inventory_service` を開いているターミナルに表示されます。

### 11_prac2

#### コマンド

```bash
$ docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
$ npm i && node index  # あらかじめ `chapter_11/11_prac2/coffee_queue/fulfillment_service` に移動してから実行する
```

#### 実行結果

```bash
node -e "import amqp from 'amqplib';
  const conn = await amqp.connect('amqp://localhost:5672');
  const ch = await conn.createChannel();
  await ch.assertQueue('drink-order');
  for (let i = 1; i <= 6; i++) {
    const msg = { order: 'Latte', customer: 'Customer' + i, retries: 0 };
    ch.sendToQueue('drink-order', Buffer.from(JSON.stringify(msg)));
    console.log('Sent order ' + i);
  }
  setTimeout(() => conn.close(), 500);
  " --input-type=module
```

このコマンドを `fulfillment_service` ディレクトリ下から実行すると、`Order #3` と `Order #6` が失敗している様子を `node index` を実行しているターミナルで確認できます。

## 12章

### 12_1

#### コマンド

```bash
$ npm i && node index 3000 # あらかじめ `chapter_12/12_1/blockchain_marketplace` に移動してから実行する
```

#### 実行結果

`http://localhost:3000` にアクセスすると、`{"message":"Marketplace running"}` と表示されます。

その後、別のターミナルを2つ立ち上げ、それぞれで `node index` を実行します。

後から立ち上げた2つのターミナルには、`http://localhost:64041 synced http://localhost:3000,http://localhost:64041` のようなメッセージが表示されます。

### 12_2

#### コマンド

```bash
$ npm i && node index 3000 # あらかじめ `chapter_12/12_2/blockchain_marketplace` に移動してから実行する
```

#### 実行結果

別のターミナルを2つ立ち上げ、それぞれで `node index` を実行します。

`Syncing blocks [{"timestamp":1780200515613,"transactions":[],"previousHash":null,"hash":<HASH>,"nextHash":null}]` のようなメッセージが表示されます。

### 12_3

#### コマンド

```bash
$ npm i && node index 3000 # あらかじめ `chapter_12/12_3/blockchain_marketplace` に移動してから実行する
```

#### 実行結果

```bash
$ curl -X POST http://localhost:3000/register-node -H "Content-Type: application/json" -d '{"url": "http://localhost:50879"}' # 50879は、`node index` で表示されたどちらかのポート番号を指定。`{"message":"Node Registered"}` が返される。
$ curl -X POST http://localhost:50879/payment -H "Content-Type: application/json" -d '{"price": 100}' # 出力: `{"message":"New balance 50100"}`
$ curl -X POST http://localhost:3000/sell -H "Content-Type: application/json" -d '{"price": 10, "songTitle": "Test Song"}' # 出力: `{"message":"Song being listed"}`
$ curl http://localhost:3000/songs # 出力: `{"songs":[["<ID>","Test Song",10]]}`
$ curl -X POST http://localhost:50879/buy -H "Content-Type: application/json" -d '{"id": "<ID>"}' # 直前の出力で得たIDを使う。`{"message":"Processed transaction"}` が返される。
```

### 12_prac

#### コマンド

```bash
$ npm i && node index 3000 # あらかじめ `chapter_12/12_prac/blockchain_marketplace` に移動してから実行する
$ node index # ターミナルを2つ立ち上げ、それぞれで実行
```

#### 実行結果

```bash
$ curl -X POST http://localhost:3000/register-node -H "Content-Type: application/json" -d '{"url":"http://localhost:52235"}' # 52235は、`node index` で表示されるポート番号を使う。出力: `{"message":"Node Registered"}`
$ curl -X POST http://localhost:52235/payment -H "Content-Type: application/json" -d '{"price": 100}' # 出力: `{"message":"New balance 50100"}`
$ curl -X POST http://localhost:3000/sell -H "Content-Type: application/json" -d '{"price": 10, "songTitle": "Test Song", "expiration": "2050-04-03T12:00:30Z"}' # 出力: `{"message":"Song being listed"}`
$ curl -X POST http://localhost:3000/sell -H "Content-Type: application/json" -d "{\"price\": 5, \"songTitle\": \"Short Lived Song\", \"expiration\": \"$(date -u -v+10S '+%Y-%m-%dT%H:%M:%SZ')\"}" # 出力: `{"message":"Song being listed"}`
$ curl http://localhost:3000/songs # 前のコマンドの直後に実行。その後、しばらくしてもう一度実行し、曲が1曲消えることを確認
$ curl -X POST http://localhost:52235/buy -H "Content-Type: application/json" -d '{"id": "<ID>"}' # 前の出力で得た曲のIDを指定。出力: `{"message":"Processed transaction"}`
```

## 13章

### 補足

事前に [Google AI Studio](https://aistudio.google.com/app/api-keys) でAPIキーを作成し、`GEMINI_API_KEY` に設定します。詳しくは付録Eを参照してください。

### 13_1

#### コマンド

```bash
$ npm i && GEMINI_API_KEY=<YOUR_API_KEY> node index # 別のターミナルで `chapter_13/13_1/interview_atlas_ai` に移動してから実行する
```

#### 実行結果

AIのレスポンスがターミナルに表示されます。

### 13_2

#### コマンド

```bash
$ npm i && GEMINI_API_KEY=<YOUR_API_KEY> node index # 別のターミナルで `chapter_13/13_2/interview_atlas_ai` に移動してから実行する
```

#### 実行結果

AIのレスポンスがターミナルに表示されます。

### 13_3

#### コマンド

```bash
$ npm i && GEMINI_API_KEY=<YOUR_API_KEY> node index # 別のターミナルで `chapter_13/13_3/interview_atlas_ai` に移動してから実行する
```

#### 実行結果

別のターミナルで `curl -X POST http://localhost:3000/query -H "Content-Type: application/json" -d '{ "prompt": "Explain recursion in a single sentence with an analogy." }'` を実行すると、AIのレスポンスが返されます。

### 13_4

#### コマンド

```bash
$ npm i && GEMINI_API_KEY=<YOUR_API_KEY> node index # 別のターミナルで `chapter_13/13_4/interview_atlas_ai` に移動してから実行する
```

#### 実行結果

```bash
$ curl -X POST "http://localhost:3000/register" -H "Content-Type: application/json" -d '{ "email": "jon@jonwexler1.com",  "password": "password123" }' # 返されたトークンをコピーし、次のコマンドで使う
$ curl -X POST "http://localhost:3000/query" -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{ "prompt": "What is the best way to learn recursion?" }'
```

実行すると、AIのレスポンスが返されます。

### 13_prac

実行手順は13_4と同じです。`explain`、`code`、`practice` などのキーワードを入れて、いろいろなプロンプトを試してください。

## 付録F

このコードはサンプルの一部であり、単体では動作しません。
