export class SearchApi {
  getImages(query, page) {
    const BASE_URl = 'https://pixabay.com/api/';
    const API_KEY = '37626526-981480af389493ca84731da49';
    const filter = `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
    const URL = `${BASE_URl}${filter}`;
    return fetch(URL).then(res => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    });
  }
}
