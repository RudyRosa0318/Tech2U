const {format, register} = require("timeago.js");

const helpers = {};


helpers.timeago = (timestamp) =>{
    return format(timestamp,'es.js.map');
}
module.exports = helpers;
