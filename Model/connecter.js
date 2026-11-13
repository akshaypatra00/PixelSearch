const mongoose = require("mongoose")


async function connectDb() {
    await mongoose.connect(process.env.mongoose_url)

    console.log("database is connected")
}


module.exports = connectDb;