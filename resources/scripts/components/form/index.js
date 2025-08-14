import Form from "./form.js";

export function initForm(selectors) {
  const form = document.querySelector(selectors.join(", "));
  form && new Form(form);
}