export default class Form {
  constructor(form) {
    this.form = form;

    this.select = this.form.querySelector(".select");
    this.selectInput = this.select?.querySelector(".select__input");
    this.selectDropDown = this.select?.querySelector(".select__dropdown");
    this.selectActiveClass = "select_active";
    this.selectOptionActiveClass = "select__option_selected";
    this.currentSelectOptionIndex = null;

    this.inputFile = this.form.querySelector(".input-file");
    this.inputFileText = this.inputFile.querySelector(".input-file__text");

    this.range = this.form.querySelector(".input-range");
    this.rangeValue = this.range.querySelector(".input-range__value");
    this.rangeInput = this.range.querySelector(".input-range__input");

    this.init();
  }

  handleSelect() {
    this.select.classList.contains(this.selectActiveClass) ? this.closeSelect() : this.openSelect();
  }

  openSelect() {
    this.select.classList.add(this.selectActiveClass);
  }

  closeSelect() {
    this.select.classList.remove(this.selectActiveClass);
  }

  handleSelectDropDown(e) {
    if (!e.target.classList.contains("select__option")) return;

    const value = e.target.dataset.value;

    this.setupNewOption(e.target);
    this.resetCurrentOption();

    this.currentSelectOptionIndex = e.target.dataset.index;

    this.setupSelectOption(value);
  }

  setupSelectOption(value) {
    this.selectInput.value = value;
  }

  setupNewOption(option) {
    option.classList.add(this.selectOptionActiveClass);
  }

  resetCurrentOption() {
    if (!this.currentSelectOptionIndex) return;

    const current = this.selectDropDown.querySelector(`[data-index='${this.currentSelectOptionIndex}']`);
    current.classList.remove(this.selectOptionActiveClass);
  }

  handleOutSelect(e) {
    if (e.target.classList.contains("select") || e.target.closest(".select")) return;
    this.closeSelect();
  }

  bindActionsOnSelect() {
    this.select.addEventListener("click", this.handleSelect.bind(this));
    this.selectDropDown.addEventListener("click", this.handleSelectDropDown.bind(this));
    window.addEventListener("click", this.handleOutSelect.bind(this));
  }

  handleInputFile(e) {
    const file = e.target.files[0];
    this.inputFileText.textContent = file.name;
  }

  bindActionsOnInputFile() {
    this.inputFile.addEventListener("change", this.handleInputFile.bind(this));
  }

  updateRangeInputValue() {
    this.rangeValue.textContent = `${this.rangeInput.value}%`;
  }

  bindActionsOnRange() {
    this.updateRangeInputValue();
    this.rangeInput.addEventListener("input", this.updateRangeInputValue.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  init() {
    this.bindActionsOnSelect();
    this.bindActionsOnInputFile();
    this.bindActionsOnRange();

    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }
}
