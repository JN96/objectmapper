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

<!--  <ul class="dropdown-menu dropdown-user">
                        <li><a href="#"><i class="fa fa-user fa-fw"></i> User Profile</a>
                        </li>
                        <li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a>
                        </li>
                        <li class="divider"></li>
                        <li><a href="{{ url ('login') }}"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                        </li>
                    </ul> -->
                    <!-- /.dropdown-user -->
                    <!-- </li> -->
                    <!-- /.dropdown -->
                    <!-- </ul> -->
                    <!-- /.navbar-top-links -->

                    @extends('layouts.sidenav')
                    <!-- /.navbar-static-side -->
                </nav>

                <div id="page-wrapper">
                    <div class="row">
                        <div class="col-lg-12">

                            <h1 class="page-header">@yield('page_heading')</h1>
                            <h2>charts page</h2>

                        </div>
                        <!-- /.col-lg-12 -->
                    </div>
                    <div class="row">  
                        @yield('section')
                    </div>
                    <!-- /#page-wrapper -->
                </div>
            </div>
            @stop

