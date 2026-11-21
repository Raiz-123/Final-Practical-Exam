// ==========================================
// MOBILE NAVIGATION
// ==========================================

const navToggle = document.querySelector("#nav-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
        
        const isOpen = primaryNav.classList.toggle("is-open");

        navToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close navigation after selecting a link
    primaryNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            primaryNav.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });

    // Close navigation when Escape is pressed
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            primaryNav.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });


    // Close mobile navigation when switching to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            primaryNav.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });
}

// ==========================================
// DARK MODE TOGGLE + THEME PERSISTENCE
// ==========================================

const themeToggle = document.querySelector("#theme-toggle");

// Load saved theme
const savedTheme = localStorage.getItem("portfolio-theme") || "light";

document.documentElement.setAttribute("data-theme", savedTheme);

if (themeToggle) {
    themeToggle.setAttribute(
        "aria-pressed",
        savedTheme === "dark"
    );

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");

        const newTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", newTheme);

        themeToggle.setAttribute(
            "aria-pressed",
            newTheme === "dark"
        );

        // Save selected theme
        localStorage.setItem("portfolio-theme", newTheme);
    });
}

// ==========================================
// CONTACT FORM VALIDATION
// ==========================================

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const messageInput = document.querySelector("#message");

    const nameError = document.querySelector("#name-error");
    const emailError = document.querySelector("#email-error");
    const messageError = document.querySelector("#message-error");

    const formStatus = document.querySelector("#form-status");

    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        input.setAttribute("aria-invalid", "true");
    }

    function clearError(input, errorElement) {
        errorElement.textContent = "";
        input.removeAttribute("aria-invalid");
    }

    function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let isValid = true;

        formStatus.textContent = "";

        // Validate name
        if (nameInput.value.trim() === "") {
            showError(nameInput, nameError, "Please enter your name.");
            isValid = false;
        } else {
            clearError(nameInput, nameError);
        }

        // Validate email
        if (emailInput.value.trim() === "") {
            showError(emailInput, emailError, "Please enter your email.");
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, emailError, "Please enter a valid email address.");
            isValid = false;
        } else {
            clearError(emailInput, emailError);
        }

        // Validate message
        if (messageInput.value.trim() === "") {
            showError(messageInput, messageError, "Please enter a message.");
            isValid = false;
        } else {
            clearError(messageInput, messageError);
        }

        // Display result
        if (isValid) {
            formStatus.textContent = "Your form passed validation! Thank you.";
            contactForm.reset();
        } else {
            formStatus.textContent = "Please correct the errors above.";
        }
    });

    // Clear individual errors while typing
    nameInput.addEventListener("input", () => {
        if (nameInput.value.trim() !== "") {
            clearError(nameInput, nameError);
        }
    });

    emailInput.addEventListener("input", () => {
        const email = emailInput.value.trim();

        if (email !== "" && isValidEmail(email)) {
            clearError(emailInput, emailError);
        }
    });

    messageInput.addEventListener("input", () => {
        if (messageInput.value.trim() !== "") {
            clearError(messageInput, messageError);
        }
    });
}
