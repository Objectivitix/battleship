import _ from "lodash";

export default function isEqual(target) {
  return (element) => _.isEqual(element, target);
}
