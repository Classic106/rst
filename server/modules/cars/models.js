const { User } = require('../users/models');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const Schema = mongoose.Schema;

const carScheme = new Schema({
    manufacturer: String,
    model: String,
    year: Number,
    mileage: Number,
    color: String,
    engine: Number,
    transmission: String,
    fuel: String,
    drive: String,
    condition: String,
    city: String,
    exchange: Boolean,
    price: Number,
    description: String,
    userId: String,
    images: [String],
    date: Number,
    publiched: Number,
    reviews: Number,
}, {versionKey: false});

const Car = mongoose.model("Car", carScheme);

class Models{
    async post(body){
        
        const newBody = Object.assign({}, body);

        delete newBody.price;
        delete newBody.engine;
        delete newBody.year;
        
        return Car.find(newBody)
            .where('price')
            .gte(+body.price[0])
            .lte(+body.price[1])
            .where('engine')
            .gte(+body.engine[0])
            .lte(+body.engine[1])
            .where('year')
            .gte(+body.year[0])
            .lte(+body.year[1])
            .then(cars => cars)
            .catch(err =>{
                //console.log(err);
                return err;
            });
    }
    getById(id){
        return Car.findOne({_id: id})
            .then(car => car)
            .catch(err =>{
                console.log(err);
                return err;
            });
    }
    postAdd(body, token){
        const { id } = jwt.verify(token, secret);
        
        return User.find({_id: id})
            .then(user => {
                if(user.length !== 1 || !user[0].isAdmin)
                    return new Error("User not found");
                
                const car = new Car(body);
                return car.save().then(car => car)
            })
            .catch(err =>{
                //console.log(err);
                return err;
            });
    }
    delete(idCar, token){
        const { id } = jwt.verify(token, secret);
        
        return User.find({_id: id})
            .then(user => {
                if(user.length !== 1 || !user[0].isAdmin)
                    return new Error("User not found");
                return Car.findByIdAndDelete(idCar).then(car => car);
            })
            .catch(err =>{
                //console.log(err);
                return err;
            });
    }
    patch(body, idCar, token){
        
        const { id } = jwt.verify(token, secret);
        
        return User.find({_id: id})
        .then(user => {
            if(user.length !== 1 || !user[0].isAdmin)
                return new Error("User not found");
            
            return Car.findOneAndUpdate({_id: idCar}, body, {new: true})
            .then(car => car); 
        })
        .catch(err =>{
            //console.log(err);
            return err;
        });
    }
}

module.exports = new Models();