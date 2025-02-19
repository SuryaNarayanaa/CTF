const ApiError = require("../utils/ApiError");

const autheicateUser = (req, res, next) => {
    if (req.session && req.session.user) {
      next();
    } else {
        throw new ApiError(401,"User not logged in");
    }
  };


const authorizeRoles = (req,res,next) =>{
    if(req.session.user && req.session.user.role == 'admin'){
        next()
    }else
        throw new ApiError(401,"User is not authorized")
}

  
module.exports = {autheicateUser,authorizeRoles};
  