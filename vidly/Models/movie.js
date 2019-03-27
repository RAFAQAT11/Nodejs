const { genreSchema } = require("./genre");
const Joi = require("joi");
const Mongoose = require("mongoose");

const Movie = Mongoose.model(
  "Movie",
  new Mongoose.Schema({
    title: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
      trim: true
    },
    genre: {
      type: genreSchema,
      required: true
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    }
  })
);

function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .min(5)
      .required(),
    genreId: Joi.objectId().required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .required(),
    numberInStock: Joi.number()
      .min(0)
      .required()
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
