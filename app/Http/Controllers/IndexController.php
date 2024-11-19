<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index(Request $req)
    {
        if(Auth::user()){
            if(Auth::user()){
                return view("home");
            }
        }
        else{
            return view("top");
        }
        
    }
}
