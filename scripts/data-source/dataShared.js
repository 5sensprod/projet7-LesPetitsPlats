import { normalizeString, singularize } from '../utils/stringUtils.js';

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

export function getUniqueValues(arr) {
    return Array.from(new Set(arr)).sort();
}
export function printRecipeData() {
    let ingredients = [];
    let appliances = [];
    let ustensils = [];
    recipeData.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredients.push(singularize(normalizeString(ingredient.ingredient)));
        });
        appliances.push(normalizeString(recipe.appliance));
        recipe.ustensils.forEach(ustensil => {
            ustensils.push(normalizeString(ustensil));
        });
    });
    const uniqueIngredients = getUniqueValues(ingredients);
    const uniqueAppliances = getUniqueValues(appliances);
    const uniqueustensils = getUniqueValues(ustensils);
    console.log('Ingrédients:');
    uniqueIngredients.forEach(ingredient => console.log(ingredient));
    console.log('\nAppareils:');
    uniqueAppliances.forEach(appliance => console.log(appliance));
    console.log('\nUstensiles:');
    uniqueustensils.forEach(ustensil => console.log(ustensil));
}