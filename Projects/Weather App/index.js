const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "appid=c8edec57a66f846121faf7e321d6a30d";
const units = "units=metric";

const cityName = document.querySelector("#searchBar");
const searchBtn = document.querySelector("#searchButton");
const searchBar = document.querySelector("#searchBar");
const weatherImage = document.querySelector("#weatherImg");

async function getWeatherData(cityName)
{
    try
    {
        const response = await fetch(apiUrl + 'q=' + cityName + '&' + apiKey + '&' + units);
        const data = await response.json();
        console.log(data);

        document.querySelector(".location h1").innerHTML = data.name;
        document.querySelector(".windSpeed").innerHTML = data.wind.speed + ' km/h';
        document.querySelector(".humidity").innerHTML = data.main.humidity + ' %';
        document.querySelector(".temperature h1").innerHTML = Math.round(data.main.temp) + ' °C';

        let quote = "Smile like the sun!";

        switch(data.weather[0].main)
        {
            case 'Clear':
                weatherImage.src = "image/clear.gif";
                quote = "Smile like the sun!";
                break;
            case 'Clouds':
                weatherImage.src = "image/clouds.gif";
                quote = "Stay cozy under the clouds.";
                break;
            case 'Rain':
                weatherImage.src = "image/rain.gif";
                quote = "Dance in the rain!";
                break;
            case 'Snow':
                weatherImage.src = "image/snow.gif";
                quote = "Feel the magic of snow.";
                break;
            case 'Thunderstorm':
                weatherImage.src = "image/thunderstorm.gif";
                quote = "Brave the storm!";
                break;
            case 'Drizzle':
                weatherImage.src = "image/drizzle.gif";
                quote = "A little rain never hurts.";
                break;
            case 'Humidity':
                weatherImage.src = "image/humidity.gif";
                quote = "Humidity brings calm.";
                break;
            case 'Mist':
                weatherImage.src = "image/mist.gif";
                quote = "Embrace the mystery of mist.";
                break;
            case 'Storm':
                weatherImage.src = "image/storm.gif";
                quote = "Brave the storm!";
                break;
            case 'Wind':
                weatherImage.src = "image/wind.gif";
                quote = "Feel the breeze of change.";
                break;
            default:
                weatherImage.src = "image/clear.gif";
                break;
        }

        document.querySelector(".quote h1").textContent = quote;
    }

    catch(error)
    {
        console.error(error.message);
        alert("Please enter a valid city name!");
    }
}

searchBtn.addEventListener("click", function()
{
    getWeatherData(cityName.value);
});

searchBar.addEventListener("keypress", ()=>
{
    if(event.key === "Enter")
    {
        getWeatherData(cityName.value);
    }
});