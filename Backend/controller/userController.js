import User from "../model/userModel.js"

export const create = async (req, res) => {
    try {
        const userData = new User(req.body);
        const { email } = userData;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exist." }); // 400 Status: Bad Request
        }
        const savedUser = await userData.save()
        res.status(200).json(savedUser); // 200 Status: OK
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
}

// fetch the datas from the database
export const fetch = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ message: "User not found!" });
        }
        // if there are datas inside the database, returns 200 and the datas inside the database
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" })
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({ _id: id });
        if (!userExist) {
            return res.status(404).json({ message: "User not found!" });
        }
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
}
