const request = require("request");
const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1Ijoicm9kYW4wODE4IiwiYSI6ImNsMzQ2OW1hNjBlbHAzZ3Fzd25qdHg5ejYifQ.4lgTMJFzGc-MtVYEnr6yUA";
  //ulr: url => url (only), using shorthand syntax
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the location Service", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location, try another search", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
