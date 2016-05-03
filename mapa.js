$(document).ready(function(){

	initialize();

	$.getJSON('enderecos.json', function (enderecos) {
      
		for(var i=0; i< enderecos.length; i++){

			codeAddress(enderecos[i].nome, enderecos[i].end, enderecos[i].descricao);
		}

    });


});

var infowindow = new google.maps.InfoWindow();
var geocoder;
var map;

function initialize() {
	 geocoder = new google.maps.Geocoder();
	 var latlng = new google.maps.LatLng(-34.397, 150.644);
	 var mapOptions = {
		 zoom: 13,
		 center: latlng,
		 mapTypeId: google.maps.MapTypeId.ROADMAP,
		 styles: [{'featureType':'administrative.neighborhood','elementType':'geometry.fill','stylers':[{'visibility':'on'},{'hue':'#ff0000'}]},{'featureType':'administrative.neighborhood','elementType':'labels.text.fill','stylers':[{'visibility':'on'}]},{'featureType':'administrative.neighborhood','elementType':'labels.text.stroke','stylers':[{'visibility':'on'}]},{'featureType':'landscape.man_made','elementType':'geometry','stylers':[{'color':'#f7f1df'}]},{'featureType':'landscape.natural','elementType':'geometry','stylers':[{'color':'#d0e3b4'}]},{'featureType':'landscape.natural.terrain','elementType':'geometry','stylers':[{'visibility':'on'}]},{'featureType':'poi','elementType':'labels','stylers':[{'visibility':'on'}]},{'featureType':'poi.business','elementType':'all','stylers':[{'visibility':'on'}]},{'featureType':'poi.medical','elementType':'geometry','stylers':[{'color':'#fbd3da'}]},{'featureType':'poi.park','elementType':'geometry','stylers':[{'color':'#bde6ab'}]},{'featureType':'road','elementType':'geometry.stroke','stylers':[{'visibility':'off'}]},{'featureType':'road','elementType':'labels','stylers':[{'visibility':'on'}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#ffe15f'}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':'#efd151'}]},{'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{'color':'#ffffff'}]},{'featureType':'road.local','elementType':'geometry.fill','stylers':[{'color':'black'}]},{'featureType':'transit.station.airport','elementType':'geometry.fill','stylers':[{'color':'#cfb2db'}]},{'featureType':'water','elementType':'geometry','stylers':[{'color':'#a2daf2'}]}]

	 }
	 map = new google.maps.Map(document.getElementById('map'), mapOptions);
 }

function codeAddress(nome, address, descricao){


						geocoder.geocode( { 'address': address}, function(results, status) {
							if (status == google.maps.GeocoderStatus.OK) {
								map.setCenter(results[0].geometry.location);

								var iconBase = {
								path: "M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z",
								fillColor: '#FF0000',
								fillOpacity: .8,
								anchor: new google.maps.Point(0,0),
								strokeWeight: 0,
								scale: 2
								}

								var marker = new google.maps.Marker({
										map: map,
										icon: iconBase,
										position: results[0].geometry.location
								});

								google.maps.event.addListener(marker, 'mouseover', function() {
								infowindow.setContent('<h2>'+nome+'</h2>'+'<h5>'+address+'</h5>'+'<p>'+descricao+'</p>');
								infowindow.open(map, marker);
								});

								google.maps.event.addListener(marker, 'mouseout', function() {
								infowindow.close();
								});


							} else {
								alert('Geocode was not successful for the following reason: ' + status);
							}
						});


}
