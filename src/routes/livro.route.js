import express from "express";

import livroController from "../controllers/livro.controller.js";

const routerBook = express.Router();

routerBook.get("/", livroController.getBooks);
routerBook.get("/busca", livroController.getBookByQuery);
routerBook.get("/:id", livroController.getBookById);
routerBook.post("/", livroController.createBook);
routerBook.put("/:id", livroController.updateBook);
routerBook.delete("/:id", livroController.deleteBook);


export default routerBook;