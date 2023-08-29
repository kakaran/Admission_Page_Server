const mongoose = require('mongoose');

const dbconect = async ()=>
{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongodb conect successfully ");
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbconect;
