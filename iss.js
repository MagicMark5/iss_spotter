// require and run the main fetch function
const request = require('request');
/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
      
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // if we get here, all's well and we got the data
    const ip = JSON.parse(body).ip;
    callback(null, ip);
    
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // if we get here, all's well and we got the data
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

// http://api.open-notify.org/iss-pass.json?lat=LAT&lon=LON

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // if we get here, all's well and we got the data
    const riseTimes = JSON.parse(body).response; // an array of objects {"risetime": TIMESTAMP, "duration": DURATION}, 
    callback(null, riseTimes);
  });
};

 const nextISSTimesForMyLocation = (callback) => {
  
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, riseTimes) => {
        if (error) {
          return callback(error, null);
        }
        
        callback(null, riseTimes);

      });

    });

  });
};



module.exports = { nextISSTimesForMyLocation };