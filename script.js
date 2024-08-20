// script.js

async function parseRecipe() {
    const shortLink = document.getElementById('shortLink').value;
    const recipeDisplay = document.getElementById('recipeDisplay');
    recipeDisplay.innerHTML = `
        <div class="col-12 text-center">
            <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">${t('loading')}</span>
            </div>
            <p class="mt-3">${t('loading')}</p>
        </div>
    `;

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
        recipeDisplay.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger" role="alert">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    ${t('errorFetching')}: ${error.message}
                </div>
            </div>
        `;
        console.error('Error:', error);
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'de' ? 'en' : 'de';
    setCookie('lang', currentLang, 30);
    updateUILanguage();
}

function updateUILanguage() {
    document.title = t('appTitle');
    document.getElementById('appTitle').textContent = t('appTitle');
    document.getElementById('heroTitle').textContent = t('heroTitle');
    document.getElementById('heroSubtitle').textContent = t('heroSubtitle');
    document.getElementById('shortLink').placeholder = t('inputPlaceholder');
    document.getElementById('getRecipeBtn').innerHTML = `<i class="fas fa-search"></i> ${t('getRecipe')}`;
    document.getElementById('langToggle').textContent = t('switchLang');
}

// Initialize the UI language when the page loads
document.addEventListener('DOMContentLoaded', updateUILanguage);