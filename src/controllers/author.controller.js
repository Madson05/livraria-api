import authors from "../models/Author.js";

class authorController {
  static getAuthors = (req, res) => {
    authors.find({}).exec()
  .then(function(results) {
    res.json(results)
  })
  }

  static getAuthorById = (req, res) => {
    const id = req.params.id.toString()
    authors.findById(id)
    .then((author) => res.status(200).send(author))
    .catch((err) => res.status(400).send({message: `${err.message} - Id do autor não encontrado`}))
  }

  static createAuthor = (req, res) => {
    let author = new authors(req.body)
    author.save()
    .then(() => res.status(201).send(author.toJSON()))
    .catch(err => res.status(500).send({message: `${err.message} - Falha ao cadastrar o autor`}))
    
  }

  static updateAuthor = (req,res) => {
    const id = req.params.id
    authors.findByIdAndUpdate(id, {$set: req.body})
    .then(() => res.status(500).send({message: "O autor foi alterado com sucesso"}))
    .catch((err) => res.status(500).send({message: err.message}))
  }

  static deleteAuthor = (req, res) => {
    const id = req.params.id
    authors.findByIdAndDelete(id)
    .then(() => res.status(200).send({message: "Autor removido com sucesso"}))
    .catch((err) => res.status(500).send({message: err.message}))
  }
}
  

export default authorController;