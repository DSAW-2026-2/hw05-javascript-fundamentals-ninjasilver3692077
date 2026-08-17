const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.getElementById("theme-label");
const evidenceModal = document.getElementById("evidence-modal");
const openEvidenceModal = document.getElementById("open-evidence-modal");
const closeEvidenceModal = document.getElementById("close-evidence-modal");

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

updateThemeButton();
