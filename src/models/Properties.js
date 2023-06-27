const { Schema, model } = require('mongoose');

const PropertiesSchema = Schema({
    name: { type: String },
    description: { type: String },
    address: { type: String },
    operation: { type: String },
    coordinates: { type: [Number] },
    images: { type: [String] },
    kindOfProperty: { type: String },
    price: { type: String },
    city: { type: String },
    surface: { type: String },
    country: { type: String },
    inmobiliaria: { type: String}
})

module.exports = model("Property", PropertiesSchema, "properties")