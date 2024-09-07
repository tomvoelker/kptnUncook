import fetch from 'node-fetch';
import { renderRecipeHTML, renderErrorHTML } from './templates';

async function getRecipeIdFromShortLink(shortLink) {
    const response = await fetch(shortLink, { redirect: 'follow' });
    return response.url.split('/').pop();
}

exports.handler = async function (event, context) {
    console.log('Function invoked');
    let lang = 'de'; // Default language
    try {
        let finalRecipeId;

        if (event.httpMethod === 'GET') {
            if (event.queryStringParameters && event.queryStringParameters.shortlink) {
                // A simple way to get a recipe id from a short link (for scripting purposes)
                const shortLink = event.queryStringParameters.shortlink;
                finalRecipeId = await getRecipeIdFromShortLink(shortLink);
                return {
                    statusCode: 200,
                    headers: { 'Content-Type': 'application/json' },
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
                finalRecipeId = await getRecipeIdFromShortLink(shortLink);
            } else if (recipeId) {
                finalRecipeId = recipeId;
            } else {
                throw new Error('No short link or recipe ID provided in POST request');
            }

            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
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

        const renderedHTML = renderRecipeHTML(recipeData[0], lang);
        // const renderedHTML = await ejs.renderFile('../shared/recipe.ejs', { recipe: recipeData[0], lang });

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html' },
            body: renderedHTML
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'text/html' },
            body: renderErrorHTML(error, lang)
        };
    }
};