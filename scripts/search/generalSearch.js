import { normalizeString } from '../utils/stringUtils.js';
import { updateDropdownLists } from '../handlers/dropdownUpdates.js';
import { getRecipeDataById } from '../data-source/sharedData.js';

// Fonction principale pour rechercher et filtrer les recettes
export function searchRecipes() {
  const recipes = document.querySelectorAll('.recipe-card');
  const searchInput = document.getElementById('search-input');

  // Ajout d'un écouteur d'événements pour réagir aux changements dans la recherche
  searchInput.addEventListener('input', () => {
    const query = normalizeString(searchInput.value.trim());

    if (query.length >= 3) {
      // Utilisation de la méthode 'filter' pour filtrer les recettes en fonction de la recherche
      // L'approche fonctionnelle permet de ne pas modifier le tableau d'origine et de renvoyer un nouveau tableau
      const filteredRecipes = Array.from(recipes).filter(recipe => {
        const title = normalizeString(recipe.querySelector('.recipe-card__title').textContent);
        const ingredients = normalizeString(recipe.querySelector('.recipe-card__ingredients').textContent);
        const description = normalizeString(recipe.querySelector('.recipe-card__description').textContent);

        return title.includes(query) || ingredients.includes(query) || description.includes(query);
      });

      // Mise à jour de l'affichage des recettes en utilisant l'approche fonctionnelle
      updateRecipeDisplay(filteredRecipes);

      // Utilisation de la méthode 'map' pour récupérer les données des recettes filtrées
      // L'approche fonctionnelle permet de traiter chaque élément du tableau sans utiliser de boucles traditionnelles
      const filteredRecipesData = filteredRecipes.map(recipe => {
        const recipeId = parseInt(recipe.getAttribute('data-recipe-id'));
        return getRecipeDataById(recipeId);
      });

      // Mettre à jour les listes déroulantes en fonction des recettes filtrées
      updateDropdownLists(filteredRecipesData);

    } else {
      // Si la recherche est vide ou trop courte, affiche toutes les recettes
      updateRecipeDisplay(recipes);

      // Utilisation de la méthode 'map' pour récupérer les données de toutes les recettes
      // L'approche fonctionnelle permet de traiter chaque élément du tableau sans utiliser de boucles traditionnelles
      const allRecipeData = Array.from(recipes).map(recipe => {
        const recipeId = parseInt(recipe.getAttribute('data-recipe-id'));
        return getRecipeDataById(recipeId);
      });

      // Réinitialiser les listes des dropdowns avec les données de recettes d'origine
      updateDropdownLists(allRecipeData);
    }
  });
}

// Fonction pour mettre à jour l'affichage des recettes en utilisant l'approche fonctionnelle
function updateRecipeDisplay(recipesToShow) {
  const allRecipes = document.querySelectorAll('.recipe-card');

  // Utilisation de la méthode 'forEach' pour parcourir toutes les recettes et les masquer
  // Cette méthode fonctionnelle permet de traiter chaque élément du tableau sans utiliser de boucles traditionnelles
  allRecipes.forEach(recipe => {
    recipe.style.display = 'none';
  });

  // Utilisation de la méthode 'forEach' pour parcourir les recettes à afficher et les rendre visibles
  // Cette approche fonctionnelle garantit que les données d'origine ne sont pas modifiées
  recipesToShow.forEach(recipe => {
    recipe.style.display = '';
  });
}