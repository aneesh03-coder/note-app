const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
        console.log(`Mongo DB connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(`We have an error : ${error.message}`.red.bold)
        process.exit();
    }
}
module.exports = connectDB;