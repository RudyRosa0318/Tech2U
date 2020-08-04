const Handlebars = require("handlebars");
Handlebars.registerHelper('distanceFixed', function(distance) {
  return distance.toFixed(2);
});

Handlebars.registerHelper('totalFixed', function(total) {
  return (total*100).toFixed(2);
});



