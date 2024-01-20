const request = require("request");

module.exports = function forecast(location, callback) {
    request({ url: `http://api.weatherstack.com/current?access_key=65650ae6a77f12583d709123dc8bbd25&query=${location}`, json: true }, function (error, response, body) {
        if (error) {
            callback("Unable to connect to web API");
        }
        else if (body.error) {
            callback("Unable to find location");
        }
        else {
            // It's currently 48 degrees and the chance of rain is 10%
            const currentWeather = body.current;
            // console.log(`There is ${currentWeather.weather_descriptions[0]} and It's currently ${currentWeather.temperature} degrees and feels like ${currentWeather.feelslike} degree celcius`);
            callback(undefined, currentWeather);
        }

    });


}