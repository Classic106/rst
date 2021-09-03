const mongoose = require("mongoose");

const secret = process.env.SECRET;
const Schema = mongoose.Schema;

const searchCarScheme = new Schema({
    manufacturer: String,
    models: [String],
}, {versionKey: false});

const searchCar = mongoose.model("SearchCar", searchCarScheme);

class Models{

    getSearchList(){
        return searchCar.find({})
            .then(cars => cars)
            .catch(err =>{
                //console.log(err);
                return err;
            });
    }

    postSearchList(body){

        return searchCar.findOne({ manufacturer: body.manufacturer })
        .then(async result =>{
            
            if(result){
                
                if(result.models.length){
                    
                    let models = [...result.models];

                    if(!models.includes(body.model)){
                        models.push(body.model);
                    
                        return searchCar.findOneAndUpdate(
                            {manufacturer: body.manufacturer},
                            {models: models}
                        );
                    }
                }
                return 'ok';
            }else{

                const newSearchCarItem = new searchCar({
                    manufacturer: body.manufacturer,
                    models: [body.model],
                });
                await newSearchCarItem.save();
                return 'ok';
            }
        })
        .catch(err =>{
            //console.log(err);
            return err;
        });
    }
}

module.exports = new Models();
