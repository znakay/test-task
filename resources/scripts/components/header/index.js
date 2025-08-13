import Header from "./header.js";

export function initHeader(selectors) {
  const header = document.querySelector(selectors.join(", "));
  header && new Header(header);
}
