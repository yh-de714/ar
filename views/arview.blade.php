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
    <title>Camera</title>
    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/camera.css?20230630">
    <link rel="stylesheet" href="/css/responsive.css">
    
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel='stylesheet' href='/hands/css/style.css?d=202112220942' />

    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>
    
    <script src="/kalman-filter.min.js"></script>

    <script  src="https://docs.opencv.org/4.7.0/utils.js" ></script>
    <script src = "https://webrtc.github.io/adapter/adapter-5.0.4.js" type="text/javascript"></script>
</head>

<body class="camera">
    <div class="video-wrap">
      <video  id = "myVideo" hidden class="input_video" playsinline="true" autoplay="true" muted="muted"></video>  
      <!-- <video src="/merge.mp4"  id = "myVideo" hidden playsinline="true" autoplay="true" muted="muted"></video> -->
      <canvas hidden id = "origin_canvas"></canvas>
      <canvas hidden id = "process_canvas"></canvas>
      <canvas id = "output_canvas" class="output_canvas" style="position: absolute; left: 0; top: 0; z-index: 0;"></canvas>
      <canvas id="threeJScanvasOutput" style="position: absolute; left: 0; top: 0; z-index: 0; width:100vw; height: 100"></canvas>
    </div>
    <!-- <a href="/"><img src="/images/close.png" alt="close" class="btn-close"></a> -->
    
    <input id="ring_url" value="{{$ring_url}}" type="hidden">
    <input id="ring_stone" value="{{$ring_stone}}" type="hidden">
    <input id="ring_surface" value="{{$ring_surface}}" type="hidden">

    <div class="box-bottom box-btn show">
        <img src="/images/stone.png" alt="stone" id="stone-select">
        <img src="/images/ring.png" alt="material" id="material-select">
        <!-- <img src="/images/camera.png" alt="camera" id="capture"> -->
    </div>
    <div class="box-bottom box-stone">
        <div class="innerbox-stone" id="stone-box">
        </div>
    </div>
    <div class="box-bottom box-material" id="surface-box">
    </div>
    <div class="bg-modal d-none">
        <div class="modal">
            <img src="/img/photo.png" alt="photo" class="photo">
            <div class="box-share">
                <div class="ttl-box">SHARE</div>
                <div class="box-link">
                    <img src="/img/link-twitter.png" alt="twitter">
                    <img src="/img/link-facebook.png" alt="facebook">
                    <img src="/img/link-line.png" alt="line">
                </div>
            </div>
        </div>
    </div>
</body>
<script src="/js/three.js"></script>

<script src="/js/loaders/GLTFLoader.js"></script>
<script src="/js/OrbitControls.js"></script>
<script src="/hands/js/main.js?20230712"></script>
<script async onload = "cvReady()" src="https://docs.opencv.org/4.7.0/opencv.js" type="text/javascript"></script>
</html>