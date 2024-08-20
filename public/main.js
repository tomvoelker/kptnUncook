import { t } from './localization.js';
import * as templates from './templates.js';
import { setCookie, getCookie } from './utils.js';


let currentLang = getCookie('lang') || 'de';

async function parseRecipe() {
    const shortLink = document.getElementById('shortLink').value;
    const recipeDisplay = document.getElementById('recipeDisplay');
    recipeDisplay.innerHTML = templates.renderLoadingHTML(currentLang);

    try {
        const response = await fetch('/.netlify/functions/getRecipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shortLink, lang: currentLang })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.recipeId) {
            window.location.href = `/recipe/${result.recipeId}?lang=${currentLang}`;
        } else {
            throw new Error('No recipe ID returned from server');
        }
    } catch (error) {
        recipeDisplay.innerHTML = templates.renderErrorHTML(error, currentLang);
        console.error('Error:', error);
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'de' ? 'en' : 'de';
    setCookie('lang', currentLang, 30);
    updateUILanguage();
}

function updateUILanguage() {
    document.title = t(currentLang, 'appTitle');
    document.getElementById('appTitle').textContent = t(currentLang, 'appTitle');
    document.getElementById('heroTitle').textContent = t(currentLang, 'heroTitle');
    document.getElementById('heroSubtitle').textContent = t(currentLang, 'heroSubtitle');
    document.getElementById('shortLink').placeholder = t(currentLang, 'inputPlaceholder');
    document.getElementById('getRecipeBtn').innerHTML = `<i class="fas fa-search"></i> ${t(currentLang, 'getRecipe')}`;
    document.getElementById('langToggle').textContent = t(currentLang, 'switchLang');
}

// Initialize the UI language when the page loads
document.addEventListener('DOMContentLoaded', updateUILanguage);

// Expose functions to global scope
window.parseRecipe = parseRecipe;
window.toggleLanguage = toggleLanguage;