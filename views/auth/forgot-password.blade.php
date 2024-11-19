<!-- 
       

        <div class="mb-4 text-sm text-gray-600">
            {{ __('Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.') }}
        </div>

       
        <x-auth-session-status class="mb-4" :status="session('status')" />

    
        <x-auth-validation-errors class="mb-4" :errors="$errors" />

        <form method="POST" action="{{ route('password.email') }}">
            @csrf

        
            <div>
                <x-label for="email" :value="__('Email')" />

                <x-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus />
            </div>

            <div class="flex items-center justify-end mt-4">
                <x-button>
                    {{ __('Email Password Reset Link') }}
                </x-button>
            </div>
        </form>



    --> 
             
@section('body-class',"auth-pwd")
@extends('layouts.auth')
@section('content')
    <main>
        <h2 class="subttl">パスワード再設定</h2>
        <div class="box-right">
            <form action=""  method="POST" action="{{ route('password.email') }}">
                @csrf
                <div class="ttl-input" >メールアドレス</div>
                <input type="text" id="email"  name="email" value="{{old('email')}}">
                <button class="btn">設定用メールを送る</button>
            </form>
            
        </div>
    </main>
    <footer>By EncodeRing Inc.</footer>
@endsection


