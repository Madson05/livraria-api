import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const bookSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: [true, "O campo title é obrigatório"] },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors",
    required: [true, "O campo author é obrigatório"],
    autopopulate: {select: "name"}
  },
  publisher: {
    type: String,
    required: [true, "O campo publisher é obrigatório"],
    enum: {
      values: ["Casa do código", "Alura", "Saraiva"],
      message: "A editora {VALUE} não é um valor permitido."
    }
  },
  numberPages: {
    type: Number,
    required: [true, "O campo numberPages é obrigatório"],
    validate: 
    {validator: (valor) => {
      return valor >= 10 && valor <=5000;
    }, message: "O numero de páginas deve estar entre 10  e 5000. Valor fornecido: {VALUE}"}
  },
});
bookSchema.plugin(autopopulate);
const books = mongoose.model("books", bookSchema);

export default books;
