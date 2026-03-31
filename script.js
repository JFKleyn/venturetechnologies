document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------------------------------
  // Reveal on scroll
  // ---------------------------------------------------
  const reveals = document.querySelectorAll(".reveal");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  reveals.forEach((el) => io.observe(el));

  // ---------------------------------------------------
  // Contact form
  // ---------------------------------------------------
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn1");

  const heroSection = document.getElementById("contact-hero-section");
  const contactContent = document.getElementById("contact-content");
  const successState = document.getElementById("success-state");
  const sendAnotherBtn = document.getElementById("send-another-btn");

  if (form) {
    const ENDPOINT = "/api/contact";

    function setStatus(msg, isError = false) {
      if (!statusEl) return;
      statusEl.textContent = msg;
      statusEl.style.color = isError ? "crimson" : "#40FEFE";
    }

    function showSuccessState() {
      if (heroSection) heroSection.classList.add("page-hidden");
      if (contactContent) contactContent.classList.add("page-hidden");
      if (successState) successState.hidden = false;

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }

    function resetContactPage() {
      if (successState) successState.hidden = true;
      if (heroSection) heroSection.classList.remove("page-hidden");
      if (contactContent) contactContent.classList.remove("page-hidden");
      setStatus("");
      form.reset();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }

    if (sendAnotherBtn) {
      sendAnotherBtn.addEventListener("click", resetContactPage);
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const firstname = form.querySelector("#firstname")?.value.trim() || "";
      const email = form.querySelector("#email")?.value.trim() || "";
      const tel = form.querySelector("#tel")?.value.trim() || "";
      const message = form.querySelector("#message")?.value.trim() || "";

      if (!firstname || !email || !message) {
        setStatus("Please fill in all required fields.", true);
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";
        submitBtn.style.cursor = "not-allowed";
      }

      setStatus("Sending...");

      try {
        const resp = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            firstname,
            email,
            tel,
            message,
          }),
        });

        const data = await resp.json();

        if (!resp.ok) {
          setStatus(data?.error || "Failed to send message.", true);
          return;
        }

        showSuccessState();
      } catch (err) {
        setStatus(`Network error: ${err?.message || err}`, true);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
          submitBtn.style.cursor = "pointer";
        }
      }
    });
  }

  // ---------------------------------------------------
  // Mobile menu
  // ---------------------------------------------------
  const btn = document.getElementById("btn-bar");
  const box = document.getElementById("box");

  if (btn && box) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      box.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!box.contains(e.target) && !btn.contains(e.target)) {
        box.classList.remove("show");
      }
    });
  }
});

// ---------------------------------------------------
// Hero animation
// ---------------------------------------------------
window.addEventListener("load", () => {
  const hero = document.querySelector(".hero-container");
  if (!hero) return;

  const lines = hero.querySelectorAll(".hero-line");

  hero.style.opacity = "1";
  hero.style.transform = "none";
  hero.style.filter = "none";

  lines.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";

    el.animate(
      [
        { opacity: 0, transform: "translateY(24px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 700,
        delay: 150 + i * 150,
        easing: "ease",
        fill: "forwards",
      }
    );
  });
});