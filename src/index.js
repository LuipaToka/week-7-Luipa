function updateWeather(response) {
  let temperatureElement = document.querySelector("#num");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  cityElement = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  let descriptionElement = document.querySelector("#info");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidtyElement = document.querySelector("#humid");
  humidtyElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  let timeElement = document.querySelector("#time-stamp");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

function dateTime() {
  let now = new Date();
  let timed = document.querySelector("#time-stamp");
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let day = days[now.getDay()];
  timed.innerHTML = ` ${day}, ${hours}:${minutes}`;
  if (minutes < 10) {
    minutes = `0${minutes}}`;
  } else if (hours < 10) {
    hours = `0${hours}`;
  }
  setInterval(dateTime, 1000);
}

dateTime();

function searchCity(city) {
  let apiKey = "5aafd44b869a5c20o36345ef37t9bf0b";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(updateWeather);
}
function citySearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#form");
searchFormElement.addEventListener("submit", citySearchSubmit);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "5aafd44b869a5c20o36345ef37t9bf0b";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(url).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
   <div class="forecast-day">
        <div class="forecast-date">${formatDay(day.time)}</div>
        <div class="forecast-icon"> <img 
          src="${day.condition.icon_url}"
          width="65"
        /></div>
        <div class="weather-temperatures">
          <div class="forecast-max">
            <strong>${Math.round(day.temperature.maximum)}°</strong>
          </div>
          <div class="forecast-min">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
searchCity("Paris");
getForecast("Paris");
