var map;
var marker;
var infowindow;
var messagewindow;
var locationSelect;
var markersArray = [];
var darkgreen_MarkerS = "/objectmapper/public/assets/darkgreen_MarkerS.png";
var blue_MarkerV = "/objectmapper/public/assets/blue_MarkerV.png";
var pink_MarkerM = "/objectmapper/public/assets/pink_MarkerM.png";
var yellow_MarkerA = "/objectmapper/public/assets/yellow_MarkerA.png";



function initMap() {
  var athlone = {lat: 53.42377834195493, lng: -7.941763401031494};
  map = new google.maps.Map(document.getElementById('map'), {
    center: athlone,
    zoom: 13,
    mapTypeId: 'roadmap',
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
  });

//  map overlay exxample
var imageBounds = {
  north: 40.773941,
  south: 40.712216,
  east: -74.12544,
  west: -74.22655

};


infoWindow = new google.maps.InfoWindow();


infowindow = new google.maps.InfoWindow({
  content: document.getElementById('form')
});

messagewindow = new google.maps.InfoWindow({
  content: document.getElementById('message')
});

// Handles plotting initial marker on click. If marker is present and map is clicked again,
// marker will be removed and appear at the next clicked location
google.maps.event.addListener(map, 'click', function(event) {
  if (!marker) {
    marker = new google.maps.Marker({
      position: event.latLng,
      draggable: true,
      title: "Update",
      map: map,
      animation:google.maps.Animation.BOUNCE
    });
  }else{
    marker.setPosition(event.latLng);
  }

  console.log(marker.getPosition().lat());
  console.log(marker.getPosition().lng());

  $("#lat").val(marker.getPosition().lat());
  $("#lng").val(marker.getPosition().lng());

  google.maps.event.addListener(marker, 'click', function() {
    document.getElementById('form').removeAttribute("style");
    infowindow.open(map, marker);
  });
});


function downloadUrl(url, callback) {
  var request = window.ActiveXObject ?
  new ActiveXObject('Microsoft.XMLHTTP') :
  new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request.responseText, request.status);
    }
  };

  request.open('GET', url, true);
  request.send(null);
}

function doNothing () {
}

var infoWindow;


$(document).ready(function(){
  displayMarkers();

});

}

/* This function is called on the vehicles list button onlcick.
  It adds in a clear search button with function and a remove button remove remove function 
  using JQuery to remove repetitive clear buttons.
  */
  function displayClearButton(){
    $('#clearButton').remove();
    $('#searchDiv').append("<button id='clearButton' class='btn btn-sm btn-warning' onclick='displayMarkers()'>Clear search</button>");
  }


  function resetFilters(){
    $('#manufacturerSelect').prop('selectedIndex', 0);
    $('#search_vehicles_list').hide();
    $('#vehicles_list').show();
    $('#search_vehicles_list').empty();

    // $('#modelSelect').find('option:first').prop('selectedIndex', 0);
  }

// markers that aren't relative to the search query are removed
function hideMarkers(markers) {
  /* Remove All Markers */
  while(markers.length){
    markers.pop().setMap(null);

  }
}

// handles the toggling of the edit form and information displayed
function toggleEdit(){
// var test="<div id='testEditForm'><p>this is a test</p></div>";
$(document).ready(function() {
  // document.getElementById('testEditForm').removeAttribute("style");
  console.log("works");
  console.log("div length: " + $("#testEditForm").length);
  $('#windowContent').add('#testEditForm').toggle(0);
});
}




// edit marker
function editMarker(){
  document.getElementById('editForm').removeAttribute("style");

  $(document).ready(function(){
    $('.infoDiv').click(function(){

      var id = $(this).find('.id').text(); 
      var manufacturer = $(this).find('.manufacturer').text(); 
      var model = $(this).find('.model').text(); 
      var year = $(this).find('.year').text(); 
      var price = $(this).find('.price').text(); 
      var registration = $(this).find('.registration').text(); 
      var description = $(this).find('.description').text(); 
      var lat = $(this).find('.lat').text(); 
      var lng = $(this).find('.lng').text(); 

    });

    var editId = escape(document.getElementById('editId').value = id);
    var editManufacturer = escape(document.getElementById('editManufacturer').value = manufacturer);
    var editModel = escape(document.getElementById('editModel').value = model);
    var editYear = escape(document.getElementById('editYear').value = year);
    var editPrice = escape(document.getElementById('editPrice').value = price);
    var editRegistration = escape(document.getElementById('editRegistration').value = registration);
    var editDescription = escape(document.getElementById('editDescription').value = description);
    var editLat = escape(document.getElementById('editLat').value = lat);
    var editLng = escape(document.getElementById('editLng').value = lng);

  });                                     


}

