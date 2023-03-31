import { normalizeString } from '../utils/stringUtils.js';
import { updateDropdownLists } from '../handlers/dropdownUpdates.js';
import { getRecipeDataById } from '../data-source/sharedData.js';

// La fonction searchRecipes utilise une approche basée sur les boucles natives pour traiter les recettes
export function searchRecipes() {
  const recipes = document.querySelectorAll('.recipe-card');
  const searchInput = document.getElementById('search-input');

  searchInput.addEventListener('input', () => {
    const query = normalizeString(searchInput.value.trim());

    if (query.length >= 3) {
      const filteredRecipesData = [];

      // Utilisation d'une boucle native 'for' pour parcourir et filtrer les recettes
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const title = normalizeString(recipe.querySelector('.recipe-card__title').textContent);
        const ingredients = normalizeString(recipe.querySelector('.recipe-card__ingredients').textContent);
        const description = normalizeString(recipe.querySelector('.recipe-card__description').textContent);

        const isMatch = title.includes(query) || ingredients.includes(query) || description.includes(query);

        if (isMatch) {
          recipe.style.display = '';
          const recipeId = parseInt(recipe.getAttribute('data-recipe-id'));
          const recipeData = getRecipeDataById(recipeId);
          filteredRecipesData.push(recipeData);
        } else {
          recipe.style.display = 'none';
        }
      }

      updateDropdownLists(filteredRecipesData);

    } else {
      // Utilisation d'une boucle native 'for' pour réinitialiser l'affichage des recettes
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        recipe.style.display = '';
      }

      const allRecipeData = [];

      // Utilisation d'une boucle native 'for' pour récupérer les données de toutes les recettes
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const recipeId = parseInt(recipe.getAttribute('data-recipe-id'));
        const recipeData = getRecipeDataById(recipeId);
        allRecipeData.push(recipeData);
      }

      updateDropdownLists(allRecipeData);
    }
  });
}