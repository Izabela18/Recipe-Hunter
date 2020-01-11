export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchRes: document.querySelector('.results'),
  searchResList: document.querySelector('.results__list'),
  recipe: document.querySelector('.recipe'),
  likesMenu: document.querySelector('.likes__field'),
  likesList: document.querySelector('.likes__list')
};
export const loaderString = {
  loader: 'loader'
};

//creating loader while waiting for results
export const renderLoader = parent => {
  //dynamically assigns to .loader class
  const loader = `
      <div class="${loaderString.loader}">
        <svg>
          <use href="img/icons.svg#icon-cw"></use>
        </svg>
      </div>

   `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

//removing the loader after results rendered
export const clearLoader = () => {
  const loader = document.querySelector(`.${loaderString.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};
