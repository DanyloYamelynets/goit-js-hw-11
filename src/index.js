import axios from 'axios';
import Notiflix from 'notiflix';
import { SearchApi } from './search-api.js';

const refs = {
  searchForm: document.querySelector('.search-form'),
  searchBtn: document.querySelector('.search-button'),
  loadMoreBtn: document.querySelector('.load-more'),
  imgGallery: document.querySelector('.gallery'),
};

const searchImg = new SearchApi();

refs.loadMoreBtn.hidden = true;

// refs.searchBtn.addEventListener('click',);
refs.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value;
  const page = 1;
  refs.imgGallery.innerHTML = '';
  searchImg.getImages(query, page).then(data => {
    const markup = imagesMarkup(data.hits);
    refs.imgGallery.insertAdjacentHTML('beforeend', markup);
    renderImg(markup);
  });
  e.target.reset();
});

function imagesMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`;
      }
    )
    .join('');
}

function renderImg(markup) {
  refs.imgGallery.insertAdjacentHTML('beforeend', markup);
}
