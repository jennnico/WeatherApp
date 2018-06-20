var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var unitC = 'C'
var currentTempInCelsius;

//If the browser supports geolocation, give coordinates
$( document ).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      getWeather(lat, lon); 
    });
  }else {
    console.log("Geolocation is not supported by this browser.");
  }  


//getWeather function uses coordinates from above to find city, country, and weather, then inserts above
function getWeather(lat, lon) {
  var urlString = api + lat + "&" + lon;
  $.ajax({
    url: urlString, success: function (result) {
      $("#city").html(result.name + ", ");
      $("#country").text(result.sys.country);
      currentTempInCelsius = (Math.round(result.main.temp * 10) / 10);
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      $("#tempunit").text(unitC);
      $("#humidity").text(result.main.humidity);
      $("#desc").text(result.weather[0].main);
      // $("#coords1").html(lat);
      //$("#coords").html(lon);
      IconGen(result.weather[0].main);
      }
  });
}

//Toggle between F and C
$('#tempunit').click(function() {
  //changes the UNIT when you click
  var originalUnit = $(this).html(); //originally was C
  var unitF = 'F';
  $(this).html(originalUnit == unitF? unitC : unitF);
  //changes the temperature VALUE when you click  
  var originalValue = $(temp).html(); //originally was IN C
  var degreesF = (Math.round(currentTempInCelsius * (9/5) + 32) + " " + String.fromCharCode(176));
  $(temp).html(originalValue == degreesF? currentTempInCelsius + " " + String.fromCharCode(176) : degreesF);
});


//Change icon and color, based on desc
function IconGen(desc) {
  var desc = desc.toLowerCase()
  switch(desc){
   case "rain":
   $("#rain").css('visibility', 'visible');
   $("body").css('background', '#053075');
   $('#tempunit').css('background', '#053075');
    break;
    
    case "clear":
     $("#sun").css('visibility', 'visible');
     $("body").css('background', 'orange');
     $('#tempunit').css('background', 'orange');
    break;
    
    case "clouds":
     $("#cloud").css('visibility', 'visible');
     $("body").css('background', '#747377');
     $('#tempunit').css('background', '#747377');
    break;
    
    case "thunder":
     $("#thunder").css('visibility', 'visible');
     $("body").css('background', '#b56d01');
     $('#tempunit').css('background', '#b56d01');
    break;
      
    case 'snow':
     $("#snow").css('visibility', 'visible');
     $("body").css('background', '#0c8592');
     $('#tempunit').css('background', '#0c8592');
    break;
      
   case "mist":
     $("#mist").css('visibility', 'visible');
     $("body").css('background', '#5a7387');
     $('#tempunit').css('background', '#5a7387');
    break;
    
    default:
    $(".icon").css('visibility', 'hidden')
         }}

})
