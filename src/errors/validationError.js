import badRequest from "./badRequest.js";

class validationError extends badRequest{
  constructor(error){
    const messageError = Object.values(error.errors).map((error) => error.message).join("; ")
    super(`Os seguintes erros foram encontrados: ${messageError}`)
  }
}

export default validationError;