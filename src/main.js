import { fetchImages } from './src/js/pixabay-api.js';
import { renderImages, clearGallery } from './src/js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('#load-more');
const loader = document.querySelector('#loader');

let lightbox = new SimpleLightbox('.gallery a');
let query = '';
let currentPage = 1;

searchForm.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  query = event.currentTarget.searchQuery.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }

  currentPage = 1; // Скидаємо пагінацію
  clearGallery(galleryContainer);
  toggleLoadMoreButton(false);

  try {
    const { hits, totalHits } = await fetchImages(query, currentPage);
    renderImages(hits, galleryContainer, lightbox);
    iziToast.success({
      title: 'Success',
      message: `Found ${totalHits} images!`,
    });

    if (totalHits > currentPage * 15) {
      toggleLoadMoreButton(true);
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
  }
}

async function onLoadMore() {
  currentPage += 1;
  toggleLoader(true);

  try {
    const { hits, totalHits } = await fetchImages(query, currentPage);
    renderImages(hits, galleryContainer, lightbox);

    if (currentPage * 15 >= totalHits) {
      toggleLoadMoreButton(false);
    }

    smoothScroll();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images.',
    });
  } finally {
    toggleLoader(false);
  }
}

function toggleLoadMoreButton(show) {
  loadMoreButton.classList.toggle('hidden', !show);
}

function toggleLoader(show) {
  loader.classList.toggle('hidden', !show);
}

function smoothScroll() {
  const { height: cardHeight } =
    galleryContainer.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
