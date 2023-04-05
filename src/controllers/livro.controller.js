import books from "../models/Book.js";

class livroController {
  static getBooks = async (req, res) => {
    try{
      const booksResult = await books
      .find()
      .populate("author")
      res.json(booksResult);
    }catch(err){
      res.status(500).send({message: `${err.message} - erro ao obter os livros`})
    }
  };

  static getBookById = async (req, res) => {
    const id = req.params.id.toString();
    try{
      const booksResult = await books
        .findById(id)
        .populate("author", "name")
        res.status(200).send(book)
    }catch(err){
      res
        .status(400)
        .send({ message: `${err.message} - Id do livro não encontrado` })
    }
  };

  static getBookByPublisher = async (req, res) => {

    try{
      const publisher = req.query.publisher;
      const booksResult = await books
        .find({ publisher: publisher }, {})
        res.status(200).send(books)
    }catch(err){
      res.status(400).send({ message: `${err} - Livro não encontrado` })
    }
  }

  static createBook = async (req, res) => {
    try{
      let book = new books(req.body);
      await book.save()
        res.status(201).send(book.toJSON())
    }catch(err){
      res
          .status(500)
          .send({ message: `${err.message} - Falha ao cadastrar o livro` })
    }
  };

  static updateBook = async (req, res) => {
    try{
      const id = req.params.id;
      await books
      .findByIdAndUpdate(id, { $set: req.body })
      res.status(200).send({ message: "O livro foi alterado com sucesso" })
    }catch(err){
      res.status(500).send({ message: err.message });
    }
  };

  static deleteBook = async (req, res) => {
    try{
      const id = req.params.id;
      books
        .findByIdAndDelete(id)
      res.status(200).send({ message: "Livro removido com sucesso" })
    }catch(err){
      res.status(500).send({ message: err.message });
    }
  };
}

export default livroController;
