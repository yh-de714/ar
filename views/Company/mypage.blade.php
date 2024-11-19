@extends('layouts.mypage')
@section('content')
        @if(Auth::user()->banner_image=="")
        <section class="company-banner" style="background-image: url({{asset('images/compay-banner.png')}})">
        @else
        <section class="company-banner" style="background-image: url({{asset('uploads/'.Auth::user()->banner_image)}})">
        @endif
            <form method="POST" action="/mypage" enctype="multipart/form-data" id="banner-form">
                @csrf
                <input type="file" id="banner-image" name="banner-image" style="visibility:hidden" onchange="document.getElementById('banner-form').submit();" accept=".jpg, .png, .jpeg, .gif, .bmp"/>
                <button type="button" onclick="document.getElementById('banner-image').click()" class="btn img-edit-btn"><img src="{{asset('images/icon-edit-img.png')}}" alt=""></button>
            </form>
            
            <div class="company-profile-img">
                @if(Auth::user()->image_file=="")
                <img src="{{asset('images/compay-profile.png')}}" alt="">
                @else
                <img src="{{asset('uploads/'.Auth::user()->image_file)}}" alt="">
                @endif
                
                <button type="button" class="btn img-edit-btn" onclick="document.getElementById('avatar-image').click()" ><img src="{{asset('images/icon-edit-img.png')}}" alt=""></button>
            </div>
            
            <form method="POST" action="/mypage" enctype="multipart/form-data" id="avatar-form">
                @csrf
                <input type="file" id="avatar-image" name="avatar-image" style="visibility:hidden" onchange="document.getElementById('avatar-form').submit();" accept=".jpg, .png, .jpeg, .gif, .bmp"/>
            </form>
        </section>
        <section class="company-main">
            <div class="search-tab-con company-tab-con">
                <div class="search-tab-header"></div>
                <div class="search-tab-cover">
                    <div class="search-tabs company-tabs company-tabs-user-company">
                        <div class="search-tab-list flex-c-c active" onclick="window.location.assign('/mypage')">
                            会社情報
                        </div>
                        <div class="search-tab-list flex-c-c ">
                            制作実績
                        </div>
                        <div class="search-tab-list flex-c-c">
                            ブログ
                        </div>
                        <div class="search-tab-list flex-c-c" onclick="window.location.assign('/mypage/settings')">
                            設定
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-content company-content">
                <div class="company-top-content">
                    <div class="company-top-content-header">
                        {{Auth::user()->company}}
                    </div>
                    <div class="company-top-content-main">
                        {{Auth::user()->profile}}
                    </div>
                    <div class="company-info">
                        <div>設立 : {{Auth::user()->establishment_date}}</div>
                        <div>代表取締役 : {{Auth::user()->ceo}}</div>
                        <div>所在地 : {{Auth::user()->address}}</div>
                        <div>WEB : <a href="{{Auth::user()->webpage}}" target="_blank">{{Auth::user()->webpage}}</a></div>
                    </div>
                    <div class="company-top-content-footer flex-sb-c">
                        <button class="btn green-btn">レーザー加工</button>
                        <button class="btn green-btn">メッキ</button>
                        <button class="btn green-btn">塗装</button>
                    </div>
                </div>
            </div>
        </section>
@endsection