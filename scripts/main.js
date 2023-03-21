import { generateRecipeCards, generateDropdowns, generateDropdownLists } from './utils/recipe-ui.js';
import { addDropdownEvents, addClickEventToDropdownItem } from './utils/dropdown-events.js';
import { getRecipeData, printRecipeData } from './data-source/dataShared.js';
import { fetchData } from './data-source/dataFetch.js';

async function initialize() {
    await fetchData();
    const recipeData = getRecipeData();
    console.log(recipeData);

    generateDropdowns();
    generateDropdownLists(recipeData);
    addDropdownEvents();
    generateRecipeCards(recipeData);
    addClickEventToDropdownItem();
    // Charger les données
// setRecipeData(data);

// Afficher les données dans la console
printRecipeData();
}

initialize();