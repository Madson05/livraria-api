import books from "../models/Book.js";

class livroController {
  static getBooks = async (req, res, next) => {
    try{
      const booksResult = await books
      .find()
      .populate("author")
      res.json(booksResult);
    }catch(error){
      next(error)
    }
  };

  static getBookById = async (req, res, next) => {
    const id = req.params.id;
    try{
      const booksResult = await books
        .findById(id)
        .populate("author", "name")
        res.status(200).send(booksResult)
    }catch(error){
      next(error)
    }
  };

  static getBookByPublisher = async (req, res, next) => {

    try{
      const publisher = req.query.publisher;
      const booksResult = await books
        .find({ publisher: publisher }, {})
        res.status(200).send(books)
    }catch(error){
      next(error)
    }
  }

  static createBook = async (req, res, next) => {
    try{
      let book = new books(req.body);
      await book.save()
        res.status(201).send(book.toJSON())
    }catch(error){
      next(error)
    }
  };

  static updateBook = async (req, res, next) => {
    try{
      const id = req.params.id;
      await books
      .findByIdAndUpdate(id, { $set: req.body })
      res.status(200).send({ message: "O livro foi alterado com sucesso" })
    }catch(error){
      next(error)
    }
  };

  static deleteBook = async (req, res, next) => {
    try{
      const id = req.params.id;
      books
        .findByIdAndDelete(id)
      res.status(200).send({ message: "Livro removido com sucesso" })
    }catch(error){
      next(error)
    }
  };
}

export default livroController;
