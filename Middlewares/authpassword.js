const bcrypt = require('bcrypt');


const HashPassword = async (Password) =>{
    try {
        const saltround = 10; 
        const hashedpassword = await bcrypt.hash(Password,saltround);
        return hashedpassword;
    } catch (error) {
        console.log(error);
    }
}


const ComparePassword = async (Password,HashPassword) => {
    try {
        return bcrypt.compare(Password,HashPassword);
    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    HashPassword,
    ComparePassword
}