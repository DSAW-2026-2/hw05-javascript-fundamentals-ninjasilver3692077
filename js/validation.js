const pilotForm = document.getElementById("pilot-form");
const formStatus = document.getElementById("form-status");
const formFields = [
    {
        input: document.getElementById("name"),
        emptyMessage: "Please enter your full name."
    },
    {
        input: document.getElementById("email"),
        emptyMessage: "Please enter your email address.",
        invalidMessage: "Please enter a valid email address."
    },
    {
        input: document.getElementById("university"),
        emptyMessage: "Please enter your university name."
    },
    {
        input: document.getElementById("challenge"),
        emptyMessage: "Please describe a challenge you would like to complete."
    }
];

function getErrorElement(input) {
    return document.getElementById(`${input.id}-error`);
}

function showFieldError(input, message) {
    const error = getErrorElement(input);

    input.setAttribute("aria-invalid", "true");
    input.classList.add("border-red-500");
    error.textContent = message;
    error.classList.remove("hidden");
}

function clearFieldError(input) {
    const error = getErrorElement(input);

    input.removeAttribute("aria-invalid");
    input.classList.remove("border-red-500");
    error.textContent = "";
    error.classList.add("hidden");
}

function validateField(field) {
    const value = field.input.value.trim();

    if (value === "") {
        showFieldError(field.input, field.emptyMessage);
        return false;
    }

    if (field.input.type === "email" && !field.input.validity.valid) {
        showFieldError(field.input, field.invalidMessage);
        return false;
    }

    clearFieldError(field.input);
    return true;
}

function showFormStatus(message, statusClass) {
    formStatus.textContent = message;
    formStatus.className = `rounded-md border px-4 py-3 ${statusClass}`;
}

formFields.forEach((field) => {
    field.input.addEventListener("input", () => {
        if (field.input.value.trim() !== "") {
            validateField(field);
        }
    });
});

pilotForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const isValid = formFields.map(validateField).every(Boolean);

    if (!isValid) {
        showFormStatus(
            "Please correct the highlighted fields before sending your registration.",
            "border-red-300 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
        );
        formFields.find((field) => field.input.getAttribute("aria-invalid") === "true").input.focus();
        return;
    }

    const name = document.getElementById("name").value.trim();

    showFormStatus(
        `Thanks, ${name}! Your pilot registration is ready to be reviewed.`,
        "border-green-300 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200"
    );
    pilotForm.reset();
});
