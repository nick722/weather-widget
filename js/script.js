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

      document.getElementById('error').innerHTML ='';
      document.getElementById('city').innerHTML = responseParsedText.city.name + ', ' + responseParsedText.city.country;

      for (var i = 0; i < 5; i++) {
        var day = responseParsedText.list[i * 8];
        var date = new Date(day.dt*1000);
        var iconId = day.weather[0].icon;
        document.getElementById('weekday' + i).innerHTML = weekdays[date.getDay()];
        document.getElementById('dayTemp' + i).innerHTML = Math.round(day.main.temp);
        if (i !== 0) {
          document.getElementById('icon' + i).style.backgroundImage  = "url('http://openweathermap.org/img/w/" + iconId + ".png')";
        } else {
          document.getElementById('wind').innerHTML = Math.round(day.wind.speed);
          document.getElementById('today').innerHTML = months[date.getMonth()] + ', ' + date.getDate();
        }
      }
    }
  }}

  window.addEventListener('load', function() {getForecast('Saint Petersburg');});
  searchBtn.addEventListener('click', function() {
    event.preventDefault();
    getForecast(document.getElementById('citySearch').value);
  });