// conditional dropwdowns for adding a marker
$('#manufacturer').change(function(){
  var el = $(this);

  if (el.val() === "Audi") {
   $('#model').html("<option value='A4'>A4</option>" + "<option value='A5'>A5</option>" + "<option value='A6'>A6</option>" + "<option value='A7'>A7</option>" + "<option value='A8'>A8</option>" + "<option value='Q7'>Q7</option>");
 }
 else if (el.val() === "Mercedes-Benz") {
  $('#model').html("<option value='C180'>C180</option>" + "<option value='C200'>C200</option>" + "<option value='E200'>E200</option>" + "<option value='E220 Coupe'>E220 Coupe</option>" + "<option value='E250'>E250</option>" + "<option value='E63 AMG'>E63 AMG</option>" + "<option value='S350'>S350</option>" + "<option value='S500 AMG'>S500 AMG</option>");
}
else if (el.val() === "Skoda") {
  $('#model').html("<option value='Citigo'>Citigo</option>" + "<option value='Fabia'>Fabia</option>" + "<option value='Octavia'>Octavia</option>" + "<option value='Kodiaq'>Kodiaq</option>" + "<option value='Karoq'>Karoq</option>" + "<option value='Superb'>Superb</option>");
}
else if (el.val() === 'Volkswagen') {
  $('#model').html("<option value='Amarok'>Amarok</option>" + "<option value='Arteon'>Arteon</option>" + "<option value='Beetle'>Beetle</option>" + "<option value='Golf'>Golf</option>" + "<option value='Jetta'>Jetta</option>" + "<option value='Passat'>Passat</option>" + "<option value='Scirocco'>Scirocco</option>" + "<option value='Tiguan'>Tiguan</option>" + "<option value='Tourag'>Tourag</option>" + "<option value='T-Roc'>T-Roc</option>");
}
});

// conditional dropdowns for searching for a vehicle marker
$('#manufacturerSelect').change(function(){
  var el = $(this);

  if (el.val() === "Audi") {
    $('#modelSelect').html( "<option value='All'>All</option>" + "<option value='A4'>A4</option>" + "<option value='A5'>A5</option>" + "<option value='A6'>A6</option>" + "<option value='A7'>A7</option>" + "<option value='A8'>A8</option>" + "<option value='Q7'>Q7</option>");
  }
  else if (el.val() === "Mercedes-Benz") {
    $('#modelSelect').html("<option value='All'>All</option>" + "<option value='C180'>C180</option>" + "<option value='C200'>C200</option>" + "<option value='E200'>E200</option>" + "<option value='E220 Coupe'>E220 Coupe</option>" + "<option value='E250'>E250</option>" + "<option value='E63 AMG'>E63 AMG</option>" + "<option value='S350'>S350</option>" + "<option value='S500 AMG'>S500 AMG</option>");
  }
  else if (el.val() === "Skoda") {
    $('#modelSelect').html("<option value='All'>All</option>" + "<option value='Citigo'>Citigo</option>" + "<option value='Fabia'>Fabia</option>" + "<option value='Octavia'>Octavia</option>" + "<option value='Kodiaq'>Kodiaq</option>" + "<option value='Karoq'>Karoq</option>" + "<option value='Superb'>Superb</option>");
  }
  else if (el.val() === 'Volkswagen') {
    $('#modelSelect').html("<option value='All'>All</option>" + "<option value='Amarok'>Amarok</option>" + "<option value='Arteon'>Arteon</option>" + "<option value='Beetle'>Beetle</option>" + "<option value='Golf'>Golf</option>" + "<option value='Jetta'>Jetta</option>" + "<option value='Passat'>Passat</option>" + "<option value='Scirocco'>Scirocco</option>" + "<option value='Tiguan'>Tiguan</option>" + "<option value='Tourag'>Tourag</option>" + "<option value='T-Roc'>T-Roc</option>");
  }
})


