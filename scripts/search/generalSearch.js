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

// Filtre les recettes en utilisant une approche fonctionnelle (sans boucles)
export function filterRecipes() {
  const startTime = performance.now();
  const searchInput = document.getElementById('search-input');
  const query = normalizeString(searchInput.value.trim());
  const searchCriteria = document.querySelectorAll('.search-criteria__item');

  // Utilise la méthode .filter() pour filtrer les recettes en fonction des critères de recherche
  const filteredRecipes = getRecipeData().filter(recipe => {
    const normalizedQuery = normalizeString(query);
    const matchesSearchQuery = query.length < 3 || normalizeString(recipe.name).includes(normalizedQuery) || recipe.ingredients.some(ingredient => normalizeString(ingredient.ingredient).includes(normalizedQuery)) || normalizeString(recipe.description).includes(normalizedQuery);
    //console.log sur name
    // console.log(recipe.name);
    const matchesSearchCriteria = Array.from(searchCriteria).every(criteria => {
      const listType = criteria.classList.contains('search-criteria__item--ingredient') ? 'ingredient'
        : criteria.classList.contains('search-criteria__item--appliance') ? 'appliance'
          : 'ustensil';
      const normalizedText = normalizeString(criteria.textContent.trim());
      return listType === 'ingredient' ? recipe.ingredients.some(ingredient => ingredient.ingredient === normalizedText) : listType === 'appliance' ? recipe.appliance === normalizedText : recipe.ustensils.some(ustensil => ustensil === normalizedText);
    });
    return matchesSearchQuery && matchesSearchCriteria;
  });

  const filteredRecipeCards = getRecipeCardElementsFromData(filteredRecipes);
  updateRecipeDisplay(false, filteredRecipeCards);
  updateDropdownLists(filteredRecipes);
  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log('Durée d\'exécution :', duration, 'ms');
}
