
// Global scope variables
var searchBtn = $('#searchBtn');
var input = $('#city');
var townEl = $('#town');
var degrEl = $('#degr');
var infoEl = $('#info');
var airEl = $('#air');
var speedEl = $('#speed');
var iconEl = $('#icon');

searchBtn.on('click', function () {
   console.log(input.val());
   getLocation(input.val());
   displayWeather(input.val());
});

var apiKey = '2d9513d4bfe9acb7cb1f12bbbfd1f381'
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
function getLocation(city) {
   var url = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey
   console.log(url)
   fetch(url)
      .then(function (response) {
         return response.json()

      }).then(function (data) {
         console.log(data[0].lat, data[0].lon)
         weather(data[0].lat, data[0].lon);

      })
}

// this function gets the weather from the pulled lat and lon
function weather(lat, lon) {
   //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
   var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
   console.log(url)
   fetch(url)
      .then(function (response) {
         return response.json()
      }).then(function (data) {
         this.displayWeather(data);


      })
}

// this function is to display the weather onto the webpage when called
function displayWeather(data) {
   var { name } = data;
      console.log("data.weather" + data.weather);
      console.log(data + "dataaaaaa");
   var icon = data.weather[0].icon;
   var description = data.weather[0].description;
   var { temp, humidity } = data.main;
   var { speed } = data.wind;
     console.log(name, icon, description, temp, humidity, speed);
       townEl.text("Weather in " + name);
        iconEl.attr('src', 'http://openweathermap.org/img/wn/' + icon + '.png');
         infoEl.text(description);
        degrEl.text(temp + '°F');
      airEl.text("Humidity: " + humidity + '%');
    speedEl.text('Wind speed: ' + speed + 'MPH');
};