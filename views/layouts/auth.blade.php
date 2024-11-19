<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <meta name="google-site-verification" content="LxSevfS8gKLj3yXWuOfrgzn1desjrBgvpzKTo8z-tCc" />

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-EGVXYRLV6V"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-EGVXYRLV6V');
    </script>
    <title>ENCODE Koala (β)</title>
    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/auth.css">
    <link rel="stylesheet" href="/css/responsive.css">
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>
<body class="auth @yield('body-class')">
    <header>
        <h1 class="logo"><a href="/">ENCODE Koala (β)</a></h1>
        <nav class="pc-only">
            <a href="/usage" class="nav-item">使いかた</a>
            <a href="/price" class="nav-item">料金</a>
            <a href="/login" class="nav-item btn">アカウント</div></a>
        </nav>
        <div class="btn-nav-sp sp-only">
            <div class="first-bar"></div>
            <div class="second-bar"></div>
        </div>
        <div class="bg-nav-sp d-none sp-only">
            <div class="bg-nav-black"></div>
            <div class="nav-sp">
                <a href="/usage" class="nav-item-sp nav-item-sp-use">使いかた</a>
                <a href="/price" class="nav-item-sp-money">料金</a>
                <a href="/login" class="btn nav-item-sp-account">アカウント</a>
            </div>
        </div>
    </header>
    @yield("content")
    
</body>
<script src="/js/header.js?20230630"></script>
</html>