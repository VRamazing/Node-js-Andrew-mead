const request = require("request");
const forecast = require("./utils/forecasts");

const n = process.argv.length
const locationArray = process.argv.slice(2, n);
const location = locationArray.join(" ");

forecast(encodeURIComponent(location), (error, data) => {
  console.error("Error: " + JSON.stringify(error));
  console.error("Data: " + JSON.stringify(data));
})

