(function () {
  const html = document.documentElement;

  // ===== THEME =====
  const btn = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  const text = document.getElementById("themeText");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    html.setAttribute("data-theme", savedTheme);
  } else {
    html.setAttribute("data-theme", "light");
  }

  function updateThemeUI() {
    if (!btn || !icon || !text) return;
    const current = html.getAttribute("data-theme") || "light";
    const isDark = current === "dark";
    icon.textContent = isDark ? "🌞" : "🌙";
    text.textContent = isDark ? "Light" : "Dark";
  }
  updateThemeUI();

  if (btn) {
    btn.addEventListener("click", () => {
      const current = html.getAttribute("data-theme") || "light";
      const next = current === "light" ? "dark" : "light";
      html.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      updateThemeUI();
    });
  }

  // ===== ACTIVE NAV LINK =====
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".menu a, .drawer a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
  });

  // ===== MOBILE MENU =====
  const burger = document.getElementById("burger");
  const drawer = document.getElementById("drawer");
  if (burger && drawer) {
    burger.addEventListener("click", () => {
      const hidden = drawer.hasAttribute("hidden");
      if (hidden) drawer.removeAttribute("hidden");
      else drawer.setAttribute("hidden", "");
    });
  }

  // ===== CONTACT FORM SUBMIT =====
  const contactForm = document.getElementById("contactForm");
  const contactMsg = document.getElementById("contactMsg");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (contactMsg) contactMsg.textContent = "Sending...";

      const formData = new FormData(contactForm);
      const payload = Object.fromEntries(formData.entries());

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed");

        if (contactMsg) contactMsg.textContent = "✅ Message sent successfully!";
        contactForm.reset();
      } catch (err) {
        if (contactMsg) contactMsg.textContent = "❌ Failed to send. Try again.";
      }
    });
  }
})();
