import axios from 'axios';
import { key, id } from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const res = await axios(
        `https://api.edamam.com/search?q=${this.query}&app_id=${id}&app_key=${key}`
      );

      this.result = res.data.hits;
      console.log(this.result);
    } catch (eror) {
      alert(error);
    }
  }
}
