const request = require('request-promise-native');
// const printRiseTimes = require('./index');
// fetchMyIP returns a promise (b/c this version of request returns a promise)

/* 
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
*/

const fetchMyIP = () => request('https://api.ipify.org?format=json');
const fetchCoordsByIP = (body) => request(`https://freegeoip.app/json/${JSON.parse(body).ip}`);
const fetchISSFlyOverTimes = (body) => request(`http://api.open-notify.org/iss-pass.json?lat=${JSON.parse(body).latitude}&lon=${JSON.parse(body).longitude}`);


const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP) // this is our "resolve function/handler"
    .then(fetchISSFlyOverTimes)
    .then(body => JSON.parse(body).response);
};

module.exports = { nextISSTimesForMyLocation };