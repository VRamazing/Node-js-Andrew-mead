const defaultLocation = "New Delhi";
// https://cors-anywhere.herokuapp.com/

const fetchWeatherData = (location = defaultLocation, callback) =>
    fetch(`https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current?access_key=65650ae6a77f12583d709123dc8bbd25&query=${encodeURIComponent(location)}`, {
        referrerPolicy: "unsafe-url",
        // mode: "no-cors"
    }).then((response) => {
        response.json().then(data => {
            callback(data)
        })
    })




const weatherForm = document.querySelector("form")
const searchInput = document.querySelector("input")
const message1 = document.querySelector("#message-1")
const message2 = document.querySelector("#message-2")


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    message1.textContent = "Loading..."
    fetchWeatherData(searchInput.value, (data) => {
        if(data.error){
            message1.textContent = "Unable to find location"
            message2.textContent = data.error.info;
        }else {
            message1.textContent = `Location ${data.location.name}, ${data.location.country}`
            message2.textContent = `Temperature ${data.current.temperature} degree celcius and weather conditions looks ${data.current.weather_descriptions[0]}
            `;
        }
        console.log(data)
    });
})
