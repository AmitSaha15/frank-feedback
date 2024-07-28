import mongoose, { connections } from "mongoose";


type ConnectionObject = {
    isConnected ?: number;
}

const connection : ConnectionObject = {}


async function dbConnect() : Promise<void>{ //database will return a promise
    if (connection.isConnected) { //check if there is already a connection
        console.log("Database is already connected");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '',{}) //database connection

        connection.isConnected = db.connections[0].readyState;
        console.log("Database is connected successfully");
        
    } catch (error) {
        console.log("Database connection failed", error);
        
        process.exit(1);
    }
}


export default dbConnect;