var searchBtn = document.getElementById('searchBtn');

function getWeather(searchedCity) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET',
    'http://api.openweathermap.org/data/2.5/weather?q=' + searchedCity + '&units=metric&id=524901&APPID=34b222875f6018c8fdd6442a6aac5056',
    true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState !=4) return;
    if (xhr.status !== 200) {
      // document.getElementById('error').innerHTML ='Error ' + xhr.status + ': ' + xhr.statusText;
      document.getElementById('error').innerHTML ='Can\'t find such city. Please enter more accurate city name.';
    } else {
      var weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      var responseParsedText = JSON.parse(xhr.responseText);
      var date = new Date(responseParsedText.dt*1000);
      document.getElementById('error').innerHTML ='';
      document.getElementById('city').innerHTML = responseParsedText.name + ', ' + responseParsedText.sys.country;
      document.getElementById('currentTemperature').innerHTML = Math.round(responseParsedText.main.temp);
      document.getElementById('wind').innerHTML = Math.round(responseParsedText.wind.speed);
      document.getElementById('today').innerHTML = months[date.getMonth()] + ', ' + date.getDate();
      document.getElementById('weekday').innerHTML = weekdays[date.getDay()];
    }
  }
}

function getForecast(searchedCity) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET',
    'http://api.openweathermap.org/data/2.5/forecast?q=' + searchedCity + '&units=metric&id=524901&APPID=34b222875f6018c8fdd6442a6aac5056',
    true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState !=4) return;
    if (xhr.status !== 200) {
      document.getElementById('error').innerHTML ='Error ' + xhr.status + ': ' + xhr.statusText;
    } else {
      var weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      var responseParsedText = JSON.parse(xhr.responseText);
      var day1 = new Date(responseParsedText.list[6].dt*1000);
      var day2 = new Date(responseParsedText.list[14].dt*1000);
      var day3 = new Date(responseParsedText.list[22].dt*1000);
      var day4 = new Date(responseParsedText.list[30].dt*1000);
      document.getElementById('error').innerHTML ='';

      // document.getElementById('day1').innerHTML = day1;
      document.getElementById('weekday1').innerHTML = weekdays[day1.getDay()];
      document.getElementById('day1temperature').innerHTML = Math.round(responseParsedText.list[6].main.temp);

      // document.getElementById('day2').innerHTML = day2;
      document.getElementById('weekday2').innerHTML = weekdays[day2.getDay()];
      document.getElementById('day2temperature').innerHTML = Math.round(responseParsedText.list[14].main.temp);

      // document.getElementById('day3').innerHTML = day3;
      document.getElementById('weekday3').innerHTML = weekdays[day3.getDay()];
      document.getElementById('day3temperature').innerHTML = Math.round(responseParsedText.list[22].main.temp);

      // document.getElementById('day4').innerHTML = day4;
      document.getElementById('weekday4').innerHTML = weekdays[day4.getDay()];
      document.getElementById('day4temperature').innerHTML = Math.round(responseParsedText.list[30].main.temp);

      // WEATHER ICON///////////////////////////////////////////////////////////////////////////////////////
      var img = new Image();
      var div = document.getElementById('weatherIcon');
      // window.getComputedStyle(document.querySelector('#weekday1'), ':after').style.background-image = 'http://openweathermap.org/img/w/' + imgId + '.png';
      img.onload = function() {
        div.appendChild(img);
        weekday1.after(img);
      };
      // img.src = 'http://openweathermap.org/img/w/10d.png';
      var imgId = document.getElementById('weatherIcon').innerHTML = responseParsedText.list[6].weather[0].icon;
      img.src = 'http://openweathermap.org/img/w/' + imgId + '.png';




      /////////////////////////////////////////////////////////////////////////////////////////

      // document.getElementById('weatherIcon').innerHTML = responseParsedText.list[6].weather[0].main;
    }
  }
}

function getWeatherAndForecast(city) {
  getWeather(city);
  getForecast(city);
}

window.addEventListener('load', function() {getWeatherAndForecast('Saint Petersburg');});

searchBtn.addEventListener('click', function() {
  event.preventDefault();
  getWeatherAndForecast(document.getElementById('citySearch').value);
});

// searchBtn.addEventListener('click', function() {
//   getWeatherAndForecast('Saint Petersburg');
// });



