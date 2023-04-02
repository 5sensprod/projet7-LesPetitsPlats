import { getRecipeData } from '../data-source/sharedData.js';

export function checkForResultsWithoutFilters(searchTerm) {
    const recipeData = getRecipeData();
    const searchTermLower = searchTerm.toLowerCase();
  
    return recipeData.some(recipe => {
      const recipeName = recipe.name.toLowerCase();
      const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
      const appliance = recipe.appliance.toLowerCase();
      const ustensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
  
      return (
        recipeName.includes(searchTermLower) ||
        ingredients.some(ingredient => ingredient.includes(searchTermLower)) ||
        appliance.includes(searchTermLower) ||
        ustensils.some(ustensil => ustensil.includes(searchTermLower))
      );
    });
  }

  export function areFiltersApplied() {
    const selectedIngredients = document.querySelectorAll('.selected-ingredient');
    const selectedAppliances = document.querySelectorAll('.selected-appliance');
    const selectedUstensils = document.querySelectorAll('.selected-ustensil');
  
    return (
      selectedIngredients.length > 0 ||
      selectedAppliances.length > 0 ||
      selectedUstensils.length > 0
    );
  }