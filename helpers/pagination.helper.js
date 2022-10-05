const pagintaion = async (req, model) => {
    
    let page = req.query.page;
    let list_size = req.query.list_size;

    if ((page && list_size) === undefined) {
      page = 1
      list_size = 10
    } 

    // должно быть столько файлов вцелом
    const startIndex = (page - 1) * list_size;
    const endIndex = page * list_size;
  
    // колличество файлов на page
    const modelPag = await model.findAll({});
    const usersOnPage = modelPag.slice(startIndex, endIndex);
    return usersOnPage
  };
  
  module.exports = pagintaion
  