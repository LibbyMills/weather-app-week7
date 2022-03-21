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

function formatApiDt(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#future-forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `<div class="col-3">
            <span class="day">${formatApiDt(forecastDay.dt)}</span>
            <div class="row all-else">
                    <div class="col-2">
                        <img 
                        class="future-wx"
                        src = "http://openweathermap.org/img/wn/${
                          forecastDay.weather[0].icon
                        }@2x.png"
                        alt = "weather icon"
                        width = "60"
                        />
                    </div>
                    <div class="col-8">
                        <ul>
                        <li>
                        <span class="future-high">${Math.round(
                          forecastDay.temp.max
                        )}˚</span>
                        </li>
                        <li>${Math.round(forecastDay.temp.min)}˚</li>
                        </ul>
                    </div>
            </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "bd3ff741f58b13df62ca6260d9e2d474";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(displayForecast);
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

  getForecast(response.data.coord);
  console.log(response.data);
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", processRequest);

search("Carlisle");
