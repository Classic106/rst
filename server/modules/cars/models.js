const { readFile, writeFile, unlink } = require("fs").promises;
const { move } = require('fs-extra');

const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const { Car, TmpCar } = require('./carScheme');
const { User } = require('../users/userScheme');
const { postSearchList } = require('../searchCars/models');

const secret = process.env.SECRET;

const tempImagePath = __dirname.replace(
                    /\/server\/.+/,
                    '/server/public/carsImages/'
                );

const imagePath = __dirname.replace(
                        /\/server\/.+/,
                        '/server/public/carsImages/'
                    );

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
    
    publicTempItem(carId, body){
       
        return TmpCar.findOne({_id: carId})
            .then(car => {
                
                Object.assign(car, body, {date: Date.now()});

                for(let key in car.images){
                    car.images[key] =
                        car.images[key].replace('tempCarsImages', 'carsImages');

                    const fileName = car.images[key].match(/\w+\.(jpg|jpeg|png)$/)[0];
                    
                    move(
                        tempImagePath+fileName, imagePath+fileName,
                        { overwrite: true },
                        err => {
                            if (err) return err; 
                        });
                }

                const newCar = new Car(car.toObject());
        
                return newCar.save()
                    .then(car =>{ 
                        return TmpCar.findByIdAndDelete({_id: car._id});
                    })
                    .then(()=>{
                        return User.findOne({_id: car.userId})
                        .then(user =>{
                        
                            let cars = [...user.carsId];
                            cars.push(car._id);
                        
                            User.findOneAndUpdate({_id: car.userId}, {carsId: cars})
                                .then(user => postSearchList({
                                        manufacturer: car.manufacturer.toLowerCase(), 
                                        model: car.model.toLowerCase(),
                                    })
                                );
                        })
                        .then(() => TmpCar.find({}).populate('userId'));
                    });
            });
    }

    deletePicTemp(body, carId){

        unlink(tempImagePath+body.deletedImg.match(/\w+\.(jpg|jpeg|png)$/)[0]);

        return TmpCar.findOneAndUpdate(
                {_id: carId},
                {images: body.images},
                {new: true}
            )
            .then(() => TmpCar.find({}).populate('userId'));
    }
    
    deletePic(body, carId){

        unlink(imagePath+body.deletedImg.match(/\w+\.(jpg|jpeg|png)$/)[0]);

        return Car.findOneAndUpdate(
                {_id: carId},
                {images: body.images},
                {new: true}
            )
            .then(car => User.find({_id: car.userId}).populate('carsId'));
    }

    postUploadTemp(files){
        const { file } = files;

        for(let key in file){
            writeFile(tempImagePath+file[key].name, file[key].data)
            .catch(err => {
                //console.log(err);
                return err;
            });
        }
        return 'ok';
    }
    
    deleteTempItem(idItem){

        return TmpCar.findOne({_id: idItem})
            .then(car =>{
                //console.log(car)
                for(let key in car.images){
                    unlink(tempImagePath+car.images[key].match(/\w+\.(jpg|jpeg|png)$/)[0]);
                }
            })
            .then(()=> TmpCar.deleteOne({_id: idItem}))
            .then(()=> TmpCar.find({}).populate('userId'));
    }

    postAddTemp(body, userId){

        const imagePath = 'http://localhost:3001/tempCarsImages/';
        
        body.images = [...body.images].map(val => imagePath+val);
        body.userId = userId;
        body.isDeleted = false;
        
        const car = new TmpCar({...body});

        return car.save().then(() => Car.find({}).populate('userId'));
    }

    getTemp(){
        return TmpCar.find({})
        .then(cars => cars);
    }

    deleteItem(idCar){

        return Car.findOne({_id: idCar})
        .then(car =>{
            for(let key in car.images){
                unlink(imagePath+car.images[key].match(/\w+\.(jpg|jpeg|png)$/)[0]);
            }
        })
        .then(()=> Car.deleteOne({_id: idCar}))
        .then(()=>{
            return User.findOne({carsId: {$in: [idCar]}})
            .then(user => {
                const newcarsId = user.carsId.filter(val => val != idCar);
                return User.findOneAndUpdate({_id: id}, {carsId: newcarsId}, {new: true});
            });
        })
    }

    patchItem(body, idCar){

        return Car.findOneAndUpdate({_id: idCar}, body, {new: true})
        //.then(() => Car.find({}));
    }
}

module.exports = new Models();