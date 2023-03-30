import { addUniqueListItem } from "../utils/dropdownListUtils.js";

export function updateDropdownLists(filteredRecipes) {
  const filteredIngredients = new Set();
  const filteredAppliances = new Set();
  const filteredUstensils = new Set();

  // Parcourir les recettes filtrées et ajouter les éléments uniques
  filteredRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => filteredIngredients.add(ingredient.ingredient));
    filteredAppliances.add(recipe.appliance);
    recipe.ustensils.forEach(ustensil => filteredUstensils.add(ustensil));
  });

  // Mettre à jour les listes déroulantes en fonction des éléments filtrés
  updateDropdownList(document.getElementById("sort-by-ingredients"), filteredIngredients);
  updateDropdownList(document.getElementById("sort-by-appliances"), filteredAppliances);
  updateDropdownList(document.getElementById("sort-by-ustensils"), filteredUstensils);
}

function updateDropdownList(list, filteredItems) {
  const listItems = list.querySelectorAll('li');
  listItems.forEach(item => {
    const originalItem = item.getAttribute('data-original-name');
    item.style.display = filteredItems.has(originalItem) ? '' : 'none';
  });
}

function clearDropdownList(dropdownList) {
  const listItems = dropdownList.querySelectorAll('li:not(.dropdown__item--default)');

  listItems.forEach(item => {
    item.remove();
  });
}

export function updateAvailableCriteria(filteredRecipes) {
  const ingredientsList = document.getElementById("sort-by-ingredients");
  const appliancesList = document.getElementById("sort-by-appliances");
  const ustensilsList = document.getElementById("sort-by-ustensils");

  // Nettoyer les listes déroulantes existantes
  clearDropdownList(ingredientsList);
  clearDropdownList(appliancesList);
  clearDropdownList(ustensilsList);

  // Remplir les listes avec les éléments des recettes affichées
  filteredRecipes.forEach(recipe => {
    if (recipe) {
      recipe.ingredients.forEach(ingredient => {
        const text = ingredient.ingredient;
        addUniqueListItem(ingredientsList, text, 'ingredient');
      });

      const appliance = recipe.appliance;
      addUniqueListItem(appliancesList, appliance, 'appliance');

      recipe.ustensils.forEach(ustensil => {
        const text = ustensil;
        addUniqueListItem(ustensilsList, text, 'ustensil');
      });
    }
  });
}