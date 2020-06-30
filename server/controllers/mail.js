const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.API_KEY);
const to = process.env.TO_EMAIL;
const from = process.env.FROM_EMAIL;

// @desc          Email from quote
// @route         POST /api/v1/quote
// @access        Private (cors origin)
exports.quote = async (req, res, _next) => {
  if (!req.body) return res.status(400);

  let { subject, contactName, contactNumber, vehicleModel, vehicleReg, mileage, extraInfo, postalCode } = req.body;

  const msg = {
    to,
    from,
    subject: subject,
    text: `
      Contact Name: ${contactName}\n
      Contact Number: ${contactNumber}\n
      Vehicle Model: ${vehicleModel}\n
      Vehicle Registration: ${vehicleReg}\n
      Mileage: ${mileage}\n
      Extra Info: ${extraInfo || "No extra info was provided."}\n
      Postal code: ${postalCode}`
  };

  try {
    await sgMail.send(msg);

    res.json({ success: true });
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }

    res.json({ success: false });
  }
};
