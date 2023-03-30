import { normalizeString } from '../utils/stringUtils.js';

// Fonction principale de recherche de recettes
export function searchRecipes() {
  // Sélectionne toutes les cartes de recettes
  const recipes = document.querySelectorAll('.recipe-card');
  // Sélectionne le champ de saisie de la recherche
  const searchInput = document.getElementById('search-input');

  // Ajoute un écouteur d'événement pour détecter les modifications de saisie de recherche
  searchInput.addEventListener('input', () => {
    // Normalise la chaîne de caractères de recherche
    const query = normalizeString(searchInput.value.trim());

    // Vérifie si la chaîne de recherche est suffisamment longue (au moins 3 caractères)
    if (query.length >= 3) {
      // Utilise une boucle native "for" pour parcourir toutes les recettes
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const title = normalizeString(recipe.querySelector('.recipe-card__title').textContent);
        const ingredients = normalizeString(recipe.querySelector('.recipe-card__ingredients').textContent);
        const description = normalizeString(recipe.querySelector('.recipe-card__description').textContent);

        // Vérifie si la recette correspond aux critères de recherche
        const isMatch = title.includes(query) || ingredients.includes(query) || description.includes(query);

        // Met à jour l'affichage de la recette en fonction de la correspondance
        if (isMatch) {
          recipe.style.display = '';
        } else {
          recipe.style.display = 'none';
        }
      }
    } else {
      // Si la recherche est vide ou trop courte, affiche toutes les recettes
      // Utilise une boucle native "for" pour parcourir toutes les recettes
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        recipe.style.display = '';
      }
    }
  });
}