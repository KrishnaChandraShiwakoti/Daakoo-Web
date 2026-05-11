const PaymentService = require("../services/PaymentService.js");
// const paymentService = new PaymentService();
exports.checkout = async (req, res) => {
  try {
    const payload = req.body;
    const userId = req.user?.id;

    const sessionUrl = await PaymentService.checkout(payload, userId);
    res.json({ url: sessionUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
