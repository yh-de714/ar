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
    <!--Three.js scripts-->
   <script src="/js/three.js"></script>
    <script src="/js/Projector.js"></script>
    <script src="/js/Detector.js"></script>

    <script src="/js/loaders/MTLLoader.js"></script>
    <script src="/js/loaders/OBJLoader.js"></script>
    <script src="/js/loaders/ColladaLoader.js"></script>
    <script src="/js/loaders/inflate.min.js"></script>
    <script src="/js/loaders/FBXLoader.js"></script>
    <script src="/js/loaders/GLTFLoader.js"></script>
    <script src="/js/loaders/STLLoader.js"></script>
    <script src="/js/loaders/DDSLoader.js"></script>

    <script src="/js/OrbitControls.js"></script>
    <script src="/js/TransformControls.js"></script>

    <script src="/js/THREEx.FullScreen.js"></script>
    <script src="/js/THREEx.WindowResize.js"></script>
    <script src="/js/screenfull.min.js"></script>


    <script src="/js/effects/EffectComposer.js"></script>
    <script src="/js/effects/ShaderPass.js"></script>
    <script src="/js/effects/RenderPass.js"></script>
    <script src="/js/effects/CopyShader.js"></script>
    <script src="/js/effects/OutlinePass.js"></script>
    <script src="/js/effects/FXAAShader.js"></script>


    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/upload.css">
    <link rel="stylesheet" href="/css/responsive.css">
</head>
<body class="upload @yield('body-class')">
    @yield("content")   
</body>

</html>