<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Storage;
use Illuminate\Support\Facades\File; 
class UserController extends Controller
{
    public function show(Request $req)
    {
        if(Auth::user()){
            if(Auth::user()->type==1){
                return view("Company.mypage");
            }
            else{
                return view("User.mypage"); 
            }
        }
        else{
            return redirect('/');
        }
        
    }

    public function settings(Request $req){
        if(Auth::user()){
            return view("User.setting"); 
        }
        else{
            return redirect('/');
        }
    }

    public function updateProfile(Request $req){
        // $storage = Storage::disk('image_p');
        $user = Auth::user();
        if ($req->hasFile("banner-image")) {
            if($user->banner_image){
                if(File::exists('uploads/'.$user->banner_image)){
                    File::delete('uploads/'.$user->banner_image);
                }
            }
            $file = $req->file('banner-image');
            $filename = md5(uniqid(rand(), true));
            $destinationPath = 'uploads';
            $ext = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
            $file->move($destinationPath, $filename.".".$ext);
            $user->banner_image = $filename.".".$ext;
            
        }

        if ($req->hasFile("avatar-image")) {
            if($user->image_file){
                if(File::exists('uploads/'.$user->image_file)){
                    File::delete('uploads/'.$user->image_file);
                }
            }
            $file = $req->file('avatar-image');
            $filename = md5(uniqid(rand(), true));
            $destinationPath = 'uploads';
            $ext = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
            $file->move($destinationPath, $filename.".".$ext);
            $user->image_file = $filename.".".$ext;
        }
        if($req->establishment_date){
            $user->establishment_date = $req->establishment_date;
        }
        if($req->ceo){
            $user->ceo = $req->ceo;
        }
        if($req->address){
            $user->address = $req->address;
        }
        if($req->special1){
            $user->special1 = $req->special1;
        }
        if($req->special2){
            $user->special2 = $req->special2;
        }
        if($req->special3){
            $user->special3 = $req->special3;
        }
        if($req->profile){
            $user->profile = $req->profile;
        }
        if($req->webpage){
            $user->webpage = $req->webpage;
        }
        if($req->company){
            $user->company = $req->company;
        }
        $user->save();
        if(Auth::user()){
            if(Auth::user()->type==1){
                return view("Company.mypage");
            }
            else{
                return view("User.mypage"); 
            }
        }
        else{
            return redirect('/');
        }
    }

    public function download()
{
    $headers = [
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',   
            'Content-type'        => 'text/csv',   
            'Content-Disposition' => 'attachment; filename=users.csv',   
            'Expires'             => '0',
            'Pragma'              => 'public'
    ];

    $list = User::all()->toArray();

    # add headers for each column in the CSV download
    array_unshift($list, array_keys($list[0]));

   $callback = function() use ($list) 
    {
        $FH = fopen('php://output', 'w');
        foreach ($list as $row) { 
            fputcsv($FH, $row);
        }
        fclose($FH);
    };

    return response()->stream($callback, 200, $headers);
}


}