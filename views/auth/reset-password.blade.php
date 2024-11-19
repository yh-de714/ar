
@section('body-class',"auth-pwd")
@extends('layouts.auth')
@section('content')
    <main>
        <h2 class="subttl">パスワード再設定</h2>
        <div class="box-right">
            <form method="POST" action="{{ route('password.update') }}">
                @csrf
                <div class="ttl-input">新パスワード</div>
                <input type="hidden" name="token" value="{{ $request->route('token') }}">
                <input type="hidden"  id="email" type="email" name="email" value="{{old('email', $request->email)}}" required />
                <input type="password" id="password" type="password" name="password" required>                
                <div class="ttl-input">新パスワード確認用</div>
                <input type="password" id="password_confirmation" 
                                    name="password_confirmation" required>
                <button class="btn">パスワードを再設定</button>
            </form>
            {{$errors}}
        </div>
    </main>
    <footer>By EncodeRing Inc.</footer>
@endsection