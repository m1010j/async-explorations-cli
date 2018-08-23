const chalk = require('chalk');

const nth = require('./nth.js');
const stringify = require('./stringify.js');

module.exports = function(n, duration, result) {
  console.log(
    `The ${nth(n)} Fibonacci number is ${chalk.bold.yellow(stringify(result))}.`
  );
  console.log(
    `It took ${chalk.bold.cyan(
      stringify(duration) + ' milliseconds'
    )} to calculate this.`
  );
};
