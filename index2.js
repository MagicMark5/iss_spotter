const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printRiseTimes } = require('./index');

nextISSTimesForMyLocation()
  .then(result => printRiseTimes(result))
  .catch(error => console.log(error));