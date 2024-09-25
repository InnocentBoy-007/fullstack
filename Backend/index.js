import express from "express"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import route from "./Route/userRoute.js";

// This line creates a new Express.js application instance and assigns it to the app variable.
const app = express();

// This line tells the Express.js application to use the Body-Parser middleware to parse incoming request bodies in JSON format.
app.use(bodyParser.json());

// This line loads the environment variables from a '.env' file using the Dotenv library.
dotenv.config();

// This line sets the PORT variable to the value of the 'PORT' environment variable, or defaults to '5000' if the environment variable is not set.
const PORT = process.env.PORT || 5000;

// This line sets the MONGOURL variable to the value of the MONGO_URL environment variable.
const MONGOURL = process.env.MONGO_URL;

// Add CORS headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// This line connects to the MongoDB database using the Mongoose library. The connect method returns a promise that resolves when the connection is successful. The then block is executed when the connection is successful, and the catch block is executed if an error occurs during the connection process.
mongoose.connect(MONGOURL).then(() => {
    console.log("Database connected successfully")

    // This line starts the 'Express.js' application to listen on the specified PORT. The callback function is executed when the server is listening.
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);

    })

}).catch((error) => console.log(error))

// This line mounts the userRoute module at the '/api/user' path. Any requests to this path will be handled by the userRoute module.
app.use("/api/user", route);
