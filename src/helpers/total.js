const Handlebars = require("handlebars");
Handlebars.registerHelper('distanceFixed', function(distance) {
  return distance.toFixed(2);
});