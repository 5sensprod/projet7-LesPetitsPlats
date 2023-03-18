import { createRecipeCard } from "../factories/recipesFactory.js";
import { addUniqueListItem } from "../utilities/utils.js";
import { displayInSearchCriteria } from "../handlers/searchCriteria.js";

fetch('https://5sensprod.github.io/projet7-LesPetitsPlats/data/recipes.json')
  .then(response => response.json())
  .then(data => {
    // Créer les éléments de la liste d'ingrédients
    const ingredientsList = document.getElementById("sort-by-ingredients");

    // Créer les éléments de la liste d'appareils
    const appliancesList = document.getElementById("sort-by-appliances");

    // Créer les éléments de la liste d'ustensiles
    const utensilsList = document.getElementById("sort-by-utensils");

    // Créer les cartes de recettes
    const recipesContainer = document.querySelector('.recipes-container');

    data.forEach(recipe => {
      // Création des cartes de recettes
      const recipeCard = createRecipeCard(recipe);
      recipesContainer.appendChild(recipeCard);

      // Ajout des éléments uniques à chaque liste
      recipe.ingredients.forEach(ingredient => {
        addUniqueListItem(ingredientsList, ingredient.ingredient, 'ingredient');
      });

      recipe.ustensils.forEach(utensil => {
        addUniqueListItem(utensilsList, utensil, 'utensil');
      });

      addUniqueListItem(appliancesList, recipe.appliance, 'appliance');
    });

    // Gestion des événements pour chaque élément de liste
    ingredientsList.querySelectorAll(".dropdown__menu-item").forEach(listItem => {
      listItem.addEventListener('click', () => {
        displayInSearchCriteria(listItem.textContent, 'ingredient');
      });
    });

    utensilsList.querySelectorAll(".dropdown__menu-item").forEach(listItem => {
      listItem.addEventListener('click', () => {
        displayInSearchCriteria(listItem.textContent, 'utensil');
      });
    });

    appliancesList.querySelectorAll(".dropdown__menu-item").forEach(listItem => {
      listItem.addEventListener('click', () => {
        displayInSearchCriteria(listItem.textContent, 'appliance');
      });
    });
  })
  .catch(error => console.log(error));