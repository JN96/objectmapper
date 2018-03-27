<?php

namespace App\Http\Controllers;
// use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\User;
use Session;
use Request;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function index()
    {
        // $user = Auth::user();
        // // print($user->id);
        // print($user->name);
        // print($user->email);
        // // var_dump($user);
        // // die();
        return view('account');


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {


    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        $user->name = Request::input('name');
        $user->email = Request::input('email');
        $user->update();
        // return redirect()->back()->withSuccess('message','User successfully updated.');

        Session::flash('message', 'Successfully updated user');
        return view('account');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

    }
}


