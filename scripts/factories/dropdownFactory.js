// Factory pour créer un élément li de dropdown avec du texte donné en paramètre

export function createListItem(textContent) {
  const listItem = document.createElement("li");
  listItem.classList.add("dropdown__menu-item");
  listItem.textContent = textContent;
  return listItem;
}