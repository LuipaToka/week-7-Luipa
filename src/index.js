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
}

dateTime();

setInterval(dateTime, 1000);

function enterCity(event) {
  event.preventDefault();
  let input = document.querySelector(".enter");
  let citi = input.value;
  let key = "5aafd44b869a5c20o36345ef37t9bf0b";

  let url = `https://api.shecodes.io/weather/v1/current?query=${citi}&key=${key}&units=metric`;
  axios.get(url).then(temperatureToday);
}

function temperatureToday(response) {
  let number = document.querySelector("#num");
  let temp = Math.round(response.data.temperature.current);
  number.innerHTML = temp;

  let cities = document.querySelector(".city");
  cities.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humid");
  let windSpeedElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;
}
let Forms = document.querySelector(".form");
Forms.addEventListener("submit", enterCity);
