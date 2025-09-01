const city = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorDiv = document.getElementById("error");
const errorMsg = document.getElementById("errorMessage");
const weatherInfoDiv = document.getElementById("weatherInfo");
const locationDiv = document.getElementById("location");
const weatherIconDiv = document.getElementById("weatherIcon");
const temperatureDiv = document.getElementById("temperature");
const descriptionDiv = document.getElementById("description");
const feelsLikeDiv = document.getElementById("feelsLike");
const humidityDiv = document.getElementById("humidity");
const windSpeedDiv = document.getElementById("windSpeed");
const pressureDiv = document.getElementById("pressure");

const apiKey = "04fee145b58649cdb4a124925250109";
city.focus();

async function fetchData(cityName) {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    errorDiv.classList.remove("show");
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    errorMsg.textContent =
      "City not found. Please try again with a valid city name.";
    errorDiv.classList.add("show");
  }
}

async function getWeather() {
  const input = city.value.trim();
  if (!input) {
    errorMsg.textContent = "Please enter a city name!";
    errorDiv.classList.add("show");
    return;
  }
  errorMsg.textContent = "";
  city.value = "";
  const data = await fetchData(input);
  if (data) {
    displayWeatherData(data);
  }
}

function displayWeatherData(data) {
  weatherInfoDiv.classList.add("show");

  const iconUrl = "https:" + data.current.condition.icon;

  locationDiv.textContent = `${data.location.name}, ${data.location.country}`;
  temperatureDiv.textContent = `${data.current.temp_c}°C or ${data.current.temp_f}°F`;
  weatherIconDiv.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
  descriptionDiv.textContent = data.current.condition.text;

  feelsLikeDiv.textContent = `${data.current.feelslike_c}°C or ${data.current.feelslike_f}°F`;
  humidityDiv.textContent = `${data.current.humidity}%`;
  windSpeedDiv.textContent = `${data.current.wind_mph}mph`;
  pressureDiv.textContent = `${data.current.pressure_mb}mb`;
}

// event Listeners
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  city.focus();
  getWeather();
});

city.addEventListener("keypress", (e) => {
  if (e.target === "Enter") {
    e.preventDefault();
    getWeather();
  }
});
