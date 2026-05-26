const router = require("express").Router();
const { register, login } = require("../controllers/auth.controller")
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

router.post("/refresh", async(req, res) => {
    // const { refreshToken } = req.body;
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({
            message: "No refresh token"
        });
    }

    try {
        const decoded = jwt.verify(refreshToken, "refreshSecretKey");
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        const newAccessToken = jwt.sign({
                id: decoded.id,
                role: decoded.role
            },
            "secretKey", { expiresIn: "15m" }
        );

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        });


        return res.json({
            accessToken: newAccessToken
        });

    } catch (error) {
        return res.status(403).json({
            message: "Invalid refresh token"
        });
    }
});


router.post("/register", [
    body("name").notEmpty().withMessage("Name is required"),
    body("email")
    .isEmail()
    .withMessage("Enter valid email"),
    body("password").isLength({ min: 6 })
    .withMessage("Password must be atleast 6 Characters"),
], register);
router.post("/login", login);

router.post("/logout", async(req, res) => {
    const { userId } = req.body;

    await User.findByIdAndUpdate(userId, {
        refreshToken: null
    });

    res.json({ message: "Logged out successfully" });
});

module.exports = router