import books from "../models/Book.js";

class livroController {
  static getBooks = (req, res) => {
    books.find()
    .populate("author")
    .exec()
    .then(function(results) {
    res.json(results)
  })
  }

  static getBookById = (req, res) => {
    const id = req.params.id.toString()
    books.findById(id)
    .populate("author", "name")
    .then((book) => res.status(200).send(book))
    .catch((err) => res.status(400).send({message: `${err.message} - Id do livro não encontrado`}))
  }

  static getBookByPublisher = (req, res) => {
    const publisher = req.query.publisher

    books.find({"publisher": publisher}, {})
    .then((books) => res.status(200).send(books))
    .catch((err) => res.status(400).send({message: "Livro não encontrado"}))
  }

  static createBook = (req, res) => {
    let book = new books(req.body)
    book.save()
    .then(() => res.status(201).send(book.toJSON()))
    .catch(err => res.status(500).send({message: `${err.message} - Falha ao cadastrar o livro`}))
    
  }

  static updateBook = (req,res) => {
    const id = req.params.id
    books.findByIdAndUpdate(id, {$set: req.body})
    .then(() => res.status(500).send({message: "O livro foi alterado com sucesso"}))
    .catch((err) => res.status(500).send({message: err.message}))
  }

  static deleteBook = (req, res) => {
    const id = req.params.id
    books.findByIdAndDelete(id)
    .then(() => res.status(200).send({message: "Livro removido com sucesso"}))
    .catch((err) => res.status(500).send({message: err.message}))
  }
}
  

export default livroController;
