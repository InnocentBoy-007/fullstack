import user from "../model/userModel.js"
import buyer from "../model/buyerModel.js"

// fetch the datas from the database
export const fetch = async (req, res) => {
    try {
        const users = await user.find();
        if (!users) {

            // if there are no datas inside the database, returns 404
            return res.status(404).json({ message: "User not found!" });
        }
        // if there are datas inside the database, returns 200 and the datas inside the database
        res.status(200).json(users); // 200 - OK
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" }) // 500 - Internal Server Error
    }
};
export const fetchBuyers = async (req, res) => {
    try {
        const buyers = await buyer.find();
        if (!buyers) {

            // if there are no datas inside the database, returns 404
            return res.status(404).json({ message: "User not found!" });
        }
        // if there are datas inside the database, returns 200 and the datas inside the database
        res.status(200).json(buyers); // 200 - OK
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" }) // 500 - Internal Server Error
    }
};

// create a new user
export const create = async (req, res) => {
    try {
        const { name, email, address } = req.body;
        const newUser = new user({ name, email, address });
        const result = await newUser.save();
        res.status(201).json(result); // 201 - Created
    } catch (error) {
        res.status(400).json({ error: "Invalid request!" }); // 400 - Bad Request
    }
};

// update user info
export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, address } = req.body;

        // Find the user by ID and update the document
        const updatedUser = await user.findByIdAndUpdate(id, { name, email, address }, { new: true });

        if (!updatedUser) {
            // If the user is not found, return 404
            return res.status(404).json({ message: "User not found!" });
        }

        // Return the updated user info
        res.status(200).json(updatedUser);
    } catch (error) {
        // If there's an error, return 500
        res.status(500).json({ error: "Internal server error!" });
    }
};

// delete the user info
export const deleteInfo = async (req, res, id) => {
    try {
        const { id } = req.params;

        // Find the user by ID and deletes the document
        const deletedUser = await user.findByIdAndDelete(id).exec();
        if (!deletedUser) {
            // If user is not found, return 404
            return res.status(404).json({ message: "User   not found!" });
        }

        // Return the updated user info
        res.status(200).json({ message: "User   deleted successfully!", deletedUser });
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" });
    }
};