//Handle Plotting Data
function displayMarkers(){
  $('#vehicles_list').empty("");
  $('#vehicles_list').show("");
  $('#search_vehicles_list').hide();
  $('#clearButton').remove();
  $.ajax({
    url:"/objectmapper/public/showMapMarkers",
    type:"GET",
    success:function(data){
      console.log(data);
      var data = JSON.parse(data);
      $.each(data , function(key,value){

    // icon conditions
    if (value.manufacturer === "Audi") {
      var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: yellow_MarkerA,
          title: value.manufacturer + " " + value.model + '\n' + value.registration,
        });
    }

    if (value.manufacturer === "Mercedes-Benz") {
      var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: pink_MarkerM,
          title: value.manufacturer + " " + value.model + '\n' + value.registration,
        });
    }

    if (value.manufacturer === "Skoda") {
      var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: darkgreen_MarkerS,
          title: value.manufacturer + " " + value.model + '\n' + value.registration,
        });
    }

    if (value.manufacturer === "Volkswagen") {
      var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: blue_MarkerV,
          title: value.manufacturer + " " + value.model + '\n' + value.registration,
        });
    }

    csrf_token = document.getElementById('csrf_token');

    var infoWindow = new google.maps.InfoWindow({
      content: '<div id="windowContent" class="windowContent"><div id="infoDiv" class="infoDiv"><h4 class="id" hidden>'+ value.id +'</h4>'
      +'<h4 class="manufacturer">' + value.manufacturer + '</h4>' 
      + '<h4 class="model">' + value.model + '</h4>' 
      + '<h4 class="year">' + value.year + '</h4>' 
      + '<h4 class="price">' + value.price + '</h4>' 
      +'<h4 class="registration">' + value.registration + '</h4>'
      + "<h4 class='lat' hidden>" + value.lat + "</h4>" 
      + "<h4 class='lng' hidden>" + value.lng + "</h4>"
      + '<form id="deleteForm" class="deleteForm" action="/objectmapper/public/destroy/'+value.id
      +'" method="DELETE">' 
      + '<input type="submit" value="Delete"</input>' 
      + '</form>' +'</h4></div>'
      + '<input type="button" id="toggleEditButton" value="Toggle Edit" onclick="toggleEdit()"</input>'
      + '</div>'
      + '</div>'
      + '<div id="testEditForm" class="testEditForm" style="display: none">'
      + '<form id="editForm" action="/objectmapper/public/update/'+value.id+'" method="POST">'
      + '<table class="table-responsive">'
      + '<h4 class="editId" hidden>'+ value.id +'</h4>'
      + '<tr><td><input name="editManufacturer" class="editManufacturer" value="' + value.manufacturer + '"></input></td></tr>'
      + '<tr><td><input name="editModel" class="editModel" value="' + value.model + '"></input></td></tr>'
      + '<tr><td><input name="editYear" class="editYear" value="' + value.year + '"></input></td></tr>'
      + '<tr><td><input name="editPrice" class="editPrice" value="' + value.price + '"></input></td></tr>'
      + '<tr><td><input name="editRegistration" class="editRegistration" value="' + value.registration + '"></input></td></tr>'
      + '<tr><td><textarea type="text" class="editDescription" name="editDescription">' + value.description +'></textarea></td></tr>'
      + '<tr><td><input name="editLat" class="editLat" value="' + value.lat + '"></input></td></tr>'
      + '<tr><td><input name="editLng" class="editLng" value="' + value.lng + '"></input></td></tr>'
      + '<tr><td><input type="button" id="toggleEditButton" value="Toggle Edit" onclick="toggleEdit()"</input></td></tr>'  
      + '<tr><td><input type="submit" id="updateButton" value="Update"</input></td></tr>'  
      + '</table>'
      + '<input type="hidden" name="_token" value="'+csrf_token.value+'"></input>'
      + '</form>'  
      + '</div>'

    });

        // var tooltip = new google.maps.InfoWindow({
        //   content: '<div id="infoDiv" class="infoDiv"><h4 class="registration" hidden>'+ value.registration +'</h4></div>'
        // });


        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.open(map, marker);
          map.setCenter(marker.getPosition());


        })    

        // gets updated position value when marker is dragged
        google.maps.event.addListener(marker, 'dragend', function() {
          var dragLat = this.getPosition().lat();
          var drgaLng = this.getPosition().lng();
          console.log(this.getPosition().lat()); 
          console.log(this.getPosition().lng()); 
          console.log("dragged");

          var editLat = escape(document.getElementById('editLat').value = dragLat);
          var editLng = escape(document.getElementById('editLng').value = drgaLng);
        }); 


        // close info window if map is clicked
        google.maps.event.addListener(map, 'click', function() {
          infoWindow.close(map, marker);
        })


        // part of search 
        markersArray.push(marker);

      // print list of vehicles in the second column
      // var list = document.getElementById("vehicles_list").innerHTML += "<a href=''>" + value.manufacturer + " "  + value.model + "</a>" +  "<div class='col-md-13'> Registration: " + value.registration + "</div>" + "<div class='col-md-13'> Last updated: " + value.updated_at + "</div>" + "<br>";
      $('#vehicles_list').append(
        "<p hidden>" + value.id + "</p>" 
        + "<button id='markerLink' class='linkButton' onclick='linkMarkers(this.value); displayClearButton();' value='"+ value.id +"'>" + value.manufacturer 
        + "</button>" + " "  + value.model 
        + "<div class='col-md-13'>Price: " + value.price + "</div>" 
        + "<div class='col-md-13'> Registration: " + value.registration + "</div>"
        + "<div class='col-md-13'> Last updated: " + value.updated_at + "</div>"
        + "<div id='item' class='item'><button class='linkButton toggleDiv' id='atest'>Description</button>"
        + "<div id='description_collapse' class='description'>" + value.description + "</div></div>" + "<br>");





      // handles hide toggle for list descriptions 
      $('.item div').hide();
      $('.item button').click(function(){

        // hide all span
        var $this = $(this).parent().find('div.description');
        // var $this = $(this).next('div.description');
        $(".item div.description").not($this).hide();

        $this.slideToggle("slow").complete();
      });


    });


},
error:function(data){
  alert('displayMarkers() has failed');
}
});
}


