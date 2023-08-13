const { response } = require('../app');
const Transfer = require('../models/transfers.model');
const User = require('../models/user.model');

const transferAmount = async (req, res = response) => {
  try {
    const { amount, accountNumber, senderUserId } = req.body;
    const userRec = await User.findOne({
      where: {
        status: 'active',
        accountNumber,
      },
    });
    const receivingUserId = userRec.id;

    const receivingUserAmount = userRec.amount;

    const userSend = await User.findOne({
      where: {
        status: 'active',
        id: senderUserId,
      },
    });

    if (amount > userSend.amount) {
      return res.status(200).json({
        status: 'fail',
        messagge: 'you dont have enough money for this transfer',
      });
    }

    if (receivingUserId === senderUserId) {
      return res.status(200).json({
        status: 'fail',
        messagge: 'you cant send your money to yourself daahhh!',
      });
    }

    const newAmountUserMakeTransfer = userSend.amount - amount;

    const newAmountUserRecibeTransfer = amount + receivingUserAmount;

    await userSend.update({ amount: newAmountUserMakeTransfer });

    await userRec.update({ amount: newAmountUserRecibeTransfer });

    const transferData = await Transfer.create({
      amount,
      senderUserId,
      reciverUserId: receivingUserId,
    });

    return res.status(201).json({
      status: 'success',
      transferData,
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

module.exports = { transferAmount };
