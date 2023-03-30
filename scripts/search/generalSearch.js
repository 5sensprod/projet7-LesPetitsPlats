import { normalizeString } from '../utils/stringUtils.js';

export function searchRecipes() {
  const recipes = document.querySelectorAll('.recipe-card');
  const searchInput = document.getElementById('search-input');

  // Utilisation d'un écouteur d'événements pour réagir aux changements de la recherche
  searchInput.addEventListener('input', () => {
    const query = normalizeString(searchInput.value.trim());

    if (query.length >= 3) {
      // Utilisation de la méthode 'filter' pour filtrer les recettes en fonction de la recherche
      // Cette méthode fonctionnelle ne modifie pas le tableau d'origine et renvoie un nouveau tableau
      const filteredRecipes = Array.from(recipes).filter(recipe => {
        const title = normalizeString(recipe.querySelector('.recipe-card__title').textContent);
        const ingredients = normalizeString(recipe.querySelector('.recipe-card__ingredients').textContent);
        const description = normalizeString(recipe.querySelector('.recipe-card__description').textContent);

        return title.includes(query) || ingredients.includes(query) || description.includes(query);
      });

      // Mise à jour de l'affichage des recettes avec les recettes filtrées
      updateRecipeDisplay(filteredRecipes);
    } else {
      // Si la recherche est vide ou trop courte, affiche toutes les recettes
      updateRecipeDisplay(recipes);
    }
  });
}

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