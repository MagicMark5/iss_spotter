const { nextISSTimesForMyLocation } = require('./iss');

// contain most of the logic for fetching the data from each API end point

 /** 
 * Input: 
 *   Array of data objects defining the next fly-overs of the ISS.
 *   [ { risetime: <number>, duration: <number> }, ... ]
 * Returns: 
 *   undefined
 * Sideffect: 
 *   Console log messages to make that data more human readable.
 *   Example output:
 *   Next pass at Mon Jun 10 2019 20:11:44 GMT-0700 (Pacific Daylight Time) for 468 seconds!
 */



const printRiseTimes = (riseTimes) => {
  for (const riseObj of riseTimes) {
    let unixStamp = riseObj.risetime;
    let date = new Date(unixStamp * 1000); // Create new JS Date Object based on timestamp * 1000 so that argument is in ms, not seconds
    console.log(`Next pass at ${date} for ${riseObj["duration"]} seconds`);
  }
};

nextISSTimesForMyLocation((error, riseTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printRiseTimes(riseTimes);
});
