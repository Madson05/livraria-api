import express from "express";

import livroController from "../controllers/livro.controller.js";
import paginate from "../middlewares/paginate.js";

const routerBook = express.Router();

routerBook.get("/", livroController.getBooks, paginate);
routerBook.get("/busca", livroController.getBookByQuery, paginate);
routerBook.get("/:id", livroController.getBookById);
routerBook.post("/", livroController.createBook);
routerBook.put("/:id", livroController.updateBook);
routerBook.delete("/:id", livroController.deleteBook);


export default routerBook;