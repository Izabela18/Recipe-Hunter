import { elements } from './base';
import { limitRecipeTitle } from './searchView';

//change css class on the clicked 'like' button
export const toggleLikeBtn = isLiked => {
  const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  document
    .querySelector('.recipe__love use')
    .setAttribute('href', `img/icons.svg#${iconString}`);
};

//display likes if they exist
export const toggleLikeMenu = numLikes => {
  elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

//render title and link of each liked recipe
export const renderLike = like => {
  const markup = `
        <li>
            <a class="likes__link" href="#${like.idRec}">
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.label)}</h4>
                    <p class="likes__author">${like.source}</p>
                </div>
            </a>
        </li>
    `;
  elements.likesList.insertAdjacentHTML('beforeend', markup);
};

//delete unliked
export const deleteLike = idRec => {
  const el = document.querySelector(`.likes__link[href*="${idRec}"]`)
    .parentElement;
  if (el) el.parentElement.removeChild(el);
};
