import express from "express"

import authorController from "../controllers/author.controller.js"

const routerAuthor = express.Router()

routerAuthor.get("/", authorController.getAuthors)
routerAuthor.get("/:id", authorController.getAuthorById)
routerAuthor.post("/", authorController.createAuthor)
routerAuthor.put("/:id", authorController.updateAuthor)
routerAuthor.delete("/:id", authorController.deleteAuthor)


export default routerAuthor;