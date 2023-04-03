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

  for (let i = 0; i < recipeData.length; i++) {
    const recipe = recipeData[i];
    const normalizedQuery = normalizeString(query);
    let matchesSearchQuery = false;
    if (query.length < 3 ||
        normalizeString(recipe.name).includes(normalizedQuery) ||
        recipe.ingredients.some(ingredient => normalizeString(ingredient.ingredient).includes(normalizedQuery)) ||
        normalizeString(recipe.description).includes(normalizedQuery)) {
      matchesSearchQuery = true;
    }

    let matchesSearchCriteria = true;
    for (let j = 0; j < searchCriteria.length; j++) {
      const criteria = searchCriteria[j];
      const listType = criteria.classList.contains('search-criteria__item--ingredient') ? 'ingredient'
        : criteria.classList.contains('search-criteria__item--appliance') ? 'appliance'
          : 'ustensil';
      const normalizedText = normalizeString(criteria.textContent.trim());

      let matchesCriteria = false;
      if (listType === 'ingredient') {
        for (let k = 0; k < recipe.ingredients.length; k++) {
          const ingredient = recipe.ingredients[k];
          if (ingredient.ingredient === normalizedText) {
            matchesCriteria = true;
            break;
          }
        }
      } else if (listType === 'appliance') {
        if (recipe.appliance === normalizedText) {
          matchesCriteria = true;
        }
      } else if (listType === 'ustensil') {
        for (let k = 0; k < recipe.ustensils.length; k++) {
          const ustensil = recipe.ustensils[k];
          if (ustensil === normalizedText) {
            matchesCriteria = true;
            break;
          }
        }
      }

      if (!matchesCriteria) {
        matchesSearchCriteria = false;
        break;
      }
    }

    if (matchesSearchQuery && matchesSearchCriteria) {
      filteredRecipes.push(recipe);
    }
  }

  const filteredRecipeCards = getRecipeCardElementsFromData(filteredRecipes);
  updateRecipeDisplay(false, filteredRecipeCards);
  updateDropdownLists(filteredRecipes);
}