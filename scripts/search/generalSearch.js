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

  // Utiliser une boucle for...of pour parcourir toutes les recettes
  for (const recipe of recipeData) {
    const normalizedQuery = normalizeString(query);

    // Vérifier si la requête de recherche correspond aux recettes en utilisant des boucles natives
    const matchesSearchQuery = query.length < 3 ||
      normalizeString(recipe.name).includes(normalizedQuery) ||
      recipe.ingredients.some(ingredient => normalizeString(ingredient.ingredient).includes(normalizedQuery)) ||
      normalizeString(recipe.description).includes(normalizedQuery);

    let matchesSearchCriteria = true;

    // Utiliser une boucle for...of pour parcourir tous les critères de recherche
    for (const criteria of searchCriteria) {
      const listType = criteria.classList.contains('search-criteria__item--ingredient') ? 'ingredient'
        : criteria.classList.contains('search-criteria__item--appliance') ? 'appliance'
          : 'ustensil';

      const normalizedText = normalizeString(criteria.textContent.trim());

      // Vérifier si les critères de recherche correspondent aux recettes en utilisant des boucles natives
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
    }

    // Ajouter la recette aux recettes filtrées si elle correspond à la requête de recherche et aux critères de recherche
    if (matchesSearchQuery && matchesSearchCriteria) {
      filteredRecipes.push(recipe);
    }
  }

  // Mettre à jour l'affichage des recettes et les listes déroulantes en fonction des recettes filtrées
  const filteredRecipeCards = getRecipeCardElementsFromData(filteredRecipes);
  updateRecipeDisplay(false, filteredRecipeCards);
  updateDropdownLists(filteredRecipes);
}