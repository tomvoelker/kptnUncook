import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import { t } from './localization.js';

const recipeTemplate = fs.readFileSync(path.resolve(__dirname, 'recipe.ejs'), 'utf-8');

export function renderRecipeHTML(recipe, lang, structuredData) {
    // Convert the structuredData object to a JSON string
    const jsonString = JSON.stringify(structuredData);

    // Create a function that returns this JSON string
    const getStructuredData = `function getStructuredData() { return ${jsonString}; }`;

    return ejs.render(recipeTemplate, {
        recipe,
        lang,
        t,
        getStructuredData
    });
}

export function renderLoadingHTML(lang) {
    return `<div class="loading">${t(lang, 'loading')}</div>`;
}

export function renderErrorHTML(error, lang) {
    return `<div class="error">${t(lang, 'error')}: ${error.message}</div>`;
}