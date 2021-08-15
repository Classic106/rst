const { User } = require('../users/models');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const Schema = mongoose.Schema;

const searchCarScheme = new Schema({
    manufacturer: String,
    models: [String],
}, {versionKey: false});

const searchCar = mongoose.model("SearchCar", searchCarScheme);

class Models{
    get(){
        return searchCar.find({})
            .then(cars => cars)
            .catch(err =>{
                //console.log(err);
                return err;
            });
    }
    async post(body, token){
        const { id } = jwt.verify(token, secret);
        
        const user = await User.find({_id: id})
        .then(user => (user.length === 1) ? user[0] : false)
        .catch(err =>{
            //console.log(err);
            return err;
        });
        
        if(!user.isAdmin) return new Error("User not found");

        const car = new searchCar(body);

        return car.save()
            .then(car => car)
            .catch(err =>{
                //console.log(err);
                return err;
            });
    }
    async delete(idCar, token){
        const { id } = jwt.verify(token, secret);
        
        const user = await User.find({_id: id})
        .then(user => (user.length === 1) ? user[0] : false)
        .catch(err =>{
            //console.log(err);
            return err;
        });
        
        if(!user.isAdmin) return new Error("User not found");

        return Car.findByIdAndDelete(idCar)
            .then(car => car)
            .catch(err =>{
                //console.log(err);
                return err;
            });
    }
    async patch(body, idCar, token){
        
        const { id } = jwt.verify(token, secret);
        
        const user = await User.find({_id: id})
        .then(user => (user.length === 1) ? user[0] : false)
        .catch(err =>{
            //console.log(err);
            return err;
        });
        
        if(!user.isAdmin) return new Error("User not found");
        
        return Car.findOneAndUpdate({_id: idCar}, body, {new: true})
            .then(car => car)
            .catch(err =>{
                //console.log(err);
                return err;
            });
    }
}

module.exports = new Models();