// require the bcrypt
const bcrypt = require("bcrypt");
// facntion to encrypt the password
function encryptPassword (password){
    return bcrypt.hashSync(password, parseInt( process.env.SALT_ROUNDES));

}

function comparedPassword(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword);

}



module.exports={
    encryptPassword,
    comparedPassword,
};