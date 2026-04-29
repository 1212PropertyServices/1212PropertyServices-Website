const body = document.body;
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelectorAll(".nav a");
const year = document.querySelector("[data-year]");
const toast = document.querySelector("[data-toast]");
const serviceOptions = document.querySelectorAll("[data-service-option]");
const messageBox = document.querySelector("[data-message]");
const copyMessageButton = document.querySelector("[data-copy-message]");
const copyButtons = document.querySelectorAll("[data-copy]");

if (year) {
  year.textContent = new Date().getFullYear();
}

const showToast = (message) => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2400);
};

const copyText = async (text, successMessage) => {
  try {
    await navigator.clipboard.writeText(text);
    showToast(successMessage);
  } catch {
    showToast("Copy failed. Select the text and copy it manually.");
  }
};

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const updateServiceMessage = () => {
  if (!messageBox) return;
  const selected = Array.from(serviceOptions)
    .filter((option) => option.checked)
    .map((option) => option.value);

  const services = selected.length ? selected.join(", ") : "property services";
  messageBox.value = `Hi 12:12 Property Services, I would like help with ${services}. My property is in or near Hubbard, TX. Please let me know what information or photos you need for an estimate.`;
};

serviceOptions.forEach((option) => {
  option.addEventListener("change", updateServiceMessage);
});

updateServiceMessage();

if (copyMessageButton && messageBox) {
  copyMessageButton.addEventListener("click", () => {
    copyText(messageBox.value, "Service message copied.");
  });
}

copyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    copyText(button.dataset.copy || "", "Copied.");
  });
});

const revealTargets = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
