const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const staticDirectory = path.join(__dirname, "..", "/static");
const viewsDirectory = path.join(__dirname, "..", "/templates/views");
const partialsDirectory = path.join(__dirname, "..", "/templates/partials");

const app = express();
app.set("view engine", "hbs");
app.use(express.static(staticDirectory));
app.set("views", viewsDirectory);
hbs.registerPartials(partialsDirectory);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful text",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  //{ latitude, longitude, location } = {}, {} added to avoid destructuring from undefined; what it does is set the default value to {}
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      forecast(latitude, longitude, (error, { forecast }) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        res.send({
          forecast: forecast,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404",
    errorMessage: "Help Article Not found",
  });
});
app.get("*", (req, res) => {
  res.render("404page", {
    title: "404",
    errorMessage: "Page Not Found",
  });
});
app.listen(3000, () => {
  console.log("App is Running on port 3000");
});
