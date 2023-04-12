import notFound from "../errors/notFound.js";
import books from "../models/Book.js";

class livroController {
  static getBooks = async (req, res, next) => {
    try {
      const booksResult = await books.find().populate("author");
      res.json(booksResult);
    } catch (error) {
      next(error);
    }
  };

  static getBookById = async (req, res, next) => {
    const id = req.params.id;
    try {
      const booksResult = await books.findById(id).populate("author", "name");
      if (booksResult) {
        res.status(200).send(booksResult);
      } else {
        next(new notFound("Id do livro não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  };

  static getBookByPublisher = async (req, res, next) => {
    try {
      const publisher = req.query.publisher;
      const bookResult = await books.find({ publisher: publisher }, {});
      if (bookResult) {
        res.status(200).send(bookResult);
      } else {
        next(new notFound("Editora não encontrada"));
      }
    } catch (error) {
      next(error);
    }
  };

  static createBook = async (req, res, next) => {
    try {
      let book = new books(req.body);
      await book.save();
      res.status(201).send(book.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static updateBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      const bookResult = await books.findByIdAndUpdate(id, { $set: req.body });

      if(bookResult){
        res.status(200).send({ message: "O livro foi alterado com sucesso" });
      }else{
        next(new notFound("Id do livro não encontrado"))
      }
    } catch (error) {
      next(error);
    }
  };

  static deleteBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      const bookResult = books.findByIdAndDelete(id);
      if(bookResult){
        res.status(200).send({ message: "Livro removido com sucesso" });
      }else{
        next(new notFound("Id do livro não encontrado"))
      }
    } catch (error) {
      next(error);
    }
  };
}

export default livroController;
