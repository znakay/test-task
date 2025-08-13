"use strict";

import { initHeader } from "./components/header/index.js";

window.addEventListener("DOMContentLoaded", () => {
  window.refs = {
    header: {
      selectors: [".header"],
      // init: () => initHeader(this.selectors),
      init: function () {
        initHeader(this.selectors);
      },
    },
  };

  Object.keys(window.refs).forEach((ref) => {
    if (
      window.refs[ref].hasOwnProperty("init") &&
      document.querySelectorAll(window.refs[ref].selectors.join(", ")).length
    ) {
      window.refs[ref].class = window.refs[ref].init();
    }
  });
});
