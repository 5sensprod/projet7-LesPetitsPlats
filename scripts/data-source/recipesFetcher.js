/**
 * Récupère les données des recettes à partir du fichier recipes.json
 * utilise recipesFactory.js pour créer une carte de recette pour chaque élément.
 */

import { createRecipeCard } from "../factories/recipesFactory.js";
fetch('../../data/recipes.json')
  .then(response => response.json())
  .then(data => {
    const recipesContainer = document.querySelector('.recipes-container');
    data.forEach(recipe => {
      const recipeCard = createRecipeCard(recipe);
      recipesContainer.appendChild(recipeCard);
    });
  })
  .catch(error => console.log(error));
