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
      "hero.name": "Юлия Колесникова",
      "hero.tagline": "Концепты и креативы под ДНК вашего бренда",
      "hero.subtitle": "Создаю атмосферные AI-видео для fashion- и luxury-брендов — там, где образ и вкус считываются за секунды.",
      "hero.cta": "Обсудить проект",
      "hero.portraitAlt": "Портрет Юлии Колесниковой",

      "about.overline": "Обо мне",
      "about.heading": "Фотография, прожитая через AI",
      "about.p1": "Больше десяти лет я работаю с фотографией: снимаю кампании, лукбуки и истории для fashion- и beauty-брендов — учусь видеть свет, кадр и настроение.",
      "about.p2": "Сегодня это чувство визуального языка я перевожу в AI-видео. Я дипломированный промпт-инженер и создаю ролики, которые продолжают эстетику бренда и говорят на одном языке с его аудиторией.",
      "about.p3": "Я продаю не технологию, а образ. Я думаю концептами — от настроения и референсов до готового ролика.",
      "about.imageAlt": "Кадр со съёмки Юлии Колесниковой",

      "portfolio.overline": "Работы",
      "portfolio.heading": "Портфолио",
      "portfolio.intro": "Превью без звука — нажмите на ролик, чтобы посмотреть его целиком.",
      "portfolio.tagFashion": "Fashion",
      "portfolio.tagBeauty": "Beauty",
      "portfolio.item1Aria": "Открыть видео Fashion в новой вкладке",
      "portfolio.item2Aria": "Открыть видео Beauty в новой вкладке",
      "portfolio.item3Aria": "Открыть видео Fashion в новой вкладке",
      "portfolio.item4Aria": "Открыть видео Beauty в новой вкладке",

      "cta.heading": "Готовы создать видео, в которое влюбится ваша аудитория?",
      "cta.button": "Обсудить проект",

      "footer.overline": "Связь",
      "footer.heading": "Обсудим проект?",
      "footer.note": "* Instagram — продукт компании Meta, признанной экстремистской организацией, деятельность которой запрещена на территории РФ.",
      "footer.copyright": "© 2026 aidea lab. Все права защищены."
    },
    en: {
      "skip.link": "Skip to content",
      "nav.about": "About",
      "nav.portfolio": "Portfolio",
      "nav.contact": "Contact",

      "hero.overline": "AI VIDEO CREATOR",
      "hero.name": "Yulia Kolesnikova",
      "hero.tagline": "Concepts and creatives shaped by your brand's DNA",
      "hero.subtitle": "I craft cinematic AI video for fashion and luxury brands — where image and taste read in seconds.",
      "hero.cta": "Let's talk",
      "hero.portraitAlt": "Portrait of Yulia Kolesnikova",

      "about.overline": "About",
      "about.heading": "Photography, lived through AI",
      "about.p1": "For over ten years I've worked in photography — shooting campaigns, lookbooks and stories for fashion and beauty brands, learning to see light, frame and mood.",
      "about.p2": "Today I translate that visual language into AI video. As a certified prompt engineer, I create films that extend a brand's aesthetic and speak the same language as its audience.",
      "about.p3": "I don't sell technology — I sell image. I think in concepts, from mood and references to the finished film.",
      "about.imageAlt": "Behind the scenes shot of Yulia Kolesnikova",

      "portfolio.overline": "Work",
      "portfolio.heading": "Portfolio",
      "portfolio.intro": "Muted previews — click a video to watch it in full.",
      "portfolio.tagFashion": "Fashion",
      "portfolio.tagBeauty": "Beauty",
      "portfolio.item1Aria": "Open Fashion video in a new tab",
      "portfolio.item2Aria": "Open Beauty video in a new tab",
      "portfolio.item3Aria": "Open Fashion video in a new tab",
      "portfolio.item4Aria": "Open Beauty video in a new tab",

      "cta.heading": "Ready for a video your audience will fall in love with?",
      "cta.button": "Let's talk",

      "footer.overline": "Get in touch",
      "footer.heading": "Let's talk about your project",
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
})();
