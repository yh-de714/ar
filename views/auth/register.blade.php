
          
@section('body-class',"auth-register")
@extends('layouts.auth')
@section('content')
<main>
        <h2 class="subttl">アカウント作成</h2>
        <div class="box-right">
            <form class="account-form signup-form" method="POST" action="{{ route('register') }}">
            @csrf
                <div class="ttl-input">メールアドレス</div>
                <input id="email" type="email" name="email" value="{{old('email')}}" required autocomplete="off"  placeholder="">
                <div class="input-error">
                    @if($errors->has('email'))
                        <div class="error">正しいメールを入力してください</div>
                    @endif
                </div>

                <div class="ttl-input">パスワード</div>                
                <input  id="password" type="password" name="password" required autocomplete="new-password">
                
                <div class="ttl-input">ストアURL</div>                
                https://encode-koala.com/ <input class="form-input-store" value="{{old('store')}}"  id="store" type="text" name="store" required autocomplete="new-password">
                <div class="input-error">
                    @if($errors->has('store'))
                        <div class="error">これは必須フィールドです</div>
                    @endif
                </div>
                
                <button class="btn">アカウント作成</button>
                <div class="btn-go-login"><a href="/login">ログインはこちら ></a></div>
            </form>
        </div>
    </main>
    <footer>By EncodeRing Inc.</footer>
@endsection
