
document.addEventListener('DOMContentLoaded', () => {
    const numberContainer = document.getElementById('lotto-numbers');
    const generateBtn = document.getElementById('generate');
    const themeToggle = document.getElementById('theme-toggle');
    const THEME_KEY = 'theme';
    const THEMES = ['dark', 'light', 'colorblind'];
    const themeLabel = {
        dark: 'Dark Mode',
        light: 'Light Mode',
        colorblind: 'Colorblind Mode'
    };

    function generateNumbers() {
        const numbers = new Set();
        while(numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    function displayNumbers(numbers) {
        numberContainer.innerHTML = ''; // Clear previous numbers
        numbers.forEach(number => {
            const numberElement = document.createElement('div');
            numberElement.classList.add('number');
            numberElement.textContent = number;
            numberContainer.appendChild(numberElement);
        });
    }

    function applyTheme(theme) {
        const selectedTheme = THEMES.includes(theme) ? theme : 'dark';
        document.body.setAttribute('data-theme', selectedTheme);
        themeToggle.textContent = `Mode: ${themeLabel[selectedTheme]}`;
        localStorage.setItem(THEME_KEY, selectedTheme);
    }

    function getNextTheme(currentTheme) {
        const currentIndex = THEMES.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % THEMES.length;
        return THEMES[nextIndex];
    }

    generateBtn.addEventListener('click', () => {
        const lottoNumbers = generateNumbers();
        displayNumbers(lottoNumbers);
    });

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme') || 'dark';
        applyTheme(getNextTheme(currentTheme));
    });

    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(savedTheme || (prefersLight ? 'light' : 'dark'));

    // Initial generation
    displayNumbers(generateNumbers());
});
