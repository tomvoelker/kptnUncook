const translations = {
    de: {
        appTitle: "KptnUncook's Komische Kombüse",
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
        markdownCopied: "Markdown kopiert!",
        switchLang: "Switch to English 🇺🇸",
        minutes: "Min.",
        notSpecified: "Nicht angegeben",
        error: "Fehler beim Abrufen des Rezepts"
    },
    en: {
        appTitle: "KptnUncook's Crazy Galley",
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
        markdownCopied: "Markdown copied!",
        switchLang: "Zu Deutsch wechseln 🇩🇪",
        minutes: "min",
        notSpecified: "Not specified",
        error: "Error fetching recipe"
    }
};


export function t(lang, key) {
    return translations[lang][key] || key;
}

export { translations };