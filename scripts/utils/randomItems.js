import { getRecipeData } from '../data-source/sharedData.js';

export function getRandomItem(itemType) {
  const recipeData = getRecipeData();
  const randomRecipeIndex = Math.floor(Math.random() * recipeData.length);
  const randomRecipe = recipeData[randomRecipeIndex];

  let item;
  switch (itemType) {
    case 'title':
      {
        item = randomRecipe.name;
      }
      break;
    case 'ingredient':
      {
        const randomIngredientIndex = Math.floor(Math.random() * randomRecipe.ingredients.length);
        item = randomRecipe.ingredients[randomIngredientIndex].ingredient;
      }
      break;
    case 'appliance':
      {
        item = randomRecipe.appliance;
      }
      break;
    case 'ustensil':
      {
        const randomUstensilIndex = Math.floor(Math.random() * randomRecipe.ustensils.length);
        item = randomRecipe.ustensils[randomUstensilIndex];
      }
      break;
    default:
      throw new Error(`Invalid item type: ${itemType}`);
  }

  return item;
}

export function translateItemType(itemType) {
  switch (itemType) {
    case 'ingredient':
      return 'ingrédient';
    case 'appliance':
      return 'matériel';
    case 'ustensil':
      return 'ustensiles';
    default:
      return itemType;
  }
}