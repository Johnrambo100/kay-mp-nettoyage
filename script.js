(function(){
  const menu = document.getElementById("navMenu");
  const burger = document.getElementById("burgerBtn");

  function closeMenu(){
    if(menu) menu.classList.remove("show");
  }
  function toggleMenu(){
    if(menu) menu.classList.toggle("show");
  }

  // Burger click
  if(burger){
    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Close menu when clicking a link
  if(menu){
    menu.querySelectorAll("a").forEach(a=>{
      a.addEventListener("click", ()=> closeMenu());
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e)=>{
    if(!menu || !burger) return;
    const inside = menu.contains(e.target) || burger.contains(e.target);
    if(!inside) closeMenu();
  });

  // Important: when going back/forward in browser cache (mobile)
  window.addEventListener("pageshow", () => closeMenu());

  // Year
  const y = document.getElementById("y");
  if(y) y.textContent = new Date().getFullYear();

  // Logo modal
  const modal = document.getElementById("logoModal");
  const openers = document.querySelectorAll("[data-open-logo]");
  const closeBtn = document.getElementById("closeLogo");
  function openModal(){ if(modal) modal.classList.add("show"); }
  function closeModal(){ if(modal) modal.classList.remove("show"); }

  openers.forEach(btn=> btn.addEventListener("click", (e)=>{ e.preventDefault(); openModal(); }));
  if(closeBtn) closeBtn.addEventListener("click", closeModal);
  if(modal) modal.addEventListener("click", (e)=>{ if(e.target === modal) closeModal(); });

})();
