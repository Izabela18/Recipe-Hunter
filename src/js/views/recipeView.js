import { elements } from './base';

//clear the recipe view each time new is loaded
export const clearRecipe = () => {
  elements.recipe.innerHTML = '';
};

//function to render html of a single recipe
export const renderRecipe = (recipe, isLiked) => {
  const markup = `
    <figure class="recipe__fig">
                <img src="${recipe.image}" alt="${
    recipe.label
  }" class="recipe__img">
                <h1 class="recipe__label">
                    <span>${recipe.label}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${
                      recipe.time
                    }</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${
                      recipe.servings
                    }</span>
                    <span class="recipe__info-text"> servings</span>


                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${
                          isLiked ? '' : '-outlined'
                        }"></use>
                    </svg>
                </button>
            </div>



            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                <li class="recipe__item">           
                <div class="recipe__ingredient">
               
                ${recipe.ingredients
                  .toString()
                  .split(',')
                  .join('<br />')}
               
                              
            </div>
                </li>       
                   
                </ul>
                </div>

            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipe.source}</span>
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}">
                    <span class="button__title">Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
               
            </div>

            <h2 class="heading-2">Nutrients</h2>
            
                    
                

                <div class="nutrients-flex">

                <div class="nutrient-item">CAL
                ${recipe.calories.toFixed(2)}</div>

                
                    <div class="nutrient-item">${recipe.nutrientsFatLabel}
                   ${recipe.nutrientsFatQt.toFixed(2)}
                   ${recipe.nutrientsFatUn}</div>  
                         
                    
                    <div class="nutrient-item">${recipe.nutrientsCHOCDFLabel}
                   ${recipe.nutrientsCHOCDFQt.toFixed(2)}
                   ${recipe.nutrientsCHOCDFUn}</div>    
                       
                    <div class="nutrient-item">${recipe.nutrientsPROCNTLabel}
                   ${recipe.nutrientsPROCNTQt.toFixed(2)}
                   ${recipe.nutrientsPROCNTUn}</div>    
                     
                </div>
               
                

                


    `;
  elements.recipe.insertAdjacentHTML('afterbegin', markup);
};
