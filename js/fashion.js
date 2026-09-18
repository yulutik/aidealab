(function () {
  "use strict";

  var isMobileViewport = function () {
    return window.matchMedia("(max-width: 899px)").matches;
  };

  // Album modal: full-size carousel with its own prev/next, opened from a photo project below.
  // Slides can be images or a video (played inline with native controls).
  var photoModal = document.getElementById("photo-modal");
  var openAlbum = function () {};

  if (photoModal) {
    var photoModalImg = photoModal.querySelector(".photo-modal__img");
    var photoModalVideo = photoModal.querySelector(".photo-modal__video");
    var photoPrevBtn = photoModal.querySelector("[data-photo-prev]");
    var photoNextBtn = photoModal.querySelector("[data-photo-next]");
    var albumSlides = [];
    var albumIndex = 0;

    var renderAlbum = function () {
      var slide = albumSlides[albumIndex];

      photoModalVideo.pause();
      photoModalVideo.removeAttribute("src");
      photoModalVideo.load();

      if (slide.type === "video") {
        photoModalImg.hidden = true;
        photoModalImg.src = "";
        photoModalVideo.hidden = false;
        photoModalVideo.poster = slide.poster || "";
        photoModalVideo.src = (isMobileViewport() && slide.mobileSrc) ? slide.mobileSrc : slide.src;
        photoModalVideo.load();
        photoModalVideo.play().catch(function () {
          /* autoplay may be blocked — user can press play in the controls */
        });
      } else {
        photoModalVideo.hidden = true;
        photoModalImg.hidden = false;
        photoModalImg.src = slide.src;
        photoModalImg.alt = "";
      }

      photoPrevBtn.disabled = albumIndex <= 0;
      photoNextBtn.disabled = albumIndex >= albumSlides.length - 1;
    };

    var closePhoto = function () {
      photoModal.setAttribute("hidden", "");
      photoModalImg.src = "";
      photoModalVideo.pause();
      photoModalVideo.removeAttribute("src");
      photoModalVideo.load();
      document.body.style.overflow = "";
    };

    openAlbum = function (slides, startIndex) {
      albumSlides = slides;
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
      if (albumIndex < albumSlides.length - 1) {
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
        } else if (e.key === "ArrowRight" && albumIndex < albumSlides.length - 1) {
          albumIndex += 1;
          renderAlbum();
        }
      }
    });
  }

  // Photo projects: one mini-carousel per album; the frame ("Открыть" on mobile) opens the album modal above
  document.querySelectorAll(".photo-project").forEach(function (project) {
    var slides = (project.getAttribute("data-photos") || "")
      .split(",")
      .filter(Boolean)
      .map(function (n) {
        return { type: "image", src: "assets/images/fashion-photo-" + n.trim() + ".jpg" };
      });

    var videoSrc = project.getAttribute("data-video-src");
    if (videoSrc) {
      slides.push({
        type: "video",
        src: videoSrc,
        mobileSrc: project.getAttribute("data-video-src-mobile") || videoSrc,
        poster: project.getAttribute("data-video-poster") || ""
      });
    }

    var img = project.querySelector(".photo-project__img");
    var playIcon = project.querySelector(".photo-project__play");
    var frame = project.querySelector(".photo-project__frame");
    var prevBtn = project.querySelector("[data-project-prev]");
    var nextBtn = project.querySelector("[data-project-next]");
    var index = 0;

    var render = function () {
      var slide = slides[index];
      img.src = slide.type === "video" ? slide.poster : slide.src;
      if (playIcon) {
        playIcon.hidden = slide.type !== "video";
      }
      if (prevBtn) {
        prevBtn.disabled = index <= 0;
      }
      if (nextBtn) {
        nextBtn.disabled = index >= slides.length - 1;
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
        if (index < slides.length - 1) {
          index += 1;
          render();
        }
      });
    }

    if (frame) {
      frame.addEventListener("click", function () {
        openAlbum(slides, index);
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
