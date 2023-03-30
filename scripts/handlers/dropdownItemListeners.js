import { displayInSearchCriteria } from "../search/criteriaSearchUI.js";

export function addDropdownItemClickListeners() {
  const ingredientsList = document.getElementById("sort-by-ingredients");
  const appliancesList = document.getElementById("sort-by-appliances");
  const ustensilsList = document.getElementById("sort-by-ustensils");

  // Gestion des événements pour chaque élément de liste
  ingredientsList.querySelectorAll(".dropdown__menu-item").forEach(listItem => {
    listItem.addEventListener('click', () => {
      displayInSearchCriteria(listItem.getAttribute('data-original-name'), 'ingredient');
    });
  });

  ustensilsList.querySelectorAll(".dropdown__menu-item").forEach(listItem => {
    listItem.addEventListener('click', () => {
      displayInSearchCriteria(listItem.getAttribute('data-original-name'), 'ustensil');
    });
  });

  appliancesList.querySelectorAll(".dropdown__menu-item").forEach(listItem => {
    listItem.addEventListener('click', () => {
      displayInSearchCriteria(listItem.getAttribute('data-original-name'), 'appliance');
    });
  });
}