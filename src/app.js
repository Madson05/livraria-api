import express from "express";
import db from "./config/dbConnect.js";
import errorManipulator from "./middlewares/errorsManipulator.js";
import manipulator404 from "./middlewares/manipulator404.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "erro de conexão"));
db.once("open", () => console.log("Conexão com o banco feita com sucesso!"));

const app = express();


app.use(express.json());

routes(app);
app.use(manipulator404)
app.use(errorManipulator)


export default app;