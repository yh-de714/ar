@section('body-class',"main-index")
@extends('layouts.app')
@section('content')
<input type="hidden" id="_token" value="<?php echo csrf_token()?>"/> 
<div class="sidebar">
        <div class="logo">ENCODE Koala (β)</div>
        <a href="/upload"><div class="btn btn-upload"> UPLOAD</div></a>
        <div class="btn btn-myring">My Ring</div>
        <div class="txt-comingsoon">Plugin “Coming Soon”</div>
    </div>
    <main>
        <form method="POST" action="{{ route('logout') }}">
                @csrf
        <div class="box-btn-account">
            <div class="btn btn-account">アカウント</div>
            <div class="nav-account">
                <a href="/mypage/settings"><div class="item-nav-account">アカウント情報</div></a>
                <button class="item-nav-account"><div class="item-nav-account">ログアウト</div></button>             
            </div>
        </div>
        </form>
        <h2 class="subttl">My Ring</h2>
        <div class="board board-empty ">
            まだプロジェクトがありません。
            <br>
            3Dモデルをアップロードしましょう。
        </div>
        <div class="board board-full d-none" id="rings-box">
        </div>
    </main>
    <script src="/js/home.js?20230630"></script>
@endsection
