export function addDropdownEvents() {
    // Ajouter des événements click pour ouvrir et fermer les dropdowns
    const ingredientsDropdown = document.querySelector('.dropdown__toggle--ingredients');
    const appliancesDropdown = document.querySelector('.dropdown__toggle--appliances');
    const ustensilsDropdown = document.querySelector('.dropdown__toggle--ustensils');
    const ingredientsMenu = document.querySelector('.dropdown__menu--ingredients');
    const appliancesMenu = document.querySelector('.dropdown__menu--appliances');
    const ustensilsMenu = document.querySelector('.dropdown__menu--ustensils');

    function toggleInputType(input, menu) {
        if (input.type === 'button') {
            input.type = 'text';
            input.value = '';
            input.placeholder = `Rechercher par ${menu}`;
        } else {
            input.type = 'button';
            input.value = menu;
            input.placeholder = '';
        }
    }

    function closeOtherMenus(currentMenu, currentDropdown) {
        const menus = [ingredientsMenu, appliancesMenu, ustensilsMenu];
        const dropdowns = [ingredientsDropdown, appliancesDropdown, ustensilsDropdown];
        menus.forEach((menu, index) => {
            if (menu !== currentMenu && menu.classList.contains('dropdown__menu--active')) {
                menu.classList.remove('dropdown__menu--active');
                toggleInputType(dropdowns[index], currentDropdown.value);
            }
        });
    }

    ingredientsDropdown.addEventListener('click', () => {
        closeOtherMenus(ingredientsMenu, ingredientsDropdown);
        ingredientsMenu.classList.toggle('dropdown__menu--active');
        toggleInputType(ingredientsDropdown, 'Ingrédients');
    });

    appliancesDropdown.addEventListener('click', () => {
        closeOtherMenus(appliancesMenu, appliancesDropdown);
        appliancesMenu.classList.toggle('dropdown__menu--active');
        toggleInputType(appliancesDropdown, 'Appareils');
    });

    ustensilsDropdown.addEventListener('click', () => {
        closeOtherMenus(ustensilsMenu, ustensilsDropdown);
        ustensilsMenu.classList.toggle('dropdown__menu--active');
        toggleInputType(ustensilsDropdown, 'Ustensiles');
    });
}