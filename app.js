(() => {
  const burger = document.querySelector(".hamburger");
  const menu = document.getElementById("navMenu");

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("show");
    document.body.style.overflow = "";
    burger?.setAttribute("aria-expanded", "false");
  }
  function toggleMenu() {
    if (!menu) return;
    const willOpen = !menu.classList.contains("show");
    menu.classList.toggle("show");
    document.body.style.overflow = willOpen ? "hidden" : "";
    burger?.setAttribute("aria-expanded", willOpen ? "true" : "false");
  }

  if (burger && menu) {
    burger.addEventListener("click", (e) => { e.preventDefault(); toggleMenu(); });

    document.addEventListener("click", (e) => {
      const inside = menu.contains(e.target) || burger.contains(e.target);
      if (!inside) closeMenu();
    });

    // ferme quand on clique un lien
    menu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

    // ferme au chargement + retour arrière (bfcache)
    window.addEventListener("pageshow", closeMenu);
    window.addEventListener("load", closeMenu);
  }

  // Year footer
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  // Logo lightbox
  const logo = document.querySelector("[data-logo]");
  const logoLb = document.getElementById("logoLightbox");
  const logoClose = document.getElementById("logoClose");
  if (logo && logoLb) {
    logo.addEventListener("click", () => {
      logoLb.classList.add("open");
      document.body.style.overflow = "hidden";
    });
    logoClose?.addEventListener("click", () => {
      logoLb.classList.remove("open");
      document.body.style.overflow = "";
    });
    logoLb.addEventListener("click", (e) => {
      if (e.target === logoLb) {
        logoLb.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }

  // Lightbox galerie
  const lb = document.querySelector(".lightbox");
  if (lb) {
    const lbImg = lb.querySelector("img");
    const lbTitle = lb.querySelector("[data-lb-title]");
    const shots = Array.from(document.querySelectorAll("[data-shot]"));
    let idx = -1;

    const open = (i) => {
      idx = i;
      const el = shots[idx];
      const src = el.getAttribute("data-full") || el.querySelector("img")?.getAttribute("src");
      const title = el.getAttribute("data-title") || "Photo";
      if (lbImg && src) lbImg.src = src;
      if (lbTitle) lbTitle.textContent = title;
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      lb.classList.remove("open");
      document.body.style.overflow = "";
      if (lbImg) lbImg.src = "";
    };

    const prev = () => open((idx - 1 + shots.length) % shots.length);
    const next = () => open((idx + 1) % shots.length);

    shots.forEach((el, i) => el.addEventListener("click", () => open(i)));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });

    lb.querySelector("[data-lb-close]")?.addEventListener("click", close);
    lb.querySelector("[data-lb-prev]")?.addEventListener("click", prev);
    lb.querySelector("[data-lb-next]")?.addEventListener("click", next);

    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    });
  }

  // Form WhatsApp (contact)
  const waForm = document.querySelector("[data-wa-form]");
  if (waForm) {
    waForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(waForm);

      const msg =
`Bonjour, je souhaite un devis.
Nom: ${(fd.get("nom") || "").toString().trim()}
Téléphone: ${(fd.get("tel") || "").toString().trim()}
Ville: ${(fd.get("ville") || "").toString().trim()}
Prestation: ${(fd.get("prestation") || "").toString().trim()}
Surface: ${(fd.get("surface") || "").toString().trim()}
Délai: ${(fd.get("delai") || "").toString().trim()}
Détails: ${(fd.get("details") || "").toString().trim()}`;

      const phone = "33644972892";
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    });
  }
})();
