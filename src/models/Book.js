import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: [true, "O campo title é obrigatório"] },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors",
    required: [true, "O campo author é obrigatório"],
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
    min: [10, "O campo numberPages deve estar entre 10 e 5000. Valor fornecido: {VALUE}"],
    max: [5000, "O campo numberPages deve estar entre 10 e 5000. Valor fornecido: {VALUE}"],
  },
});

const books = mongoose.model("books", bookSchema);

export default books;
