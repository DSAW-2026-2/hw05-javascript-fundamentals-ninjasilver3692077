const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.getElementById("theme-label");
const evidenceModal = document.getElementById("evidence-modal");
const openEvidenceModal = document.getElementById("open-evidence-modal");
const closeEvidenceModal = document.getElementById("close-evidence-modal");
const pilotForm = document.getElementById("pilot-form");
const formStatus = document.getElementById("form-status");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

function updateThemeButton() {
    const isDark = document.documentElement.classList.contains("dark");

    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeLabel.textContent = isDark ? "Light Mode" : "Dark Mode";
}

function closeModal() {
    evidenceModal.classList.add("hidden");
    evidenceModal.classList.remove("flex");
    evidenceModal.setAttribute("aria-hidden", "true");
    openEvidenceModal.focus();
}

function showFieldError(input, message) {
    const error = document.getElementById(`${input.id}-error`);

    input.setAttribute("aria-invalid", "true");
    input.classList.add("border-red-500");
    error.textContent = message;
    error.classList.remove("hidden");
}

function clearFieldError(input) {
    const error = document.getElementById(`${input.id}-error`);

    input.removeAttribute("aria-invalid");
    input.classList.remove("border-red-500");
    error.textContent = "";
    error.classList.add("hidden");
}

themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeButton();
});

openEvidenceModal.addEventListener("click", () => {
    evidenceModal.classList.remove("hidden");
    evidenceModal.classList.add("flex");
    evidenceModal.setAttribute("aria-hidden", "false");
    closeEvidenceModal.focus();
});

closeEvidenceModal.addEventListener("click", closeModal);

evidenceModal.addEventListener("click", (event) => {
    if (event.target === evidenceModal) {
        closeModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !evidenceModal.classList.contains("hidden")) {
        closeModal();
    }
});

nameInput.addEventListener("input", () => clearFieldError(nameInput));
emailInput.addEventListener("input", () => clearFieldError(emailInput));

pilotForm.addEventListener("submit", (event) => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    let isValid = true;

    formStatus.classList.add("hidden");
    clearFieldError(nameInput);
    clearFieldError(emailInput);

    if (name === "") {
        showFieldError(nameInput, "Please enter your full name.");
        isValid = false;
    }

    if (email === "") {
        showFieldError(emailInput, "Please enter your email address.");
        isValid = false;
    } else if (!emailInput.validity.valid) {
        showFieldError(emailInput, "Please enter a valid email address.");
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
        formStatus.textContent = "Please correct the highlighted fields before sending your registration.";
        formStatus.className = "rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200";
        if (name === "") {
            nameInput.focus();
        } else {
            emailInput.focus();
        }
        return;
    }

    event.preventDefault();
    formStatus.textContent = `Thanks, ${name}! Your pilot registration is ready to be reviewed.`;
    formStatus.className = "rounded-md border border-green-300 bg-green-50 px-4 py-3 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200";
    pilotForm.reset();
});

updateThemeButton();
