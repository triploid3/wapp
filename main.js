 //Checks for geolocation access and asks user for location on page load***NO FURTHER ACTION CURRENTLY***
 window.addEventListener('load', () => {
     let lat;
     let lon;

     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(position => {
             lon = position.coords.longitude;
             lat = position.coords.latitude;
         })
     }
 })

 //API info
 const api = {
         key: "eb63a05411cbc1b13d43abc4960e20a7",
         base: "https://api.openweathermap.org/data/2.5/"
     }
     //Listens for ENTER keypress in searchbar
 const searchbox = document.querySelector(".searchbox");
 searchbox.addEventListener('keypress', setQuery);

 function setQuery(evt) {
     if (evt.keyCode == 13) {
         getResults(searchbox.value);
         console.log(searchbox.value);
     }
 }
 //Returns weather data based on the location entered in the searchbar in JSON format to be passed to displayResults()
 function getResults(query) {
     fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
         .then(weather => {
             return weather.json();
         }).then(displayResults);
     //Takes country/city API data and replaces default page data
     function displayResults(weather) {
         console.log(weather);
         let city = document.querySelector('.location .city');
         city.innerText = `${weather.name}, ${weather.sys.country}`;
         //Takes date API data and replaces default page data
         let now = new Date();
         let date = document.querySelector('.location .date');
         date.innerText = dateBuilder(now);
         //Takes main temperature API data and replaces default page data
         let temp = document.querySelector('.current .temp');
         temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
         //Takes weather conditions/description API data and replaces default page data
         let weather_el = document.querySelector('.current .weather');
         weather_el.innerText = weather.weather[0].main;
         //Takes min/max daily temperature API data and replaces default page data
         let highlow = document.querySelector('.high-low');
         highlow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`
     }
     //Replaces default day, date, month and year data with current value based on API location data
     function dateBuilder(d) {
         let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
         let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

         let day = days[d.getDay()];
         let date = d.getDate();
         let month = months[d.getMonth()];
         let year = d.getFullYear();

         return `${day} ${date} ${month} ${year}`;
     }
 }