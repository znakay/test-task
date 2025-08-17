import Select from "./select.js";

export function initSelect(selectors) {
  const selects = document.querySelectorAll(selectors.join(", "));
  selects.length && selects.forEach((select) => new Select(select));
}
