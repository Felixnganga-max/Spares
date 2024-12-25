const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing User Order
const placeOrder = async (req, res) => {
  // Ensure FRONTEND_URL is set
  const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";

  try {
    // Double-check userId is coming from the correct place
    const userId = req.body.userId || req.user?.id || req.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const newOrder = new orderModel({
      userId: userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    // Clear user's cart after order placement
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Add delivery fee
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: 100, // $1 in cents
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({
      success: false,
      message: "Error processing order",
      error: error.message,
    });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  console.log("Received verification request:", {
    orderId,
    success,
    successType: typeof success,
  });

  try {
    if (success === "true") {
      // Compare as string
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { payment: true },
        { new: true } // Return updated document
      );

      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.json({
        success: true,
        message: "Order paid successfully",
        order: updatedOrder,
      });
    } else {
      const deletedOrder = await orderModel.findByIdAndDelete(orderId);

      if (!deletedOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.json({
        success: false,
        message: "Order cancelled and therefore, not paid",
      });
    }
  } catch (error) {
    console.error("Order verification error:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying order",
      error: error.message,
    });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const orders = await orderModel.find({ userId });
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching user orders",
      error: error.message,
    });
  }
};


module.exports = { placeOrder, verifyOrder, userOrders };
