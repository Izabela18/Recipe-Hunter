import Search from './models/Search';
import Recipe from './models/Recipe';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';

const state = {};

/**
 * SEARCH CONTROLLER
 */

const controlSearch = async () => {
  //1. get  query from view
  const query = searchView.getInput();

  if (query) {
    //2) create new search object and add to the state

    state.search = new Search(query);

    //3) UI prepares for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    //4) search for recipes, async always returns promise
    try {
      await state.search.getResults();

      //5) renders results on UI

      searchView.renderResults(state.search.result);
      clearLoader();
      //console.log(state.search.result);
    } catch (err) {
      alert('something went wrong with search');
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener('submit', e => {
  //prevents loading the page
  e.preventDefault();
  controlSearch();
});

/**
 * RECIPE CONTROLLER
 */

/*const r = new Recipe(
  //'http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_1b6dfeaf0988f96b187c7c9bb69a14fa'
  'recipe_1b6dfeaf0988f96b187c7c9bb69a14fa'
);
r.getRecipe();
console.log(r);*/

const controlRecipe = async () => {
  // Returning the anchor part of a URL
  const idRecipe = window.location.hash.replace('#', '');
  console.log(idRecipe);

  if (idRecipe) {
    //prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    //create new recipe object

    state.recipe = new Recipe(idRecipe);

    //get recipe data
    try {
      await state.recipe.getRecipe();
      console.log(state.recipe.ingredients);

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      //render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(idRecipe));
      console.log(state.recipe);
    } catch (err) {
      alert('Error processing recipe!');
    }
  }
};

//window.addEventListener('hashchange', controlRecipe);
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipe)
);

/**
 * LIKE CONTROLLER
 *
 */

state.likes = new Likes();
likesView.toggleLikeMenu(state.likes.getNumLikes());

const controlLike = () => {
  //create new Likes objects if one does not exist
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.idRec;

  // User has NOT yet liked current recipe
  if (!state.likes.isLiked(currentID)) {
    // Add like to the state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.label,
      state.recipe.source,
      state.recipe.image
    );
    // Toggle the like button
    likesView.toggleLikeBtn(true);

    // Add like to UI list
    likesView.renderLike(newLike);
    console.log(state.likes);

    // User HAS liked current recipe
  } else {
    // Remove like from the state
    state.likes.deleteLike(currentID);

    // Toggle the like button
    likesView.toggleLikeBtn(false);

    // Remove like from UI list
    likesView.deleteLike(currentID);
    console.log(state.likes);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.recipe__love, .recipe__love *')) {
    // Like controller
    controlLike();
  }
});
