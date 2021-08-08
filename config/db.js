const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI)
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true
        })
        console.log(`MongoDB connected ${connect.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}
module.exports = connectDB