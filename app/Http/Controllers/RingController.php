<?php

namespace App\Http\Controllers;
use Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Ring;
class RingController extends Controller
{
    public function upload_view(Request $req){
        if(Auth::user()){
            return view(
                "upload",[
                    "ring_id"=>"null",
                    "ring_name"=>"null",
                    "ring_model"=>"null",
                    "ring_image"=>"null",
                    "store"=>"null",
                    "ring_published"=>false
                ]
            );
        }
        else{
            return redirect('/');
        }
    }

    public function update_view($id){
        if(Auth::user()){
            $ring = Ring::where('id' , '=' , $id )->get();
            if($ring[0])
            {
                return view("upload", [
                    "ring_id"=>$ring[0]->id,
                    "ring_name"=>$ring[0]->name,
                    "ring_model"=>$ring[0]->filename,
                    "ring_image"=>$ring[0]->image,
                    "store"=>Auth::user()->store,
                    "ring_published"=>$ring[0]->published
                ]); 
            }
            else{
                return redirect('/');
            }
        }
        else{
            return redirect('/');
        }
    }

    public function list(Request $req){
        if(Auth::user()){
            $user = Auth::user();
            $rings = Ring::where('user_id' , '=' , auth()->user()->id )->get();
            return Response::json([
                'success' => true,
                'rings'=> $rings
            ], 200);
        }
        else{
            return redirect('/');
        }
    }

    //
    public function upload(Request $req)
    {
        if(Auth::user()){
            if ($req->hasFile("model")) {
                $user = Auth::user();
                $file = $req->file('model');
                $filename = md5(uniqid(rand(), true));
                $destinationPath = 'uploads';
                $ext = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
                $file->move($destinationPath, $filename.".".$ext);
                $ring = new Ring();
                $ring->name = $req->name;
                $ring->user_id = auth()->user()->id;
                $ring->filename = $filename.".".$ext;
                if($req->hasFile("image")){
                    $image = $req->file('image');
                    $imagename = md5(uniqid(rand(), true));
                    $image_destinationPath = 'uploads';
                    $image_ext = pathinfo($image->getClientOriginalName(), PATHINFO_EXTENSION);
                    $image->move($image_destinationPath, $imagename.".".$image_ext);
                    $ring->image = $imagename.".".$image_ext;
                }
                $ring->save();
                return Response::json([
                    'success' => true,
                    'id'=>$ring->id,
                    'stone'=>$ring->stone
                ], 200);
            }
        }
        else{
            return redirect('/');
        }
    }

    public function update(Request $req){
        if(Auth::user()){
            $id = $req->id;
            $ring = Ring::where('id' , '=' , $id )->get();
            
            if(!$ring[0])
                return redirect('/');
            else{
                $ring[0]->name = $req->name;
                if ($req->hasFile("model")) {
                    $file = $req->file('model');
                    $filename = md5(uniqid(rand(), true));
                    $destinationPath = 'uploads';
                    $ext = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
                    $file->move($destinationPath, $filename.".".$ext);
                    $ring[0]->filename = $filename.".".$ext;
                }
                if($req->hasFile("image")){
                    $image = $req->file('image');
                    $imagename = md5(uniqid(rand(), true));
                    $image_destinationPath = 'uploads';
                    $image_ext = pathinfo($image->getClientOriginalName(), PATHINFO_EXTENSION);
                    $image->move($image_destinationPath, $imagename.".".$image_ext);
                    $ring[0]->image = $imagename.".".$image_ext;
                }
                $ring[0]->save();
                return Response::json([
                    'success' => true,
                    'id'=>$ring[0]->id,
                    'stone'=>$ring[0]->stone
                ], 200);
            }
        }
        else{
            return redirect('/');
        }
    }

    public function stone_customize($id){
        if(Auth::user()){
            $ring = Ring::where('id' , '=' , $id )->get();
            if($ring[0])
            {
                return view("stone", [
                    'sotre'=>Auth::user()->store,
                    "ring_id"=>$ring[0]->id,
                    'stone'=>$ring[0]->stone
                ]); 
            }
            else{
                return redirect('/');
            }
        }
        else{
            return redirect('/');
        }
    }

    public function surface_customize($id){
        if(Auth::user()){
            $ring = Ring::where('id' , '=' , $id )->get();
            if($ring[0])
            {
                return view("surface", [
                    'sotre'=>Auth::user()->store,
                    "ring_id"=>$ring[0]->id,
                    'surface'=>$ring[0]->surface
                ]); 
            }
            else{
                return redirect('/');
            }
        }
        else{
            return redirect('/');
        }
    }

    public function publish($id){
        if(Auth::user()){
            $ring = Ring::where('id' , '=' , $id )->get();
            if($ring[0])
            {
                return view("publish", [
                    'sotre'=>Auth::user()->store,
                    "ring_id"=>$ring[0]->id
                ]); 
            }
            else{
                return redirect('/');
            }
        }
        else{
            return redirect('/');
        }
    }

    public function set_stone(Request $req){
        if(Auth::user()){
            $id = $req->ring_id;
            $ring = Ring::where('id' , '=' , $id )->get();
            if($ring[0]){
                $ring[0]->stone = $req->stone;
                $ring[0]->save();
                return Response::json([
                    'success' => true,
                    'id'=>$ring[0]->id
                ], 200);
            }
            else{
                return redirect('/');
            }
        }
        else{
            return redirect('/');
        }
           
    }

    public function set_surface(Request $req){
        if(Auth::user()){
            $id = $req->ring_id;
            $ring = Ring::where('id' , '=' , $id )->get();
            if($ring[0]){
                $ring[0]->surface = $req->surface;
                $ring[0]->published = true;
                $ring[0]->save();
                return Response::json([
                    'success' => true,
                    'id'=>$ring[0]->id
                ], 200);
            }
            else{
                return redirect('/');
            }
        }
        else{
            return redirect('/');
        }
    }

    public function ar_view($store, $id) {
        $ring = Ring::where('id' , '=' , $id )->get();
        
        if($ring[0])
        {
            $user = User::where('id' ,'=', $ring[0]->user_id)->get();
            if($user[0] && $user[0]->store==$store){
                return view("arview", [
                    "ring_id"=>$ring[0]->id,
                    "ring_url"=>$ring[0]->filename,
                    "ring_stone"=>$ring[0]->stone,
                    "ring_surface"=>$ring[0]->surface,
                ]);
            }
            else{
                abort(404);
            }
            
        }
        else{
            return redirect('/');
        }
    }

    public function delete($id){
        $rings = Ring::where('id' , '=' , $id )->delete();
        return Response::json([
            'success' => true
        ], 204);
    }

    
}
