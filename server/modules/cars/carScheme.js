const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carScheme = new Schema({
    manufacturer: String,
    model: String,
    year: Number,
    mileage: Number,
    color: String,
    engine: Number,
    transmission: String,
    fuel: String,
    drive: String,
    condition: String,
    city: String,
    exchange: Boolean,
    price: Number,
    description: String,
    images: [String],
    date: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {versionKey: false});

const Car = mongoose.model("Car", carScheme);
const TmpCar = mongoose.model("TemporaryCar", carScheme);

module.exports = { Car, TmpCar };