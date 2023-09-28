import { tipList } from "./tips.js";

const apiKey = "5e1511bf19d0e101adbe349ea947d35b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

async function checkWeather() {
	// FETCHING DATA
	let userInput = document.querySelector(".userInput");
	const response = await fetch(
		`${apiUrl}&q=${userInput.value}&appid=${apiKey}`,
	);

	let data = await response.json();
	console.log(data);

	// DOM MANIPULATE
	if (response.status == 400 || response.status == 404) {
		document.querySelector(".error").style.display = "block";
		document.querySelector(".weather-info-container").style.display =
			"none";
		document.querySelector("footer").style.display = "block";
	} else {
		document.querySelector("footer").style.display = "none";
		document.querySelector(".error").style.display = "none";
		document.querySelector(".weather-info-container").style.display =
			"block";
		document.querySelector(".temp").innerHTML =
			Math.floor(data.main.temp) + "°C";
		document.querySelector(".main").innerHTML = data.weather[0].description;
		document.querySelector(".city").innerHTML = data.name;
		document.querySelector(".humidity").innerHTML =
			data.main.humidity + "%";
		document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
	}
	userInput.value = "";

	// WEATHER ICON
	let icon = document.querySelector(".weather-icon");
	if (data.weather[0].description == "clear sky") {
		icon.src = "./img/clearSky.png";
	} else if (data.weather[0].description == "few clouds") {
		icon.src = "./img/cloudy.png";
	} else if (data.weather[0].description == "scattered clouds") {
		icon.src = "./img/scatteredClouds.png";
	} else if (data.weather[0].description == "broken clouds") {
		icon.src = "./img/cloudy.png";
	} else if (data.weather[0].description == "shower rain") {
		icon.src = "./img/rain.png";
	} else if (data.weather[0].description == "rain") {
		icon.src = "./img/rain.png";
	} else if (data.weather[0].description == "thunderstorm") {
		icon.src = "./img/thunderstorms.png";
	} else if (data.weather[0].description == "snow") {
		icon.src = "./img/snow.png";
	} else {
		icon.src = "./img/cloudy.png";
	}

	// RANDOM TIPS
	let randomNum = Number(Math.floor(Math.random() * 10));
	document.querySelector(".tip-list").innerHTML = tipList[randomNum];
}

let btn = document
	.querySelector(".searchBTN")
	.addEventListener("click", checkWeather);
