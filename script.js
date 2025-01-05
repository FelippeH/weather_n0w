const dateSys = new Date();
const horaAtual = dateSys.getHours();
const key = "dfda8cea62ea28831753e599cd702d8d"
const defaultCity = "São Paulo";

async function carregar() {

    const data = await search(defaultCity);
    if (data) updateUI(data);
}

async function search(city) {

    try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=pt`);
    if (!response.ok) throw new Error("Cidade não encontrada");

    const data = await response.json();
    return data;

    } catch (error) {
        console.error("Erro ao buscar a cidade:", error.message);
    }
}

async function handleClick() {
    const cityInput = document.querySelector(".input-city");
    const city = cityInput.value.trim();
    if(city) {
        const data = await search(city);
        if(data) updateUI(data);
    } else {
        alert("Insira o nome de uma cidade");
    }
}

function updateUI(data) {
    const mediumBox = document.querySelector(".medium-box h2");
    const tempElement = document.querySelector(".temp");
    const cloudElement = document.querySelector(".cloud-img");
    const umiElement = document.querySelector(".umi")
    const weatherIcon = document.querySelector(".mini-box img");
    const statusElement = document.querySelector(".status");

    mediumBox.textContent = `Tempo agora em ${data.name}`;
    tempElement.textContent = `${Math.round(data.main.temp)}ºC`;
    cloudElement.textContent = data.weather[0].description;
    umiElement.textContent = `${data.main.humidity}%`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    statusElement.textContent = data.weather[0].description;
}

document.addEventListener("DOMContentLoaded", () => {
    const inputCity = document.querySelector(".input-city");
    inputCity.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            handleClick();
        }
    });
});
