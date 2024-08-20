const fetch = require('node-fetch');

const translations = {
    de: {
        appTitle: "KapitänKochs Komische Kombüse",
        loading: "Lade Rezept...",
        error: "Fehler beim Abrufen des Rezepts",
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
        minutes: "Min.",
        notSpecified: "2", // seems to be the default value
        switchLang: "Switch to English 🇺🇸",
        copyLink: "Direktlink kopieren",
        copyMarkdown: "Als Markdown kopieren",
        linkCopied: "Link kopiert!",
        markdownCopied: "Markdown kopiert!"
    },
    en: {
        appTitle: "KptnCook's Crazy Galley",
        loading: "Loading recipe...",
        error: "Error fetching recipe",
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
        minutes: "min",
        notSpecified: "2", // seems to be the default value
        switchLang: "Zu Deutsch wechseln 🇩🇪",
        copyLink: "Copy Direct Link",
        copyMarkdown: "Copy as Markdown",
        linkCopied: "Link copied!",
        markdownCopied: "Markdown copied!"
    }
};

function t(lang, key) {
    return translations[lang][key] || key;
}

async function getRecipeIdFromShortLink(shortLink) {
    const response = await fetch(shortLink, { redirect: 'follow' });
    return response.url.split('/').pop();
}

function renderHTML(recipe, lang, recipeId) {
    return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${recipe.title} - ${t(lang, 'appTitle')}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
       body { 
            padding-top: 56px; 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
        }
        #langToggle {
            margin-left: auto;
        }
        .recipe-image { 
            max-height: 300px; 
            object-fit: cover; 
            width: 100%;
            border-radius: 8px;
        }
        .navbar { 
            background-color: #df5341; 
            box-shadow: 0 2px 4px rgba(0,0,0,.1);
        }
        .navbar-brand { 
            color: white !important; 
            font-weight: bold;
            font-size: 1.2rem;
        }
        .recipe-card {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,.1);
            padding: 1rem;
            margin-bottom: 1rem;
        }
        .recipe-title {
            color: #df5341;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        .recipe-meta {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 0.5rem;
            margin-bottom: 1rem;
            font-size: 0.9rem;
        }
        .recipe-meta i {
            color: #df5341;
            margin-right: 0.25rem;
        }
        .nutrition-info {
            background-color: #e9ecef;
            border-radius: 8px;
            padding: 0.5rem;
            margin-bottom: 1rem;
            font-size: 0.9rem;
        }
        .nutrition-item {
            display: flex;
            align-items: center;
            margin-bottom: 0.25rem;
        }
        .nutrition-item i {
            color: #df5341;
            margin-right: 0.25rem;
            width: 20px;
        }
        .ingredients-list, .instructions-list {
            padding-left: 0;
            list-style-type: none;
            counter-reset: step-counter;
        }
        .instructions-list li {
            margin-bottom: 0.5rem;
            padding: 0.5rem 0.5rem 0.5rem 2rem;
            background-color: #f8f9fa;
            border-radius: 4px;
            position: relative;
            font-size: 0.9rem;
        }
        .instructions-list li::before {
            content: counter(step-counter);
            counter-increment: step-counter;
            position: absolute;
            left: 0.25rem;
            top: 50%;
            transform: translateY(-50%);
            background-color: #df5341;
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.7rem;
            font-weight: bold;
        }
        .btn-primary {
            background-color: #df5341;
            border-color: #df5341;
        }
        .btn-primary:hover {
            background-color: #c74836;
            border-color: #c74836;
        }
        @media (max-width: 576px) {
            body {
                padding-top: 0;
            }
            .navbar {
                position: relative;
            }
            .navbar .container {
                flex-direction: column;
                align-items: center;
            }
            .container {
                padding-left: 10px;
                padding-right: 10px;
            }
            .recipe-meta .row > div {
                margin-bottom: 0.5rem;
            }
            #langToggle {
                margin-left: 0;
            }
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="/">${t(lang, 'appTitle')}</a>
            <button class="btn btn-outline-light" onclick="toggleLanguage()">${t(lang, 'switchLang')}</button>
        </div>
    </nav>

    <div class="container mt-4">
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <div class="recipe-card">
                    <h1 class="recipe-title">${recipe.title}</h1>
                    ${recipe.imageList && recipe.imageList.length > 0
            ? `<img src="${recipe.imageList.find(img => img.type === 'cover')?.url || recipe.imageList[0].url}" alt="${recipe.title}" class="recipe-image mb-4">`
            : ''}
                    <div class="recipe-meta">
                        <div class="row">
                            <div class="col-sm-4">
                                <i class="fas fa-utensils"></i> <strong>${t(lang, 'portions')}:</strong> ${recipe.yield || recipe.servings || recipe.portions || recipe.fixedPortionCount || t(lang, 'notSpecified')}
                            </div>
                            <div class="col-sm-4">
                                <i class="fas fa-clock"></i> <strong>${t(lang, 'prepTime')}:</strong> ${recipe.preparationTime} ${t(lang, 'minutes')}
                            </div>
                            <div class="col-sm-4">
                                <i class="fas fa-fire"></i> <strong>${t(lang, 'cookTime')}:</strong> ${recipe.cookingTime} ${t(lang, 'minutes')}
                            </div>
                        </div>
                    </div>
                    ${recipe.recipeNutrition ? `
                    <div class="nutrition-info">
                        <h5 class="mb-3">${t(lang, 'nutritionInfo')}</h5>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="nutrition-item">
                                    <i class="fas fa-fire-alt"></i>
                                    <span><strong>${t(lang, 'calories')}:</strong> ${recipe.recipeNutrition.calories} kcal</span>
                                </div>
                                <div class="nutrition-item">
                                    <i class="fas fa-drumstick-bite"></i>
                                    <span><strong>${t(lang, 'protein')}:</strong> ${recipe.recipeNutrition.protein} g</span>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="nutrition-item">
                                    <i class="fas fa-cheese"></i>
                                    <span><strong>${t(lang, 'fat')}:</strong> ${recipe.recipeNutrition.fat} g</span>
                                </div>
                                <div class="nutrition-item">
                                    <i class="fas fa-bread-slice"></i>
                                    <span><strong>${t(lang, 'carbs')}:</strong> ${recipe.recipeNutrition.carbohydrate} g</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    <h5 class="mt-4 mb-3">${t(lang, 'ingredients')}</h5>
                    <ul class="ingredients-list">
                        ${recipe.ingredients.map(ingredient => `
                            <li>
                                <i class="fas fa-check-circle text-success me-2"></i>
                                ${ingredient.quantity || ''} ${ingredient.measure || ''} ${ingredient.ingredient.title}
                            </li>
                        `).join('')}
                    </ul>
                    <h5 class="mt-4 mb-3">${t(lang, 'instructions')}</h5>
                    <ol class="instructions-list">
                        ${recipe.steps.map(step => `
                            <li>${step.title}</li>
                        `).join('')}
                    </ol>
                    <div class="d-grid gap-2 mt-4">
                        <button class="btn btn-primary" onclick="copyDirectLink()">
                            <i class="fas fa-link me-2"></i>${t(lang, 'copyLink')}
                        </button>
                        <button class="btn btn-secondary" onclick="copyAsMarkdown()">
                            <i class="fas fa-file-alt me-2"></i>${t(lang, 'copyMarkdown')}
                        </button>
                    </div>
                    <div id="copyMessage" class="alert alert-success mt-3" style="display: none;" role="alert"></div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
    function toggleLanguage() {
      const currentLang = document.documentElement.lang;
      const newLang = currentLang === 'de' ? 'en' : 'de';
      window.location.href = window.location.pathname + '?lang=' + newLang;
    }

    function copyDirectLink() {
      const directLink = window.location.href;
      navigator.clipboard.writeText(directLink).then(() => {
        showCopyMessage('${t(lang, 'linkCopied')}');
      });
    }

    function copyAsMarkdown() {
      const recipe = ${JSON.stringify(recipe)};
      let markdown = \`# \${recipe.title}\n\n\`;

      if (recipe.imageList && recipe.imageList.length > 0) {
        markdown += \`![\${recipe.title}](\${recipe.imageList[0].url})\n\n\`;
      }

      const portions = recipe.yield || recipe.servings || recipe.portions || recipe.fixedPortionCount || '${t(lang, 'notSpecified')}';
      markdown += \`**${t(lang, 'portions')}:** \${portions}\n\`;
      markdown += \`**${t(lang, 'prepTime')}:** \${recipe.preparationTime} ${t(lang, 'minutes')}\n\`;
      markdown += \`**${t(lang, 'cookTime')}:** \${recipe.cookingTime} ${t(lang, 'minutes')}\n\n\`;

      if (recipe.recipeNutrition) {
        markdown += \`## ${t(lang, 'nutritionInfo')}\n\`;
        markdown += \`- ${t(lang, 'calories')}: \${recipe.recipeNutrition.calories} kcal\n\`;
        markdown += \`- ${t(lang, 'protein')}: \${recipe.recipeNutrition.protein} g\n\`;
        markdown += \`- ${t(lang, 'fat')}: \${recipe.recipeNutrition.fat} g\n\`;
        markdown += \`- ${t(lang, 'carbs')}: \${recipe.recipeNutrition.carbohydrate} g\n\n\`;
      }

      markdown += \`## ${t(lang, 'ingredients')}\n\`;
      recipe.ingredients.forEach(ingredient => {
        const quantity = ingredient.quantity || '';
        const measure = ingredient.measure || '';
        const title = ingredient.ingredient.title;
        markdown += \`- \${quantity} \${measure} \${title}\n\`;
      });

      markdown += \`\n## ${t(lang, 'instructions')}\n\`;
      recipe.steps.forEach((step, index) => {
        markdown += \`\${index + 1}. \${step.title}\n\`;
      });

      navigator.clipboard.writeText(markdown).then(() => {
        showCopyMessage('${t(lang, 'markdownCopied')}');
      });
    }

    function showCopyMessage(message) {
      const copyMessage = document.getElementById('copyMessage');
      copyMessage.textContent = message;
      copyMessage.style.display = 'block';
      setTimeout(() => {
        copyMessage.style.display = 'none';
      }, 3000);
    }
    </script>
</body>
</html>
  `;
}

