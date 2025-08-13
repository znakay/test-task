export const removeBodyScroll = () => {
  ["html", "body"].forEach((selector) => {
    document.querySelector(selector).style.overflow = "clip";
    document.querySelector(selector).style.touchAction = "none";
  });
};

export const addBodyScroll = () => {
  ["html", "body"].forEach((selector) => {
    document.querySelector(selector).style.removeProperty("overflow");
    document.querySelector(selector).style.removeProperty("touch-action");
  });
};
