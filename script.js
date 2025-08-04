/** @format */

// /** @format */

// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Fade-in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });

  // Additional certifications dropdown
  const dropdownToggle = document.getElementById("additionalCertsToggle");
  const dropdownContent = document.getElementById("additionalCertsContent");

  if (dropdownToggle && dropdownContent) {
    dropdownToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      dropdownContent.classList.toggle("open");
    });
  }

  // Certificate verification buttons
  document.querySelectorAll(".verify-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const url = this.dataset.url;
      if (url) {
        window.open(url, "_blank");
      }
    });
  });

  // Certificate modal functionality
  const modal = document.getElementById("certificateModal");
  const modalImg = document.getElementById("modalCertImage");
  const closeModal = document.querySelector(".close-modal");

  // Certificate images data (placeholder URLs - replace with actual certificate images)
  const certificateImages = {
    "aws-cert": "Certificates/SAA.jpeg?auto=compress&cs=tinysrgb&w=800",
    "github-cert": "Certificates/GHAS.jpeg?auto=compress&cs=tinysrgb&w=800",
    "oracle-cert": "Certificates/Oracle.png?auto=compress&cs=tinysrgb&w=800",
    "github-cert1": "Certificates/GHF.jpeg?auto=compress&cs=tinysrgb&w=800",
    "microsoft-cert":
      "Certificates/Microsoft.jpeg?auto=compress&cs=tinysrgb&w=800",
    "udemy-cert": "Certificates/Udemy-01.jpeg?auto=compress&cs=tinysrgb&w=800",
    "docker-cert": "Certificates/Docker.jpeg?auto=compress&cs=tinysrgb&w=800",
    "datacamp-cert":
      "Certificates/Datacamp.jpeg?auto=compress&cs=tinysrgb&w=800",
    "linux-cert":
      "Certificates/KodeKloud-Linux.jpeg?auto=compress&cs=tinysrgb&w=800",
    "oracle-2-cert":
      "Certificates/Oracle-02.jpeg?auto=compress&cs=tinysrgb&w=800",
  };

  // View certificate buttons
  document.querySelectorAll(".view-cert-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const certType = this.dataset.cert;
      const imageUrl = certificateImages[certType];

      if (imageUrl && modal && modalImg) {
        modalImg.src = imageUrl;
        modal.style.display = "block";
        document.body.style.overflow = "hidden";

        // Add fade-in animation
        setTimeout(() => {
          modal.style.opacity = "1";
        }, 10);
      }
    });
  });

  // Close modal
  if (closeModal && modal) {
    closeModal.addEventListener("click", closeModalFunction);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModalFunction();
      }
    });
  }

  function closeModalFunction() {
    if (modal) {
      modal.style.opacity = "0";
      setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }, 300);
    }
  }

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.style.display === "block") {
      closeModalFunction();
    }
  });

  // Contact form validation and submission with EmailJS
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Clear previous errors
      document.querySelectorAll(".error-message").forEach((error) => {
        error.textContent = "";
      });

      // Get form data
      const formData = new FormData(this);
      const name = formData.get("name").trim();
      const email = formData.get("email").trim();
      const message = formData.get("message").trim();

      let isValid = true;

      // Validate name
      if (!name) {
        document.getElementById("nameError").textContent = "Name is required";
        isValid = false;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        document.getElementById("emailError").textContent = "Email is required";
        isValid = false;
      } else if (!emailRegex.test(email)) {
        document.getElementById("emailError").textContent =
          "Please enter a valid email";
        isValid = false;
      }

      // Validate message
      if (!message) {
        document.getElementById("messageError").textContent =
          "Message is required";
        isValid = false;
      } else if (message.length < 10) {
        document.getElementById("messageError").textContent =
          "Message must be at least 10 characters long";
        isValid = false;
      }

      // If form is valid, send email using EmailJS
      if (isValid) {
        // Disable submit button and show loading state
        const submitBtn = this.querySelector(".submit-btn");
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Send email using EmailJS
        emailjs
          .sendForm("service_ay95zze", "template_h04nu3l", this)
          .then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);

              // Show success message
              if (successMessage) {
                successMessage.style.display = "flex";
                successMessage.style.opacity = "0";
                setTimeout(() => {
                  successMessage.style.opacity = "1";
                }, 10);

                // Hide success message after 5 seconds
                setTimeout(() => {
                  successMessage.style.opacity = "0";
                  setTimeout(() => {
                    successMessage.style.display = "none";
                  }, 300);
                }, 5000);
              }

              // Reset form
              contactForm.reset();
            },
            function (error) {
              console.log("FAILED...", error);

              // Show error message
              alert(
                "Failed to send message. Please try again or contact me directly."
              );
            }
          )
          .finally(function () {
            // Reset submit button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          });
      }
    });
  }

  // Add parallax effect to hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector(".hero-background");

    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    // Update navbar background opacity based on scroll
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      if (scrolled > 50) {
        navbar.style.background = "rgba(0, 0, 0, 0.98)";
      } else {
        navbar.style.background = "rgba(0, 0, 0, 0.95)";
      }
    }
  });

  // Add hover effect to skill categories
  document.querySelectorAll(".skill-category").forEach((category) => {
    category.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    category.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add click animation to buttons
  document.querySelectorAll(".btn-primary, .btn-secondary").forEach((btn) => {
    btn.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });

  // Add typing effect to the name
  const nameElement = document.querySelector(".name");
  if (nameElement) {
    const originalText = nameElement.textContent;
    nameElement.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < originalText.length) {
        nameElement.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
  }

  // Add floating animation to certification icons
  document.querySelectorAll(".cert-icon").forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.2}s`;
    icon.style.animation = "float 3s ease-in-out infinite";
  });

  // CSS for floating animation (added via JavaScript)
  const style = document.createElement("style");
  style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
  document.head.appendChild(style);

  // Add ripple effect to clickable elements
  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const rippleStyle = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 600ms linear;
                background-color: rgba(255, 255, 255, 0.3);
                pointer-events: none;
            }
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;

    if (!document.querySelector("#ripple-style")) {
      const rippleStyleEl = document.createElement("style");
      rippleStyleEl.id = "ripple-style";
      rippleStyleEl.textContent = rippleStyle;
      document.head.appendChild(rippleStyleEl);
    }

    const existingRipple = button.querySelector(".ripple");
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);
  }

  // Add ripple effect to buttons
  document
    .querySelectorAll(".btn-primary, .btn-secondary, .social-link")
    .forEach((btn) => {
      btn.addEventListener("click", createRipple);
      btn.style.position = "relative";
      btn.style.overflow = "hidden";
    });
});
