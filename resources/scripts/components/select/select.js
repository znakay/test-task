export default class Select {
  constructor(select) {
    this.select = select;

    this.selectInput = this.select.querySelector(".select__input");
    this.selectDropDown = this.select.querySelector(".select__dropdown");
    this.selectActiveClass = "select_active";
    this.selectOptionActiveClass = "select__option_selected";
    this.currentSelectOptionIndex = null;

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

    this.setupSelectValue(value);
  }

  setupSelectValue(value) {
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

  init() {
    this.bindActionsOnSelect();
  }
}
