import erroBase from "./errorBase.js";

class badRequest extends erroBase{
  constructor(message = "Um ou mais dados fornecidos estão incorretos"){
    super(message, 400)
  }
}

export default badRequest