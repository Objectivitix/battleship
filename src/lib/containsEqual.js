import isEqual from "./isEqual";

export default function containsEqual(arr, target) {
  return arr.some(isEqual(target));
}
