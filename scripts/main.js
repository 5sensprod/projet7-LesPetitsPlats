import { fetchData } from './data-source/dataFetch.js';
import { getRecipeData } from './data-source/sharedData.js';

import { generateRecipeCards, generateListDropdowns } from './utils/generator.js';
import { addDropdownEvents } from "./handlers/dropdownInteractions.js";
import { addDropdownItemClickListeners } from './handlers/dropdownItemListeners.js';

import { updateRecipeDisplay } from "./search/criteriaSearch.js";
import { filterRecipes } from "./search/generalSearch.js";

async function initialize() {
    await fetchData();
    const data = getRecipeData();

    generateRecipeCards(data);
    generateListDropdowns(data);
    addDropdownItemClickListeners();
    addDropdownEvents();

    updateRecipeDisplay();
    filterRecipes();
}

function initializeEventListeners() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
        filterRecipes();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initialize();
    initializeEventListeners();
});