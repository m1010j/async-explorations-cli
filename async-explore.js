const { Worker } = require('worker_threads');

const syncFib = require('./fib_functions/sync.js');
const syncBusyFib = require('./fib_functions/sync_busy.js');
const syncMemoFib = require('./fib_functions/sync_memo.js');
const asyncFib = require('./fib_functions/async.js');
const asyncBusyFib = require('./fib_functions/async_busy.js');
const asyncMemoFib = require('./fib_functions/async_memo.js');
const displayResult = require('./util/display_result.js');

const fourthArg = process.argv[4];
const noWorker = ['-nw', '--mode=no-worker'].includes(fourthArg);
const withWorker = !fourthArg || ['-w', '--mode=worker'].includes(fourthArg);

const fcnStr = process.argv[2];
const fcnStrs = [
  'syncFib',
  'syncBusyFib',
  'syncMemoFib',
  'asyncFib',
  'asyncBusyFib',
  'asyncMemoFib',
];
if (fcnStrs.includes(fcnStr)) {
  const fcn = eval(fcnStr);
  const nStr = parseInt(process.argv[3]);
  const n = parseInt(nStr);
  if (noWorker) {
    if (n > 0) {
      if (fcnStr[0] === 's') {
        const beforeTime = new Date().getTime();
        const result = fcn(n);
        const afterTime = new Date().getTime();
        const duration = afterTime - beforeTime;

        displayResult(n, duration, result);
      } else {
        const beforeTime = new Date().getTime();
        fcn(n).then(function(result) {
          const afterTime = new Date().getTime();
          const duration = afterTime - beforeTime;

          displayResult(n, duration, result);
        });
      }
    } else {
      console.log(
        'The second arguments needs to be an integer greater than 0.' +
          ` You entered: ${nStr}.`
      );
    }
  } else if (withWorker) {
    worker = new Worker(`./workers/sync.js`);
    worker.postMessage({ n, fcnStr });
    worker.onmessage = function(e) {
      displayResult(n, e.data.duration, e.data.result);
      worker.terminate();
    };
  } else {
    console.log(`Invalid option: ${fourthArg}`);
  }
} else {
  console.log(
    `The first argument needs to be one of: ${fcnStrs.join(
      ', '
    )}. You entered: ${fcnStr}.`
  );
}
