(() => {
  // ===== Mobile menu
  const burger = document.querySelector(".hamburger");
  const menu = document.getElementById("navMenu");
  if (burger && menu) {
    burger.addEventListener("click", () => menu.classList.toggle("show"));
    document.addEventListener("click", (e) => {
      const inside = menu.contains(e.target) || burger.contains(e.target);
      if (!inside) menu.classList.remove("show");
    });
  }

  // ===== Year
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  // ===== Lightbox (gallery)
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
      const title = el.getAttribute("data-title") || "";
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

  // ===== WhatsApp form (Contact page)
  const waForm = document.querySelector("[data-wa-form]");
  if (waForm) {
    waForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(waForm);

      const nom = (fd.get("nom") || "").toString().trim();
      const tel = (fd.get("tel") || "").toString().trim();
      const ville = (fd.get("ville") || "").toString().trim();
      const prestation = (fd.get("prestation") || "").toString().trim();
      const surface = (fd.get("surface") || "").toString().trim();
      const delai = (fd.get("delai") || "").toString().trim();
      const details = (fd.get("details") || "").toString().trim();

      const msg =
`Bonjour, je souhaite un devis.
Nom: ${nom}
Téléphone: ${tel}
Ville: ${ville}
Prestation: ${prestation}
Surface: ${surface}
Délai: ${delai}
Détails: ${details}`;

      const phone = "33644972892";
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank", "noopener");
    });
  }
})();
