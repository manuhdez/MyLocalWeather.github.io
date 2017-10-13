
// Geocodificación inversa
navigator.geolocation.getCurrentPosition(success, error);

        function success(position) {

            var longitud = position.coords.longitude;
            var latitud = position.coords.latitude;

            var enlace = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitud + '%2C' + longitud + '&language=en';

            $.getJSON(enlace).done(function(ciudad) {
                $('.current-location').html(ciudad.results[0].address_components[2].long_name);

// Consulta del tiempo en la ciudad actual
var currentCity = ciudad.results[0].address_components[2].long_name;
var searchtext = "select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + currentCity + "') and u='c'"

$.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json").done(function(tiempo){

  //imprimiendo la temperatura
  var celsius = parseInt(tiempo.query.results.channel.item.condition.temp);
    var fahrenheit = celsius + 32;

  $('.F').html(fahrenheit + "ºF");
  $('.C').html(celsius + "°C");

    // Botón para pasar de celsius a fahrenheit
    $('.convert').click(function(){

    $('.F').toggle();
    $('.C').toggle();
});
    //Versión mobile sin botón
    $('.temperatura').click(function(){

      $('.F').toggle();
      $('.C').toggle();
});

	  //imprimiendo el estado del cielo
  var cielo = tiempo.query.results.channel.item.condition.text;
	$('.current-sky').html(cielo);

	//Mostrando icono segun el tiempo
	var icono = tiempo.query.results.channel.item.condition.code;

	if (icono === 31 || icono === 33) {
		$('.clear-moon').fadeIn('slow');
	} else if (icono === 28 || icono === 30 || icono === 44){
		$('.cloudy-sun').fadeIn('slow');
	} else if (icono === 27 || icono === 29) {
		$('.cloudy-moon').fadeIn('slow');
	} else if (icono >= 19 && icono <= 26) {
		$('.cloudy').fadeIn('slow');
	} else if (icono >= 8 && icono <= 12 || icono === 35) {
		$('.rainy').fadeIn('slow');
	} else if (icono === 5 || icono === 6 || icono === 7|| icono >= 13 && icono <= 18 || icono >= 41 && icono <= 43 || icono === 46) {
		$('.snowy').fadeIn('slow');
	} else if (icono === 32 || icono === 34 || icono === 36) {
		$('.sunny').fadeIn('slow');
	} else if (icono <= 4 || icono >= 37 && icono <= 39 || icono === 45 || icono === 47) {
		$('.stormy').fadeIn('slow');
	} else if (icono === 40) {
		$('.sun-rain').fadeIn('slow');
	}

		//Cargar imagen de fondo segun la ubicacion actual
	var KEY = '5649a3808eac4cb5e86e5ea594005952';
	var etiqueta = 'cityscape';
	var precision = '11';
	var searchIdUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + KEY + '&tags=' + etiqueta + '&accuracy=' + precision + '&lat=' + latitud + '&lon='+ longitud +'&format=json&nojsoncallback=1';

		$.getJSON(searchIdUrl).done(function(photoData){

			var fotoAlAzar = Math.floor(Math.random() * 10);
			var photo_id = photoData.photos.photo[fotoAlAzar].id;
			var searchPhotoById = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=' + KEY + '&photo_id=' + photo_id + '&format=json&nojsoncallback=1';

				$.getJSON(searchPhotoById).done(function(photoLink){

					var mayor = [];
					for (var i = 0; i < 11; i++){

						var photoSource = photoLink.sizes.size[i];

						mayor.push(photoSource);
						console.log(mayor);
					}

					var tamañoMayor = mayor[mayor.length -1].source;


					$('.foto').css('background-image', 'url("' + tamañoMayor + '")');
				})

		})  // ajax Flickr photos

            })  //getJSON tiempo

        } //getJSON ubicacion

)} //success function

function error(err) {
            $('.current-location').html('There was an error finding your location');
        }


$(document).ready(function(){

	$('.boton').delay(2000).fadeIn(2000);
});
