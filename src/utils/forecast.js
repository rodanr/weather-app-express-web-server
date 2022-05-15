const request = require("request");
const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=889e5c51a9f03d4c4215b833b49e90ea&query=" +
    lat +
    "," +
    long +
    "&units=f";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        forecast:
          response.body.current.weather_descriptions[0] +
          "." +
          " It is currently " +
          response.body.current.temperature +
          " degrees out. These is " +
          response.body.current.precip +
          "% chance of rain",
      });
    }
  });
};

module.exports = forecast;
