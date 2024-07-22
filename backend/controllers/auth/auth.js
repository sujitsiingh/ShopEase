const User = require('../../models/user');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.TOKEN_KEY;

//Register endpoint
module.exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // if any one of the field from email and password is not filled
    if (!email || !password) {
      return res.json({
        success: false,
        message: 'email or password is empty!!.. fill in both',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('email already registered', email);
      return res.status(404).json({ message: 'Email already registered' });
    }

    req.body.password = await bcrypt.hash(password, 10);

    // Create new user
    let newUser = new User(req.body);
      
      await newUser.save();
      console.log("New user saved", newUser);

      res.status(201).json({
          message:"Registration successful...", success: true, data: newUser,
      });

  } catch (error) {
    console.log('Error during registration', error);
    return res.status(500).json({ message: 'Registration failed', success: false });
  }
};


//Secret key generation
// function generateAuthToken(data) {
//     const token = jwt.sign(data, JWT_SECRET_KEY, { expiresIn: '1h' });
//     return token;
// }
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();

//Login endpoint
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let existUser = await User.findOne({ email});
        if(!existUser) {
          return res.json({ status: 401, success: true, message: "user not found with this email"})
        }
      // bcrypting the password and comparing with the one in db
      if (await bcrypt.compare(password, existUser.password)) {

        const token = jwt.sign({ userId: existUser._id }, secretKey);
        // existUser.token = token;
        res.status(200).json({ token });
        existUser.save();

        return res.json({ success: true, status: 200, message: "user Logged in", data: existUser });
      }
      return res.json({success: false, status: 400,message: "user credentials are not correct",});
    } catch (error) {
        res.status(500).json({ message: 'login error'+ error.message });
    }
};

//user profile bt Identity
module.exports.profileById = async (req, res)=> {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the user profile '+ error.message });
  }
};
