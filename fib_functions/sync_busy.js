const busywork = require('../util/busywork.js');

module.exports = function syncBusyFib(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  busywork(n);

  return syncBusyFib(n - 1) + syncBusyFib(n - 2);
};
