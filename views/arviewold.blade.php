<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>AR fitting</title>

  <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <link rel='stylesheet' href='/hands/css/style.css?d=202112220942' />

  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>

  
  <script  src="https://docs.opencv.org/3.4/utils.js" ></script>
  <script src = "https://webrtc.github.io/adapter/adapter-5.0.4.js" type="text/javascript"></script>
</head>

<body>
  <div class="wrapper">
    <div class="video-wrap">
      <!-- <video  id = "myVideo" hidden class="input_video" playsinline="true" autoplay="true" muted="muted"></video>   -->
      <video  id = "myVideo" hidden src="/hands/right-sp.mp4" playsinline="true" autoplay="true" muted="muted"></video>
      <canvas hidden id = "origin_canvas"></canvas>
      <canvas id = "output_canvas" class="output_canvas" style="position: absolute; left: 0; top: 0; z-index: 0;"></canvas>
      <canvas id="threeJScanvasOutput" style="position: absolute; left: 0; top: 0; z-index: 1;"></canvas>
    </div>
    <input id="ring_url" value="{{$ring_url}}" type="hidden">
    <div id="left_menu" class="left-menu-wrapper">
      <div class="left-menu-inner">
          <div class="left-menu-wrap">
              <ul>
                  <li>
                      <a id="ring" href="#">           
                          <img src="/hands/images/ring.svg" alt="Ring Icon" />     
                          <div class="left-txt">デザイン</div>
                      </a>
                  </li>
                  <li>
                      <a id="dyamond" href="#">           
                          <img src="/hands/images/diamond.svg" alt="Diamond Icon" />     
                          <div class="left-txt">誕生石</div>
                      </a>
                  </li>
                  <li>
                      <a id="material" href="#">           
                          <img src="/hands/images/material.svg" alt="Material Icon" />     
                          <div class="left-txt">素材</div>
                      </a>
                  </li>
                  <li>
                      <a id="surface" href="#">           
                          <img src="/hands/images/surface.svg" alt="Surface Icon" />     
                          <div class="left-txt">表面仕上</div>
                      </a>
                  </li>
                  <li>
                      <a id="text" href="#">           
                          <img src="/hands/images/text.svg" alt="Text Icon" />     
                          <div class="left-txt">刻印</div>
                      </a>
                  </li>
              </ul>
          </div>
          <div id="left_text" class="main-wrap text-wrap">
              <div class="text-inner">
                  <input id="left_input_text" type="text" class="text-input" placeholder="12文字以内で記入して下さい">
              </div>                    
          </div>                                                  
      </div>                       
    </div>

    <div class="btn-group">      
      <button class="show-btn btn" id="show_hide" onclick = "isShow();" style="position: relative; z-index: 2;">
        <img class="show-img active" src="/hands/images/hide.png" alt="">
        <img class="show-img" src="/hands/images/show.png" alt="">
      </button>
    </div>
  </div>
  
</body>
</html>
<script src="/js/three.js"></script>
<script src="/js/loaders/GLTFLoader.js"></script>
<script src="/js/OrbitControls.js"></script>
<script src="/hands/js/main.js"></script>
<script async onload = "cvReady()" src="https://docs.opencv.org/4.5.0/opencv.js" type="text/javascript"></script>


