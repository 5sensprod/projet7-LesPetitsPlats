export function normalizeString(str) {
  const accentTable = {
  };

  // Vérifier si la valeur entrée est une chaîne de caractères
  if (typeof str !== 'string') {
    console.error('normalizeString: La valeur entrée n\'est pas une chaîne de caractères:', str);
    return '';
  }

  // Normaliser la chaîne de caractères
  const normalizedStr = str
    .toLowerCase()
    .replace(/[À-ÿ]/g, (match) => accentTable[match] || match)
    .trim();

  // Convertir les nombres en chaînes de caractères
  if (!isNaN(normalizedStr)) {
    return normalizedStr.toString();
  }

  return normalizedStr;
}

export const compareStrings = (str1, str2) => {
  const normalizedStr1 = str1.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const normalizedStr2 = str2.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return normalizedStr1.includes(normalizedStr2);
};

export function singularize(word) {
  if (word.endsWith('s')) {
    return word.slice(0, -1);
  }
  return word;
}

export function capitalizeFirstWord(str) {
  const words = str.split(' ');
  const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  words[0] = firstWord;
  return words.join(' ');
}