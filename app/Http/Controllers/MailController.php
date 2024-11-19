<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Mail;
use Illuminate\Support\Facades\Redirect;

class MailController extends Controller
{
    public function contact(Request $req)
    {
        $query = $req->all();
        Mail::to($query['email'])->send(new \App\Mail\ContactMail($query));
        Mail::to('info@ficlothe.com')->send(new \App\Mail\ContactMail($query));
        echo "true"; 
    }

    public function order(Request $req)
    {
        $query = $req->all();
        Mail::to($query['email'])->send(new \App\Mail\OrderMail($query));
        Mail::to('info@ficlothe.com')->send(new \App\Mail\OrderMail($query));
        echo "true"; 
    }
    
}