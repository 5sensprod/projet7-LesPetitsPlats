import { generateCriteriaList } from './recipe-ui.js';

export function addDropdownEvents() {
    const dropdownToggles = [
        { selector: '.dropdown__toggle--ingredients', label: 'Ingrédients' },
        { selector: '.dropdown__toggle--appliances', label: 'Appareils' },
        { selector: '.dropdown__toggle--ustensils', label: 'Ustensiles' },
    ];
    const dropdownMenus = dropdownToggles.map(toggle => document.querySelector(toggle.selector.replace('toggle', 'menu')));

    function toggleInput(input, label) {
        const isButton = input.type === 'button';
        input.type = isButton ? 'text' : 'button';
        input.value = isButton ? '' : label;
        input.placeholder = isButton ? `Rechercher par ${label}` : '';
    }

    function closeOtherMenus(currentMenu) {
        dropdownMenus.forEach(menu => {
            if (menu !== currentMenu && menu.classList.contains('dropdown__menu--active')) {
                menu.classList.remove('dropdown__menu--active');
                const toggleIndex = dropdownMenus.indexOf(menu);
                const toggle = document.querySelector(dropdownToggles[toggleIndex].selector);
                if (toggle.type === 'text') {
                    toggleInput(toggle, dropdownToggles[toggleIndex].label);
                }
            }
        });
    }

    dropdownToggles.forEach(({ selector, label }, index) => {
        const toggle = document.querySelector(selector);
        const menu = dropdownMenus[index];

        toggle.addEventListener('click', () => {
            closeOtherMenus(menu);
            menu.classList.toggle('dropdown__menu--active');
            toggleInput(toggle, label);

            const allDropdownToggles = document.querySelectorAll('.dropdown__toggle');
            allDropdownToggles.forEach(toggleElement => {
                if (toggleElement !== toggle) {
                    toggleElement.classList.remove('dropdown__toggle--active');
                }
            });
            toggle.classList.toggle('dropdown__toggle--active');
        });
    });
}

function removeListItemAndCheckParent(listItem) {
    const parentList = listItem.parentElement;
    listItem.remove();

    // Vérifie si le parent 'ul' est vide après la suppression du 'listItem'
    if (parentList.childElementCount === 0) {
        parentList.remove();
    }
}
export function addClickEventToDropdownItem() {
    const ingredientListItems = document.querySelectorAll('.dropdown__menu--ingredients .dropdown__menu-item');
    ingredientListItems.forEach(item => {
        item.addEventListener('click', () => {
            const listItem = generateCriteriaList('ingredient', item.textContent);
            if (listItem !== null) {
                const closeIcon = listItem.querySelector('.search-criteria__close-icon');
                closeIcon.addEventListener('click', () => {
                    removeListItemAndCheckParent(listItem);
                });
            }
        });
    });

    const applianceListItems = document.querySelectorAll('.dropdown__menu--appliances .dropdown__menu-item');
    applianceListItems.forEach(item => {
        item.addEventListener('click', () => {
            const listItem = generateCriteriaList('appliance', item.textContent);
            if (listItem !== null) {
                const closeIcon = listItem.querySelector('.search-criteria__close-icon');
                closeIcon.addEventListener('click', () => {
                    removeListItemAndCheckParent(listItem);
                });
            }
        });
    });

    const ustensilListItems = document.querySelectorAll('.dropdown__menu--ustensils .dropdown__menu-item');
    ustensilListItems.forEach(item => {
        item.addEventListener('click', () => {
            const listItem = generateCriteriaList('ustensil', item.textContent);
            if (listItem !== null) {
                const closeIcon = listItem.querySelector('.search-criteria__close-icon');
                closeIcon.addEventListener('click', () => {
                    removeListItemAndCheckParent(listItem);
                });
            }
        });
    });
}
