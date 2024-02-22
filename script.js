let submit = document.querySelector("#submit");
const key = "";
let city;
let lat;
let lon;
let temperature;
let weather;


submit.addEventListener ("click", getCoordonate);

async function getCoordonate (){
    city = (document.querySelector("#city")).value;
    const response = await fetch("https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid=e4b03256d47dcbd2ed577892d6a30cd8");
    const data = await response.json();
    let p = Promise.resolve(data);
    p.then(function(d) {
        lat = d[0].lat;
        lon = d[0].lon;
        getWeatherInfos(); 
    })  
}

async function getWeatherInfos (){
    const response2 = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=e4b03256d47dcbd2ed577892d6a30cd8&lang=fr");
    const data2 = await response2.json();
    console.log(data2);
    temperature = Math.round((data2.main.temp) - 273.15);
    weather = data2.weather[0].description;
    currentWeather();
}

function currentWeather (){
    const info = document.querySelector("#info");
    let paragraph = document.createElement("p");
    info.appendChild(paragraph);
    const text = document.createTextNode("La température actuelle à "+city+" est de "+temperature+"°C.");
    paragraph.appendChild(text);
    paragraph = document.createElement("p");
    info.appendChild(paragraph);
    const text1 = document.createTextNode("Le temps est "+weather+".");
    paragraph.appendChild(text1);
}

