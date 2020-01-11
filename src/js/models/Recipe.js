import axios from 'axios';
import { key, id } from '../config';

export default class Recipe {
  constructor(idRec) {
    //to encode idRec to the format accepted in the API's request for a recipe
    this.idRec = encodeURIComponent(idRec);
  }

  async getRecipe() {
    try {
      const res = await axios(
        `https://api.edamam.com/search?app_id=${id}&app_key=${key}&r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23${this.idRec}`
      );
      this.image = res.data[0].image;
      this.label = res.data[0].label;
      this.source = res.data[0].source;
      this.url = res.data[0].url;
      this.ingredients = res.data[0].ingredientLines;
      this.calories = res.data[0].calories;
      this.nutrientsFatLabel = res.data[0].totalNutrients.FAT.label;
      this.nutrientsFatQt = res.data[0].totalNutrients.FAT.quantity;
      this.nutrientsFatUn = res.data[0].totalNutrients.FAT.unit;
      this.nutrientsPROCNTLabel = res.data[0].totalNutrients.PROCNT.label;
      this.nutrientsPROCNTQt = res.data[0].totalNutrients.PROCNT.quantity;
      this.nutrientsPROCNTUn = res.data[0].totalNutrients.PROCNT.unit;
      this.nutrientsCHOCDFLabel = res.data[0].totalNutrients.CHOCDF.label;
      this.nutrientsCHOCDFQt = res.data[0].totalNutrients.CHOCDF.quantity;
      this.nutrientsCHOCDFUn = res.data[0].totalNutrients.CHOCDF.unit;
    } catch (err) {
      alert('error');
    }
  }

  calcTime() {
    // Assuming that we need 15 min for each 3 ingredients
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }
}
