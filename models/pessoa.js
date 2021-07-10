const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ModelSchema = new Schema(
  {
    nome: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    ativo: { type: Boolean, default: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Pessoa", ModelSchema);
