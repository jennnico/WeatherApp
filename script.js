//resources: 
//https://www.w3schools.com/html/html5_geolocation.asp
//http://www.developerdrive.com/2014/09/how-to-build-a-weather-app-with-html5s-geolocation-api/

import React from 'react';
import ReactDOM from 'react-dom';

var api = "https://fcc-weather-api.glitch.me/api/current?"; //weather API from FreeCodeCamp... not very accurate
var lat, lon;
var unitC = 'C'
var currentTempInCelsius;
//find current position
navigator.geolocation.getCurrentPosition(function (position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      getWeather(lat, lon); 
    });


class Weather extends React.Component{
  
//switch between Fahrenheit and Celsius
toggle() {
  //changes the UNIT when you click
  var originalUnit = $(tempunit).html(); //originally was C
  var unitF = 'F';
  $(tempunit).html(originalUnit == unitF? unitC : unitF);
  //changes the temperature VALUE when you click  
  var originalValue = $(temp).html(); //originally was IN C
  var degreesF = (Math.round(currentTempInCelsius * (9/5) + 32) + " " + String.fromCharCode(176));
  $(temp).html(originalValue == degreesF? currentTempInCelsius + " " + String.fromCharCode(176) : degreesF);
}
  
render(){
    return(
      <div>
        <p><span id="city"></span> <span id="country"></span></p>
        <p><div className="tempa" className="data" id="temp"></div><button className="tempa" className="data" id="tempunit" onClick={() => this.toggle()}>C</button></p>
        <div className="data">Humidity: </div> <div className="data" id="humidity"></div> <div className="data"> % </div>
        <div id="desc"></div>     
      </div>
)
}
  
}


//getWeather function uses coordinates to find city, country, and weather
function getWeather(lat, lon) {
  var urlString = api + lat + "&" + lon;
  $.ajax({
    url: urlString, success: function (result) {
      $("#city").html(result.name + ", ");
      $("#country").text(result.sys.country);
      currentTempInCelsius = (Math.round(result.main.temp * 10) / 10);
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      //$("#tempunit").text(unitC);
      $("#humidity").text(result.main.humidity);
      $("#desc").text(result.weather[0].main);
      // $("#coords1").html(lat);
      //$("#coords").html(lon);
      IconGen(result.weather[0].main);
      }
  });
}


//Change icon and color, based on desc /(i.e., description/)
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


ReactDOM.render(
  <div>
    <Weather></Weather>
  </div>, document.getElementById('root'))
