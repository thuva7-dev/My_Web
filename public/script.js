(function () {
  const html = document.documentElement;

  // ---------- THEME ----------
  const btn = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  const text = document.getElementById("themeText");

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateThemeUI();
  }

  function updateThemeUI() {
    if (!icon || !text) return;
    const current = html.getAttribute("data-theme") || "light";
    const isDark = current === "dark";
    icon.textContent = isDark ? "🌞" : "🌙";
    text.textContent = isDark ? "Light" : "Dark";
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    html.setAttribute("data-theme", savedTheme);
  } else {
    html.setAttribute("data-theme", "light");
  }
  updateThemeUI();

  if (btn) {
    btn.addEventListener("click", () => {
      const current = html.getAttribute("data-theme") || "light";
      setTheme(current === "light" ? "dark" : "light");
    });
  }

  // ---------- ACTIVE NAV ----------
  const currentFile = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === currentFile) a.classList.add("active");
  });

  // ---------- MOBILE MENU ----------
  const mobBtn = document.getElementById("mobBtn");
  const mobPanel = document.getElementById("mobPanel");

  if (mobBtn && mobPanel) {
    mobBtn.addEventListener("click", () => {
      mobPanel.classList.toggle("show");
      mobBtn.textContent = mobPanel.classList.contains("show") ? "✕" : "☰";
    });
  }

  // ---------- FOOTER YEAR ----------
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // ---------- CONTACT FORM (frontend demo) ----------
  const contactForm = document.getElementById("contactForm");
  const contactStatus = document.getElementById("contactStatus");

  if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Later we will POST to Node: /api/contact
      // For now, just show success UI
      contactStatus.textContent = "✅ Message prepared! Next step: connect Node API (/api/contact).";
      contactStatus.style.opacity = "1";
      contactForm.reset();
    });
  }
})();
