const { getSearchList } = require('./models');

class Controller{
    
    async getSearchList(req, res){
        try{
            const searchCars = await getSearchList();
            if(searchCars instanceof Error) throw searchCars;
            res.json(searchCars);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }
}

module.exports = new Controller();