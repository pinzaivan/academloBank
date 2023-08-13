const generateRandomNumber = require('../helpers/randomNumberGenerator');
const Transfer = require('../models/transfers.model');
const User = require('../models/user.model');

exports.findAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({
      status: 'success',
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'internal server error',
      error,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, password } = req.body;
    const accountNumber = generateRandomNumber();

    const user = await User.create({ name, password, accountNumber });

    return res.status(201).json({
      status: 'success',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'internal server error',
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { password, accountNumber } = req.body;
    const users = await User.findOne({
      where: {
        status: 'active',
        accountNumber,
        password,
      },
    });
    if (!users) {
      return res.status(401).json({
        stauts: 'error',
        messagge: `User is not register, sorry`,
      });
    }
    return res.status(200).json({
      status: 'you have entered correctly, congrats',
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'internal server error',
      error,
    });
  }
};
