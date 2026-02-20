import "dotenv/config";
import app from "./app.js";
import db from "./config/db.js";

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, async () => {
    await db.connect();
    console.log(`Server is running on http://localhost:${PORT}`);
});

const handleShutdown = async (signal) => {
    console.log(`Received ${signal}. Shutting down...`);

    server.close(async () => {
        console.log("HTTP server closed");

        await db.disconnect(); // Ensure the database connection is closed before exiting the process

        process.exit(0); // Exit the process with a success code
    });

    // If the server doesn't close within a certain time, force exit
    setTimeout(() => {
        console.error("Could not close connections in time, forcing shutdown");
        process.exit(1); // Exit the process with an error code
    }, 10000);
};

process.on("SIGINT", handleShutdown); // Listen for SIGINT (Ctrl+C in the terminal)
process.on("SIGTERM", handleShutdown); // Listen for SIGTERM (termination signal from a process manager or container orchestrator)