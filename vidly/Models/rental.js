const mongoose = require("mongoose");
const Joi = require("joi");
const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          minlength: 5,
          maxlength: 255,
          required: true
        },
        isGold: {
          type: Boolean,
          default: false
        },
        phone: {
          type: String,
          minlength: 8,
          maxlength: 50,
          required: true
        }
      }),
      required: true
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          minlength: 5,
          maxlength: 255,
          trim: true,
          required: true
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255
        }
      }),
      required: true
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now
    },
    dateReturned: {
      type: Date
    },
    rentalFee: {
      type: Number,
      min: 0
    }
  })
);

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  return Joi.validate(rental, schema);
}

exports.validateRental = validateRental;
exports.Rental = Rental;
