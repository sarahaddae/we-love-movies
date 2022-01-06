const knex = require("../db/connection");
//const mapProperties = require("../utils/map-properties");

async function list(movie_id) {
  return knex("theaters")
    .modify((queryBuilder) => {
      if (movie_id) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies_theaters.theater_id",
            "theaters.theater_id"
          )
          .where({ "movies_theaters.movie_id": movie_id });
      }
    })
    .then((theaters) => {
      if (movie_id) {
        return theaters;
      }
      return Promise.all(theaters.map(setMovies));
    });
}

async function setMovies(theater) {
  theater.movies = await knex("movies")
    .join("movies_theaters", "movies_theaters.movie_id", "movies.movie_id")
    .where({ "movies_theaters.theater_id": theater.theater_id });
  return theater;
}


module.exports = {
  list,
};