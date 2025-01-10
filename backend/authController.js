const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require('./config');

const generateAccessToken = (id, roles = []) => {
    const payload = { id, roles };
    return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: 'Registration error', errors });
            }
            const { username, email, password, ref } = req.body;
            const candidate = await User.findOne({
                $or: [{ username }, { email }],
            });
            if (candidate) {
                return res
                    .status(400)
                    .json({ message: 'User with this username or email already exists' });
            }

            const hashPassword = bcrypt.hashSync(password, 7);

            const newUser = new User({
                username: username,
                email: email,
                password: hashPassword,
            });
            await newUser.save();

            if (ref) {
                const referrer = await User.findOne({ referralCode: ref });
                if (referrer?.referrals) {
                    referrer.referrals.push(newUser._id);
                    await referrer.save();
                }
            }

            return res.json({message: 'User successfully registered'});
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Registration error' });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: 'Missing username or password' });
            }

            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: `User ${username} not found` });
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Incorrect password' });
            }

            const token = generateAccessToken(user._id);
            return res.json({ message: 'Login successful', token });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Login error' });
        }
    }

    async getUserById(req, res) {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);
            console.log('user == ', user);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const referredUsers = await User.find({ _id: { $in: user.referrals } });

            const userObject = user.toObject();
            userObject.referrals = referredUsers;

            return res.json(userObject);
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Error fetching user' });
        }
    }

    async getUserReferrals(req, res) {
        try {
            const { userId } = req.params;
            const user = await User.findOne({id: userId}).populate('referrals');
            console.log('user == ', user);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const userObject = user.toObject();
            return res.json(userObject.referrals);
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: 'Error fetching user' });
        }
    }
}

module.exports = new authController();