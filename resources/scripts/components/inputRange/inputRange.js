export default class InputRange {
  constructor(inputRange) {
    this.inputRange = inputRange;

    this.value = this.inputRange.querySelector(".input-range__value");
    this.range = this.inputRange.querySelector(".input-range__input");
    this.init();
  }

  updateRangeInputValue() {
    this.value.textContent = `${this.range.value}%`;
  }

  bindActionsOnRange() {
    this.updateRangeInputValue();
    this.range.addEventListener("input", this.updateRangeInputValue.bind(this));
  }

  init() {
    this.bindActionsOnRange();
  }
}