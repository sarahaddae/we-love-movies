const TheatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const data = await TheatersService.list(req.params.movieId);
  res.json({ data });
 
}

module.exports = {
  list: asyncErrorBoundary(list),
};