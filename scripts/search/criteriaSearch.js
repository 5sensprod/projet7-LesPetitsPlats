import { normalizeString } from '../utils/stringUtils.js';
import { getRecipeData } from '../data-source/sharedData.js';
import { updateDropdownLists, updateAvailableCriteria } from '../handlers/dropdownUpdates.js';
import { generateNoRecipesFoundMessage, generateNoDropdownItemsFoundMessage } from '../utils/generator.js';

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

  filterDropdowns && updateDropdownLists(filteredRecipes);

  updateAvailableCriteria(filteredRecipes.map(recipe => {
    return {
      id: parseInt(recipe.id),
      ingredients: recipe.ingredients,
      appliance: recipe.appliance,
      ustensils: recipe.ustensils,
    };
  }));


  // Supprimer les anciens messages
  document.querySelectorAll('.no-dropdown-items-found-message').forEach(message => message.remove());

  // Ajout des appels pour afficher le message si aucun élément ne correspond à la recherche
  const ingredientsDropdown = document.querySelector('#sort-by-ingredients');
  const appliancesDropdown = document.querySelector('#sort-by-appliances');
  const ustensilsDropdown = document.querySelector('#sort-by-ustensils');

  if (!ingredientsDropdown.querySelector('li:not(.no-dropdown-items-found-message)')) {
    generateNoDropdownItemsFoundMessage('ingrédient', '#sort-by-ingredients');
  }

  if (!appliancesDropdown.querySelector('li:not(.no-dropdown-items-found-message)')) {
    generateNoDropdownItemsFoundMessage('appareil', '#sort-by-appliances');
  }

  if (!ustensilsDropdown.querySelector('li:not(.no-dropdown-items-found-message)')) {
    generateNoDropdownItemsFoundMessage('ustensile', '#sort-by-ustensils');
  }
}