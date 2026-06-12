(function () {
  "use strict";

  var STORAGE_KEY = "aidea-lab-lang";

  var translations = {
    ru: {
      "skip.link": "Перейти к содержимому",
      "nav.about": "Обо мне",
      "nav.portfolio": "Портфолио",
      "nav.contact": "Контакты",

      "hero.overline": "AI VIDEO CREATOR",
      "hero.firstName": "Юлия",
      "hero.lastName": "Колесникова",
      "hero.tagline": "Концепты и креативы под ДНК вашего бренда",
      "hero.subtitle": "Создаю атмосферные AI-видео для fashion и luxury — от идеи до продакшена",
      "hero.cta": "Обсудить проект",
      "hero.portraitAlt": "Портрет Юлии Колесниковой",

      "about.overline": "Обо мне",
      "about.heading": "Взгляд фотографа сквозь призму AI",
      "about.p1": "Больше десяти лет я работаю с фотографией — женские портреты и творческие проекты в светлой, воздушной эстетике. За это время я научилась чувствовать свет, кадр и настроение, а вместе с этим — насмотренность, которая сегодня помогает быстро находить нужный визуальный язык.",
      "about.p2": "Сейчас я применяю этот опыт в AI-видео.",

      "portfolio.overline": "Видео",
      "portfolio.heading": "Портфолио",
      "portfolio.tagFashion": "Fashion",
      "portfolio.tagBeauty": "Beauty",
      "portfolio.item1Aria": "Открыть видео Fashion",
      "portfolio.item2Aria": "Открыть видео Beauty",
      "portfolio.item3Aria": "Открыть видео Fashion",
      "portfolio.item4Aria": "Открыть видео Beauty",
      "portfolio.modalClose": "Закрыть видео",

      "cta.heading": "Расскажите о своей идее",
      "cta.button": "Обсудить проект",

      "footer.overline": "Контакты",
      "footer.heading": "Открыта к сотрудничеству",
      "footer.note": "* Instagram — продукт компании Meta, признанной экстремистской организацией, деятельность которой запрещена на территории РФ.",
      "footer.copyright": "© 2026 aidea lab. Все права защищены."
    },
    en: {
      "skip.link": "Skip to content",
      "nav.about": "About",
      "nav.portfolio": "Portfolio",
      "nav.contact": "Contact",

      "hero.overline": "AI VIDEO CREATOR",
      "hero.firstName": "Yulia",
      "hero.lastName": "Kolesnikova",
      "hero.tagline": "Concepts and creatives shaped by your brand's DNA",
      "hero.subtitle": "I create atmospheric AI video for fashion and luxury — from idea to final production.",
      "hero.cta": "Let's talk",
      "hero.portraitAlt": "Portrait of Yulia Kolesnikova",

      "about.overline": "About",
      "about.heading": "A photographer's eye through AI",
      "about.p1": "For over ten years I've worked in photography — women's portraits and creative projects in a light, airy aesthetic. Along the way I learned to feel light, frame and mood, building the visual fluency that now helps me quickly find the right visual language.",
      "about.p2": "Now I bring that experience into AI video.",

      "portfolio.overline": "Video",
      "portfolio.heading": "Portfolio",
      "portfolio.tagFashion": "Fashion",
      "portfolio.tagBeauty": "Beauty",
      "portfolio.item1Aria": "Open Fashion video",
      "portfolio.item2Aria": "Open Beauty video",
      "portfolio.item3Aria": "Open Fashion video",
      "portfolio.item4Aria": "Open Beauty video",
      "portfolio.modalClose": "Close video",

      "cta.heading": "Tell me about your idea",
      "cta.button": "Let's talk",

      "footer.overline": "Contact",
      "footer.heading": "Open to collaboration",
      "footer.note": "* Instagram is a product of Meta, an organization recognised as extremist and banned in the Russian Federation.",
      "footer.copyright": "© 2026 aidea lab. All rights reserved."
    }
  };

  var titles = {
    ru: "aidea lab — AI Video Creator | Юлия Колесникова",
    en: "aidea lab — AI Video Creator | Yulia Kolesnikova"
  };

  function applyLanguage(lang) {
    var dict = translations[lang];

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var parts = pair.split(":");
        var attr = parts[0].trim();
        var key = parts[1].trim();
        if (dict[key]) {
          el.setAttribute(attr, dict[key]);
        }
      });
    });

    document.documentElement.lang = lang;
    document.title = titles[lang];

    document.querySelectorAll("[data-lang]").forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* localStorage unavailable — ignore */
    }
  }

  document.querySelectorAll("[data-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLanguage(btn.getAttribute("data-lang"));
    });
  });

  var savedLang = null;
  try {
    savedLang = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    /* localStorage unavailable — ignore */
  }

  if (savedLang === "en" || savedLang === "ru") {
    applyLanguage(savedLang);
  }

  /* Portfolio: play preview video on hover/focus, otherwise show poster */
  document.querySelectorAll(".portfolio-item").forEach(function (item) {
    var video = item.querySelector(".portfolio-item__video");
    if (!video) {
      return;
    }

    var play = function () {
      item.classList.add("is-playing");
      video.play();
    };

    var stop = function () {
      video.pause();
      video.currentTime = 0;
      item.classList.remove("is-playing");
    };

    item.addEventListener("mouseenter", play);
    item.addEventListener("mouseleave", stop);
    item.addEventListener("focus", play);
    item.addEventListener("blur", stop);
  });

  /* Portfolio: open full video in an in-page modal */
  var modal = document.getElementById("video-modal");
  var modalVideo = modal.querySelector(".video-modal__video");

  var openModal = function (src) {
    modal.hidden = false;
    modal.classList.remove("is-loaded");
    document.body.classList.add("has-modal-open");
    modalVideo.src = src;
    modalVideo.load();
    modalVideo.play().catch(function () {
      /* autoplay may be blocked — user can press play in the controls */
    });
  };

  var closeModal = function () {
    modal.hidden = true;
    document.body.classList.remove("has-modal-open");
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();
  };

  modalVideo.addEventListener("canplay", function () {
    modal.classList.add("is-loaded");
  });

  modal.querySelectorAll("[data-modal-dismiss]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });

  var getFullVideoSrc = function (item) {
    var isMobile = window.matchMedia("(max-width: 899px)").matches;
    var mobileSrc = item.getAttribute("data-video-src-mobile");
    return (isMobile && mobileSrc) ? mobileSrc : item.getAttribute("data-video-src");
  };

  document.querySelectorAll(".portfolio-item").forEach(function (item) {
    item.addEventListener("click", function () {
      var src = getFullVideoSrc(item);
      if (src) {
        openModal(src);
      }
    });
  });
})();
