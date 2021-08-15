const Models = require('./models');

class Controller{
    async get(req, res){
        try{
            const searchCars = await Models.get();
            if(searchCars instanceof Error) throw searchCars;
            res.json(searchCars);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }
    async post(req, res){
        
        const { body } = req;
        const { authorization } = req.headers;

        if(!authorization){
            res.status(404).json({message: 'Authorization failed'});
            return;
        }
        if(!body.models || !body.manufacturer){
            res.status(404).json({message: 'Fields is not defined'});
            return;
        }
        
        try{
            const searchCars = await Models.post(body, authorization);
            if(searchCars instanceof Error) throw searchCars;
            res.json(searchCars);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }
    async delete(req, res){

        const { id } = req.params;
        const { authorization } = req.headers;

        if(!authorization){
            res.status(404).json({message: 'Authorization failed'});
            return;
        }

        try{
            const searchCars = await Models.delete(id, authorization);
            if(searchCars instanceof Error) throw searchCars;
            res.json(searchCars);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }
    async patch(req, res){

        const { id } = req.params;
        const { body } = req;
        const { authorization } = req.headers;
        
        if(!authorization){
            res.status(404).json({message: 'Authorization failed'});
            return;
        }
        if(!body.models || !boby.manufacturer){
            res.status(404).json({message: 'Fields is not defined'});
            return;
        }
    
        try{
            const searchCars = await Models.patch(body, id, authorization);
            if(searchCars instanceof Error) throw searchCars;
            res.json(searchCars);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }
}

module.exports = new Controller();