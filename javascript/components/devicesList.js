// @ts-nocheck
/**
 * Rassemble tous les appareils uniques à partir d'une liste de recettes.
 * @param {Array<Object>} recipes - La liste des recettes.
 * @returns {Array<string>} Un tableau contenant tous les appareils uniques.
 */
const allDevices = recipes.reduce((devices, recipe) => {
  if (!devices.includes(recipe.appliance.toLowerCase())) {
    devices.push(recipe.appliance.toLowerCase());
  }
  return devices;
}, []);

/**
 * Extrait une liste des appareils uniques à partir des résultats de recettes.
 * @param {Array} results - Tableau d'objets représentant les recettes. Chaque objet doit avoir une propriété `appliance` qui est une chaîne de caractères.
 * @returns {Array<string>} - Tableau des noms d'appareils uniques en minuscules.
 */
function getUniqueDevices(results) {
  const uniqueDevices = results.reduce((devices, recipe) => {
    if (!devices.includes(recipe.appliance.toLowerCase())) {
      devices.push(recipe.appliance.toLowerCase());
    }
    return devices;
  }, []);
  return uniqueDevices;
}

const devicesListContainer = document.querySelector(".devices-dd-list");
devicesListContainer.innerHTML = "";

if (selectedContainer.children.length === 0 && results.length === 0) {
  for (const device of allDevices) {
    const pElement = document.createElement("p");
    pElement.textContent = device;
    pElement.onclick = () => {
      selectItem(this);
    };
    devicesListContainer.appendChild(pElement);
  }
} else {
  const uniqueDevices = getUniqueIngredients(results);
  for (const device of uniqueDevices) {
    const pElement = document.createElement("p");
    pElement.textContent = device;
    pElement.onclick = function () {
      selectItem(this);
    };
    devicesListContainer.appendChild(pElement);
  }
}
