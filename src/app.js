function displayData(response) {
  let cityElement = document.querySelector("#city");
  let tempNowElement = document.querySelector("#tempNow");
  let tempTodayMin = document.querySelector("#tempTodayMin");
  let wxDescription = document.querySelector("#wxDescription");

  tempNowElement.innerHTML = Math.round(response.data.main.temp);
  tempTodayMin.innerHTML = Math.round(response.data.main.temp_min);
  wxDescription.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
}

let apiKey = "bd3ff741f58b13df62ca6260d9e2d474";
let city = "Portsmouth";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

axios.get(apiUrl).then(displayData);
