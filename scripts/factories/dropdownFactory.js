export function createDropdownButton(type) {
  const dropdown = document.createElement('div');
  dropdown.classList.add('dropdown');

  const toggleButton = document.createElement('input');
  toggleButton.setAttribute('type', 'button');
  toggleButton.classList.add(`dropdown__toggle`, `dropdown__toggle--${type}`);
  toggleButton.setAttribute('value', `${type === 'ingredients' ? 'Ingrédients' : type === 'appliances' ? 'Matériels' : 'Ustensiles'}`);

  const label = document.createElement('label');
  label.setAttribute('for', `sort-by-${type}`);
  label.classList.add('dropdown__label');

  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-chevron-down', 'dropdown__icon');

  const menu = document.createElement('ul');
  menu.setAttribute('id', `sort-by-${type}`);
  menu.classList.add(`dropdown__menu`, `dropdown__menu--${type}`);

  dropdown.appendChild(toggleButton);
  label.appendChild(icon);
  dropdown.appendChild(label);
  dropdown.appendChild(menu);

  return dropdown;
}

export function createIngredientList(ingredients, menu) {
  menu.innerHTML = '';

  ingredients.forEach(ingredient => {
    const listItem = document.createElement('li');
    listItem.classList.add('dropdown__menu-item');
    listItem.innerText = ingredient.original; // Utilise les données originales
    menu.appendChild(listItem);
  });
}

export function createUstensilList(ustensils, menu) {
  menu.innerHTML = '';

  ustensils.forEach(ustensil => {
    const listItem = document.createElement('li');
    listItem.classList.add('dropdown__menu-item');
    listItem.innerText = ustensil.original; // Utilise les données originales
    menu.appendChild(listItem);
  });
}

export function createApplianceList(appliances, menu) {
  menu.innerHTML = '';

  appliances.forEach(appliance => {
    const listItem = document.createElement('li');
    listItem.classList.add('dropdown__menu-item');
    listItem.innerText = appliance.original; // Utilise les données originales
    menu.appendChild(listItem);
  });
}