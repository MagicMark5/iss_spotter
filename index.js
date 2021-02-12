// require and run the main fetch function
const request = require('request');
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);

  });

}); // this is the app running call