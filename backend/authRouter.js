const Router = require("express");
const router = new Router();
const controller = require("./authController");
const {check} = require("express-validator");
const authMiddleware = require("./middlewaree/authMiddleware");
const User = require("./models/User");

router.post("/registration", [
    check("username", "The user's name cannot be empty.").notEmpty(),
    check("password", "Password should be more than 4 and less than 10 characters").isLength({min: 4, max: 10})
], controller.registration);

router.post("/login", controller.login);

router.get('/getUserById/:userId', (req, res) => controller.getUserById(req, res));
router.get('/getUserReferrals/:userId', (req, res) => controller.getUserReferrals(req, res));

router.get('/getUser', authMiddleware, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        if (!currentUser) {
            return res.status(404).json({ message: "User doesn't find" });
        }
        res.json(currentUser);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user' });
    }
});

module.exports = router;
