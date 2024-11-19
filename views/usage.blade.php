@section('body-class',"auth-usage")
@extends('layouts.auth')
@section('content')
    <main>
        <h2 class="ttl">How to use.</h2>
        <p class="subttl subttl-ar">ARを作成する</p>
        <div class="video">

            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/t6lPml-wsDg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <p class="subttl subttl-3d">3Dモデルを作成する</p>
        <p class="subtxt">
            Koalaにアップする3Dモデルはglb形式です。<br>
            BlenderなどのCADソフトを使用して<br>
            3Dモデルを書き出してください。
        </p>
        <p class="subttl subttl-mesh">メッシュ名</p>
        <p class="subtxt">
            メッシュ名は以下の条件で設定します。<br><br><br>
            ・リングのボディー = ringbody<br><br>
            ・リングの石 = stone
        </p>
        <div class="box-btn">
            <a class="btn" href="/login">FREE TRIAL</a>
            <a class="btn" href="https://en-code.jp/contact/">お問い合わせ</a>
        </div>
    </main>

@endsection
