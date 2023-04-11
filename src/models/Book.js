import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    id: {type: String},
    title: {type: String, required: [true, "O campo title é obrigatório"]},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "authors", required: [true, "O campo author é obrigatório"]},
    publisher: {type: String, required: [true, "O campo publisher é obrigatório"]},
    numberPages: {type: Number, required: [true, "O campo numberPages é obrigatório"]}
  }
);

const books = mongoose.model("books", bookSchema);

export default books;