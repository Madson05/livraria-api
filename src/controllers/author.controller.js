import authors from "../models/Author.js";

class authorController {
  static getAuthors = async (req, res) => {
    try {
      const authorsResult = await authors.find();
      res.send(authorsResult);
    } catch (err) {
      res.atatus(500).send({ message: "Houve um erro na listagem de autores" });
    }
  };

  static getAuthorById = async (req, res) => {
    try {
      const id = req.params.id.toString();
      const authorsResult = await authors.findById(id);
      res.status(200).send(authorsResult);
    } catch (err) {
      res.status(400).send({ message: `${err.message} - Id não encontrado!` });
    }
  };

  static createAuthor = async (req, res) => {
    try {
      let author = new authors(req.body);
      const authorResult = await author.save();
      res.status(201).send(authorResult.toJSON());
    } catch (err) {
      res
        .status(500)
        .send({ message: `${err.message} - Falha ao cadastrar o autor` });
    }
  };

  static updateAuthor = async (req, res) => {
    try {
      const id = req.params.id;
      const resultAuthors = await authors.findByIdAndUpdate(id, {
        $set: req.body,
      });
      res.status.send(resultAuthors);
    } catch (err) {
      res
        .status(500)
        .send({ message: `${err.message} - Erro ao atualizar o autor` });
    }
  };

  static deleteAuthor = async (req, res) => {
    try {
      const id = req.params.id;
      await authors.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido com sucesso" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
}

export default authorController;
