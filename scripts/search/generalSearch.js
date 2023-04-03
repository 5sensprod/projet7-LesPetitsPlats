import { normalizeString } from '../utils/stringUtils.js';
import { updateDropdownLists } from '../handlers/dropdownUpdates.js';
import { updateRecipeDisplay } from './criteriaSearch.js';
import { getRecipeData } from '../data-source/sharedData.js';

// Récupère les éléments de cartes de recettes à partir des données filtrées
function getRecipeCardElementsFromData(filteredRecipesData) {
  const allRecipeCards = document.querySelectorAll('.recipe-card');
  return Array.from(allRecipeCards).filter(recipeCard => {
    const recipeId = parseInt(recipeCard.getAttribute('data-recipe-id'));
    return filteredRecipesData.some(filteredRecipe => filteredRecipe.id === recipeId);
  });
}

// Filtre les recettes en utilisant les boucles natives
export function filterRecipes() {
  const searchInput = document.getElementById('search-input');
  const query = normalizeString(searchInput.value.trim());
  const searchCriteria = document.querySelectorAll('.search-criteria__item');
  const recipeData = getRecipeData();
  const filteredRecipes = [];

  let i = 0;
  while (i < recipeData.length) {
    const recipe = recipeData[i];
    const normalizedQuery = normalizeString(query);
    let matchesSearchQuery = query.length < 3 || normalizeString(recipe.name).includes(normalizedQuery) || recipe.ingredients.some(ingredient => normalizeString(ingredient.ingredient).includes(normalizedQuery)) || normalizeString(recipe.description).includes(normalizedQuery);

    let matchesSearchCriteria = true;
    let j = 0;
    while (j < searchCriteria.length) {
      const criteria = searchCriteria[j];
      const listType = criteria.classList.contains('search-criteria__item--ingredient') ? 'ingredient' : criteria.classList.contains('search-criteria__item--appliance') ? 'appliance' : 'ustensil';
      const normalizedText = normalizeString(criteria.textContent.trim());

      if (listType === 'ingredient' && !recipe.ingredients.some(ingredient => ingredient.ingredient === normalizedText)) {
        matchesSearchCriteria = false;
        break;
      }

      if (listType === 'appliance' && recipe.appliance !== normalizedText) {
        matchesSearchCriteria = false;
        break;
      }

      if (listType === 'ustensil' && !recipe.ustensils.some(ustensil => ustensil === normalizedText)) {
        matchesSearchCriteria = false;
        break;
      }

      j++;
    }

    if (matchesSearchQuery && matchesSearchCriteria) {
      filteredRecipes.push(recipe);
    }

    i++;
  }

  const filteredRecipeCards = getRecipeCardElementsFromData(filteredRecipes);
  updateRecipeDisplay(false, filteredRecipeCards);
  updateDropdownLists(filteredRecipes);
}