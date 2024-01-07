import mongoose from "mongoose";

export default async function MongoConnect(){
    try {
        await mongoose.connect(process.env.DATABASE_URI as string );
        console.log("Database connection established");
    }catch(error){
        console.log("Error connecting to MongoDB",error);
        
    }
};