import mongoose from "mongoose";

class Database {
    constructor() {
        this.connection = null;

        // Set up event listeners for Mongoose connection events
        mongoose.connection.on("connected", () => {
            console.log("Mongoose connected to MongoDB");
        });

        mongoose.connection.on("error", (err) => {
            console.error("Mongoose connection error:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.log("Mongoose disconnected from MongoDB");
        });

        mongoose.connection.on("reconnected", () => {
            console.log("Mongoose reconnected to MongoDB");
        });
    };

    async connect() {
        if (this.connection) { // If a connection already exists, return it
            return this.connection;
        };

        try{
            this.connection = await mongoose.connect(process.env.MONGO_URI);
            return this.connection;
        }catch (error) {
            console.error("MongoDB connection error:", error);
            throw error;
        };
    };

    async disconnect() {
        if (!this.connection) { // If no connection exists, there's nothing to disconnect
            console.warn("No database connection to disconnect");
            return;
        };

        try {
            await mongoose.connection.close();
            this.connection = null;
        } catch (error) {
            console.error("Error while closing the database connection:", error);
            throw error;
        }
    };
};

export default new Database(); // Exporting an instance of the Database class to be used throughout the application