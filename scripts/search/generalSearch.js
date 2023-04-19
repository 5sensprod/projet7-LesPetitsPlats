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
  // Initialise le compteur d'opérations pour mesurer les performances
  let operationCount = 0;
  // Enregistre le temps de début pour calculer la durée d'exécution
  const startTime = performance.now();

  // Etape 1 : Récupérer les données de recherche et recettes
  const searchInput = document.getElementById('search-input');
  const query = normalizeString(searchInput.value.trim());
  const searchCriteria = document.querySelectorAll('.search-criteria__item');
  operationCount += 3;

  // Etape 2 : Filtrer les recettes
  //Utiliser la méthode filter pour le filtrage des recettes
  const filteredRecipes = getRecipeData().filter(recipe => {
    operationCount++;
    const normalizedQuery = normalizeString(query);
    // Utiliser la méthode includes pour vérifier si la chaîne de caractères est présente dans une autre chaîne de caractères
    const matchesSearchQuery = query.length < 3 || normalizeString(recipe.name).includes(normalizedQuery) || recipe.ingredients.some(ingredient => normalizeString(ingredient.ingredient).includes(normalizedQuery)) || normalizeString(recipe.description).includes(normalizedQuery);
    operationCount += 4;

    const matchesSearchCriteria = Array.from(searchCriteria).every(criteria => {
      operationCount++;
      // Vérifier la correspondance entre la recette et le critère de recherche
      const listType = criteria.classList.contains('search-criteria__item--ingredient') ? 'ingredient'
        : criteria.classList.contains('search-criteria__item--appliance') ? 'appliance'
          : 'ustensil';
      const normalizedText = normalizeString(criteria.textContent.trim());
      operationCount += 2;

      const match = listType === 'ingredient' ? recipe.ingredients.some(ingredient => {
        operationCount++;
        return ingredient.ingredient === normalizedText;
      }) : listType === 'appliance' ? recipe.appliance === normalizedText : recipe.ustensils.some(ustensil => {
        operationCount++;
        return ustensil === normalizedText;
      });
      operationCount++;
      return match;
    });
    operationCount++;
    // Retourne true si la recette correspond à la recherche, false sinon
    return matchesSearchQuery && matchesSearchCriteria;
  });
  operationCount++;
  
  // Etape 3 : Mettre à jour l'affichage
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