/* returns selected from list on the map*/
function linkMarkers(id){
  $.ajax({
    url:"/objectmapper/public/linkMarkers/"+id,
    type:"GET",
    success:function(data){
        // $('#searchButton').remove();
        hideMarkers(markersArray);
        //Handle Data
        // console.log(data);
        var data = JSON.parse(data);
        $.each(data , function(key,value){
          if (value.manufacturer === "Audi") {
            var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: yellow_MarkerA,
          title: value.manufacturer + " " + value.model + '\n' + value.registration,
        });
          }

          if (value.manufacturer === "Mercedes-Benz") {
            var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: pink_MarkerM,
          title: value.manufacturer + " " + value.model + '\n' + value.registration,
        });
          }

          if (value.manufacturer === "Skoda") {
            var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: darkgreen_MarkerS,
          title: value.manufacturer + " " + value.model + '\n' + value.registration,
        });
          }

          if (value.manufacturer === "Volkswagen") {
            var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: blue_MarkerV,
          title: value.manufacturer + " " + value.model + '\n' + value.registration,
        });
          }

          var infoWindow = new google.maps.InfoWindow({
           content: '<div id="windowContent" class="windowContent"><div id="infoDiv" class="infoDiv"><h4 class="id" hidden>'+ value.id +'</h4>'
           +'<h4 class="manufacturer">' + value.manufacturer + '</h4>' 
           + '<h4 class="model">' + value.model + '</h4>' 
           + '<h4 class="year">' + value.year + '</h4>' 
           + '<h4 class="price">' + value.price + '</h4>' 
           +'<h4 class="registration">' + value.registration + '</h4>'
           + "<h4 class='lat' hidden>" + value.lat + "</h4>" 
           + "<h4 class='lng' hidden>" + value.lng + "</h4>"
           + '<form id="deleteForm" class="deleteForm" action="/objectmapper/public/destroy/'+value.id
           +'" method="DELETE">' 
           + '<input type="submit" value="Delete"</input>' 
           + '</form>' +'</h4></div>'
           + '<input type="button" id="toggleEditButton" value="Toggle Edit" onclick="toggleEdit()"</input>'
           + '</div>'
           + '</div>'
           + '<div id="testEditForm" class="testEditForm" style="display: none">'
           + '<form id="editForm" action="/objectmapper/public/update/'+value.id+'" method="POST">'
           + '<table class="table-responsive">'
           + '<h4 class="editId" hidden>'+ value.id +'</h4>'
           + '<tr><td><input name="editManufacturer" class="editManufacturer" value="' + value.manufacturer + '"></input></td></tr>'
           + '<tr><td><input name="editModel" class="editModel" value="' + value.model + '"></input></td></tr>'
           + '<tr><td><input name="editYear" class="editYear" value="' + value.year + '"></input></td></tr>'
           + '<tr><td><input name="editPrice" class="editPrice" value="' + value.price + '"></input></td></tr>'
           + '<tr><td><input name="editRegistration" class="editRegistration" value="' + value.registration + '"></input></td></tr>'
           + '<tr><td><textarea type="text" class="editDescription" name="editDescription">' + value.description +'></textarea></td></tr>'
           + '<tr><td><input name="editLat" class="editLat" value="' + value.lat + '"></input></td></tr>'
           + '<tr><td><input name="editLng" class="editLng" value="' + value.lng + '"></input></td></tr>'
           + '<tr><td><input type="button" id="toggleEditButton" value="Toggle Edit" onclick="toggleEdit()"</input></td></tr>'  
           + '<tr><td><input type="submit" id="updateButton" value="Update"</input></td></tr>'  
           + '</table>'
           + '<input type="hidden" name="_token" value="'+csrf_token.value+'"></input>'
           + '</form>'  
           + '</div>'

         });   

          // infoWindow.open(map, marker);           
          map.setCenter(marker.getPosition());

          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(map, marker);
          })        

          // close info window if map is clicked
          google.maps.event.addListener(map, 'click', function() {
            infoWindow.close(map, marker);
          })

          // part of search 
          markersArray.push(marker);

        });
},
error:function(data){
  alert('Failed');
}
});
}



