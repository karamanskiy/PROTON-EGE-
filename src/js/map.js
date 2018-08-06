	function initMap() {
		var mapOptions = {
			zoom: 17,
			scrollwheel: false,
			streetViewControl: false,
			panControl: true,
			panControlOptions: {position: google.maps.ControlPosition.TOP_RIGHT},
			mapTypeControl: false,
			zoomControl: true,
			zoomControlOptions: {position: google.maps.ControlPosition.RIGHT_BOTTOM},
			center: {lat: 55.892510, lng: 37.724269},
			styles: [
			{
				"featureType": "all",
				"stylers": [
				{	"saturation": 0},
				{"hue": "#e7ecf0"}
				]
			},
			{
				"featureType": "road",
				"stylers": [
				{"saturation": -70}
				]
			},
			{
				"featureType": "transit",
				"stylers": [
				{"visibility": "off"}
				]
			},
			{
				"featureType": "poi",
				"stylers": [
				{"visibility": "off"}
				]
			},
			{
				"featureType": "water",
				"stylers": [
				{"visibility": "simplified"},
				{"saturation": -60}
				]
			}
			]
		};

		var mapElement = document.getElementById('main-map');
		var map = new google.maps.Map(mapElement, mapOptions);
		var loc = {lat: 55.892510, lng: 37.724269};
		// 55.753462, 37.659005

		var marker = new google.maps.Marker({
			position: loc,
			map: map,
			// icon: {
			// 	// url: 'img/map-marker.png'
			// },
			title: 'ЦЕНТР РЕКЛАМЫ'
		});

		var infowindow = new google.maps.InfoWindow({
				content: 'г. Мытищи, ул. Веры Волошиной, 9/24'
			});

		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});
	}

	