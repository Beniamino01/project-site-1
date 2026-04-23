const SITE_THEME_KEY = "mpl-theme";
const STANDARD_NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/#subjects", label: "Subjects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/app", label: "Open Generator", primary: true }
];

function getStoredTheme() {
  try {
    const savedTheme = localStorage.getItem(SITE_THEME_KEY);
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
  } catch {
    // Ignore storage access issues.
  }

  return document.documentElement.dataset.theme || "light";
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(SITE_THEME_KEY, theme);
  } catch {
    // Ignore storage access issues.
  }
}

function isCurrentLink(href, pathname) {
  if (href === "/#subjects") {
    return pathname === "/";
  }

  return href === pathname;
}

function buildNavLinks(nav, pathname) {
  nav.innerHTML = "";

  STANDARD_NAV_ITEMS.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;

    if (item.primary) {
      link.classList.add("primary-link");
    }

    if (isCurrentLink(item.href, pathname)) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }

    nav.append(link);
  });
}

function ensureHeaderTools(container, nav) {
  let tools = container.querySelector(".header-tools");
  if (!tools) {
    tools = document.createElement("div");
    tools.className = "header-tools";
    nav.after(tools);
  }

  if (nav.parentElement !== tools) {
    tools.prepend(nav);
  }

  return tools;
}

function createThemeToggle() {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "theme-toggle";
  button.setAttribute("aria-label", "Toggle color theme");

  const syncLabel = () => {
    const theme = document.documentElement.dataset.theme || "light";
    button.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    button.setAttribute("aria-pressed", String(theme === "dark"));
  };

  button.addEventListener("click", () => {
    const nextTheme = (document.documentElement.dataset.theme || "light") === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    syncLabel();
  });

  syncLabel();
  return button;
}

function normalizePublicHeader() {
  const wrap = document.querySelector(".site-header .wrap");
  const nav = wrap?.querySelector(".nav-links");
  if (!wrap || !nav) {
    return;
  }

  buildNavLinks(nav, window.location.pathname);
  const tools = ensureHeaderTools(wrap, nav);

  if (!tools.querySelector(".theme-toggle")) {
    tools.append(createThemeToggle());
  }
}

function normalizeAppHeader() {
  const bar = document.querySelector(".brandbar");
  const nav = bar?.querySelector(".brand-links");
  if (!bar || !nav) {
    return;
  }

  buildNavLinks(nav, window.location.pathname);
  const tools = ensureHeaderTools(bar, nav);

  if (!tools.querySelector(".theme-toggle")) {
    tools.append(createThemeToggle());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  normalizePublicHeader();
  normalizeAppHeader();
});
