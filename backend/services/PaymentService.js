const Stripe = require("stripe");
require("dotenv").config({ path: ".env.dev" });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
class PaymentService {
  async checkout(payload, userId) {
    const items = Array.isArray(payload) ? payload : [];
    console.log(items);

    const line_items = items.map((it) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: it.name,
        },
        unit_amount: Math.round(Number(it.price || 0) * 100),
      },
      quantity: Number(it.qty || it.quantity || 1),
    }));

    const metadata = {
      userId: userId || "",
      items: JSON.stringify(items),
      totalAmount: String(payload.totalAmount || ""),
      type: payload.orderType || "",
      deliveryAddress: payload.address || "",
      pickupLocation: payload.pickupLocation || "",
      notes: payload.notes || "",
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      metadata,
    });
    return session.url;
  }
}
module.exports = new PaymentService();
