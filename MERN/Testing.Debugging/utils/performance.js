// server/utils/performance.js
const { performance } = require('perf_hooks');

function monitorExecution(label, fn) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${label} executed in ${(end - start).toFixed(2)}ms`);
  return result;
}

module.exports = monitorExecution;
