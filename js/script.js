var searchBtn = document.getElementById('searchBtn');

function getForecast(searchedCity) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET',
    'http://api.openweathermap.org/data/2.5/forecast?q=' + searchedCity + '&units=metric&id=524901&APPID=34b222875f6018c8fdd6442a6aac5056',
    true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState !=4) return;
    if (xhr.status !== 200) {
      document.getElementById('error').innerHTML ='Can\'t find such city. Please enter more accurate city name.';
    } else {
      var weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      var responseParsedText = JSON.parse(xhr.responseText);

      var day0 = new Date(responseParsedText.list[0].dt*1000);
      var day1 = new Date(responseParsedText.list[6].dt*1000);
      var day2 = new Date(responseParsedText.list[14].dt*1000);
      var day3 = new Date(responseParsedText.list[22].dt*1000);
      var day4 = new Date(responseParsedText.list[30].dt*1000);
      document.getElementById('error').innerHTML ='';

      // Today
      document.getElementById('city').innerHTML = responseParsedText.city.name + ', ' + responseParsedText.city.country;
      document.getElementById('currentTemperature').innerHTML = Math.round(responseParsedText.list[0].main.temp);
      document.getElementById('wind').innerHTML = Math.round(responseParsedText.list[0].wind.speed);
      document.getElementById('today').innerHTML = months[day0.getMonth()] + ', ' + day0.getDate();
      document.getElementById('weekday').innerHTML = weekdays[day0.getDay()];

      // day1
      document.getElementById('weekday1').innerHTML = weekdays[day1.getDay()];
      document.getElementById('day1temperature').innerHTML = Math.round(responseParsedText.list[6].main.temp);
      var icon1id = responseParsedText.list[6].weather[0].icon;
      document.getElementById('icon1').style.backgroundImage  = "url('http://openweathermap.org/img/w/" + icon1id + ".png')";

      // day2
      document.getElementById('weekday2').innerHTML = weekdays[day2.getDay()];
      document.getElementById('day2temperature').innerHTML = Math.round(responseParsedText.list[14].main.temp);
      var icon2id = responseParsedText.list[14].weather[0].icon;
      document.getElementById('icon2').style.backgroundImage  = "url('http://openweathermap.org/img/w/" + icon2id + ".png')";

      // day3
      document.getElementById('weekday3').innerHTML = weekdays[day3.getDay()];
      document.getElementById('day3temperature').innerHTML = Math.round(responseParsedText.list[22].main.temp);
      var icon3id = responseParsedText.list[22].weather[0].icon;
      document.getElementById('icon3').style.backgroundImage  = "url('http://openweathermap.org/img/w/" + icon3id + ".png')";

      // day4
      document.getElementById('weekday4').innerHTML = weekdays[day4.getDay()];
      document.getElementById('day4temperature').innerHTML = Math.round(responseParsedText.list[30].main.temp);
      var icon4id = responseParsedText.list[30].weather[0].icon;
      document.getElementById('icon4').style.backgroundImage  = "url('http://openweathermap.org/img/w/" + icon4id + ".png')";
    }
  }}

window.addEventListener('load', function() {getForecast('Saint Petersburg');});
searchBtn.addEventListener('click', function() {
  event.preventDefault();
  getForecast(document.getElementById('citySearch').value);
});



