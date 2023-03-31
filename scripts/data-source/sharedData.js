import { normalizeString } from '../utils/stringUtils.js';

let recipeData = [];

export function setRecipeData(data) {

  recipeData = data.map(recipe => {
    // console.log(recipe);
    // Normaliser les noms des ingrédients, ustensiles et appareils
    const ingredients = recipe.ingredients.map(ingredient => {
      return { ...ingredient, ingredient: normalizeString(ingredient.ingredient) };
    });

    const ustensils = recipe.ustensils.map(ustensil => normalizeString(ustensil));

    const appliance = normalizeString(recipe.appliance);

    // Ajouter les données originales
    const originalData = { ingredients: recipe.ingredients, ustensils: recipe.ustensils, appliance: recipe.appliance };

    // Retourner la recette modifiée
    return { ...recipe, ingredients, ustensils, appliance, originalData };
  });
}

export function getRecipeData() {
  return recipeData;
}

// Fonction pour récupérer les données de recette par ID
export function getRecipeDataById(recipeId) {
  // Trouver l'objet de recette dans le tableau de recettes en utilisant l'ID
  const recipeDataItem = recipeData.find(recipe => recipe.id === recipeId);
  return recipeDataItem;
}