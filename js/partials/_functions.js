function randomNumber(min,max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function getRandomInt(max,min) {
  if (min) {
    return Math.floor(Math.random() * max) + min;
  } else {
    return Math.floor(Math.random() * max);
  }
}

function randomFrom(array) {
  return array[Math.floor(Math.random()*(array.length))];
}


function helloThere() {
  alert('hello there');
}