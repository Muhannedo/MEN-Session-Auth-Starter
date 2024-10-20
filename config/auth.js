// require the bcrypt
const bcrypt = require("bcrypt");
// facntion to encrypt the password
function encryptPassword (password){
    return bcrypt.hashSync(password, parseInt( process.env.SALT_ROUNDES));

}
module.exports={
    encryptPassword,
};

// const bcrypt = require('bcrypt');

// function encryptPassword(password) {
//   return bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
// }

// module.exports = {
//   encryptPassword,
// };