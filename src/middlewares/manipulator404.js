import notFound from "../errors/notFound.js"

function manipulator404(req, res, next){
  const erro404 = new notFound();
  next(erro404)
}

export default manipulator404