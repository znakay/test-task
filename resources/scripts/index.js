"use strict";

import Animation from "./animations/index.js";
import { initHeader } from "./components/header/index.js";
import { initInputFile } from "./components/inputFile/index.js";
import { initInputRange } from "./components/inputRange/index.js";
import { initSelect } from "./components/select/index.js";

window.addEventListener("DOMContentLoaded", () => {
  window.refs = {
    header: {
      selectors: [".header"],
      init: function () {
        initHeader(this.selectors);
      },
    },
    select: {
      selectors: [".select"],
      init: function () {
        initSelect(this.selectors);
      },
    },
    inputFile: {
      selectors: [".input-file"],
      init: function () {
        initInputFile(this.selectors);
      },
    },
    inputRange: {
      selectors: ['.input-range'],
      init: function() {
        initInputRange(this.selectors);
      }
    },
    animation: {
      selectors: [".animate"],
      init: function () {
        new Animation(this.selectors);
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
