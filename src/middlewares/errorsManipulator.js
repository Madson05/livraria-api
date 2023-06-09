import mongoose from "mongoose";
import badRequest from "../errors/badRequest.js";
import erroBase from "../errors/errorBase.js";
import notFound from "../errors/notFound.js";
import validationError from "../errors/validationError.js";


function errorManipulator(error, req, res, next) {
  if(error instanceof mongoose.Error.CastError) {
    new badRequest().enviarResposta(res)
  }else if(error instanceof mongoose.Error.ValidationError){
    new validationError(error).enviarResposta(res)
  }else if(error instanceof erroBase){
    error.enviarResposta(res)
  }
  else{
    new erroBase().enviarResposta(res)
  }
}

export default errorManipulator;