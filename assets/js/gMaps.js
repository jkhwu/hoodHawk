document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelectorAll('#map').length > 0) {
        if (document.querySelector('html').lang)
            lang = document.querySelector('html').lang;
        else
            lang = 'en';

        var js_file = document.createElement('script');
        js_file.type = 'text/javascript';
        js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCaSVlHx6Mx2guFHDJUQTWgI-ZUf7dyUjw&callback=initMap&language=' + lang;
        document.getElementsByTagName('head')[0].appendChild(js_file);
    }
});

function initMap() {
    console.log(lat)
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
    //   var myMarker = new google.maps.Marker({
    //       position: {
    //         lat: 32.851721,
    //         lng: -117.182813},
    //       map: map,
    //       icon: 'https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small&chld=ski|bb|HERE|FFFFFF|000000',
    //       title: 'myMarker'
    //     });
    map.setStreetView(panorama);
}