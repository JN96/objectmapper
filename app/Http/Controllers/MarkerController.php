<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Marker;
use Session;

class MarkerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
     $markers = Marker::find();

     return View::make('dashboard');
 }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $row = new Marker;
        $row->manufacturer = $request->input('manufacturer'); 
        $row->model = $request->input('model');
        $row->year = $request->input('year');
        $row->price = $request->input('price');
        $row->registration = $request->input('registration'); 
        $row->description = $request->input('description'); 
        $row->lat = $request->input('lat'); 
        $row->lng = $request->input('lng'); 

        $row->save();

        Session::flash('message', 'Successfully added marker');
        // return view('dashboard');
        return redirect()->route('dashboard');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Marker::show([
            'manufacturer' => $data['manufacturer'],
            'model' => $data['model'],
            'year' => $data['year'],
            'registration' => $data['registration'],
            'lat' => $data['lat'],
            'lng' => $data['lng'],

        ]);
    }

    public function showMapMarkers(){
        $markers = Marker::all();
        $markers = json_encode($markers);
        return $markers;
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
    public function update(Request $request , $id)
    {   
        $markers = Marker::find($id);
        $markers->manufacturer = $request->input('editManufacturer'); 
        $markers->model = $request->input('editModel'); 
        $markers->year = $request->input('editYear'); 
        $markers->price = $request->input('editPrice'); 
        $markers->registration = $request->input('editRegistration'); 
        $markers->description = $request->input('editDescription'); 
        $markers->lat = $request->input('editLat'); 
        $markers->lng = $request->input('editLng'); 

        // $markers = Marker::find($id);

        $markers->update();

        Session::flash('message', 'Successfully updated marker');
        return redirect()->route('dashboard');
    }


// gets id before form submission
    public function getMarker($id){
        $marker = Marker::find($id);

        return view('dashboard')->with("marker" , $marker);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $markers = Marker::find($id);
        $markers->delete();

        Session::flash('message', 'Successfully removed marker');
        return redirect()->route('dashboard');
    }

    public function searchMarkers($manufacturer, $model)
    {
       // $markers = Marker::all()->where('manufacturer', 'like', '%'.$manufacturer.'%');
        $markers = Marker::all()->where('manufacturer', 'like', $manufacturer)->where('model', 'like', $model);

        $markers = json_encode($markers);
        return $markers;


    }

    public function searcManufacturerhMarkers($manufacturer){
        $markers = Marker::all()->where('manufacturer', 'like', $manufacturer);

        $markers = json_encode($markers);
        return $markers;
    }

    public function searchRegistration($registration){
        $markers = Marker::all()->where('registration', 'like', $registration);

        $markers = json_encode($markers);
        return $markers;
    }

    /* vehciles list code*/
    public function linkMarkers($id)
    {

        $markers = Marker::all()->where('id', $id);
        $markers = json_encode($markers);
        return $markers;
    }

    public function touch()
    {
        if (! $this->timestamps) {
            return false;
        }
        $this->updateTimestamps();
        return $this->save();
    }
    /**
     * Update the creation and update timestamps.
     *
     * @return void
     */
    protected function updateTimestamps()
    {
        $time = $this->freshTimestamp();
        if (! $this->isDirty(static::UPDATED_AT)) {
            $this->setUpdatedAt($time);
        }
        if (! $this->exists && ! $this->isDirty(static::CREATED_AT)) {
            $this->setCreatedAt($time);
        }
    }
    /**
     * Set the value of the "created at" attribute.
     *
     * @param  mixed  $value
     * @return $this
     */
    public function setCreatedAt($value)
    {
        $this->{static::CREATED_AT} = $value;
        return $this;
    }
    /**
     * Set the value of the "updated at" attribute.
     *
     * @param  mixed  $value
     * @return $this
     */
    public function setUpdatedAt($value)
    {
        $this->{static::UPDATED_AT} = $value;
        return $this;
    }
    /**
     * Get the name of the "created at" column.
     *
     * @return string
     */
    public function getCreatedAtColumn()
    {
        return static::CREATED_AT;
    }
    /**
     * Get the name of the "updated at" column.
     *
     * @return string
     */
    public function getUpdatedAtColumn()
    {
        return static::UPDATED_AT;
    }
    /**
     * Get a fresh timestamp for the model.
     *
     * @return \Carbon\Carbon
     */
    public function freshTimestamp()
    {
        return new Carbon;
    }
    /**
     * Get a fresh timestamp for the model.
     *
     * @return string
     */
    public function freshTimestampString()
    {
        return $this->fromDateTime($this->freshTimestamp());
    }
}
