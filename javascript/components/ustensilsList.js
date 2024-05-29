// @ts-nocheck
/**
 * Rassemble tous les ustensiles uniques à partir d'une liste de recettes.
 * @param {Array<Object>} recipes - La liste des recettes.
 * @returns {Array<string>} Un tableau contenant tous les ustensiles uniques en minuscules.
 */
const allUstensils = recipes.reduce((ustensils, recipe) => {
  for (const ustensil of recipe.ustensils) {
    const lowerCaseUstensil = ustensil.toLowerCase();
    if (!ustensils.includes(lowerCaseUstensil)) {
      ustensils.push(lowerCaseUstensil);
    }
  }
  return ustensils;
}, []);

/**
 * Extrait une liste des ustensiles uniques à partir des résultats de recettes.
 * @param {Array} results - Tableau d'objets représentant les recettes.
 * Chaque objet doit avoir une propriété `ustensils` qui est un tableau de chaînes de caractères.
 * @returns {Array<string>} - Tableau des noms d'ustensiles uniques en minuscules.
 */
function getUniqueUstensils(results) {
  const uniqueUstensils = results.reduce((ustensils, recipe) => {
    for (const ustensilObj of recipe.ustensils) {
      const lowerCaseUstensil = ustensilObj.toLowerCase();
      if (!ustensils.includes(lowerCaseUstensil)) {
        ustensils.push(lowerCaseUstensil);
      }
    }
    return ustensils;
  }, []);
  return uniqueUstensils;
}

const ustensilsListContainer = document.querySelector(".utensils-dd-list");

ustensilsListContainer.innerHTML = "";

if (selectedContainer.children.length === 0 && results.length === 0) {
  for (const ustensil of allUstensils) {
    const pElement = document.createElement("p");
    pElement.textContent = ustensil;
    pElement.onclick = () => {
      selectItem(this);
    };
    ustensilsListContainer.appendChild(pElement);
  }
} else {
  const uniqueUstensils = getUniqueUstensils(results);
  for (const ustensil of uniqueUstensils) {
    const pElement = document.createElement("p");
    pElement.textContent = ustensil;
    pElement.onclick = function () {
      selectItem(this);
    };
    ustensilsListContainer.appendChild(pElement);
  }
}
