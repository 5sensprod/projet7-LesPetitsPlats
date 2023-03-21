import { createRecipeCard } from '../factories/recipeCardFactory.js';
import { createDropdownButton, createIngredientList, createUstensilList, createApplianceList } from '../factories/dropdownFactory.js';
import { createCriteriaList } from '../factories/criteriaFactory.js';
import { normalizeString, singularize, capitalizeFirstWord } from './stringUtils.js';

function getUniqueValues(arr, key) {
  const seen = new Set();
  const result = [];
  for (const item of arr) {
    if (!seen.has(item[key])) {
      seen.add(item[key]);
      result.push(item);
    }
  }
  return result.sort((a, b) => a[key].localeCompare(b[key]));
}

export function generateDropdowns() {
  // Générer les dropdowns
  const ingredientsDropdown = createDropdownButton('ingredients');
  const appliancesDropdown = createDropdownButton('appliances');
  const ustensilsDropdown = createDropdownButton('ustensils');

  // Ajouter les dropdowns à la page
  const dropdownContainer = document.querySelector('.dropdown-container');
  dropdownContainer.appendChild(ingredientsDropdown);
  dropdownContainer.appendChild(appliancesDropdown);
  dropdownContainer.appendChild(ustensilsDropdown);
}

export function generateDropdownLists(recipeData) {
  // Générer les listes déroulantes pour les dropdowns
  const ingredientsMenu = document.querySelector('.dropdown__menu--ingredients');
  const appliancesMenu = document.querySelector('.dropdown__menu--appliances');
  const ustensilsMenu = document.querySelector('.dropdown__menu--ustensils');

  const ingredients = [];
  const appliances = [];
  const ustensils = [];

  recipeData.forEach(recipe => {
    recipe.originalData.ingredients.forEach(ingredient => {
      ingredients.push({ original: ingredient.ingredient, normalized: singularize(normalizeString(ingredient.ingredient)) });
    });
    appliances.push({ original: recipe.originalData.appliance, normalized: normalizeString(recipe.originalData.appliance) });
    recipe.originalData.ustensils.forEach(ustensil => {
      ustensils.push({ original: ustensil, normalized: normalizeString(ustensil) });
    });
  });

  const uniqueIngredients = getUniqueValues(ingredients, 'normalized').map(ingredient => ({ ...ingredient, original: capitalizeFirstWord(ingredient.original) }));
  const uniqueAppliances = getUniqueValues(appliances, 'normalized').map(appliance => ({ ...appliance, original: capitalizeFirstWord(appliance.original) }));
  const uniqueUstensils = getUniqueValues(ustensils, 'normalized').map(ustensil => ({ ...ustensil, original: capitalizeFirstWord(ustensil.original) }));

  createIngredientList(uniqueIngredients, ingredientsMenu);
  createApplianceList(uniqueAppliances, appliancesMenu);
  createUstensilList(uniqueUstensils, ustensilsMenu);
}

export function generateRecipeCards(recipeData) {
  const recipesContainer = document.querySelector('.recipes-container');
  // Vider le conteneur de recettes
  recipesContainer.innerHTML = '';

  // Générer une carte de recette pour chaque recette
  recipeData.forEach(recipe => {
    const recipeCard = createRecipeCard(recipe);
    recipesContainer.appendChild(recipeCard);
  });
}

export function generateCriteriaList(type, text) {
  let criteriaList = document.querySelector(`.search-criteria__list--${type}`);

  // Si la liste n'existe pas, créez-la et ajoutez-la à la div.criteria-container
  if (!criteriaList) {
    criteriaList = document.createElement('ul');
    criteriaList.classList.add('search-criteria__list', `search-criteria__list--${type}`);
    const criteriaContainer = document.querySelector('.criteria-container');
    criteriaContainer.appendChild(criteriaList);
  }

  // Vérifiez si un élément avec le même texte existe déjà
  const existingItem = Array.from(criteriaList.children).find(item => item.textContent === text);
  if (existingItem) {
    // Si l'élément existe déjà, retournez null
    return null;
  }

  const listItem = createCriteriaList(type, text);
  criteriaList.appendChild(listItem);
  return listItem;
}