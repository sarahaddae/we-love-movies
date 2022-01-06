const knex = require("../db/connection");
//const mapProperties = require("../utils/map-properties");
const tableName = "reviews";

async function destroy(review_id) {
  return knex(tableName).where({ review_id }).del();
}

async function list(movie_id) {
  return knex(tableName)
    .where({ movie_id })
    .then((reviews) => Promise.all(reviews.map(setCritic)));
}

async function read(review_id) {
  return knex(tableName).where({ review_id }).first();
}

async function readCritic(critic_id) {
  return knex("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return knex(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}


module.exports = {
  destroy,
  list,
  read,
  update,
};