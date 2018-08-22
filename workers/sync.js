const syncFib = require('../fib_functions/sync.js');
const syncBusyFib = require('../fib_functions/sync_busy.js');
const syncMemoFib = require('../fib_functions/sync_memo.js');

onmessage = function(e) {
  const { n, fcnStr } = e.data;

  const beforeTime = new Date().getTime();
  const result = eval(fcnStr)(n);
  const afterTime = new Date().getTime();
  const duration = afterTime - beforeTime;
  postMessage({ result, duration });
};
