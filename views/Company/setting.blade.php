@extends('layouts.mypage')
@section('content')
        @if(Auth::user()->banner_image=="")
        <section class="company-banner" style="background-image: url({{asset('images/compay-banner.png')}})">
        @else
        <section class="company-banner" style="background-image: url({{asset('uploads/'.Auth::user()->banner_image)}})">
        @endif
            <div class="company-profile-img">
                @if(Auth::user()->image_file=="")
                <img src="{{asset('images/compay-profile.png')}}" alt="">
                @else
                <img src="{{asset('uploads/'.Auth::user()->image_file)}}" alt="">
                @endif
            </div>
            
        </section>
        <section class="company-main">
            <div class="search-tab-con company-tab-con">
                <div class="search-tab-header"></div>
                <div class="search-tab-cover">
                    <div class="search-tabs company-tabs company-tabs-user-company">
                        <div class="search-tab-list flex-c-c" onclick="window.location.assign('/mypage')">
                            会社情報
                        </div>
                        <div class="search-tab-list flex-c-c ">
                            制作実績
                        </div>
                        <div class="search-tab-list flex-c-c">
                            ブログ
                        </div>
                        <div class="search-tab-list flex-c-c active" onclick="window.location.assign('/mypage/settings')">
                            設定
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-content company-content">
                <div class="company-content">
                    <div class="company-content-header">
                        設定
                    </div>
                    <form method="POST" action="/mypage">
                        @csrf
                        <div class="company-setting-content">
                            <div class="company-setting-input-con">
                                <label for="company">会社名</label>
                                <input type="text" name="company" id="company" value={{Auth::user()->company}}>
                            </div>
                            <div class="company-setting-input-con">
                                <label for="profile">プロフィール</label>
                                <textarea name="profile" id="profile">{{Auth::user()->profile}}</textarea>
                            </div>
                            <div class="company-setting-input-con">
                                <label for="establishment_date">設立年月日</label>
                                <input type="date" name="establishment_date" id="establishment_date" value={{Auth::user()->establishment_date}}>
                            </div>
                            <div class="company-setting-input-con">
                                <label for="ceo">代表取締役</label>
                                <input type="text" name="ceo" id="ceo" value={{Auth::user()->ceo}}>
                            </div>
                            <div class="company-setting-input-con">
                                <label for="address">所在地</label>
                                <input type="text" id="address" name="address" value={{Auth::user()->address}}>
                            </div>
                            <div class="company-setting-input-con">
                                <label for="webpage">WEB</label>
                                <input type="text" id="webpage", name="webpage" value={{Auth::user()->webpage}}>
                            </div>
                            <div class="company-setting-input-con">
                                <label for="special1">得意な加工1位</label>
                                <select name="special1" id="special1">
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="company-setting-input-con">
                                <label for="special2">得意な加工2位</label>
                                <select name="special2" id="special2">
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="company-setting-input-con">
                                <label for="special3">得意な加工3位</label>
                                <select name="special3" id="special3">
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="setting-submit-btn">
                                <button class="btn green-btn">保存する</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
@endsection