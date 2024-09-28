import user from "../model/userModel.js"

// fetch the datas from the database
export const fetch = async (req, res) => {
    try {
        const users = await user.find();
        if (!users) {
            return res.status(404).json({ message: "User not found!" });
        }
        // if there are datas inside the database, returns 200 and the datas inside the database
        res.status(200).json(users); // 200 - OK
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
