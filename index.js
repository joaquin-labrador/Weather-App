const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

// Events Listeners

search.addEventListener("click", async () => {
  await logicWeather();
});

document.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    await logicWeather();
  }
});

// Logic
const logicWeather = async () => {
  const API_KEY = "a34009ba39ef04b4a30189e7bf54cc1c";

  const cityInput = document.querySelector(".search-box input").value;

  if (!cityInput) {
    return;
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}&units=metric`
  );

  const json = await response.json();

  console.log(json);

  if (json.cod === "404") {
    container.style.height = "480px";
    weatherBox.style.display = "none";
    weatherDetails.style.display = "none";
    error404.style.display = "block";
    error404.classList.add("fadeIn");
    return;
  }

  error404.style.display = "none";
  error404.classList.remove("fadeIn");

  const image = document.querySelector(".weather-box img");
  const temperature = document.querySelector(".weather-box  .temperature");
  const description = document.querySelector(".weather-box  .description");
  const humidity = document.querySelector(".weather-details  .humidity span");
  const wind = document.querySelector(".weather-details  .wind span");

  image.src = weatherTypes[json.weather[0].main];

  temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C </span>`;

  description.innerHTML = `${json.weather[0].description}`;

  humidity.innerHTML = `${json.main.humidity}%`;

  wind.innerHTML = `${json.wind.speed} km/h`;

  weatherBox.style.display = "";
  weatherDetails.style.display = "";
  weatherBox.classList.add("fadeIn");
  weatherDetails.classList.add("fadeIn");
  container.style.height = "550px";

  return;
};

const weatherTypes = {
  Clear: "img/clear.png",
  Rain: "img/rain.png",
  Snow: "img/snow.png",
  Clouds: "img/cloud.png",
  Atmosphere: "img/haze.png",
  Thunderstorm: "img/thunderstorm.png",
};
