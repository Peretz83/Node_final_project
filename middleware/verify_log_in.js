const jwt = require('jsonwebtoken')
const User = require("./../models/userModel")


// token.sign function
// const signToken = (id, biz) => {
//   return jwt.sign({ id, biz }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN
//   });
// };
//  secuirity middleware 
async function verify_log_in (req, res, next) {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ status: 'Fail', message: 'You are not logged in! Please log in to get access' });
    }

    //  Verifiy token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    //Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        massage: 'The user belonging to this token does no longer exist.'
      });
    }
    next();
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: err.message
    });
  }
};


module.exports = verify_log_in