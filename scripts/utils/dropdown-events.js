export function addDropdownEvents() {
    // Ajouter des événements click pour ouvrir et fermer les dropdowns
    const ingredientsDropdown = document.querySelector('.dropdown__toggle--ingredients');
    const appliancesDropdown = document.querySelector('.dropdown__toggle--appliances');
    const ustensilsDropdown = document.querySelector('.dropdown__toggle--ustensils');
    const ingredientsMenu = document.querySelector('.dropdown__menu--ingredients');
    const appliancesMenu = document.querySelector('.dropdown__menu--appliances');
    const ustensilsMenu = document.querySelector('.dropdown__menu--ustensils');

    ingredientsDropdown.addEventListener('click', () => {
        ingredientsMenu.classList.toggle('dropdown__menu--active');
    });

    appliancesDropdown.addEventListener('click', () => {
        appliancesMenu.classList.toggle('dropdown__menu--active');
    });

    ustensilsDropdown.addEventListener('click', () => {
        ustensilsMenu.classList.toggle('dropdown__menu--active');
    });
}
