import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('MongoDB Connected')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "promptopia",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true
        console.log('MongoDB Connected')
    } catch (error) {
        console.error(`Error @connectToDB: ${error}`)
    }
}