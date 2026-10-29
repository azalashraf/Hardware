/*
 * Sunrise Enterprises — demo configuration
 * Replace the placeholder values below with the client's confirmed details.
 * WhatsApp number format: country code + number, digits only (India: 91XXXXXXXXXX).
 */
const BUSINESS_CONFIG = {
  whatsappNumber: "", // Example format only: "919876543210" — replace with real number
  phoneNumber: "",    // Example format only: "+919876543210" — replace with real number
  businessName: "Sunrise Enterprises"
};

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const toast = document.querySelector("#toast");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function closeMenu() {
  if (!menuToggle || !primaryNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  primaryNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    primaryNav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  primaryNav.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) closeMenu();
  });
}

function buildWhatsAppUrl(message) {
  const number = BUSINESS_CONFIG.whatsappNumber.replace(/\D/g, "");
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function setWhatsAppLinks() {
  document.querySelectorAll(".js-whatsapp").forEach(link => {
    const message = `Hello ${BUSINESS_CONFIG.businessName}, I would like to enquire about your hardware products. Please share product availability and pricing.`;
    const url = buildWhatsAppUrl(message);
    if (url) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "#contact";
      link.removeAttribute("target");
      link.addEventListener("click", event => {
        event.preventDefault();
        showToast("Demo website: add the client's WhatsApp number in script.js to activate this link.");
      });
    }
  });
}

function setCallLinks() {
  document.querySelectorAll(".js-call").forEach(link => {
    if (BUSINESS_CONFIG.phoneNumber.trim()) {
      link.href = `tel:${BUSINESS_CONFIG.phoneNumber.replace(/[^\d+]/g, "")}`;
    } else {
      link.href = "#contact";
      link.addEventListener("click", event => {
        event.preventDefault();
        showToast("Demo website: add the client's phone number in script.js to activate calling.");
      });
    }
  });
}

document.querySelectorAll("[data-product]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const product = link.dataset.product;
    const message = `Hello ${BUSINESS_CONFIG.businessName}, I would like to enquire about ${product}. Please share availability and pricing.`;
    const url = buildWhatsAppUrl(message);
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      document.querySelector("#product-interest").value = product;
      document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
      showToast("Add a WhatsApp number in script.js to enable direct product enquiries.");
    }
  });
});

const enquiryForm = document.querySelector("#enquiry-form");
if (enquiryForm) {
  enquiryForm.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(enquiryForm);
    const name = String(formData.get("name") || "").trim();
    const product = String(formData.get("product") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !product) {
      showToast("Please enter your name and choose a product category.");
      return;
    }

    const whatsappMessage = [
      `Hello ${BUSINESS_CONFIG.businessName},`,
      `My name is ${name}.`,
      `I would like to enquire about: ${product}.`,
      message ? `Details: ${message}` : "",
      "Please share product availability and pricing."
    ].filter(Boolean).join("\n");

    const url = buildWhatsAppUrl(whatsappMessage);
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      showToast("Demo form checked. Add the client's WhatsApp number in script.js to open WhatsApp.");
    }
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

/* Subtle entrance animation; content remains visible if reduced motion is preferred. */
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}

setWhatsAppLinks();
setCallLinks();
