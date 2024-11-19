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
    <title>Stone</title>
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/upload.css">
    <link rel="stylesheet" href="/css/responsive.css">
</head>
<body class="upload upload-stone">
    <input id="ring_id" value="{{$ring_id}}" type="hidden">
    <input id="stone" value="{{$stone}}" type="hidden">
    <input type="hidden" id="_token" value="<?php echo csrf_token()?>"/> 
    <main>
        <div class="btn-go-home">
        <a href="/"><img src="/img/home.png" alt="home"></a>
        </div>
        <div class="board">
            <div class="txt-top">リングに反映する石のカラーを選択してください</div>
            <div class="box-stone" id="stone-box">
            </div>
        </div>
        <div class="flow">
            <div class="item-flow">
                <a  href="{{url('/update/'.$ring_id)}}">
                    <div class="circle-flow"></div>
                    <div class="txt-circle-flow">UPLOAD</div>
                </a>
            </div>
            <div class="bar-flow"></div>
            <div class="item-flow">
                <div class="circle-flow circle-flow-active"></div>
                <div class="txt-circle-flow">STONE</div>
            </div>
            <div class="bar-flow"></div>
            <div class="item-flow">
                <a  href="{{url('/surface/'.$ring_id)}}">
                    <div class="circle-flow"></div>
                    <div class="txt-circle-flow">METARIAL</div>
                </a>                
            </div>
            <div class="btn btn-next btn-next-active" id="submit">Next</div>
        </div>
    </main>
</body>
<script src="/js/stone.js?20230630"></script>
</html>