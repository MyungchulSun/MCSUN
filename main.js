
const generateBtn = document.getElementById("generate");
const numberSpans = document.querySelectorAll(".number");
const themeToggleBtn = document.getElementById("theme-toggle");
const THEME_KEY = "theme";

const colors = [
  "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5",
  "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50",
  "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800",
  "#ff5722", "#795548", "#9e9e9e", "#607d8b"
];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function applyTheme(theme) {
    const useLightMode = theme === "light";
    document.body.classList.toggle("light-mode", useLightMode);
    themeToggleBtn.textContent = useLightMode ? "Dark Mode" : "Light Mode";
    localStorage.setItem(THEME_KEY, useLightMode ? "light" : "dark");
}

function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === "light" || savedTheme === "dark") {
        applyTheme(savedTheme);
        return;
    }

    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    applyTheme(prefersLight ? "light" : "dark");
}

themeToggleBtn.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light-mode") ? "dark" : "light";
    applyTheme(nextTheme);
});

initializeTheme();

generateBtn.addEventListener("click", () => {
    numberSpans.forEach(span => {
        span.classList.add("shaking");
        span.textContent = '';
        span.style.backgroundColor = '';
    });

    setTimeout(() => {
        const lottoNumbers = new Set();
        while (lottoNumbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            lottoNumbers.add(randomNumber);
        }

        const sortedNumbers = Array.from(lottoNumbers).sort((a, b) => a - b);

        numberSpans.forEach((span, index) => {
            span.classList.remove("shaking");
            span.textContent = sortedNumbers[index];
            span.style.backgroundColor = getRandomColor();
        });
    }, 1000); 
});
