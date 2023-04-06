import express from "express";
import mongoose from "mongoose"
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "erro de conexão"));
db.once("open", () => console.log("Conexão com o banco feita com sucesso!"));

const app = express();


app.use(express.json());

routes(app);

app.use((error, req, res, next) =>  {
  if(error instanceof mongoose.Error.CastError) {
    res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"})
  }else{
    res.status(500).send({ message: `${error.message} - Erro interno de servidor` });
  }
})


export default app;