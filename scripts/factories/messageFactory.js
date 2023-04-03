export function createNoFoundMessageFactory(message) {
  const noFoundMessage = document.createElement('span');
  noFoundMessage.id = 'no-found-message';
  noFoundMessage.className = 'no-found-message';
  noFoundMessage.style.display = 'none';
  noFoundMessage.textContent = message;

  return noFoundMessage;
}

export function createOnlyNoDropdownItemsFoundMessageFactory(itemType, randomItem) {
  const noFoundMessage = document.createElement('li');
  noFoundMessage.className = 'only-no-dropdown-items-found-message';
  noFoundMessage.style.display = 'none';
  noFoundMessage.textContent = `Aucun ${itemType} ne correspond à votre recherche ! Essayez ${randomItem}`;

  return noFoundMessage;
}