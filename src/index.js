import './sass/main.scss';
import galleryTemplate from './templates/gallery-templates.hbs';
import NewsApiService from './js/apiService';
import LoadeMoreBtn from './js/load-more-btn';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.js-gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const loadMoreBtn = new LoadeMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(evt) {
  evt.preventDefault();

  newsApiService.query = evt.currentTarget.elements.query.value.trim();

  if (!newsApiService.query) {
    loadMoreBtn.hide();
    clearGalleryContainer();
  } else {
    loadMoreBtn.show();
    newsApiService.resetPage();
    clearGalleryContainer();
    fetchArticles();
  }
}

function scrollToButton() {
  refs.loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

async function fetchArticles() {
  loadMoreBtn.disable();
  try {
    await newsApiService.fetchArticles().then(hits => {
      galleryMarkup(hits);
      loadMoreBtn.enable();
      scrollToButton();
    });
  } catch (error) {
    console.log('Ошибка', error);
  }
}

function galleryMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', galleryTemplate(hits));
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}
