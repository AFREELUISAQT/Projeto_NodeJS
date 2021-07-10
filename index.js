const express = require("express");
const mongoose = require("mongoose");
const Pessoa = require("./models/pessoa");

const app = express();
const port = 5000;

app.use(express.json());

const mongoUrl = "mongodb://localhost:27017/bdpessoas";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "Erro de conectividade com MongoDB!")
);

app.get("/pessoas", async (req, res) => {
  const pessoa = await Pessoa.find({});
  res.json({ pessoa });
});

app.post("/pessoas/novo", async (req, res) => {
  try {
    console.log(req.body);
    const { nome } = req.body;
    const { dataNascimento } = req.body;
    const pessoa = new Pessoa({ nome, dataNascimento });
    await pessoa.save();
    res.send(`A pessoa "${pessoa.nome}" foi Cadastrada com Sucesso!`);
  } catch (error) {
    res.status(404).json({ msj: "Erro de Cadastro!" });
    console.log("Erro de Cadastro!");
  }
});

app.get("/pessoas/:id", async (req, res) => {
  try {
    const pessoa = await Pessoa.findById(req.params.id);
    res.json({ pessoa });
  } catch (error) {
    res.status(404).json({ msj: "Dados Não Existentes!" });
    console.log("Dados Não Existentes!");
  }
});

app.put("/pessoas/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    if (id && data) {
      await Pessoa.findByIdAndUpdate(id, data);
      console.log("Dados Atualizados com Sucesso!");
      res.send("Dados Atualizados com Sucesso!");
    } else {
      res.json("Dados Não Existentes!");
    }
  } catch (error) {
    res.status(404).json({ msj: "Dados Não Existentes" });
    console.log("Dados Não Existentes!");
  }
});

app.delete("/pessoas/:id", async (req, res) => {
  try {
    await Pessoa.deleteOne({ _id: req.params.id }, () => {
      console.log("Pessoa Eliminada com Sucesso!");
    });
    res.send("Pessoa Eliminada com Sucesso!");
  } catch (error) {
    res.status(404).json({ msj: "Dados Não Existentes" });
    console.log("Dados Não Existentes!");
  }
});

app.listen(port, () => {
  console.log(`Iniciando a conectividade na porta http://localhost:${port}`);
});
