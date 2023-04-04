import mongoose from "mongoose"

mongoose.connect(`mongodb+srv://library-node:node123@library.ahsspuc.mongodb.net/?`)


let db = mongoose.connection;

export default db