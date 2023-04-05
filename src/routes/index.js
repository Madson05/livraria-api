import express from "express";
import routerAuthor from "./author.route.js";
import routerBook from "./livro.route.js";


const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({Titulo: "Curso de Node"});
  });

  app.use(express.json()); 
  app.use("/books", routerBook);
  app.use("/authors", routerAuthor);
};

export default routes;