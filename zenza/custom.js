//=================================
// Custom Zenza Map
//=================================

$(document).ready(function() {
  function initialize() {

    var gmarkers = [];
    var map = null;
    var infowindow = null;
    var color = '#e51772';

    var styles = [{
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#444444"
      }]
    }, {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [{
        "color": "#f2f2f2"
      }]
    }, {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{
        "saturation": -100
      }, {
        "lightness": 45
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [{
        "visibility": "simplified"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "water",
      "elementType": "all",
      "stylers": [{
        "color": "#10ade4"
      }, {
        "visibility": "on"
      }]
    }];

    var mapOptions = {
      center: new google.maps.LatLng(-37.9509936,145.0643607),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false,
      fullscreenControl: false,
      scrollwheel: false,
      styles: styles
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    google.maps.event.addListener(map, 'click', function() {
      infowindow.close();
    });

    var locations = [
      ['Zenza Interiors', -37.9509936, 145.0643607]
    ];

    function setMarkers(locations) {
      for (var i = 0; i < locations.length; i++) {
        var iconBase = {
          url: "https://daks2k3a4ib2z.cloudfront.net/5950aaa24858407fd3ac7bf5/5972476cfaf2640f26ce5c3c_marker_small.png",
          scaledSize: new google.maps.Size(35, 45),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17.5, 45)
        };
        var location = locations[i];
        var myLatLng = new google.maps.LatLng(location[1], location[2]);

        var marker = new google.maps.Marker({
          position: myLatLng,
          animation: google.maps.Animation.DROP,
          map: map,
          icon: iconBase,
          title: location[0]
        });

        google.maps.event.addListener(marker, "click", function() {
          map.setCenter(marker.getPosition());
          infowindow.setContent(this.html);
          infowindow.open(map, this);
        });
        gmarkers.push(marker);
      }
    }
    setMarkers(locations);
  }

  google.maps.event.addDomListener(window, 'load', initialize);
});

//=================================
// Instagram Feed
//=================================
