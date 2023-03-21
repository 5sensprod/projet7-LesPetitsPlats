export function createCriteriaList(type, text) {
    const listItem = document.createElement('li');
    listItem.classList.add('search-criteria__item', `search-criteria__item--${type}`);
  
    const closeIcon = document.createElement('img');
    closeIcon.src = 'img/icon-close.svg';
    closeIcon.alt = 'close icon';
    closeIcon.classList.add('search-criteria__close-icon');
  
    listItem.textContent = text;
    listItem.appendChild(closeIcon);
  
    return listItem;
  }