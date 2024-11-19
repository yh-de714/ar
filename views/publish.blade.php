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
    <title>Publish</title>
    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/upload.css">
    <link rel="stylesheet" href="/css/responsive.css">
</head>
<body class="upload upload-publish">
    <main>
        <div class="btn-go-home">
            <a href="/"><img src="/img/home.png" alt="home"></a>
        </div>
        <div class="board">
            <div class="txt-top">PUBLISHED</div>
            <div class="ttl-url">URL</div>
            <input type="text" value="{{url($sotre.'/ar/'.$ring_id)}}">
            <a href="{{url($sotre.'/ar/'.$ring_id)}}"><div class="btn btn-try">TRY</div></a>
        </div>
    </main>
</body>
</html>