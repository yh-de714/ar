@section('body-class',"upload-index")
@extends('layouts.upload')
@section('content')
<input type="hidden" id="_token" value="<?php echo csrf_token()?>"/>
<input type="hidden" id="ring_id" value="{{$ring_id}}" />
<input type="hidden" id="ring_model" value="{{$ring_model}}" />
<input type="hidden" id="ring_image" value="{{$ring_image}}" />
<input type="hidden" id="ring_name" value="{{$ring_name}}" />
<input type="hidden" value="{{url('/')}}" id="url" name="url" />
<main id="ring_upload">
    <div class="btn-go-home">
        <a href="/"><img src="/img/home.png" alt="home"></a>
    </div>
    
        <div class="box-info">
            <div class="row">
                <div class="left">Name</div>
                <input type="text" id="name" name="name">
            </div>
            <div class="row">
                <div class="left">Image</div>
                <input type="file" hidden id="image" name="image"  accept="image/png, image/jpeg">
                <img src="/img/no_image.png" alt="ring" id="image-ref">
            </div>
        </div>
    <input type="file" hidden id="ring" name="ring" accept=".glb"/>
    <div class="board" id="ring-ref">        
        <div class="txt-center" >
            3Dモデルを選択<br><br>
            or<br><br>
            3Dモデルをここにドラッグ<br><br><br><br>
            ファイル形式 : glb
        </div>
    </div>
    <div class="board board-full d-none" id="main_viewer">
    </div>
    <div class="flow">
        <div class="item-flow">
            <div class="circle-flow circle-flow-active"></div>
            <div class="txt-circle-flow">UPLOAD</div>
        </div>
        <div class="bar-flow"></div>
        <div class="item-flow">
         @if($ring_id !="null")
            <a  href="{{url('/stone/'.$ring_id)}}">
                <div class="circle-flow"></div>
                <div class="txt-circle-flow">STONE</div>
            </a>
            @else
                <div class="circle-flow"></div>
                <div class="txt-circle-flow">STONE</div>
            @endif
        </div>
        <div class="bar-flow"></div>
        <div class="item-flow">
            @if($ring_id !="null")
            <a  href="{{url('/surface/'.$ring_id)}}">
                <div class="circle-flow"></div>
                <div class="txt-circle-flow">METARIAL</div>
            </a>
            @else
                <div class="circle-flow"></div>
                <div class="txt-circle-flow">METARIAL</div>
            @endif
        </div>
        <button class="btn btn-next" id="submit">Next</button>
    </div>
    @if($ring_published)
    <div class="btn-box">
        <input type="text" value="{{url($store.'/ar/'.$ring_id)}}">
        <a href="{{url($store.'/ar/'.$ring_id)}}"><div class="btn">TRY</div></a>
    </div>
    @endif
</main>
<div class="loader">
    <div class="loading"></div>
</div>
<script src="/js/upload.js?20230630"></script>
@endsection