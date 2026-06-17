(function () {
  "use strict";

  document.querySelectorAll("[data-slider]").forEach(function (slider) {
    var track = slider.querySelector(".slider__track");
    var prevBtn = slider.querySelector(".slider__btn--prev");
    var nextBtn = slider.querySelector(".slider__btn--next");

    if (!track) {
      return;
    }

    var getScrollAmount = function () {
      var item = track.querySelector(".slider__item");
      if (!item) {
        return track.clientWidth;
      }
      var gap = parseFloat(getComputedStyle(track).gap) || 0;
      return item.offsetWidth + gap;
    };

    var updateButtons = function () {
      if (!prevBtn || !nextBtn) {
        return;
      }
      prevBtn.disabled = track.scrollLeft <= 1;
      nextBtn.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        track.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
      });
    }

    track.addEventListener("scroll", updateButtons, { passive: true });
    updateButtons();
  });
})();