/*
search function acts the same as the displayMarker function.
search function takes in the manufacturer variable and displays markers associated with the input value.
*/
function searchMarkers() {
  var manufacturer = document.getElementById("manufacturerSelect").value;
  var model = document.getElementById("modelSelect").value;

  // if model is set to all, all vehicle models will be displayed
  //  for the chosen manufacturer
  if (model === "All") {
   $.ajax({
    url:"/objectmapper/public/searcManufacturerhMarkers/"+manufacturer,
    type:"GET",
    success:function(data){
      $("#clearButton").remove();  
      $('#search_vehicles_list').empty();
      hideMarkers(markersArray);
      $('#searchDiv').append("<button id='clearButton' class='btn btn-sm btn-warning' onclick='displayMarkers(); resetFilters()'>Clear search</button>");
      //Handle Data
      console.log(data);
      var data = JSON.parse(data);

      $.each(data , function(key,value){

        if (value.manufacturer === "Audi") {
          var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: yellow_MarkerA,
          title: value.manufacturer + " " + value.model + '\n' + value.registration,
        });
        }

        if (value.manufacturer === "Mercedes-Benz") {
          var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: pink_MarkerM,
          title: value.manufacturer + " " + value.model + '\n' + value.registration,
        });
        }

        if (value.manufacturer === "Skoda") {
          var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: darkgreen_MarkerS,
          title: value.manufacturer + " " + value.model + '\n' + value.registration,
        });
        }

        if (value.manufacturer === "Volkswagen") {
          var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: blue_MarkerV,
          title: value.manufacturer + " " + value.model + '\n' + value.registration,
        });
        }


        var infoWindow = new google.maps.InfoWindow({
         content: '<div id="windowContent" class="windowContent"><div id="infoDiv" class="infoDiv"><h4 class="id" hidden>'+ value.id +'</h4>'
         +'<h4 class="manufacturer">' + value.manufacturer + '</h4>' 
         + '<h4 class="model">' + value.model + '</h4>' 
         + '<h4 class="year">' + value.year + '</h4>' 
         + '<h4 class="price">' + value.price + '</h4>' 
         +'<h4 class="registration">' + value.registration + '</h4>'
         + "<h4 class='lat' hidden>" + value.lat + "</h4>" 
         + "<h4 class='lng' hidden>" + value.lng + "</h4>"
         + '<form id="deleteForm" class="deleteForm" action="/objectmapper/public/destroy/'+value.id
         +'" method="DELETE">' 
         + '<input type="submit" value="Delete"</input>' 
         + '</form>' +'</h4></div>'
         + '<input type="button" id="toggleEditButton" value="Toggle Edit" onclick="toggleEdit()"</input>'
         + '</div>'
         + '</div>'
         + '<div id="testEditForm" class="testEditForm" style="display: none">'
         + '<form id="editForm" action="/objectmapper/public/update/'+value.id+'" method="POST">'
         + '<table class="table-responsive">'
         + '<h4 class="editId" hidden>'+ value.id +'</h4>'
         + '<tr><td><input name="editManufacturer" class="editManufacturer" value="' + value.manufacturer + '"></input></td></tr>'
         + '<tr><td><input name="editModel" class="editModel" value="' + value.model + '"></input></td></tr>'
         + '<tr><td><input name="editYear" class="editYear" value="' + value.year + '"></input></td></tr>'
         + '<tr><td><input name="editPrice" class="editPrice" value="' + value.price + '"></input></td></tr>'
         + '<tr><td><input name="editRegistration" class="editRegistration" value="' + value.registration + '"></input></td></tr>'
         + '<tr><td><textarea type="text" class="editDescription" name="editDescription">' + value.description +'></textarea></td></tr>'
         + '<tr><td><input name="editLat" class="editLat" value="' + value.lat + '"></input></td></tr>'
         + '<tr><td><input name="editLng" class="editLng" value="' + value.lng + '"></input></td></tr>'
         + '<tr><td><input type="button" id="toggleEditButton" value="Toggle Edit" onclick="toggleEdit()"</input></td></tr>'  
         + '<tr><td><input type="submit" id="updateButton" value="Update"</input></td></tr>'  
         + '</table>'
         + '<input type="hidden" name="_token" value="'+csrf_token.value+'"></input>'
         + '</form>'  
         + '</div>'

       });   

        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.open(map, marker);
        })        

        // close info window if map is clicked
        google.maps.event.addListener(map, 'click', function() {
          infoWindow.close(map, marker);
        })
        // part of search 
        markersArray.push(marker);


        // vehicles list is filtered based on the search paramaters from the dropdowns 
        $('#vehicles_list').hide();

        $('#search_vehicles_list').append("<p hidden>" + value.id + "</p>" 
          + "<button id='markerLink' class='linkButton' onclick='linkMarkers(this.value); displayClearButton();' value='"+ value.id +"'>" + value.manufacturer 
          + "</button>" + " "  + value.model 
          + "<div class='col-md-13'>Price: " + value.price + "</div>" 
          + "<div class='col-md-13'> Registration: " + value.registration + "</div>"
          + "<div class='col-md-13'> Last updated: " + value.updated_at + "</div>"
          + "<div id='item' class='item'><button class='linkButton toggleDiv' id='atest'>Description</button>"
          + "<div id='description_collapse' class='description'>" + value.description + "</div></div>" + "<br>").show();

      });

        // handles hide toggle for list descriptions 
        $('.item div').hide();
        $('.item button').click(function(){

        // hide all span
        var $this = $(this).parent().find('div.description');
        // var $this = $(this).next('div.description');
        $(".item div.description").not($this).hide();

        $this.slideToggle("slow").complete();
      });

      // $('#search_vehicles_list').hide();
      // $('#vehicles_list').
    },
    error:function(data){
      alert('Failed: Check search paramaters');
    }
  });
}
 //  else if model is not set to "All", the chosen model will be displayed on the map  
 else{  
  $.ajax({
    url:"/objectmapper/public/searchMarkers/"+manufacturer+"/"+model,
    type:"GET",
    success:function(data){
      $("#clearButton").remove();  
      $('#search_vehicles_list').empty();
      $('#vehicles_list').show();
      hideMarkers(markersArray);
      $('#searchDiv').append("<button id='clearButton' class='btn btn-sm btn-warning' onclick='displayMarkers(); resetFilters()'>Clear search</button>");
      //Handle Data
      console.log(data);
      var data = JSON.parse(data);
      if (data <= 0) {
        alert("Vehicle does not exist.");
        displayMarkers();
        $('#search_vehicles_list').hide();
      }
      $.each(data , function(key,value){

        if (value.manufacturer === "Audi") {
          var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: yellow_MarkerA,
          title: value.manufacturer + " " + value.model + " " + value.registration,
        });
        }

        if (value.manufacturer === "Mercedes-Benz") {
          var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: pink_MarkerM,
          title: value.manufacturer + " " + value.model + " " + value.registration,
        });
        }

        if (value.manufacturer === "Skoda") {
          var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: darkgreen_MarkerS,
          title: value.manufacturer + " " + value.model + " " + value.registration,
        });
        }

        if (value.manufacturer === "Volkswagen") {
          var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: blue_MarkerV,
          title: value.manufacturer + " " + value.model + " " + value.registration,
        });
        }



        var infoWindow = new google.maps.InfoWindow({
         content: '<div id="windowContent" class="windowContent"><div id="infoDiv" class="infoDiv"><h4 class="id" hidden>'+ value.id +'</h4>'
         +'<h4 class="manufacturer">' + value.manufacturer + '</h4>' 
         + '<h4 class="model">' + value.model + '</h4>' 
         + '<h4 class="year">' + value.year + '</h4>' 
         + '<h4 class="price">' + value.price + '</h4>' 
         +'<h4 class="registration">' + value.registration + '</h4>'
         + "<h4 class='lat' hidden>" + value.lat + "</h4>" 
         + "<h4 class='lng' hidden>" + value.lng + "</h4>"
         + '<form id="deleteForm" class="deleteForm" action="/objectmapper/public/destroy/'+value.id
         +'" method="DELETE">' 
         + '<input type="submit" value="Delete"</input>' 
         + '</form>' +'</h4></div>'
         + '<input type="button" id="toggleEditButton" value="Toggle Edit" onclick="toggleEdit()"</input>'
         + '</div>'
         + '</div>'
         + '<div id="testEditForm" class="testEditForm" style="display: none">'
         + '<form id="editForm" action="/objectmapper/public/update/'+value.id+'" method="POST">'
         + '<table class="table-responsive">'
         + '<h4 class="editId" hidden>'+ value.id +'</h4>'
         + '<tr><td><input name="editManufacturer" class="editManufacturer" value="' + value.manufacturer + '"></input></td></tr>'
         + '<tr><td><input name="editModel" class="editModel" value="' + value.model + '"></input></td></tr>'
         + '<tr><td><input name="editYear" class="editYear" value="' + value.year + '"></input></td></tr>'
         + '<tr><td><input name="editPrice" class="editPrice" value="' + value.price + '"></input></td></tr>'
         + '<tr><td><input name="editRegistration" class="editRegistration" value="' + value.registration + '"></input></td></tr>'
         + '<tr><td><textarea type="text" class="editDescription" name="editDescription">' + value.description +'></textarea></td></tr>'
         + '<tr><td><input name="editLat" class="editLat" value="' + value.lat + '"></input></td></tr>'
         + '<tr><td><input name="editLng" class="editLng" value="' + value.lng + '"></input></td></tr>'
         + '<tr><td><input type="button" id="toggleEditButton" value="Toggle Edit" onclick="toggleEdit()"</input></td></tr>'  
         + '<tr><td><input type="submit" id="updateButton" value="Update"</input></td></tr>'  
         + '</table>'
         + '<input type="hidden" name="_token" value="'+csrf_token.value+'"></input>'
         + '</form>'  
         + '</div>'

       });   

        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.open(map, marker);
        })        

        // close info window if map is clicked
        google.maps.event.addListener(map, 'click', function() {
          infoWindow.close(map, marker);
        })
        // part of search 
        markersArray.push(marker);


        // vehicles list is filtered based on the search paramaters from the dropdowns 
        $('#vehicles_list').hide();

        $('#search_vehicles_list').append("<p hidden>" + value.id + "</p>" 
          + "<button id='markerLink' class='linkButton' onclick='linkMarkers(this.value); displayClearButton();' value='"+ value.id +"'>" + value.manufacturer 
          + "</button>" + " "  + value.model 
          + "<div class='col-md-13'>Price: " + value.price + "</div>" 
          + "<div class='col-md-13'> Registration: " + value.registration + "</div>"
          + "<div class='col-md-13'> Last updated: " + value.updated_at + "</div>"
          + "<div id='item' class='item'><button class='linkButton toggleDiv' id='atest'>Description</button>"
          + "<div id='description_collapse' class='description'>" + value.description + "</div></div>" + "<br>").show();

      });

        // handles hide toggle for list descriptions 
        $('.item div').hide();
        $('.item button').click(function(){

        // hide all span
        var $this = $(this).parent().find('div.description');
        // var $this = $(this).next('div.description');
        $(".item div.description").not($this).hide();

        $this.slideToggle("slow").complete();
      });

      // $('#search_vehicles_list').hide();
      // $('#vehicles_list').
    },
    error:function(data){
      alert('Failed: Check search paramaters');
    }
  });
}
}

