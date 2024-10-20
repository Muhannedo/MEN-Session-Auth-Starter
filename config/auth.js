// require the bcrypt
const bcrypt = require("bcrypt");
// facntion to encrypt the password
function encrypthPassword (password){
    return bcrypt.hashSync(password,process.env.SALT_ROUNDES);

}
module.exports={
    encrypthPassword
};
