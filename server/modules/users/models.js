const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let mongooseHidden = require('mongoose-hidden')();

const saltRounds = 10;
const Schema = mongoose.Schema;
const secret = process.env.SECRET;

const userScheme = new Schema({
    name: String,
    email: String,
    password: { type: String, hideJSON: true },
    isAdmin: Boolean,
    carsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    }],
    phone: String,
    additionalPhone: String,
    login: String,
    isDeleted: { type: Boolean, hideJSON: true }
}, {versionKey: false});

userScheme.plugin(mongooseHidden, { hidden: { _id: false } });

userScheme.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(err){
        next(err)
    }
});

/*userScheme.pre('save', function () {
  console.log('pre-save');
});

userScheme.pre('init', function () {
  console.log('pre-init');
});

userScheme.post('save', function () {
  console.log('post-save');
});

userScheme.post('init', function () {
  console.log('post-init');
});

userScheme.pre('validate', function () {
  console.log('pre-validate');
});

userScheme.post('validate', function () {
  console.log('post-validate');
});

userScheme.pre('remove', function () {
  console.log('pre-remove');
});

userScheme.post('remove', function () {
  console.log('post-remove');
});*/

const User = mongoose.model("User", userScheme);


class Models{

    async checkUser(body){
        
       return User.find({})
        .or([{'email': body.email},{'login': body.login}])
        .then(user => {
            if(!user.length) return true;
            if(user.length >= 2) return 'both';
            if(user[0].email === body.email) return 'email';
            if(user[0].login === body.login) return 'login';
            return new Error('Somethig wrong');
        });
    }

    getAll(token){
        
        const { id } = jwt.verify(token, secret);

        return User.find({_id: id})
            //.populate('carsId')
            .then(users =>
                (users.length !== 0 && user[0].isAdmin)
                    ? User.find({}) : new Error('User not found')
            )
    }

    /*getById(userId/*, token){

        return User.find({_id: userId})
            //.populate('carsId')
            .then(user => user.length > 0 ? 
                user[0] : new Error('User not found'))
            .catch(err =>{
                //console.log(err);
                return err;
            });

        /*const { id } = jwt.verify(token, secret);

        return User.find({_id: id})
            .then(user =>
                (user.length !== 0)
                    ? User.find({_id: userId}).then(u => u[0])
                        : new Error('User not found'))
            .catch(err =>{
                //console.log(err);
                return err;
            });
    }*/

    getAuth(token){
            const { id } = jwt.verify(token, secret);
            
            if(!id) throw new Error('User not found');

            return User.findOne({_id: id})
                .populate('carsId')
                .then(user => {
                    //console.log(user);
                    if(user && !user.isDeleted) return user;
                    throw new Error('User not found');
                })
    }

    postAuth(body){

        return User.findOne({})
        .or([{'email': body.login},{'login': body.login}])
        .where('isDeleted').equals(false)
        .populate('carsId')
        .then(async user => {

            if(!user) return new Error('User Not Found');
            
            const compare = await bcrypt.compare(body.password, user.password);

            return compare ? {
                user, token: jwt.sign({id: user._id}, secret)
            } : new Error('User Not Found');
        })
    }

    postRegistration(body){
        
        return User.find({})
            .or([{'email': body.email},{'login': body.login}])
            .then(user => {
                return (user.length > 0) ? new Error('Email or login is exist') :
                    new User(body).save()
                        .then(user => ({
                            user,
                            token: jwt.sign({id: user._id}, secret)
                        }))
            })
    }

    postRegistrationAdmin(body, token){

        const { id } = jwt.verify(token, secret);
        
        return User.findOne({_id: id})
            .then(user => {
                if(!user) return new Error('User not found');
                if(!user.isAdmin) return new Error('Authorization failed');
                
                return new User(body).save().then(user => true)
            })
    }
    
    delete(idUser, token){

        const { id } = jwt.verify(token, secret);
        
        return User.find({_id: id})
        .then(user => {
            if(user.length === 0) return new Error('User not found');
            return (id == user[0]._id || user[0].isAdmin) ?
                User.findOneAndUpdate(
                        {_id: id},
                        {isDeleted: true},
                        {new: true}
                    )
                    .then(user => user)
                : new Error('User not found');
        })
    }

    async patch(body, idUser, token){
        
        const { id } = jwt.verify(token, secret);
        
        if(body.password){
            const salt = await bcrypt.genSalt(saltRounds);
            body.password = await bcrypt.hash(body.password, salt);
        }

        return User.find({_id: id})
        .then(user => {
            if(user.length !== 1) return new Error('User not found');
            return (id == user[0].id || user[0].isAdmin) ?
                User.findOneAndUpdate({_id: idUser}, body, {new: true})
                    .then(user => user)
                : new Error('User not found');
        })
    }
}

module.exports = { Models: new Models(), User };