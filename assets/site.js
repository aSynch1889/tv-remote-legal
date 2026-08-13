(function () {
  var LANG_KEY = "tvremote-lang";
  var THEME_KEY = "tvremote-theme";

  function detectLang() {
    try {
      var saved = localStorage.getItem(LANG_KEY);
      if (saved === "zh" || saved === "en") return saved;
    } catch (e) {}
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("zh") === 0 ? "zh" : "en";
  }

  function detectTheme() {
    try {
      var saved = localStorage.getItem(THEME_KEY);
      if (saved === "dark" || saved === "light") return saved;
    } catch (e) {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function apply() {
    var lang = detectLang();
    var theme = detectTheme();
    document.documentElement.dataset.lang = lang;
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang-btn") === lang ? "true" : "false");
    });
    var themeBtn = document.querySelector("[data-theme-toggle]");
    if (themeBtn) {
      themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  window.TVRemoteSite = {
    setLang: function (lang) {
      try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
      apply();
    },
    toggleTheme: function () {
      var next = detectTheme() === "dark" ? "light" : "dark";
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
      apply();
    }
  };

  apply();
  document.addEventListener("DOMContentLoaded", apply);
})();
