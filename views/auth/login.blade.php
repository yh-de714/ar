          
@section('body-class',"auth-login")
@extends('layouts.auth')
@section('content')
    <main>
        <h2 class="subttl">ログイン</h2>
        <div class="box-right">
            <form class="account-form login-form" method="POST" action="{{ route('login') }}">
            @csrf
                <div class="ttl-input">メールアドレス</div>
                
                <input autocomplete="off" id="email" name="email" type="text" placeholder="" value="{{old('email')}}" required autofocus>
                <div class="input-error">
                    @if($errors->has('email'))
                        <div class="error">正しいメールアドレスを入力してください。</div>
                    @endif
                </div>
                <div class="ttl-input">パスワード</div>
                <input  autocomplete="off" id="password" name="password" type="password" placeholder=""  value="{{old('password')}}" required autocomplete="current-password">
                <div class="input-error">
                    @if($errors->has('password'))
                        <div class="error">パスワードを正確に入力してください。</div>
                    @endif
                </div>
                <button class="btn">ログイン</button>
                <div class="btn-go-register"><a href="/register">アカウントの作成はこちら  > </a></div>
                <div class="btn-go-pwd"><a href="/forgot-password">パスワードの再設定はこちら ></a></div>
            </form>
        </div>
    </main>
    <footer>By EncodeRing Inc.</footer>
@endsection

