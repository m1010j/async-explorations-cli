const nth = require('./nth.js');
const stringify = require('./stringify.js');

module.exports = function(n, duration, result) {
  console.log(`The ${nth(n)} Fibonacci number is ${stringify(result)}.`);
  console.log(`It took ${stringify(duration)} milliseconds to calculate this.`);
};
