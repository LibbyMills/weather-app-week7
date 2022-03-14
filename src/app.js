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

function displayData(response) {
  let cityElement = document.querySelector("#city");
  let tempNowElement = document.querySelector("#tempNow");
  let tempTodayMin = document.querySelector("#tempTodayMin");
  let wxDescription = document.querySelector("#wxDescription");
  let dateElement = document.querySelector("#date");
  let iconNow = document.querySelector("#icon-now");
  let iconCode = response.data.weather[0].icon;

  tempNowElement.innerHTML = Math.round(response.data.main.temp);
  tempTodayMin.innerHTML = Math.round(response.data.main.temp_min);
  wxDescription.innerHTML = response.data.weather[0].description;
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", processRequest);