function searchRegistration(){
  var registration = document.getElementById("regSearchInput").value;
  console.log(registration);
  $.ajax({
    url:"/objectmapper/public/searchRegistration/"+registration,
    type:"GET",
    success:function(data){
      $("#clearButton").remove();  
      $('#search_vehicles_list').empty();
      $('#vehicles_list').show();
      hideMarkers(markersArray);
      $('#searchDiv').append("<button id='clearButton' class='btn btn-sm btn-warning' onclick='displayMarkers(); resetFilters()'>Clear search</button>");
      //Handle Data
      console.log(data);
      var data = JSON.parse(data);
      if (data <= 0) {
        alert("Registration was not found.");
        displayMarkers();
        $('#search_vehicles_list').hide();
      }
      $.each(data , function(key,value){

        if (value.manufacturer === "Audi") {
          var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: yellow_MarkerA,
          title: value.manufacturer + " " + value.model + " " + value.registration,
        });
        }

        if (value.manufacturer === "Mercedes-Benz") {
          var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: pink_MarkerM,
          title: value.manufacturer + " " + value.model + " " + value.registration,
        });
        }

        if (value.manufacturer === "Skoda") {
          var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: darkgreen_MarkerS,
          title: value.manufacturer + " " + value.model + " " + value.registration,
        });
        }

        if (value.manufacturer === "Volkswagen") {
          var marker = new google.maps.Marker({
          //position: parseFloat(value.lat)+parseFloat(value.lng),
          position: {lat: value.lat, lng: value.lng},
          map:map,
          draggable: true,
          icon: blue_MarkerV,
          title: value.manufacturer + " " + value.model + " " + value.registration,
        });
        }



        var infoWindow = new google.maps.InfoWindow({
          content: '<div id="windowContent" class="windowContent"><div id="infoDiv" class="infoDiv"><h4 class="id" hidden>'+ value.id +'</h4>'
          +'<h4 class="manufacturer">' + value.manufacturer + '</h4>' 
          + '<h4 class="model">' + value.model + '</h4>' 
          + '<h4 class="year">' + value.year + '</h4>' 
          + '<h4 class="price">' + value.price + '</h4>' 
          +'<h4 class="registration">' + value.registration + '</h4>'
          + "<h4 class='lat' hidden>" + value.lat + "</h4>" 
          + "<h4 class='lng' hidden>" + value.lng + "</h4>"
          + '<form id="deleteForm" class="deleteForm" action="/objectmapper/public/destroy/'+value.id
          +'" method="DELETE">' 
          + '<input type="submit" value="Delete"</input>' 
          + '</form>' +'</h4></div>'
          + '<input type="button" id="toggleEditButton" value="Toggle Edit" onclick="toggleEdit()"</input>'
          + '</div>'
          + '</div>'
          + '<div id="testEditForm" class="testEditForm" style="display: none">'
          + '<form id="editForm" action="/objectmapper/public/update/'+value.id+'" method="POST">'
          + '<table class="table-responsive">'
          + '<h4 class="editId" hidden>'+ value.id +'</h4>'
          + '<tr><td><input name="editManufacturer" class="editManufacturer" value="' + value.manufacturer + '"></input></td></tr>'
          + '<tr><td><input name="editModel" class="editModel" value="' + value.model + '"></input></td></tr>'
          + '<tr><td><input name="editYear" class="editYear" value="' + value.year + '"></input></td></tr>'
          + '<tr><td><input name="editPrice" class="editPrice" value="' + value.price + '"></input></td></tr>'
          + '<tr><td><input name="editRegistration" class="editRegistration" value="' + value.registration + '"></input></td></tr>'
          + '<tr><td><textarea type="text" class="editDescription" name="editDescription">' + value.description +'></textarea></td></tr>'
          + '<tr><td><input name="editLat" class="editLat" value="' + value.lat + '"></input></td></tr>'
          + '<tr><td><input name="editLng" class="editLng" value="' + value.lng + '"></input></td></tr>'
          + '<tr><td><input type="button" id="toggleEditButton" value="Toggle Edit" onclick="toggleEdit()"</input></td></tr>'  
          + '<tr><td><input type="submit" id="updateButton" value="Update"</input></td></tr>'  
          + '</table>'
          + '<input type="hidden" name="_token" value="'+csrf_token.value+'"></input>'
          + '</form>'  
          + '</div>'
          
        });   

        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.open(map, marker);
        })        

        // close info window if map is clicked
        google.maps.event.addListener(map, 'click', function() {
          infoWindow.close(map, marker);
        })
        // part of search 
        markersArray.push(marker);
        map.setCenter(marker.getPosition());


        // vehicles list is filtered based on the search paramaters from the dropdowns 
        $('#vehicles_list').hide();

        $('#search_vehicles_list').append("<p hidden>" + value.id + "</p>" 
          + "<button id='markerLink' class='linkButton' onclick='linkMarkers(this.value); displayClearButton();' value='"+ value.id +"'>" + value.manufacturer 
          + "</button>" + " "  + value.model 
          + "<div class='col-md-13'>Price: " + value.price + "</div>" 
          + "<div class='col-md-13'> Registration: " + value.registration + "</div>"
          + "<div class='col-md-13'> Last updated: " + value.updated_at + "</div>"
          + "<div id='item' class='item'><button class='linkButton toggleDiv' id='atest'>Description</button>"
          + "<div id='description_collapse' class='description'>" + value.description + "</div></div>" + "<br>").show();

      });

       // handles hide toggle for list descriptions 
       $('.item div').hide();
       $('.item button').click(function(){

        // hide all span
        var $this = $(this).parent().find('div.description');
        // var $this = $(this).next('div.description');
        $(".item div.description").not($this).hide();

        $this.slideToggle("slow").complete();
      });

      // $('#search_vehicles_list').hide();
      // $('#vehicles_list').
    },
    error:function(data){
      alert('Failed: Check search paramaters');
    }
  });
}
