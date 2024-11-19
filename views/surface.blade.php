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
    <title>Material</title>
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/upload.css">
    <link rel="stylesheet" href="/css/responsive.css">
</head>
<body class="upload upload-material">
    <input id="ring_id" value="{{$ring_id}}" type="hidden">
    <input id="surface" value="{{$surface}}" type="hidden">
    <input type="hidden" id="_token" value="<?php echo csrf_token()?>"/> 
    <main>
        <div class="btn-go-home">
            <a href="/"><img src="/img/home.png" alt="home"></a>
        </div>
        <div class="board">
            <div class="txt-top">リングに反映する素材を選択してください</div>
            <div class="box-material" id="surface-box">
                <div class="item-material">
                    <div class="img-material">
                    </div>
                    <div class="name-material">SILVER</div>
                </div>
                <div class="item-material">
                    <div class="img-material">
                    </div>
                    <div class="name-material">BRASS</div>
                </div>
                <div class="item-material">
                    <div class="img-material">
                    </div>
                    <div class="name-material">PINK GOLD</div>
                </div>
                <div class="item-material">
                    <div class="img-material">
                    </div>
                    <div class="name-material">18K GOLD</div>
                </div>
                <div class="item-material item-material-active">
                    <div class="img-material">
                    </div>
                    <div class="name-material">PLATINUM</div>
                </div>
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
                <a  href="{{url('/stone/'.$ring_id)}}">
                    <div class="circle-flow"></div>
                    <div class="txt-circle-flow">STONE</div>
                </a>
            </div>
            <div class="bar-flow"></div>
            <div class="item-flow">
                <div class="circle-flow circle-flow-active"></div>
                <div class="txt-circle-flow">METARIAL</div>
            </div>
            <div class="btn btn-next btn-next-active" id="submit">PUBLISH</div>
        </div>
    </main>
</body>
<script src="/js/surface.js?20230630"></script>
</html>