exports.handler = async function (event, context) {
    console.log('Function invoked');
    try {
        let finalRecipeId;
        let lang = 'de'; // Default language

        if (event.httpMethod === 'GET') {
            if (event.queryStringParameters && event.queryStringParameters.shortlink) {
                // This is the new shortcut endpoint
                const shortLink = event.queryStringParameters.shortlink;
                finalRecipeId = await getRecipeIdFromShortLink(shortLink);
                return {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ recipeId: finalRecipeId })
                };
            } else {
                finalRecipeId = event.path.split('/').pop();
                lang = event.queryStringParameters?.lang || 'de';
            }
        } else if (event.httpMethod === 'POST') {
            if (!event.body) {
                throw new Error('No body provided in POST request');
            }
            const { shortLink, recipeId, lang: requestedLang } = JSON.parse(event.body);
            lang = requestedLang || 'de';

            if (shortLink) {
                const response = await fetch(shortLink, { redirect: 'follow' });
                finalRecipeId = response.url.split('/').pop();
            } else if (recipeId) {
                finalRecipeId = recipeId;
            } else {
                throw new Error('No short link or recipe ID provided in POST request');
            }

            // Return the recipe ID for POST requests
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipeId: finalRecipeId })
            };
        } else {
            throw new Error(`Unsupported HTTP method: ${event.httpMethod}`);
        }

        if (!finalRecipeId) {
            throw new Error('Failed to determine recipe ID');
        }

        const apiUrl = `https://mobile.kptncook.com/recipes/search?lang=${lang}`;
        const apiKey = process.env.KPTNCOOK_API_KEY;

        if (!apiKey) {
            throw new Error('API key not set');
        }

        const requestBody = JSON.stringify([{ uid: finalRecipeId }]);

        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'kptnkey': apiKey
            },
            body: requestBody
        });

        if (!apiResponse.ok) {
            throw new Error(`API response not ok: ${apiResponse.status} ${apiResponse.statusText}`);
        }

        let recipeData = await apiResponse.json();

        if (recipeData[0].steps && recipeData[0].steps.length > 0 && (recipeData[0].steps[0].title.trim() === "Alles parat?" || recipeData[0].steps[0].title.trim() === "All set?")) {
            recipeData[0].steps.shift();
        }

        const renderedHTML = renderHTML(recipeData[0], lang, finalRecipeId);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
            },
            body: renderedHTML
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'text/html',
            },
            body: `
            <!DOCTYPE html>
            <html lang="${lang}">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${t(lang, 'error')} - ${t(lang, 'appTitle')}</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body { 
                        padding-top: 60px; 
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        background-color: #f8f9fa;
                    }
                    .navbar { 
                        background-color: #df5341; 
                        box-shadow: 0 2px 4px rgba(0,0,0,.1);
                    }
                    .navbar-brand { 
                        color: white !important; 
                        font-weight: bold;
                    }
                    .error-container {
                        max-width: 600px;
                        margin: 2rem auto;
                        padding: 2rem;
                        background-color: white;
                        border-radius: 8px;
                        box-shadow: 0 4px 6px rgba(0,0,0,.1);
                    }
                    .error-icon {
                        font-size: 4rem;
                        color: #df5341;
                    }
                </style>
            </head>
            <body>
                <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
                    <div class="container">
                        <a class="navbar-brand" href="/">${t(lang, 'appTitle')}</a>
                    </div>
                </nav>
                <div class="container">
                    <div class="error-container text-center">
                        <i class="fas fa-exclamation-triangle error-icon mb-4"></i>
                        <h1 class="mb-4">${t(lang, 'error')}</h1>
                        <p class="lead">${error.message || t(lang, 'errorFetching')}</p>
                        <a href="/" class="btn btn-primary mt-4">
                            <i class="fas fa-home me-2"></i>Back to Home
                        </a>
                    </div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
            </body>
            </html>
            `
        };
    }
};