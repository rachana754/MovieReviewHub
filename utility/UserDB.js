var User = require('../models/User');
class UserDB {
    constructor() {
    }
    
    //This function returns particular user with matching userID from DB.
    getUser(id){
      return new Promise(function (resolve,reject){
          User.findOne({userID:id}).then(function(data){
              resolve(data);
              console.log(data);
          }).catch(function (err){
              return reject(err);
          });
      });
    } 
    
    //This function returns all the users from DB
     getAllusers(){
         return new Promise(function (resolve,reject){
             User.find().then(function(data){
                 resolve(data);
                 console.log(data);
             }).catch(function (err){
                 return reject(err);
             });
         });
    }
}

module.exports = UserDB;