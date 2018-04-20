function getRandomInt(max,min) {
  if (min) {
    return Math.floor(Math.random() * Math.floor(max)) + min;
  } else {
    return Math.floor(Math.random() * Math.floor(max));
  }
}

function helloThere() {
  alert('hello there');
}