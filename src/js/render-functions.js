export function clearGallery(container) {
  container.innerHTML = '';
}

export function renderImages(images, container, lightbox) {
  const markup = images
    .map(
      image => `
        <a href="${image.largeImageURL}" class="gallery-link">
          <div class="card">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            <div class="card-info">
              <span>Likes: ${image.likes}</span>
              <span>Views: ${image.views}</span>
              <span>Comments: ${image.comments}</span>
              <span>Downloads: ${image.downloads}</span>
            </div>
          </div>
        </a>`
    )
    .join('');

  container.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh(); // Оновлення SimpleLightbox
}
