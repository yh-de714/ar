<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ものづくり会</title>
    <link rel="stylesheet" href="{{asset('css/style.css')}}">
    <script src="{{asset('js/main.js')}}"></script>
</head>
<body>
    <div>
        <section class="top-header">
            <div class="header" id="top_menu">
                <div class="flex-c-c">
                    <div class="logo">
                        <a href="/"><img src="{{asset('images/logo.png')}}" alt=""></a>
                    </div>
                    <div class="nav-link">
                        <a href="#">作る物から探す</a>
                    </div>
                    <div class="nav-link">
                        <a href="#">加工方法から探す</a>
                    </div>
                </div>
                <div>
                    <div class="login-btn">
                        <button onclick="window.location.assign('/logout')" class="btn"><img style="width:40px" src="{{asset('images/icon-login.png')}}" alt="">ログアウト</button>
                    </div>
                </div>
            </div>
            <div class="menu-toggle-btn _sp" id="menu_toggle_btn" onclick="toggleMenu()" >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="_sp">
                <div class="header-sp">
                    <div class="logo">
                        <a href="/"><img src="{{asset('images/logo.png')}}" alt=""></a>
                    </div>
                </div>
            </div>
        </section>
        @yield('content')
        <section class="footer flex-c-c">
            日本ものづくり会
        </section>
    </div>
</body>
</html>