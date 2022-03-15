function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#future-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thurs", "Fri", "Sat", "Sun"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-3">
            <span class="day">${day}</span>
            <div class="row all-else">
                    <div class="col-2">
                        <img 
                        class="future-wx"
                        src = "http://openweathermap.org/img/wn/10d@2x.png"
                        alt = "weather icon"
                        width = "60"
                        />
                    </div>
                    <div class="col-8">
                        <ul>
                        <li>
                        <span class="future-high">11˚</span>
                        </li>
                        <li>0˚</li>
                        </ul>
                    </div>
            </div>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function displayData(response) {
  let cityElement = document.querySelector("#city");
  let tempNowElement = document.querySelector("#tempNow");
  let tempTodayMin = document.querySelector("#tempTodayMin");
  let wxDescription = document.querySelector("#wxDescription");
  let wind = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconNow = document.querySelector("#icon-now");
  let iconCode = response.data.weather[0].icon;

  celsiusTemp = Math.round(response.data.main.temp);

  tempNowElement.innerHTML = Math.round(response.data.main.temp);
  tempTodayMin.innerHTML = Math.round(response.data.main.temp_min);
  wxDescription.innerHTML = response.data.weather[0].description;
  wind.innerHTML = Math.round(response.data.wind.speed);
  cityElement.innerHTML = response.data.name;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconNow.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  iconNow.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "bd3ff741f58b13df62ca6260d9e2d474";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayData);
}

function processRequest(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function displayfahrenheit(event) {
  event.preventDefault();
  let fahrenheit = Math.round((celsiusTemp * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempNowElement = document.querySelector("#tempNow");
  tempNowElement.innerHTML = fahrenheit;
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempNowElement = document.querySelector("#tempNow");
  tempNowElement.innerHTML = celsiusTemp;
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", processRequest);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayfahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

displayForecast();
