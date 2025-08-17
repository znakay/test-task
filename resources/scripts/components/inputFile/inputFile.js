export default class InputFile {
  constructor(inputFile) {
    this.inputFile = inputFile;
    this.inputFileText = this.inputFile.querySelector(".input-file__text");

    this.init();
  }

  handleInputFile(e) {
    const file = e.target.files[0];
    this.inputFileText.textContent = file.name;
  }

  bindActionsOnInputFile() {
    this.inputFile.addEventListener("change", this.handleInputFile.bind(this));
  }

  init() {
    this.bindActionsOnInputFile();
  }
}
