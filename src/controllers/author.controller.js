
import notFound from "../errors/notFound.js";
import authors from "../models/Author.js";

class authorController {
  static getAuthors = async (req, res, next) => {
    try {
      const authorsResult = await authors.find();
      res.send(authorsResult);
    } catch (error) {
      next(error)
    }
  };

  static getAuthorById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const authorsResult = await authors.findById(id);
      if(authorsResult){
        res.status(200).send(authorsResult);
      }else{
        next(new notFound("Id do autor não encontrado"))
      }
      
    } catch (error) {
      next(error)
    }
  };

  static createAuthor = async (req, res, next) => {
    try {
      let author = new authors(req.body);
      const authorResult = await author.save();
      res.status(201).send(authorResult.toJSON());
    } catch (error) {
      next(error)
    }
  };

  static updateAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const resultAuthors = await authors.findByIdAndUpdate(id, {
        $set: req.body,
      });
      res.status.send(resultAuthors);
    } catch (error) {
      next(error)
    }
  };

  static deleteAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await authors.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido com sucesso" });
    } catch (error) {
      next(error)
    }
  };
}

export default authorController;
