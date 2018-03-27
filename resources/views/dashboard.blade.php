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
            <!-- <a class="navbar-brand" href="{{ url ('dashbaord') }}">Object Mapper</a> -->
            {{ (Request::is('*charts') ? 'class="active"' : '') }}
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
                        <div class="col-lg-9">
                            <br>
                            <!-- Gooogle Maps -->
                            @if(session()->has('message'))
                            <div class="alert alert-success">
                                {{ session()->get('message') }}
                            </div>
                            @else
                            <div class="alert alert-warning">
                                {{ Session::get('error') }}
                            </div>
                            @endif
                            <div id="searchDiv">
                                <label>Search Vehicles:</label>
                                <!-- <input type="text" id="markerInput" size="15"/> -->
                                <select  class="form" type='text' id='manufacturerSelect' >
                                    <option value="" disabled selected>Select manufacturer...</option>
                                    <option value="Audi">Audi</option>
                                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                                    <option value="Skoda">Skoda</option>
                                    <option value="Volkswagen">Volkswagen</option>
                                </select>
                                <select class="form" type="text" id="modelSelect" name="modelSelect" >
                                    <option value="" disabled selected>Select model...</option>
                                </select>
                                <input class="btn btn-sm btn-primary" type="button" id="searchButton" value="Search" onclick="searchMarkers()" />
                            </div>
                            <!-- <select id="locationSelect" style="width: 10%; visibility: hidden"></select> -->
                            <div id="map" height="460px" width="100%" >
                            </div>
                            <div id="form" class="formDetails" style="display: none">
                                <form action="{{ action('MarkerController@store') }}" method="POST">
                                    <table class="table-responsive">
                                        <tr>
                                            <td>Manufacturer:</td> 
                                            <td>
                                                <select class="form-control" type='text' name="manufacturer" id='manufacturer' required>
                                                    <option value="" disabled selected>Select manufacturer</option>
                                                    <option value="Audi">Audi</option>
                                                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                                                    <option value="Skoda">Skoda</option>
                                                    <option value="Volkswagen">Volkswagen</option>
                                                </select> 
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Model:</td> 
                                            <td>
                                                <select class="form-control" type='text' id='model' name="model" required> 
                                                    <option value="" disabled selected>Select model</option>
                                                </select>
                                            </td> 
                                        </tr>
                                        <tr>
                                            <td>Year:</td>
                                            <td>
                                                <select class="form-control" type='text' id='year' name="year" required> 
                                                    <option value="" disabled selected>Select year</option>
                                                    <option value="2006">2006</option>
                                                    <option value="2007">2007</option>
                                                    <option value="2008">2008</option>
                                                    <option value="2009">2009</option>
                                                    <option value="2010">2010</option>
                                                    <option value="2011">2011</option>
                                                    <option value="2012">2012</option>
                                                    <option value="2012">2012</option>
                                                    <option value="2013">2013</option>
                                                    <option value="2014">2014</option>
                                                    <option value="2015">2015</option>
                                                    <option value="2016">2016</option>
                                                    <option value="2017">2017</option>
                                                    <option value="2018">2018</option>
                                                </select>
                                            </td> 
                                        </tr>
                                        <tr>
                                            <td>Price:</td> 
                                            <td>
                                                <input type='text' id='price' class="form-control" name="price" placeholder="Enter price"/> 
                                            </td> 
                                        </tr>
                                        <tr>
                                            <td>Registration:</td> 
                                            <td>
                                                <input type='text' id='registration' class="form-control" name="registration" placeholder="Enter registration"/> 
                                            </td> 
                                        </tr>
                                        <tr>
                                            <td>Description:</td><td>
                                                <input type="text" id="description" class="form-control" name="description" placeholder="Enter description..."/>
                                            </td>
                                        </tr>

                                        <input type="hidden" name="lat" value="" id="lat">
                                        <input type="hidden" name="lng" value="" id="lng">
                                        <tr><td></td><td><input type='submit' class="btn btn-sm btn-primary" value='Save'/></td></tr>
                                        {{ csrf_field() }}
                                    </table>
                                </form>
                            </div><br>
                            @if($marker != "")
                            <div id="editForm">
                                <form class="form-horizontal" action="/object-mapper/public/editMarker/{{ $marker->id }}" method="POST">
                                    <div class="form-group">
                                        <label class="control-label col-sm-2">Manufacturer:</label>
                                        <div class="col-sm-10">
                                         <input type="text" class="form-control" id="editManufacturer" name="editManufacturer" placeholder="Enter manufacturer" value="{{ $marker->manufacturer }}" required>
                                     </div>
                                 </div>
                                 <div class="form-group">
                                    <label class="control-label col-sm-2">Model:</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="editModel" name="editModel" placeholder="Enter model" value="{{ $marker->model }}" required>
                                    </div>
                                </div>                           
                                <div class="form-group">
                                    <label class="control-label col-sm-2">Year:</label>
                                    <div class="col-sm-10">
                                      <input type="text" class="form-control" id="editYear" name="editYear" placeholder="Enter year" value="{{ $marker->year }}" required>
                                  </div>
                                  <div class="form-group">
                                    <label class="control-label col-sm-2">Price:</label>
                                    <div class="col-sm-10">
                                      <input type="text" class="form-control" id="editPrice" name="editPrice" placeholder="Enter price" value="{{ $marker->price }}" required>
                                  </div>
                              </div>
                          </div>
                          <div class="form-group">
                            <label class="control-label col-sm-2">Registration:</label>
                            <div class="col-sm-10">
                              <input type="text" class="form-control" id="editRegistration" name="editRegistration" placeholder="Enter registration" value="{{ $marker->registration }}" required>
                          </div>
                      </div>
                      <div class="form-group">
                        <label class="control-label col-sm-2">Description:</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="editDescription" name="editDescription" placeholder="Enter description" value="{{ $marker->description }}" required>
                      </div>
                  </div>
                  <input type="" class="form-control" name="editLat" value="{{ $marker->lat }}" id="editLat">
                  <input type="" class="form-control" name="editLng" value="{{ $marker->lng }}" id="editLng">
                  <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button id="editSubmit" type="submit" class="btn btn-sm btn-primary">Submit</button>
                    </div>
                </div>
                {{ csrf_field() }}
            </form> 
        </div>
        @endif 
        <!-- <div id="message">Location saved</div> -->
        <div><select id="locationSelect" style="width: 10%; visibility: hidden"></select></div>

        <!-- End Google Maps -->
    </div>
    <!-- /.col-lg-12 -->

    <!-- list of vehicles in column 2 -->
    <div class="col-md-3">
     <br>
     <h4>List of vehicles</h4>
     <div class="" id="vehicles_list"></div>
     <div class="" id="search_vehicles_list"></div>
 </div>
</div>
<div class="row">  
    @yield('section')
</div>
<!-- /#page-wrapper -->

</div>
</div>


@stop

