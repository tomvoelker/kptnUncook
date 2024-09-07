import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import { t } from './localization.js';

const recipeTemplate = fs.readFileSync(path.resolve(__dirname, 'recipe.ejs'), 'utf-8');

export function renderRecipeHTML(recipe, lang, structuredData) {
    return ejs.render(recipeTemplate, { recipe, lang, t, structuredData });
}

export function renderLoadingHTML(lang) {
    return `<div class="loading">${t(lang, 'loading')}</div>`;
}

export function renderErrorHTML(error, lang) {
    return `<div class="error">${t(lang, 'error')}: ${error.message}</div>`;
}