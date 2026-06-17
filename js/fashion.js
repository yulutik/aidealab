(function () {
  "use strict";

  // Photo lightbox
  var photoModal = document.getElementById("photo-modal");
  if (photoModal) {
    var photoModalImg = photoModal.querySelector(".photo-modal__img");

    function openPhoto(src, alt) {
      photoModalImg.src = src;
      photoModalImg.alt = alt || "";
      photoModal.removeAttribute("hidden");
      document.body.style.overflow = "hidden";
    }

    function closePhoto() {
      photoModal.setAttribute("hidden", "");
      photoModalImg.src = "";
      document.body.style.overflow = "";
    }

    document.querySelectorAll(".fashion-photo").forEach(function (img) {
      img.addEventListener("click", function () {
        openPhoto(img.currentSrc || img.src, img.alt);
      });
    });

    photoModal.addEventListener("click", function (e) {
      if (e.target.closest("[data-photo-dismiss]")) {
        closePhoto();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !photoModal.hasAttribute("hidden")) {
        closePhoto();
      }
    });
  }



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
