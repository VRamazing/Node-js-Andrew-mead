const defaultLocation = "New Delhi";

const fetchWeatherData = (location = defaultLocation, callback) =>
    fetch(`/weather?address=${location}`).then((response) => {
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
            message2.textContent = data.error;
        }else {
            message1.textContent = `Location ${data.address}, ${data.country}`
            message2.textContent = `Temperature ${data.temperature} degree celcius and weather conditions looks ${data.forcast}
            `;
        }
    });
})
