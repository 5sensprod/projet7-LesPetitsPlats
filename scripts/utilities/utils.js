// Cette fonction ajoute un élément unique.

import { createListItem } from "../factories/dropdownFactory.js";

export function addUniqueListItem(list, textContent) {
    const existingItems = list.querySelectorAll(".dropdown__menu-item");
    //vérifie si un élément dans la liste a le même contenu que l'élément à ajouter.
    const isDuplicate = Array.from(existingItems).some(
      (item) => item.textContent === textContent
    );
  
    if (!isDuplicate) {
      const listItem = createListItem(textContent);
      list.appendChild(listItem);
    }
  }