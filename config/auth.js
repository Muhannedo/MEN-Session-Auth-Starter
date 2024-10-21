// require the bcrypt
const bcrypt = require("bcrypt");
// facntion to encrypt the password
function encryptPassword (password) {
    return bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
}
function comparePassword (password, hashpassword) {
    return bcrypt.compareSync(password, hashpassword);
}
module.exports = {
    encryptPassword,
    comparePassword,
};