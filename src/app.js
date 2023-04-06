import express from "express";
import mongoose from "mongoose"
import db from "./config/dbConnect.js";
import errorManipulator from "./middlewares/errorsManipulator.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "erro de conexão"));
db.once("open", () => console.log("Conexão com o banco feita com sucesso!"));

const app = express();


app.use(express.json());

routes(app);

app.use(errorManipulator)


export default app;