const User = require("../models/usermodel.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator");
//Register

const register = async(req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const { name, email, password } = req.body
        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashed,
        })
        res.status(200).json({ messsage: "User Created", user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Login

const login = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "user not found" })

    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(400).json({ message: "wrong password" });

    }

    const accessToken = jwt.sign({
            id: user._id,
            role: user.role
        },
        "secretKey", { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign({
            id: user._id,
            role: user.role
        },
        "refreshSecretKey", { expiresIn: "7d" }
    )
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 min
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    //res.json({ accessToken, refreshToken });
    res.json({ message: "Logged in successfully" });
}

module.exports = {
    register,
    login
}