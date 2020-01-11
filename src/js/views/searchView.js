import { elements } from './base';

//getting input field value
export const getInput = () => elements.searchInput.value;

//clearing input field value
export const clearInput = () => {
  elements.searchInput.value = '';
};

//clearing results field
export const clearResults = () => {
  elements.searchResList.innerHTML = '';
};

//shortening the recipe's title length
export const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];

  if (title.length > limit) {
    title.split('').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    return `${newTitle.join('')}...`;
  }

  return title;
};

//function to render html of each recipe
const renderRecipe = pr => {
  const markUp = `
                <li>
                    <a class="results__link" href="#${pr.recipe.uri}">
                        <figure class="results__fig">
                            <img src="${pr.recipe.image}" alt="${
    pr.recipe.label
  }">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(
                              pr.recipe.label
                            )}</h4>
                            <p class="results__author">${pr.recipe.source}</p>
                        </div>
                    </a>
                </li>
                `;
  elements.searchResList.insertAdjacentHTML('beforeend', markUp);
};
export const renderResults = recipes => {
  recipes.forEach(renderRecipe);
};
