import transactionModel from "../models/transactionModel.js";

export const paymentAction = async (req, res) => {
  const midtransUrl = process.env.MIDTRANS_URL;
  const host = process.env.APP_FE_URL;

  try {
    const transaction = new transactionModel({
      user: user._id,
      price: 250000,
    });

    const midtrans = await fetch(midtransUrl, {
      method: "POST",
      body: JSON.stringify({
        transaction_details: {
          order_id: transaction._id.toString(),
          gross_amount: transaction.price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
        callbacks: { finish: `${host}/success-checkout` },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
    });

    const resMidtrans = await midtrans.json();
    await transaction.save();

    return res.json({
      message: "Payment Success",
      data: {
        midtrans_payment_url: resMidtrans.redirect_url,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
