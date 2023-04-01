import { normalizeString } from '../utils/stringUtils.js';
import { getRecipeData } from '../data-source/sharedData.js';
import { updateDropdownLists, updateAvailableCriteria } from '../handlers/dropdownUpdates.js';
import { generateNoRecipesFoundMessage } from '../utils/generator.js';
import { toggleInputsDisabled, closeOpenedDropdown  } from '../handlers/dropdownInteractions.js';

const getListType = (criteria) => {
  if (criteria.classList.contains('search-criteria__item--ingredient')) return 'ingredient';
  if (criteria.classList.contains('search-criteria__item--appliance')) return 'appliance';
  return 'ustensil';
};

const doesNotMatchCriteria = (listType, normalizedText, ingredients, appliance, ustensils) => {
  if (listType === 'ingredient' && !ingredients.includes(normalizedText)) return true;
  if (listType === 'appliance' && appliance !== normalizedText) return true;
  if (listType === 'ustensil' && !ustensils.includes(normalizedText)) return true;
  return false;
};

function shouldDisplayRecipe(recipe, index, searchCriteria, recipeData, filteredRecipeCards) {
  if (filteredRecipeCards !== null) {
    return filteredRecipeCards.includes(recipe);
  }

  const currentRecipeData = recipeData[index];
  const ingredients = currentRecipeData.ingredients.map(ingredient => normalizeString(ingredient.ingredient));
  const appliance = normalizeString(currentRecipeData.appliance);
  const ustensils = currentRecipeData.ustensils.map(ustensil => normalizeString(ustensil));

  return !Array.from(searchCriteria).some(criteria => {
    const listType = getListType(criteria);
    const text = criteria.textContent.trim();
    const normalizedText = normalizeString(text);

    return doesNotMatchCriteria(listType, normalizedText, ingredients, appliance, ustensils);
  });
}

export function updateRecipeDisplay(filterDropdowns = false, filteredRecipeCards = null) {
  const searchCriteria = document.querySelectorAll('.search-criteria__item');
  const recipes = document.querySelectorAll('.recipe-card');
  const recipeData = getRecipeData();
  const filteredRecipes = [];

  recipes.forEach((recipe, index) => {
    const shouldDisplay = shouldDisplayRecipe(recipe, index, searchCriteria, recipeData, filteredRecipeCards);

    recipe.style.display = shouldDisplay ? '' : 'none';
    shouldDisplay && filteredRecipes.push(recipeData[index]);
  });

  const noFoundMessage = document.getElementById('no-found-message');
  const noRecipesFound = filteredRecipeCards && filteredRecipeCards.length === 0;

  noFoundMessage && (noFoundMessage.style.display = noRecipesFound ? '' : 'none');
  noRecipesFound && generateNoRecipesFoundMessage();
  if (noRecipesFound) {
    const openedDropdowns = document.querySelectorAll('.dropdown');
    openedDropdowns.forEach(dropdown => {
      closeOpenedDropdown({ currentTarget: dropdown });
    });
  }

  // Appel de toggleInputsDisabled pour désactiver les inputs si aucun élément ne correspond à la recherche
  toggleInputsDisabled(noRecipesFound);

  filterDropdowns && updateDropdownLists(filteredRecipes);

  updateAvailableCriteria(filteredRecipes.map(recipe => {
    return {
      id: parseInt(recipe.id),
      ingredients: recipe.ingredients,
      appliance: recipe.appliance,
      ustensils: recipe.ustensils,
    };
  }));
}