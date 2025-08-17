import InputRange from "./inputRange.js";

export function initInputRange(selectors) {
  const inputs = document.querySelectorAll(selectors.join(", "));
  inputs.length && inputs.forEach((inputRange) => new InputRange(inputRange));
}
