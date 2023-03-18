export function displayInSearchCriteria(text, listType) {
  const searchCriteriaDiv = document.querySelector('.search-criteria');
  const searchCriteriaContainer = searchCriteriaDiv.querySelector(`.search-criteria__container--${listType}`);

  // Vérifie si la div existante est trouvée
  if (searchCriteriaContainer) {
    // Vérifie si le critère existe déjà dans la div
    const existingCriteria = searchCriteriaContainer.querySelectorAll('.search-criteria__item');
    const existingItem = Array.from(existingCriteria).find(item => item.textContent === text);
    if (existingItem) {
      // Si le critère existe déjà, ne faites rien
      return;
    }

    // Sinon, ajoutez simplement le critère à l'intérieur de la div
    const searchCriteriaItem = document.createElement('span');
    searchCriteriaItem.classList.add('search-criteria__item');
    searchCriteriaItem.textContent = text;
    searchCriteriaContainer.appendChild(searchCriteriaItem);

  } else {
    // Sinon, créez une nouvelle div avec la classe appropriée et ajoutez-y le critère
    const searchCriteriaContainer = document.createElement('div');
    searchCriteriaContainer.classList.add('search-criteria__container');
    searchCriteriaContainer.classList.add(`search-criteria__container--${listType}`);
    searchCriteriaDiv.appendChild(searchCriteriaContainer);

    const searchCriteriaItem = document.createElement('span');
    searchCriteriaItem.classList.add('search-criteria__item');
    searchCriteriaItem.textContent = text;
    searchCriteriaContainer.appendChild(searchCriteriaItem);

    const closeButton = document.createElement('img');
    closeButton.src = 'img/icon-close.svg';
    closeButton.alt = 'close icon';
    closeButton.classList.add('search-criteria__close-icon');
    closeButton.addEventListener('click', () => {
      searchCriteriaContainer.remove();
    });
    searchCriteriaContainer.appendChild(closeButton);
  }
}