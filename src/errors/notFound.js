import erroBase from "./errorBase.js";

class notFound extends erroBase{
  constructor(message = "Página não encontrada"){
    super(message, 404);
  }
}

export default notFound