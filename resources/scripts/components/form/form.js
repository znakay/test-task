export default class Form {
  constructor(form) {
    this.form = form;

    this.init();
  }


  handleSubmit(e) {
    e.preventDefault();
  }

  init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }
}
