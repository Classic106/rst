const { User } = require('./users/userScheme');

const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const VerifyUser = (token)=>{
   
  const { id } = jwt.verify(token, secret);
  
  return User.findOne({_id: id})
      .then(user => {
        if(!user) throw Error("User not found");
        return user;
      })
}

const VerifyAdmin = (token)=>{
   
   const { id } = jwt.verify(token, secret);
        
    return User.findOne({_id: id})
        .then(user => {
          if(!user && !user.isAdmin) throw new Error("User not found");
          return user;
      })
}

module.exports = { VerifyAdmin, VerifyUser };
