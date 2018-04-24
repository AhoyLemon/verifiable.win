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

function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}