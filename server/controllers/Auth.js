const User = require("../models/Users");
const { StatusCodes } = require("http-status-codes");

const signup = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password || !address) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error:
          "Please provide all required fields: name, email, password, address, phone",
      });
    }

    // Create user
    const user = await User.create({ name, email, password, address });

    // Generate token
    const token = user.createJWT();

    // Return success response
    return res.status(StatusCodes.CREATED).json({
      user: {
        email: user.email,
        name: user.name,
        _id: user._id,
        token,
      },
    });
  } catch (error) {
    console.error("Error in signup:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Provide valid email and password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Email and Password is wrong" });
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Email and Password is wrong" });
  }

  const token = user.createJWT();
  return res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      name: user.name,
      _id: user._id,
      token,
    },
  });
};

const validate = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "User come back" });
};
module.exports = {
  signup,
  validate,
  login,
};
