import notFound from "../errors/notFound.js";
import authors from "../models/Author.js";
import { books } from "../models/index.js";

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

  static getBookByQuery = async (req, res, next) => {
    try {
      const query = await processQuery(req.query);

      if(query !== null){
        
        const bookResult = await books.find(query)
        .populate("author");
        if (bookResult) {
          res.status(200).send(bookResult);
        } else {
          next(new notFound("Editora não encontrada"));
        }
      }else{
        res.status(200).send([]);
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

      if (bookResult) {
        res.status(200).send({ message: "O livro foi alterado com sucesso" });
      } else {
        next(new notFound("Id do livro não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  };

  static deleteBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      const bookResult = books.findByIdAndDelete(id);
      if (bookResult) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new notFound("Id do livro não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  };
}

async function processQuery(params) {
  const { publisher, title, minPages, maxPages, nameAuthor } = params;

  let query = {};

  if (minPages || maxPages) query.numberPages = {};

  if (publisher) query.publisher = { $regex: publisher, $options: "i" };
  if (title) query.title = { $regex: title, $options: "i" };
  if (minPages) query.numberPages.$gte = minPages;
  if (maxPages) query.numberPages.$lte = maxPages;
  if (nameAuthor) {
    const author = await authors.findOne({ name: { $regex: nameAuthor, $options: "i" } });

    if(author !== null){
      query.author = author._id;
    }else{
      query = null
    }
  }

  return query;
}

export default livroController;
