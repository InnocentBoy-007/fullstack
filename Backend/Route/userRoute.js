import express from 'express'

// This line imports a specific function, fetch, from another file called userController.js located in a directory called controller, which is one level up from the current file (../). The fetch function is likely a controller function that handles a specific task, such as fetching user data.
import { fetch, create } from '../controller/userController.js'

// This line creates a new instance of the Express.js router, which is a way to define routes for an application. The route variable now holds this router instance. The router allows us to define routes, such as GET, POST, PUT, and DELETE, and associate them with specific handler functions.
const route = express.Router();

// This line defines a GET route for the path /fetch. When a GET request is made to this path, the fetch function imported from userController.js will be called to handle the request. This means that when a client (e.g., a web browser) sends a GET request to /fetch, the fetch function will be executed to retrieve the necessary data.
route.get("/getAllUsers", fetch);
route.post("/createUser", create);

export default route;
