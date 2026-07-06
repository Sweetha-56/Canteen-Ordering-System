const userModel = require("../models/userModel");

// Register User
const registerUser = (req, res) => {
    const user = req.body;

    userModel.createUser(user, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Error registering user",
                error: err
            });
        }

        res.status(201).json({
            message: "User registered successfully",
            userId: result.insertId
        });
    });
};

// Login User
const loginUser = (req, res) => {
    const { email, password } = req.body;

    userModel.getUserByEmail(email, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Server Error"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result[0];

        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        // Remove password before sending user details
        delete user.password;

        res.status(200).json({
            message: "Login Successful",
            user: user
        });
    });
};

module.exports = {
    registerUser,
    loginUser
};