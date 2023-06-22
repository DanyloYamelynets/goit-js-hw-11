import Notiflix from 'notiflix';
import { SearchApi } from './search-api.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  imgGallery: document.querySelector('.gallery'),
};

let lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const searchImg = new SearchApi();

refs.loadMoreBtn.hidden = true;

refs.searchForm.addEventListener('submit', onSubmitForm);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSubmitForm(e) {
  e.preventDefault();
  refs.loadMoreBtn.hidden = true;
  const query = e.target.elements.searchQuery.value;
  refs.imgGallery.innerHTML = '';
  searchImg.page = 1;
  searchImg.query = query;
  try {
    const data = await searchImg.getImages(query);
    if (data.totalHits < 40) {
      refs.loadMoreBtn.hidden = true;
    } else refs.loadMoreBtn.hidden = false;

    if (!data.hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    const markup = imagesMarkup(data.hits);
    if (data.totalHits) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
    renderImg(markup);
  } catch (error) {
    console.log(error);
  }
  e.target.reset();
}

async function onLoadMore() {
  try {
    const data = await searchImg.getImages();
    if (data.totalHits < 40) {
      refs.loadMoreBtn.hidden = true;
    } else refs.loadMoreBtn.hidden = false;

    if (!data.hits.length) {
      refs.loadMoreBtn.hidden = true;
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
    const markup = imagesMarkup(data.hits);
    renderImg(markup);
  } catch (error) {
    console.log(error);
  }
}

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
        <img src="${webformatURL}" alt="${tags}" width='300' loading="lazy" />
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
  lightbox.refresh();
}
