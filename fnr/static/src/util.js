
export function ifMatchReduce(key, value) {
  return function(prev, next) {
    return next[key] == value ? next : prev;
  };
}

export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function sortByOrder(a, b) {
  return a.order - b.order;
}
