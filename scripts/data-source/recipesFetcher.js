import { createRecipeCard } from "../factories/recipesFactory.js";
import { addUniqueListItem } from "../utilities/utils.js";

fetch('https://5sensprod.github.io/projet7-LesPetitsPlats/data/recipes.json')
  .then(response => response.json())
  .then(data => {
    // Créer les éléments de la liste d'ingrédients
    const ingredientsList = document.getElementById("sort-by-ingredients");
    data.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        addUniqueListItem(ingredientsList, ingredient.ingredient);
      });
    });

    // Créer les éléments de la liste d'appareils
    const appliancesList = document.getElementById("sort-by-appliances");
    data.forEach(recipe => {
      addUniqueListItem(appliancesList, recipe.appliance);
    });

    // Créer les éléments de la liste d'ustensiles
    const utensilsList = document.getElementById("sort-by-utensils");
    data.forEach(recipe => {
      recipe.ustensils.forEach(utensil => {
        addUniqueListItem(utensilsList, utensil);
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