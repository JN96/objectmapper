@extends('layouts.plane')

@section('body')
<div id="wrapper">

    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            {{ (Request::is('*dashboard') ? 'class="active"' : '') }}
            <a class="navbar-brand" href="{{ url ('dashboard') }}">Object Mapper</a>
        </div>
        <!-- /.navbar-header -->

        <ul class="nav navbar-top-links navbar-right">
            <!-- User name and logout -->
            <!-- Right Side Of Navbar -->
            <!-- <ul class="nav navbar-nav navbar-right"> -->
                <!-- Authentication Links -->
                @guest
                <li><a href="{{ route('login') }}">Login</a></li>
                <li><a href="{{ route('register') }}">Register</a></li>
                @else
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                        {{ Auth::user()->name }} <span class="caret"></span>
                    </a>

                    <ul class="dropdown-menu" role="menu">
                        <li>
                            <a href="{{ route('logout') }}"
                            onclick="event.preventDefault();
                            document.getElementById('logout-form').submit();">
                            Logout
                        </a>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                    </li>
                </ul>
            </li>
            @endguest

            @extends('layouts.sidenav')
        </nav>


        <div id="page-wrapper">
            <div class="row">
                <div class="col-xs-5">
                    <h1 class="page-header">@yield('page_heading')</h1>
                    <h2>User Details</h2>
                    <form id="userDetailsForm" class="form-horizontal" action="{{ action('AccountController@update') }}" method="POST">
                        @if(session()->has('message'))
                        <div class="alert alert-success">
                            {{ session()->get('message') }}
                        </div>
                        @else
                        <div class="alert alert-warning">
                            {{ Session::get('error') }}
                        </div>
                        @endif
                        <div class="form-group">
                            <label class="control-label col-sm-2">Name:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="name" name="name" placeholder="" value="{{ Auth::user()->name }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2">Email:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="email" name="email" placeholder="" value="{{ Auth::user()->email}}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-2">User Level: **DOES NOTHING**</label>
                            <div class="col-sm-10">
                                <select type="text" class="form-control" id="userLevel" name="userLevel" placeholder="" value="">
                                    <option value="administrator">Administrator</option>
                                    <option value="user">User</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button id="editUserSubmit" type="submit" class="btn btn-default">Submit</button>
                            </div>
                        </div>
                        {{ csrf_field() }}
                    </form>

                </div>
                <!-- /.col-lg-12 -->

                <div class="col-md-3">
                    <h1 class="page-header">@yield('page_heading')</h1>
                    <h3>List of users</h3>
                </div>
            </div>
            <div class="row">  
                @yield('section')
            </div>
            <!-- /#page-wrapper -->
        </div>
    </div>
    @stop

