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
  // Initialise le compteur d'opérations pour mesurer les performances
  let operationCount = 0;
  // Enregistre le temps de début pour calculer la durée d'exécution
  const startTime = performance.now();

  const searchInput = document.getElementById('search-input');
  const query = normalizeString(searchInput.value.trim());
  const searchCriteria = document.querySelectorAll('.search-criteria__item');
  const recipeData = getRecipeData();
  const filteredRecipes = [];
  operationCount += 4;

  let i = 0;
  while (i < recipeData.length) {
    operationCount++;
    const recipe = recipeData[i];
    const normalizedQuery = normalizeString(query);
    let matchesSearchQuery = query.length < 3 || normalizeString(recipe.name).includes(normalizedQuery) || recipe.ingredients.some(ingredient => normalizeString(ingredient.ingredient).includes(normalizedQuery)) || normalizeString(recipe.description).includes(normalizedQuery);
    operationCount += 4;

    let matchesSearchCriteria = true;
    let j = 0;
    while (j < searchCriteria.length) {
      operationCount++;
      const criteria = searchCriteria[j];
      const listType = criteria.classList.contains('search-criteria__item--ingredient') ? 'ingredient' : criteria.classList.contains('search-criteria__item--appliance') ? 'appliance' : 'ustensil';
      const normalizedText = normalizeString(criteria.textContent.trim());
      operationCount += 2;

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
      operationCount++;
    }

    i++;
  }

  const filteredRecipeCards = getRecipeCardElementsFromData(filteredRecipes);
  updateRecipeDisplay(false, filteredRecipeCards);
  updateDropdownLists(filteredRecipes);
  operationCount += 3;

  // Enregistre le temps de fin, calcule la durée d'exécution et affiche les résultats de performance et le nombre d'opérations
  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log('Durée d\'exécution :', duration, 'ms');
  console.log('Nombre d\'opérations :', operationCount);
}