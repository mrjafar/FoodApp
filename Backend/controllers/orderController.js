import { Stripe } from "stripe";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend---
const placeOrder = async (req, res) => {
  const frontend_url = "https://foodapp-frontend-3lis.onrender.com";
  const { userId, items, amount, address, paymentMethod } = req.body;
  try {
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    if (paymentMethod === "Cash on Delivery") {
      return res.json({
        success: true,
        redirect_url: `${frontend_url}/my-orders`,
      });
    }

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// handle stripe webhook function-----
const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Retrieve session details
      const newOrder = new orderModel({
        userId: session.metadata.userId,
        items: JSON.parse(session.metadata.items),
        amount: session.amount_total / (100 * 80),
        address: session.metadata.address,
      });

      await newOrder.save();
      await userModel.findByIdAndUpdate(session.metadata.userId, {
        cartData: {},
      });

      console.log("Order placed successfully!");
    }

    res.sendStatus(200);
  } catch (error) {
    console.log("Webhook error:", error);
    res.sendStatus(400);
  }
};

// verify orders--------
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true }),
        res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndUpdate(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

// user orders for frontend---
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error." });
  }
};

// Listing orders for admin panel-------
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

// api for updating order update status----
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error." });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
