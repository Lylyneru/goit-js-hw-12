import axios from 'axios';

const API_KEY = '47392920-efce9c2b3427e3353db7767ab';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function fetchImages(query, page = 1) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}`;

  try {
    const response = await axios.get(url);
    if (response.data.hits.length === 0) {
      throw new Error('No images found');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
