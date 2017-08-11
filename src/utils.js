function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}

function arrayXor(array, element) {
  let found = false, res = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] === element) {
      found = true;
      continue;
    }
    res.push(array[i]);
  }
  if (!found) res.push(element);
  return res;
}

function isEqualSet(a, b) {
  if (a.size !== b.size) return false;
  for (let x of a) {
    if (!b.has(x)) return false;
  }
  return true;
}

export { shuffle, arrayXor, isEqualSet };