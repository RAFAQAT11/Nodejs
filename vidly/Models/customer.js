const Joi = require("joi");
const Mongoose = require("mongoose");

const Customer = Mongoose.model(
  "Customer",
  new Mongoose.Schema({
    name: {
      type: String,
      minlength: 5,
      maxlength: 50,
      required: true
    },
    phone: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 15
    },
    isGold: {
      type: Boolean,
      default: false
    }
  })
);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(8)
      .max(50)
      .required(),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
