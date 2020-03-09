import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://cors-anywhere.herokuapp.com/https://www.livreeleve.com.br/api/catalog_system/pub/products/search/',
});

export default api;
