/**
 * GDO Orthopedic Clinic - Main JavaScript
 * Dr. Hossam Saeed
 */

document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------------------------------
  // 1. DYNAMIC COPYRIGHT YEAR
  // ----------------------------------------------------
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ----------------------------------------------------
  // 2. MOBILE NAVIGATION TOGGLE
  // ----------------------------------------------------
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !isExpanded);
      primaryNav.classList.toggle("is-open");

      // Toggle icon between hamburger bars and X mark
      const icon = navToggle.querySelector("i");
      if (icon) {
        if (!isExpanded) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        } else {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });

    // Close mobile nav when clicking any nav link
    const navLinks = primaryNav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (primaryNav.classList.contains("is-open")) {
          primaryNav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
          const icon = navToggle.querySelector("i");
          if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
          }
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        primaryNav.classList.contains("is-open") &&
        !primaryNav.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        const icon = navToggle.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });
  }

  // ----------------------------------------------------
  // 3. ACTIVE NAV LINK ON SCROLL (INTERSECTION OBSERVER)
  // ----------------------------------------------------
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${currentId}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // ----------------------------------------------------
  // 4. APPOINTMENT FORM HANDLING
  // ----------------------------------------------------
  const bookingForm = document.getElementById("bookingForm");
  const formStatus = document.getElementById("formStatus");
  const dateInput = document.getElementById("date");

  // Prevent selecting past dates
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }

  if (bookingForm && formStatus) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("fullName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const service = document.getElementById("service").value;
      const date = document.getElementById("date").value;

      if (!name || !phone || !service || !date) {
        formStatus.textContent = "Please fill in all required fields.";
        formStatus.className = "form-notice error";
        return;
      }

      // Simple phone validation (digits check)
      const phoneDigits = phone.replace(/[^0-9]/g, "");
      if (phoneDigits.length < 9) {
        formStatus.textContent = "Please provide a valid phone number.";
        formStatus.className = "form-notice error";
        return;
      }

      // Successful simulated submission
      formStatus.textContent = `Thank you, ${name}! Your consultation request has been received. Our clinic team will call you at ${phone} to confirm the appointment.`;
      formStatus.className = "form-notice success";

      // Reset form fields
      bookingForm.reset();

      // Reset status after 8 seconds
      setTimeout(() => {
        formStatus.textContent = "";
        formStatus.className = "form-notice";
      }, 8000);
    });
  }
});