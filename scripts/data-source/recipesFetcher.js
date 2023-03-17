import { createRecipeCard } from "../factories/recipesFactory.js";
import { createListItem } from "../factories/dropdownFactory.js";

fetch('../../data/recipes.json')
  .then(response => response.json())
  .then(data => {
    // Créer les éléments de la liste d'ingrédients
    const ingredientsList = document.getElementById("sort-by-ingredients");
    data.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        const option = createListItem(ingredient.ingredient);
        ingredientsList.appendChild(option);
      });
    });

    // Créer les éléments de la liste d'appareils
    const appliancesList = document.getElementById("sort-by-appliances");
    data.forEach(recipe => {
      const option = createListItem(recipe.appliance);
      appliancesList.appendChild(option);
    });

    // Créer les éléments de la liste d'ustensiles
    const utensilsList = document.getElementById("sort-by-utensils");
    data.forEach(recipe => {
      recipe.ustensils.forEach(utensil => {
        const option = createListItem(utensil);
        utensilsList.appendChild(option);
      });
    });

    // Créer les cartes de recettes
    const recipesContainer = document.querySelector('.recipes-container');
    data.forEach(recipe => {
      const recipeCard = createRecipeCard(recipe);
      recipesContainer.appendChild(recipeCard);
    });
  })
  .catch(error => console.log(error));