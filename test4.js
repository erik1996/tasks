let queue = [];
let globalId = 0;
let seconds = 0;

setTimeout(function tick() {
  console.log('... tick ...', seconds++);
  setTimeout(tick, 1000);
}, 1000);

const runListener = (topic, wait, onFinished = () => {}) => setTimeout(function listen() {
  const index = queue.findIndex(val => val === topic);

  if (index < 0) {
    return setTimeout(listen, 1000);
  }
  
  globalId++;

  function handleNext(id) {
    queue.splice(index, 1);
    console.log(id, ': ', topic, 'waiting ...', wait / 1000, 'seconds');

    setTimeout(() => {
      console.log(id, ': ', topic, 'finished');
      onFinished();
      return setTimeout(listen, 1000);
    }, wait);
  }

  handleNext(globalId);
}, 1000);

runListener('order', 0, () => {
  queue.push('dough');
});

/* dough chefs */
runListener('dough', 7000, () => {
  queue.push('topping');
});
runListener('dough', 7000, () => {
  queue.push('topping');
});

/* topping chefs */
runListener('topping', 4000, () => {
  queue.push('oven');
});
runListener('topping', 4000, () => {
  queue.push('oven');
});
runListener('topping', 4000, () => {
  queue.push('oven');
});

/* oven */
runListener('oven', 10000, () => {
  queue.push('serve');
});

/* servers */
runListener('serve', 5000);
runListener('serve', 5000);

/* start order */
setTimeout(() => {
  queue.push('order');
}, 3000);
queue.push('order');
