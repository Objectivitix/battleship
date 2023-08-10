import _ from "lodash";

function isEqualTo(target) {
  return (element) => _.isEqual(element, target);
}

function isNotEqualTo(target) {
  return (element) => !_.isEqual(element, target);
}

export function containsEqual(arr, target) {
  return arr.some(isEqualTo(target));
}

export function remove(arr, target) {
  return arr.filter(isNotEqualTo(target));
}

export function removeMultiple(arr, targets) {
  return arr.filter((element) => !containsEqual(targets, element));
}
