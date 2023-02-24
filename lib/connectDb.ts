import mongoose from 'mongoose'

const connectMongo = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log('Connected to MongoDB')
    } catch (error: any) {
        console.error(`Error connecting to MongoDB: ${error.message}`)
    }
}
export default connectMongo
