import { v4 as uuidv4 } from "uuid";

export function createMoviesModel(movies) {
  return {
    movies,
    update: function (movies) {
      this.movies = movies;
    },
    create: function ({ title }) {
      const movie = {
        title,
        id: uuidv4(),
      };
      this.movies.push(movie);
      return movie;
    },
    get: function () {
      return this.movies;
    },
  };
}
