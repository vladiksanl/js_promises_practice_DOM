'use strict';

const body = document.body;
const firstMessage = document.createElement('div');

const rejectFirstMessage = document.createElement('div');

const secondMessage = document.createElement('div');
const thirdMessage = document.createElement('div');

firstMessage.textContent = 'First promise was resolved';
rejectFirstMessage.textContent = 'First promise was rejected';
secondMessage.textContent = 'Second promise was resolved';
thirdMessage.textContent = 'Third promise was resolved';

firstMessage.dataset.qa = 'notification';
rejectFirstMessage.dataset.qa = 'notification';
secondMessage.dataset.qa = 'notification';
thirdMessage.dataset.qa = 'notification';

firstMessage.classList.add('success');
secondMessage.classList.add('success');
thirdMessage.classList.add('success');
rejectFirstMessage.classList.add('error');

let leftClick = false;
let rightClick = false;

new Promise((resolve, reject) => {
  function handler() {
    clearTimeout(timer);
    resolve('First promise was resolved');
  }
  body.addEventListener('click', handler);

  const timer = setTimeout(() => {
    body.removeEventListener('click', handler);
    reject(new Error());
  }, 3000);
})
  .then((message) => {
    firstMessage.textContent = message;
    body.append(firstMessage);
  })
  .catch(() => {
    body.append(rejectFirstMessage);
  });

new Promise((resolve) => {
  function handler(e) {
    if (e.button === 0 || e.button === 2) {
      body.removeEventListener('mousedown', handler);
      resolve('Second promise was resolved');
    }
  }
  body.addEventListener('mousedown', handler);
}).then((message) => {
  secondMessage.textContent = message;
  body.append(secondMessage);
});

new Promise((resolve) => {
  function handler(e) {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      body.removeEventListener('mousedown', handler);
      resolve('Third promise was resolved');
    }
  }

  body.addEventListener('mousedown', handler);
}).then((message) => {
  thirdMessage.textContent = message;
  body.append(thirdMessage);
});

body.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
