import mongoose from "mongoose";


function errorManipulator(error, req, res, next) {
  if(error instanceof mongoose.Error.CastError) {
    res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"})
  }else{
    res.status(500).send({ message: `${error.message} - Erro interno de servidor` });
  }
}

export default errorManipulator;