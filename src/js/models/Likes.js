export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(idRec, label, image, source) {
    const like = { idRec, label, image, source };
    //mutate the array by pushing new likes
    this.likes.push(like);

    return like;
  }

  deleteLike(idRec) {
    const index = this.likes.findIndex(el => el.idRec === idRec);
    //delete the one which index is equal to idRec by splice method
    this.likes.splice(index, 1);
  }

  isLiked(idRec) {
    //if idRec is the one that is liked
    return this.likes.findIndex(el => el.idRec === idRec) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }
}
