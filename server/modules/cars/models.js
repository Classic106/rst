const { readFile, writeFile, unlink } = require("fs").promises;
const { move } = require('fs-extra');
//console.log(require("fs"));
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
    images: [String],
    date: Number,
    publiched: Number,
    reviews: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {versionKey: false});

const Car = mongoose.model("Car", carScheme);
const TmpCar = mongoose.model("TemporaryCar", carScheme);

class Models{

    async postItem(body){
        
        const newBody = Object.assign({}, body);

        delete newBody.price;
        delete newBody.engine;
        delete newBody.year;
        delete newBody.withPhoto;
        
        return Car.find(newBody)
            .populate('userId')
            .where('price')
            .gte(+body.price[0])
            .lte(+body.price[1])
            .where('engine')
            .gte(+body.engine[0])
            .lte(+body.engine[1])
            .where('year')
            .gte(+body.year[0])
            .lte(+body.year[1])
            .then(cars => {
                return body.withPhoto ? 
                    cars.filter(car => car.images.length > 0) : cars
            })
            .catch(err =>{
                //console.log(err);
                return err;
            });
    }

    /*getByUser(token){
        const { id } = jwt.verify(token, secret);

        return Car.find({})
            .population('userId')
            .exec((err, car)=> {
                if (err) return handleError(err);
                console.log(car)
            })
            .then(car => car)
            .catch(err =>{
                console.log(err);
                return err;
            });
    }*/

    /*getById(id){
        return Car.findOne({_id: id})
            .then(car => car)
            .catch(err =>{
                console.log(err);
                return err;
            });
    }*/

    postAdd(body, token){
        const { id } = jwt.verify(token, secret);
        
        return User.findOne({_id: id})
            .then(user => {
                if(!user && !user.isAdmin) return new Error("User not found");
                
                const car = new Car({...body, userId: id});
                return car.save().then(car => car)
            })
            .catch(err =>{
                //console.log(err);
                return err;
            });
    }
    
    publicTempItem(carId, body, token){
        const { id } = jwt.verify(token, secret);
        
        return User.findOne({_id: id})
            .then(user => {
                if(!user && !user.isAdmin) return new Error("User not found");
            
                return TmpCar.findOne({_id: carId})
                    .then(car => {
                        
                        const fromPath = __dirname.replace(
                            /\/server\/.+/, '/server/public/tempCarsImages/');
                        
                        const toPath = __dirname.replace(
                            /\/server\/.+/, '/server/public/carsImages/');
                        
                        Object.assign(car, body);
                        //console.log(car, body)
                        for(let key in car.images){
                            car.images[key] =
                                car.images[key].replace('tempCarsImages', 'carsImages');

                            const fileName = car.images[key].match(/\w+\.(jpg|jpeg|png)$/)[0];
                            
                            move(
                                fromPath+fileName, toPath+fileName,
                                { overwrite: true },
                                err => {
                                    if (err) return err; 
                                });
                        }
                        const newCar = new Car(car.toObject());
                        //console.log(newCar)
                        //return 'ok'
                        return newCar.save()
                        .then(car => {
                            return TmpCar.findByIdAndDelete({_id: car._id})
                            .then(() =>{
                                return User.findOne({_id: car.userId})
                                .then(user => {
                                    user.carsId.push(car._id);

                                    return User.findOneAndUpdate(
                                        {_id: user._id},
                                        {carsId: user.carsId},
                                        {new: true}
                                    ).then(()=>{
                                        return TmpCar.find({});   
                                    })
                                })
                            });
                        })
                    });
            })
    }

    deletePicTemp(body, carId, token){
        const { id } = jwt.verify(token, secret);
        
        return User.findOne({_id: id})
            .then(user => {
                if(!user) return new Error("User not found");

                const imagePath = __dirname.replace(
                            /\/server\/.+/,
                            '/server/public/tempCarsImages/'
                        );
                
                unlink(imagePath+body.deletedImg.match(/\w+$/)[0]);

                return TmpCar.findOneAndUpdate(
                        {_id: carId},
                        {images: body.images},
                        {new: true}
                    )
                    .then(res => res ? TmpCar.find({}) : Error('Somethig happened!!!'));
            })
            .catch(err =>{
                //console.log(err);
                return err;
            });
    }

