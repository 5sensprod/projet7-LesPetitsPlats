import { normalizeString } from '../utils/stringUtils.js';
import { getRecipeData } from '../data-source/sharedData.js';
import { updateDropdownLists, updateAvailableCriteria } from '../handlers/dropdownUpdates.js';

export function updateRecipeDisplay(filterDropdowns = false, filteredRecipeCards = null) {
  const searchCriteria = document.querySelectorAll('.search-criteria__item');
  const recipes = document.querySelectorAll('.recipe-card');
  const recipeData = getRecipeData();
  const filteredRecipes = [];

  recipes.forEach((recipe, index) => {
    let shouldDisplay = true;

    if (filteredRecipeCards !== null) {
      shouldDisplay = filteredRecipeCards.includes(recipe);
    } else {
      const currentRecipeData = recipeData[index];
      const ingredients = currentRecipeData.ingredients.map(ingredient => normalizeString(ingredient.ingredient));
      const appliance = normalizeString(currentRecipeData.appliance);
      const ustensils = currentRecipeData.ustensils.map(ustensil => normalizeString(ustensil));

      for (const criteria of searchCriteria) {
        const listType = criteria.classList.contains('search-criteria__item--ingredient') ? 'ingredient'
          : criteria.classList.contains('search-criteria__item--appliance') ? 'appliance'
            : 'ustensil';

        const text = criteria.textContent.trim();
        const normalizedText = normalizeString(text);

        if (listType === 'ingredient' && !ingredients.includes(normalizedText)) {
          shouldDisplay = false;
          break;
        } else if (listType === 'appliance' && appliance !== normalizedText) {
          shouldDisplay = false;
          break;
        } else if (listType === 'ustensil' && !ustensils.includes(normalizedText)) {
          shouldDisplay = false;
          break;
        }
      }
    }

    recipe.style.display = shouldDisplay ? '' : 'none';
    if (shouldDisplay) {
      filteredRecipes.push(recipeData[index]);
    }
  });

  if (filterDropdowns) {
    updateDropdownLists(filteredRecipes);
  }

  updateAvailableCriteria(filteredRecipes.map(recipe => {
    return {
      id: parseInt(recipe.id),
      ingredients: recipe.ingredients,
      appliance: recipe.appliance,
      ustensils: recipe.ustensils,
    };
  }));
}