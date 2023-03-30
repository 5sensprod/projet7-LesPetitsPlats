import { normalizeString } from '../utils/stringUtils.js';
import { getRecipeData } from '../data-source/sharedData.js';
import { updateDropdownLists, updateAvailableCriteria } from '../handlers/dropdownUpdates.js';

export function updateRecipeDisplay(filterDropdowns = false) {
  const searchCriteria = document.querySelectorAll('.search-criteria__item');
  const recipes = document.querySelectorAll('.recipe-card');
  const recipeData = getRecipeData();
  const filteredRecipes = [];

  recipes.forEach((recipe, index) => {
    let shouldDisplay = true;

    searchCriteria.forEach(criteria => {
      const listType = criteria.classList.contains('search-criteria__item--ingredient') ? 'ingredient'
        : criteria.classList.contains('search-criteria__item--appliance') ? 'appliance'
          : 'ustensil';

      const text = criteria.textContent.trim();
      const normalizedText = normalizeString(text);

      if (listType === 'ingredient') {
        const ingredients = recipeData[index].ingredients.map(ingredient => normalizeString(ingredient.ingredient));
        if (!ingredients.includes(normalizedText)) {
          shouldDisplay = false;
        }
      } else if (listType === 'appliance') {
        const appliance = normalizeString(recipeData[index].appliance);
        if (appliance !== normalizedText) {
          shouldDisplay = false;
        }
      } else {
        const ustensils = recipeData[index].ustensils.map(ustensil => normalizeString(ustensil));
        if (!ustensils.includes(normalizedText)) {
          shouldDisplay = false;
        }
      }
    });

    recipe.style.display = shouldDisplay ? '' : 'none';
    if (shouldDisplay) {
      filteredRecipes.push(recipeData[index]);
    }
  });

  // Appeler updateDropdownLists avec le tableau filteredRecipes seulement si filterDropdowns est true
  if (filterDropdowns) {
    // Appeler updateDropdownLists avec le tableau filteredRecipes
    updateDropdownLists(filteredRecipes);
  }

  // Appeler updateAvailableCriteria avec le tableau filteredRecipes
  updateAvailableCriteria(filteredRecipes.map(recipe => {
    return {
      id: parseInt(recipe.id),
      ingredients: recipe.ingredients,
      appliance: recipe.appliance,
      ustensils: recipe.ustensils,
    };
  }));
}