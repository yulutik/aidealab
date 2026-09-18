(function () {
  "use strict";

  // Album modal: full-size carousel with its own prev/next, opened from a photo project below
  var photoModal = document.getElementById("photo-modal");
  var openAlbum = function () {};

  if (photoModal) {
    var photoModalImg = photoModal.querySelector(".photo-modal__img");
    var photoPrevBtn = photoModal.querySelector("[data-photo-prev]");
    var photoNextBtn = photoModal.querySelector("[data-photo-next]");
    var albumPhotos = [];
    var albumIndex = 0;

    var renderAlbum = function () {
      photoModalImg.src = albumPhotos[albumIndex];
      photoModalImg.alt = "";
      photoPrevBtn.disabled = albumIndex <= 0;
      photoNextBtn.disabled = albumIndex >= albumPhotos.length - 1;
    };

    var closePhoto = function () {
      photoModal.setAttribute("hidden", "");
      photoModalImg.src = "";
      document.body.style.overflow = "";
    };

    openAlbum = function (photos, startIndex) {
      albumPhotos = photos;
      albumIndex = startIndex || 0;
      renderAlbum();
      photoModal.removeAttribute("hidden");
      document.body.style.overflow = "hidden";
    };

    photoPrevBtn.addEventListener("click", function () {
      if (albumIndex > 0) {
        albumIndex -= 1;
        renderAlbum();
      }
    });

    photoNextBtn.addEventListener("click", function () {
      if (albumIndex < albumPhotos.length - 1) {
        albumIndex += 1;
        renderAlbum();
      }
    });

    photoModal.addEventListener("click", function (e) {
      if (e.target.closest("[data-photo-dismiss]")) {
        closePhoto();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (!photoModal.hasAttribute("hidden")) {
        if (e.key === "Escape") {
          closePhoto();
        } else if (e.key === "ArrowLeft" && albumIndex > 0) {
          albumIndex -= 1;
          renderAlbum();
        } else if (e.key === "ArrowRight" && albumIndex < albumPhotos.length - 1) {
          albumIndex += 1;
          renderAlbum();
        }
      }
    });
  }

  // Photo projects: one mini-carousel per album; the frame ("Открыть" on mobile) opens the album modal above
  document.querySelectorAll(".photo-project").forEach(function (project) {
    var photos = (project.getAttribute("data-photos") || "")
      .split(",")
      .filter(Boolean)
      .map(function (n) {
        return "assets/images/fashion-photo-" + n.trim() + ".jpg";
      });

    var img = project.querySelector(".photo-project__img");
    var frame = project.querySelector(".photo-project__frame");
    var prevBtn = project.querySelector("[data-project-prev]");
    var nextBtn = project.querySelector("[data-project-next]");
    var index = 0;

    var render = function () {
      img.src = photos[index];
      if (prevBtn) {
        prevBtn.disabled = index <= 0;
      }
      if (nextBtn) {
        nextBtn.disabled = index >= photos.length - 1;
      }
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        if (index > 0) {
          index -= 1;
          render();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (index < photos.length - 1) {
          index += 1;
          render();
        }
      });
    }

    if (frame) {
      frame.addEventListener("click", function () {
        openAlbum(photos, index);
      });
    }

    render();
  });

  document.querySelectorAll("[data-slider]").forEach(function (slider) {
    var track = slider.querySelector(".slider__track");
    var prevBtn = slider.querySelector(".slider__btn--prev");
    var nextBtn = slider.querySelector(".slider__btn--next");
    var hintBtn = slider.querySelector("[data-slider-hint]");

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
      var atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
      if (prevBtn && nextBtn) {
        prevBtn.disabled = track.scrollLeft <= 1;
        nextBtn.disabled = atEnd;
      }
      if (hintBtn) {
        hintBtn.hidden = atEnd;
      }
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

    if (hintBtn) {
      hintBtn.addEventListener("click", function () {
        track.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
      });
    }

    track.addEventListener("scroll", updateButtons, { passive: true });
    updateButtons();
  });
})();
