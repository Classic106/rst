const Models = require("./models");

class Controller {
  async post(req, res) {
    const { body } = req;
    try {
      const cars = await Models.post(body);
      if (cars instanceof Error) throw cars;
      res.json(cars);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  async getById(req, res){
    const { id } = req.params;
    const cars = await Models.getById(id);
    res.json(cars);
  }
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
      const cars = await Models.postAdd(body, authorization);
      //console.log(cars)
      if (cars instanceof Error) throw cars;
      res.json(cars);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  async delete(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: "Authorization failed" });
      return;
    }

    try {
      const car = await Models.delete(id, authorization);
      if (car instanceof Error) throw car;
      res.json(car);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  async patch(req, res) {
    const { id } = req.params;
    const { body } = req;
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ message: "Authorization failed" });
      return;
    }
    if (!body._id) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (!body.model || !boby.manufacturer) {
      res.status(402).json({ message: "Fields is not defined" });
      return;
    }

    try {
      const car = await Models.patch(body, id, authorization);
      if (car instanceof Error) throw car;
      res.json(car);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

module.exports = new Controller();
