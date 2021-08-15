const { Models } = require('./models');

class Controller{
    async postCheck(req, res){
        const { body } = req;
        
        if(!body.email && !body.login) {
            res.status(402).json({message: 'Fields is not defined'});
            return;
        }
        
        try{
            const check = await Models.checkUser(body);
            if(check instanceof Error) throw check;
            res.json(check);
        }catch(err){
            res.status(401).json({message: err.message});
        }
    }
    async getAll(req, res){
        const { authorization } = req.headers;

        if(!authorization){
            res.status(401).json({message: 'Authorization failed'});
            return;
        }
        
        try{
            const users = await Models.getAll(authorization);
            if(users instanceof Error) throw users;
            res.json(users);
        }catch(err){
            res.status(401).json({message: err.message});
        }
    }
    async getById(req, res){
        /*const { authorization } = req.headers;

        if(!authorization){
            res.status(401).json({message: 'Authorization failed'});
            return;
        }*/

        try{
            const { id } = req.params;
            const user = await Models.getById(id/*, authorization*/);
            if(user instanceof Error) throw user;
            res.json(user);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }

    async postRegistration(req, res){
        try{
            const { body } = req;
            if(!body.email || !body.password || !body.login) {
                res.status(402).json({message: 'Fields is not defined'});
                return;
            }
            
            body.isDeleted = false;
            body.isAdmin = false;
            body.name = '';
            
            const user = await Models.postRegistration(body);
            if(user instanceof Error) throw user;
            res.header('Authorization', user.token);
            res.json(user.user);
        }catch(err){
            res.status(401).json({message: err.message});
        }
    }
    async getAuth(req, res){

        const { authorization } = req.headers;
        
        if(!authorization){
            res.status(403).json({message: 'Authorization failed'});
            return;
        }

        try{
            const user = await Models.getAuth(authorization);
            if(user instanceof Error) throw user;
            res.json(user);
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }

    async postAuth(req, res){

        const { body } = req;
        
        if(body && (!body.login || !body.password)) {
            res.status(403).json({message: 'Fields is not defined'});
            return;
        }
        try{
            const user = await Models.postAuth(body);
            if(user instanceof Error) throw user;
            res.header('Authorization', user.token);
            res.json(user.user);
        }catch(err){
            //console.log(err)
            res.status(404).json({message: err.message});
        }
    }
    async delete(req, res){
                
        const { authorization } = req.headers;
        
        if(!authorization){
            res.status(401).json({message: 'Authorization failed'});
            return;
        }

        try{
            const { id } = req.params;
            const user = await Models.delete(id, authorization);
            if(user instanceof Error) throw user;
            res.json({message: 'User with ID '+user._id+' deleted'});
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }
    async patch(req, res){
                
        const { authorization } = req.headers;

        if(!authorization){
            res.status(401).json({message: 'Authorization failed'});
            return;
        }

        try{
            const { id } = req.params;
            const { body } = req;
            const user = await Models.patch(body, id, authorization);
            if(user instanceof Error) throw user;
            res.json(user);    
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }
}

module.exports = new Controller();