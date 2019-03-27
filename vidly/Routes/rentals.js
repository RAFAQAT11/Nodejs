const { Rental, validateRental } = require("../Models/rental");
const { Movie } = require("../Models/movie");
const { Customer } = require("../Models/customer");
const Mongoose = require("mongoose");
const express = require("express");
const auth = require("../Middlewares/auth");
const router = express.Router();
const Fawn = require("fawn");

Fawn.init(Mongoose);

router.get("/", async (req, res) => {
  const rental = await Rental.find().sort("-dateOut");
  res.send(rental);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
      .run();
    res.send(rental);
  } catch (ex) {
    res.status(500).send("something failed.");
  }
  //   rental = await rental.save();

  //   rental.numberInStock--;
  //   rental.save();
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  const customer = await Movie.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const rental = await Rental.findByIdAndUpdate(
    req.params.id,
    {
      customer: {
        _id: customer._id,
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate
      }
    },
    { new: true }
  );

  if (!rental)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(rental);
});

router.delete("/:id", auth, async (req, res) => {
  const rental = await Rental.findByIdAndDelete(req.params.id);

  if (!rental)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(rental);
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(rental);
});

module.exports = router;
