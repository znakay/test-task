import InputFile from "./inputFile.js";

export function initInputFile(selectors) {
  const inputs = document.querySelectorAll(selectors.join(", "));
  inputs.length && inputs.forEach((input) => new InputFile(input));
}
