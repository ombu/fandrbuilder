
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

export function toInt(number) {
  return parseInt(number, 10);
}

export function pluck(obj) {
  return function(key) {
    return obj[key];
  }
}

export function denormalize(model) {
  return model.list.map(pluck(model.byId));
}

export function trim(character, str) {
  // Remove from front.
  while (str.charAt(0) == character) {
    str = str.slice(1);
  }

  // Remove from back.
  while (str.charAt(str.length-1) == character) {
    str = str.slice(0, str.length - 1);
  }

  return str;
}
