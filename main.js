
const generateBtn = document.getElementById("generate");
const numberSpans = document.querySelectorAll(".number");

const colors = [
  "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5",
  "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50",
  "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800",
  "#ff5722", "#795548", "#9e9e9e", "#607d8b"
];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

generateBtn.addEventListener("click", () => {
    numberSpans.forEach(span => {
        span.classList.add("shaking");
        span.textContent = '';
        span.style.backgroundColor = '#2b2b2b';
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
