const {
  postItem,
  getByUser,
  //getById,
  postAdd,
  postAddTemp,
  deleteItem,
  deletePicTemp,
  deleteTempItem,
  publicTempItem,
  patchItem,
  postUploadTemp,
  getTemp,
} = require("./models");

class Controller {

  async postItem(req, res) {
    const { body } = req;
    try {
      const cars = await postItem(body);

      if (cars instanceof Error) throw cars;
      res.json(cars);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  async getByUser(req, res){
    const { authorization } = req.headers;
    const cars = await getByUser(authorization);
    console.log(cars);
    res.json(cars);
  }
  /*async getById(req, res){
    const { id } = req.params;
    const cars = await getById(id);
    res.json(cars);
  }*/
  async postAdd(req, res) {
    
    const { body } = req;
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: "Authorization failed" });
      return;
    }
    if (!body.model || !body.manufacturer) {
      res.status(402).json({ message: "Fields is not defined" });
      return;
    }

    try {
      const cars = await postAdd(body, authorization);
      //console.log(cars)
      if (cars instanceof Error) throw cars;
      res.json(cars);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async deletePicTemp(req, res){
    const { body } = req;
    const { authorization } = req.headers;
    const { id } = req.params;
    
    if (!authorization) {
      res.status(401).json({ message: "Authorization failed" });
      return;
    }

    try {
      const result = await deletePicTemp(body, id, authorization);
      //console.log(result)
      if (result instanceof Error) throw result;
      res.json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  
  async publicTempItem(req, res){
    const { id } = req.params;
    const { authorization } = req.headers;
    const { body } = req;

    if (!authorization) {
      res.status(401).json({ message: "Authorization failed" });
      return;
    }

    try {
      const result = await publicTempItem(id, body, authorization);
      //console.log(result)
      if (result instanceof Error) throw result;
      res.json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async deleteTempItem(req, res){
    const { id } = req.params;
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: "Authorization failed" });
      return;
    }

    try {
      const result = await deleteTempItem(id, authorization);
      
      if (result instanceof Error) throw result;
      res.json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async postUploadTemp(req, res){
    //console.log(req.files);
    const { files } = req;
    const { authorization } = req.headers;
    const { id } = req.params;
    
    if (!authorization) {
      res.status(401).json({ message: "Authorization failed" });
      return;
    }

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    try {
      const result = await postUploadTemp(files, id, authorization);
      //console.log(result)
      if (result instanceof Error) throw result;
      res.json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async getTemp(req, res) {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: "Authorization failed" });
      return;
    }

    try {
      const cars = await getTemp(authorization);
      //console.log(cars)
      if (cars instanceof Error) throw cars;
      res.json(cars);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async postAddTemp(req, res) {
    const { body } = req;
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: "Authorization failed" });
      return;
    }
    if (!body.model || !body.manufacturer) {
      res.status(402).json({ message: "Fields is not defined" });
      return;
    }

    try {
      const cars = await postAddTemp(body, authorization);
      //console.log(cars)
      if (cars instanceof Error) throw cars;
      res.json(cars);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async deleteItem(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: "Authorization failed" });
      return;
    }

    try {
      const car = await deleteItem(id, authorization);
      if (car instanceof Error) throw car;
      res.json(car);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async patchItem(req, res) {
    const { id } = req.params;
    const { body } = req;
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: "Authorization failed" });
      return;
    }
    /*if (!body._id) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (!body.model || !boby.manufacturer) {
      res.status(402).json({ message: "Fields is not defined" });
      return;
    }*/

    try {
      const car = await patchItem(body, id, authorization);
      if (car instanceof Error) throw car;
      res.json(car);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

module.exports = new Controller();
