import { addBodyScroll, removeBodyScroll } from "../../helpers/index.js";

export default class Header {
  constructor(header) {
    this.header = header;
    this.sideMenu = this.header.querySelector(".header__navigation");
    this.burgerBtn = this.header.querySelector(".header__burger");

    this.activeClass = "active";

    this.init();
  }

  openSideMenu() {
    this.sideMenu.classList.add(this.activeClass);
  }

  closeSideMenu() {
    this.sideMenu.classList.remove(this.activeClass);
  }

  handleBurgerBtn() {
    if (this.burgerBtn.classList.contains(this.activeClass)) {
      this.burgerBtn.classList.remove(this.activeClass);
      this.closeSideMenu();
      addBodyScroll();
    } else {
      this.burgerBtn.classList.add(this.activeClass);
      this.openSideMenu();
      removeBodyScroll();
    }
  }

  init() {
    this.burgerBtn.addEventListener("click", this.handleBurgerBtn.bind(this));
  }
}
