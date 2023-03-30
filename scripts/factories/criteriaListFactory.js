export function createSearchCriteriaList(listType) {
    const searchCriteriaDiv = document.querySelector('.search-criteria');
    let searchCriteriaList = searchCriteriaDiv.querySelector(`.search-criteria__list--${listType}`);

    // Vérifie si la div existante est trouvée
    if (!searchCriteriaList) {
        // Si la liste n'existe pas, créer une nouvelle liste avec la classe appropriée
        searchCriteriaList = document.createElement('ul');
        searchCriteriaList.classList.add('search-criteria__list');
        searchCriteriaList.classList.add(`search-criteria__list--${listType}`);
        searchCriteriaDiv.appendChild(searchCriteriaList);

        // Ordonne les listes dans l'ordre ingrédients > appareils > ustensiles
        const ingredientsList = searchCriteriaDiv.querySelector('.search-criteria__list--ingredient');
        const appliancesList = searchCriteriaDiv.querySelector('.search-criteria__list--appliance');
        const ustensilsList = searchCriteriaDiv.querySelector('.search-criteria__list--ustensil');

        if (ingredientsList) {
            searchCriteriaDiv.appendChild(ingredientsList);
        }
        if (appliancesList) {
            searchCriteriaDiv.appendChild(appliancesList);
        }
        if (ustensilsList) {
            searchCriteriaDiv.appendChild(ustensilsList);
        }
    }
    return searchCriteriaList;
}