// 年份自动更新（footer）
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// 移动端菜单开关
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // 点了导航项后自动收起菜单
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// 滚动到视口时淡入
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  // 老浏览器直接显示
  revealItems.forEach((item) => item.classList.add("visible"));
}

// 导航高亮当前区块
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

if ("IntersectionObserver" in window && sections.length && navAnchors.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((a) => {
          const active = a.getAttribute("href") === `#${entry.target.id}`;
          a.style.color = active ? "var(--text)" : "";
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => navObserver.observe(section));
}

// A user site exposes its public handle in its GitHub Pages hostname.
const account = /^([a-z0-9][a-z0-9-]*)\.github\.io$/i.exec(window.location.hostname);
if (account) {
  const handle = account[1];
  const title = document.querySelector("#home h1");
  const profile = document.getElementById("github-profile");
  if (title) title.textContent = handle;
  if (profile) {
    profile.href = "https://github.com/" + handle;
    profile.style.removeProperty("display");
  }
  document.title = handle + " | CSI205TC Lab Portfolio";
}
