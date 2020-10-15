const mongoose = require("mongoose");
const FileSchema = require("./utils/FileSchema");
const PointSchema = require("./utils/PointSchema");

const MedSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  idade: {
    type: Number,
    require: true,
    min: 1,
    max: 100,
  },
  genero: {
    type: String,
    require: true,
    lowercase: true,
  },
  especialidade: {
    type: String,
    // require: true,
    lowercase: true,
  },
  registro: {
    type: String,
    require: true,
  },
  convenio: {
    type: [String],
    require: true,
  },
  uf: {
    type: String,
    require: true,
  },
  cidade: {
    type: String,
    require: true,
  },
  endereco: {
    type: String,
    require: true,
  },
  tipoEndereco: {
    type: String,
    require: true,
    lowercase: true,
  },
  telefone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\(\d{2}\) [9]?\d{4}-\d{4}/.test(v);
      },
      message: "{VALUE} is not a valid phone number!",
    },
    required: [true, "User phone number required"],
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v);
      },
      message: "{VALUE} is not a valid email!",
    },
    unique: true,
    required: [true, "User email required"],
    lowercase: true,
  },
  bio: {
    type: String,
  },
  location: {
    type: PointSchema,
    index: "2dsphere",
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Med", MedSchema);
