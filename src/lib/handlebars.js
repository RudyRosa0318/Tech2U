const {format, register} = require("timeago.js");

const helpers = {};

helpers.timeago = (timestamp) =>{
    return format(timestamp,locale = 'es');
}
module.exports = helpers;
