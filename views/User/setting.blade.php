<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <title>Setting</title>
    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/responsive.css">
</head>
<body class="main main-setting">
    <div class="sidebar">
        <a href="/" class="logo">ENCODE Koala (β)</a>
        <a href="/upload"><div class="btn btn-upload"> UPLOAD</div></a>
        <a href="/"><div class="btn btn-myring">My Ring</div></a>
        <div class="txt-comingsoon">Coming Soon</div>
    </div>
    <main>
        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <div class="box-btn-account">
                <div class="btn btn-account">アカウント</div>
                <div class="nav-account">
                    <a href="/mypage/settings"><div class="item-nav-account">アカウント情報</div></a>
                    <button class="item-nav-account">ログアウト</button>             
                </div>
            </div>
        </form>
        <div class="board">
            <h2 class="subttl">Account</h2>
            <div class="ttl-input">メールアドレス</div>
            <input type="text" value="{{Auth::user()->email}}" >
            <div class="ttl-input">ストア</div>
            <input type="text" value="{{Auth::user()->store}}" >
            <h2 class="subttl subttl-plan">Plan</h2>
            <div class="plan">
                <div class="name-plan">フリープラン</div>
                <div class="money-plan">0円 (月額)</div>
            </div>
            <div class="btn btn-change-plan">プラン変更</div>
        </div>
    </main>
</body>
</html>