    /*patchItem(body, idCar, token){
        
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
    }*/

    postUploadTemp(files, carId, token){
        const { file } = files;
        const { id } = jwt.verify(token, secret);
        
        return User.findOne({_id: id})
            .then(user => {
                if(!user) return new Error("User not found");

                const uploadPath = __dirname.replace(
                    /\/server\/.+/, '/server/public/tempCarsImages/');

                for(let key in file){
                    writeFile(uploadPath+file[key].name, file[key].data)
                    .catch(err => {
                        //console.log(err);
                        return err;
                    });
                }
                return 'ok';
            })
            .catch(err =>{
                //console.log(err);
                return err;
            });
    }
    
    deleteTempItem(idItem, token){
        const { id } = jwt.verify(token, secret);
        
        return User.findOne({_id: id})
            .then(user => {
                
                if(!user && !user.isAdim)
                    return new Error("User not found");
                    
                return TmpCar.findOne({_id: idItem})
                    .then(car =>{
                        //console.log(car)
                        for(let key in car.images){
                            const uploadPath = __dirname.replace(
                                /\/server\/.+/,
                                '/server/public/tempCarsImages/'
                            );
                            
                            unlink(uploadPath+car.images[key].match(/\w+\.(jpg|jpeg|png)$/)[0]);
                        }
                    })
                    .then(()=> TmpCar.deleteOne({_id: idItem}))
                    .then(()=> TmpCar.find({}));
            })
            .catch(err =>{
                //console.log(err);
                return err;
            });
    }

    postAddTemp(body, token){
        const { id } = jwt.verify(token, secret);

        return User.findOne({_id: id})
            .then(user => {
                if(!user) return new Error("User not found");
                
                const imagePath = 'http://localhost:3001/tempCarsImages/';
                
                body.images = [...body.images].map(val => imagePath+val);

                const car = new TmpCar({...body, userId: id});

                return car.save().then(car => car)
            })
            .catch(err =>{
                //console.log(err);
                return err;
            });
    }

    getTemp(token){
        const { id } = jwt.verify(token, secret);
        
        return User.findOne({_id: id})
            .then(user => {
                if(!user && !user.isAdim) return new Error("User not found");
                
                return TmpCar.find({})
                .populate('userId')
                .then(cars => cars);
            })
            .catch(err =>{
                //console.log(err);
                return err;
            });
    }

    deleteItem(idCar, token){
        const { id } = jwt.verify(token, secret);
        
        return User.findOne({_id: id})
            .then(user => {
                if(!user) return new Error("User not found");
                
                return Car.findOne({_id: idCar})
                .then(car =>{
                    for(let key in car.images){

                        const imagePath = __dirname.replace(
                                /\/server\/.+/,
                                '/server/public/carsImages/'
                            );
                        
                        unlink(imagePath+car.images[key].match(/\w+\.\w+$/)[0]);
                    }
                }).then(()=> {
                    return User.findOne({carsId: {$in: [idCar]}})
                    .then(user => {
                        const newcarsId = user.carsId.filter(val => val != idCar);
                        return User.findOneAndUpdate({_id: id}, {carsId: newcarsId}, {new: true});
                    });
                })
            })
            .catch(err =>{
                //console.log(err);
                return err;
            });
    }

    patchItem(body, idCar, token){
        
        const { id } = jwt.verify(token, secret);
        
        return User.findOne({_id: id})
        .then(user => {
            if(!user) return new Error("User not found");
            
            return Car.findOneAndUpdate({_id: idCar}, body, {new: true})
            .then(() => User.findOne({_id: id}).populate('carsId'));
        })
        .catch(err =>{
            //console.log(err);
            return err;
        });
    }
}

module.exports = new Models();