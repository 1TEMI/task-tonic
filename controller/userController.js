import User from "../models/userModel.js";


//Fetch all users
export const fetch = async (req, res) => {
    try {
    const users = await User.find({});
    if (users.length === 0) {
        return res.status(404).json({ message: "Users not found" });
    }
        res.status(200).json({
            success: true,
            message: "These are all the users",
            allUser: users
        });
    } catch (error) {
        res.status(500).json({ error: "An internal error occur" });
    }
};
//Update user data
export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({_id: id})
        if (!userExist){
            return res.status(404).json({ message: "Users not found" });
        }
        const updateUser = await User.findByIdAndUpdate(id, req.body , {new:true})
        return res.status(201).json({
            success: true,
            message: "User data has been update successfully",
            updatedUser: updateUser
    })
    } catch (error) {
        res.status(500).json({ error: "An internal error occur" });
    }
}

//Delete user
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({_id: id})
        if (!userExist){
            return res.status(404).json({ message: "Users not found" });
        }
        const deleteUser = await User.findByIdAndDelete({_id:id})
        console.log(deleteUser)
        return res.status(201).json({
            success: true,
            message: "User data has been deleted successfully",
            deletedUser: deleteUser
        })
    } catch (error) {
        res.status(500).json({ error: "An internal error occur" });
    }
}
