import _ from "lodash";

export default function isNotEqual(target) {
  return (element) => !_.isEqual(element, target);
}
