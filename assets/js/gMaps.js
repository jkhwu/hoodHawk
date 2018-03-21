document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelectorAll('#map').length > 0) {
        if (document.querySelector('html').lang)
            lang = document.querySelector('html').lang;
        else
            lang = 'en';

        var js_file = document.createElement('script');
        js_file.type = 'text/javascript';
        js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCaSVlHx6Mx2guFHDJUQTWgI-ZUf7dyUjw&callback=launchMap&language=' + lang;
        document.getElementsByTagName('head')[0].appendChild(js_file);
    }
});

function launchMap() {
    var myLocation = {
        lat: 37.421999900,
        lng: -122.084057500
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 37.421999900,
            lng: -122.084057500
        },
        zoom: 14
    });
    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
            position: myLocation,
            pov: {
                heading: 34,
                pitch: 10
            }
        });
    map.setStreetView(panorama);
}

function initMap() {
    var myLocation = {
        lat: +lat,
        lng: +long
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: +lat,
            lng: +long
        },
        zoom: 14
    });
    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
            position: myLocation,
            pov: {
                heading: 34,
                pitch: 10
            }
        });
    map.setStreetView(panorama);
}