
  const reveals = document.querySelectorAll(".reveal");

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target); // animate once (remove if you want repeat)
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach((el) => io.observe(el));

  // --------------------------------------------------------------------------------------------------------------------------

   window.addEventListener("load", () => {
    const hero = document.querySelector(".hero-container");
    const lines = hero.querySelectorAll(".hero-line");

    // If your scroll-reveal CSS is hiding the hero container, force it visible:
    hero.style.opacity = "1";
    hero.style.transform = "none";
    hero.style.filter = "none";

    lines.forEach((el, i) => {
      // Start state (force)
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";

      // Animate in (staggered)
      el.animate(
        [
          { opacity: 0, transform: "translateY(24px)" },
          { opacity: 1, transform: "translateY(0)"}
        ],
        {
          duration: 700,
          delay: 150 + i * 150,
          easing: "ease",
          fill: "forwards"
        }
      );
    });
  });

  //----------------------------------------------------------------------------------------------------------------------------------------

  document.getElementById("btn-bar").addEventListener("click", () => {
  document.getElementById("box").classList.toggle("show");
});



