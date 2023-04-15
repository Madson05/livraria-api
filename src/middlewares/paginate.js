import badRequest from "../errors/badRequest.js";

async function paginate(req, res, next){
  try{
    let { limit = 5, page = 1, ordination = "_id:-1" } = req.query;

      let [sortField, order] = ordination.split(":")

      limit = parseInt(limit)
      page = parseInt(page)
      order = parseInt(order)

      const result = req.result

      if (limit > 0 && page > 0) {
        const paginatedResult = await result
          .find()
          .sort({ [sortField] : order})
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("author");
        res.json(paginatedResult);
      } else{
        next(new badRequest())
      }
  }catch(error){
    next(new badRequest)
  }
}

export default paginate