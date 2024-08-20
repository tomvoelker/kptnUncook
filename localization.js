// localization.js

const translations = {
    de: {
        appTitle: "KapitänKochs Komische Kombüse",
        heroTitle: "Willkommen in der Kombüse",
        heroSubtitle: "Teile köstliche Rezepte mit Freunden ganz einfach und schnell",
        inputPlaceholder: "Rezept-Kurzlink eingeben",
        getRecipe: "Rezept abrufen",
        loading: "Lade Rezept...",
        errorFetching: "Fehler beim Abrufen des Rezepts",
        portions: "Portionen",
        prepTime: "Zubereitungszeit",
        cookTime: "Kochzeit",
        ingredients: "Zutaten",
        instructions: "Zubereitung",
        nutritionInfo: "Nährwerte (pro Portion)",
        calories: "Kalorien",
        protein: "Protein",
        fat: "Fett",
        carbs: "Kohlenhydrate",
        copyLink: "Direktlink kopieren",
        copyMarkdown: "Als Markdown kopieren",
        linkCopied: "Link kopiert!",
        switchLang: "Switch to English 🇺🇸",
        minutes: "Min.",
        notSpecified: "Nicht angegeben"
    },
    en: {
        appTitle: "KptnCook's Crazy Galley",
        heroTitle: "Welcome to the Galley",
        heroSubtitle: "Share delicious recipes with friends easily and quickly",
        inputPlaceholder: "Enter recipe short link",
        getRecipe: "Get Recipe",
        loading: "Loading recipe...",
        errorFetching: "Error fetching recipe",
        portions: "Portions",
        prepTime: "Preparation Time",
        cookTime: "Cooking Time",
        ingredients: "Ingredients",
        instructions: "Instructions",
        nutritionInfo: "Nutrition Info (per serving)",
        calories: "Calories",
        protein: "Protein",
        fat: "Fat",
        carbs: "Carbohydrates",
        copyLink: "Copy Direct Link",
        copyMarkdown: "Copy as Markdown",
        linkCopied: "Link copied!",
        switchLang: "Zu Deutsch wechseln 🇩🇪",
        minutes: "min",
        notSpecified: "Not specified"
    }
};

let currentLang = getCookie('lang') || 'de';

function t(key) {
    return translations[currentLang][key] || key;
}

function updateUILanguage() {
    document.title = t('appTitle');
    document.getElementById('appTitle').textContent = t('appTitle');
    document.getElementById('heroTitle').textContent = t('heroTitle');
    document.getElementById('heroSubtitle').textContent = t('heroSubtitle');
    document.getElementById('shortLink').placeholder = t('inputPlaceholder');
    document.getElementById('getRecipeBtn').innerHTML = `<i class="fas fa-search"></i> ${t('getRecipe')}`;
    document.getElementById('langToggle').textContent = t('switchLang');

    if (window.currentRecipe) {
        displayRecipe(window.currentRecipe);
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'de' ? 'en' : 'de';
    setCookie('lang', currentLang, 30);
    updateUILanguage();
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Initialize the UI language when the page loads
document.addEventListener('DOMContentLoaded', updateUILanguage);