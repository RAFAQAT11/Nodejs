const Joi = require("joi");
const Mongoose = require("mongoose");

const genreSchema = new Mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true
  }
})


const Genre = Mongoose.model(
  "Genre",
  genreSchema
);

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validateGenre = validateGenre;
