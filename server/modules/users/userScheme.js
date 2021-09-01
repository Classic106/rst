const mongoose = require("mongoose");
const mongooseHidden = require('mongoose-hidden')();

const Schema = mongoose.Schema;

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
    isDeleted: Boolean,
    date: Number,
    deleteDate: Number,
}, {versionKey: false});


/*userScheme.plugin(mongooseHidden, { hidden: { _id: false } });

userScheme.pre('save', async function(next){
    
    try{
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(err){
        next(err)
    }
});*/

const User = mongoose.model("User", userScheme);

module.exports = { userScheme, User };