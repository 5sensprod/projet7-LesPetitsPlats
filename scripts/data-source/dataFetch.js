import { setRecipeData } from './dataShared.js';

export async function fetchData() {
    try {
      const response = await fetch('https://5sensprod.github.io/projet7-LesPetitsPlats/data/recipes.json');
      const data = await response.json();
      setRecipeData(data);
    } catch (error) {
      console.log(error);
    }
  }