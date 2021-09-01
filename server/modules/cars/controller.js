const { 
  postItem,
  deletePicTemp,
  publicTempItem,
  deleteTempItem,
  postUploadTemp,
  getTemp,
  postAddTemp,
  deleteItem,
  patchItem,
  deletePic,
} = require("./models");

const { User } = require('../users/models');
const { VerifyAdmin, VerifyUser } = require('../verify');

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

  async deletePicTemp(req, res){
    const { body } = req;
    const { authorization } = req.headers;
    const { id } = req.params;
    
    if (!authorization) {
      res.status(401).json({ message: "Authorization failed" });
      return;
    }

    try {
      await VerifyUser(authorization);

      const result = await deletePicTemp(body, id, authorization);

      if (result instanceof Error) throw result;
      res.json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  
  async deletePic(req, res){
    const { body } = req;
    const { authorization } = req.headers;
    const { id } = req.params;
    
    if (!authorization) {
      res.status(401).json({ message: "Authorization failed" });
      return;
    }

    try {
      await VerifyUser(authorization);

      const result = await deletePic(body, id, authorization);

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
      await VerifyAdmin(authorization);
      const result = await publicTempItem(id, body);
      
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
      await VerifyAdmin(authorization);
      const result = await deleteTempItem(id);
      
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
      await VerifyUser(authorization);
      const result = await postUploadTemp(files, id);
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
      await VerifyAdmin(authorization);

      const cars = await getTemp();

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
      const user = await VerifyUser(authorization);
      const cars = await postAddTemp(body, user._id);

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
      await VerifyUser(authorization);
      const car = await deleteItem(id);
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
      await VerifyUser(authorization);
      const car = await patchItem(body, id);
      if (car instanceof Error) throw car;
      res.json(car);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

module.exports = new Controller();
