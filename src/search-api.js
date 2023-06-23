import axios from 'axios';

export class SearchApi {
  page = 1;
  query = null;
  async getImages(query) {
    const BASE_URl = 'https://pixabay.com/api/';
    const API_KEY = '37626526-981480af389493ca84731da49';
    const filter = `?key=${API_KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    const URL = `${BASE_URl}${filter}`;
    this.page += 1;
    try {
      const responce = await axios.get(URL);
      return responce.data;
    } catch (error) {
      console.log(error);
    }
  }
}
