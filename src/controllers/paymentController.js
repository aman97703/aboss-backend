import Stripe from "stripe";
import Payment from "../models/payment.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;
  console.log("✅ Received payment intent request");
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // $10 → 1000 cents
      currency: "inr",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("errr in payment ", error);
    res.status(400).send({ error: error.message });
  }
};

const savePayement = async (req, res) => {
  const { amount } = req.body;
  try {
    await Payment.create({
      amount,
      user: req.user._id,
    });
    res.json({
      message: "Payment saved",
    });
  } catch (error) {
    console.log("errr in payment ", error);
    res.status(400).send({ error: error.message });
  }
};

const getAllPayement = async (req, res) => {
  try {
    const data = await Payment.find({
      user: req.user._id,
    });
    res.json(data);
  } catch (error) {
    console.log("errr in payment ", error);
    res.status(400).send({ error: error.message });
  }
};
export { createPaymentIntent, savePayement, getAllPayement };
