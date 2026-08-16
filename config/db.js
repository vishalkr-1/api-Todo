import mongoose from 'mongoose';
 const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('db connected')
    } catch (err) {
        console.log(err)
         process.exit(1);
    }
  
}

export default connectDb