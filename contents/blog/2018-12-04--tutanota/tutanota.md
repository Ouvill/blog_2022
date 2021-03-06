---
title: "Tutanotaを使ってみた。ドイツの暗号メールサービス"
subTitle: "結構良さそう"
description: "Tutanotaを使ってみた。ドイツの暗号メールサービス"
date: 2018-12-04 20:00:08
category: "security"
cover: "thumb.jpg"
---

Tutanota という暗号メールサービスのアカウントを取得しました。

ざっくりと触ってみた感想を。

現在私自身は Protonmail を利用しているので主にそちらとの比較になると思います。

## Tutanota とは

ドイツで提供されている 暗号メールサービスです。

## 軽く触ってみた雑感

* UIは使いやすい
* サーバーが貧弱なのか、しばしば応答無しとなる
* メールにパスワードをかけることで、Tutanota ユーザー以外にも暗号メールが送れる
* 無料で1GB
* 有料だと独自ドメイン可能。しかも安い（一年 12€）

### UI は使いやすい

UI は使いやすい印象。ウェブメールを触ったことがある人ならば、戸惑うこともなく操作が可能でしょう。

### サーバーは貧弱

サーバーが貧弱なのか、しばしば応答なしとなる時がありました。やや安定性にかけるなという印象です。

### 暗号メールを送れる

メールにパスワードをかけることで暗号メールを誰にでも送れることができます。

ですが、パスワードをどのように伝えるかといった問題や、Tutanota や Protonmail を使っていないユーザーに対して暗号メールを送ったときに受け入れられるかという問題があります。

### 独自ドメイン

有料アカウントになると独自ドメインで運用できます。しかも値段がやすく、一年12€ で利用できます。暗号化に興味がないとしても、これは安いので、独自ドメインでメール運用したいという人におすすめできます。

## Protonmail と比較して

- Tutanota は PGP をサポートしていない
- Tutanota は安い

現在私は Protonmail を有料アカウントとして利用しています。

Protonmail はGPG暗号を利用しています。GPG暗号は、現在のメール暗号として主流です。Protonmail のほかにも Firefox や Chrome のブラウザ拡張、Thunderbird の Enigmail を利用することでGPG暗号を施したメールのやり取りが可能で、汎用性が高いです。

Protonmail は PGP暗号をフルサポートしているために、ほかツールでPGPメールを運用している人ともやり取りすることができます。

Protonmail と違い、 Tutanota は PGP 暗号をサポートしていません。Tutanota は独自仕様の暗号を利用しています。なので Tutanota では PGP ユーザーとのメールのやり取りは難しいです。

有料アカウントに関してですが、Tutanota は年額 12€、Protonmail は年額48$ とほぼ4倍の値段差があります。Tutanota のほうが安く魅力的です。

## 日本語化について

~~記事執筆時点では日本語化はされておりません。ですが、公開されているソースコードの中身を除いてみると、日本語に翻訳されたファイルがあったので、じきに日本語対応となるでしょう。~~

Tutanota の UI は日本語で利用可能です。 

## iOS クライアントがとても遅いときの対策案

iOS クライアントの動作が凄く遅いです。アプリを開いてからログイン処理が走り、メールを表示するまでに10秒以上かかってしまっています。

対策としては iOS アプリ版ではなく、[Web版](https://mail.tutanota.com/login) を利用することです。Safari といったブラウザで Tutanota を利用するほうが動作が快適です。

Safari の「ホーム画面に追加」機能を使えば、ほぼアプリ版と同等の操作ができます。ただ Push 通知等が使えなくなるので、アプリ版もインストールしておくほうがいいです。

## まとめ

ざっくりとした Tutanota についてでした。

一市民のメールなんて誰も見ないし興味ないだろうとも思いますが、やはり施せる対策は施していきたいのです。

## 参考

* [臨床事例の安全な送付方法|日本EMDR学会](https://www.emdr.jp/安全な情報伝達について/臨床事例の安全な送付方法/)

↑って医療学会のサイトなのですが、暗号化についてわかりやすく書いていてびっくりします。

![](lock.jpg)

Photo by [John Salvino](https://unsplash.com/photos/bqGBbLq_yfc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/security?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
