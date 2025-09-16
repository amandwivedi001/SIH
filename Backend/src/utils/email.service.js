import nodemailer from 'nodemailer';

// Create a reusable transporter object using OAuth 2.0
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  },
});

/**
 * Sends an OTP email to the user using OAuth2.
 * @param {string} to - The recipient's email address.
 * @param {string} otp - The one-time password.
 */
const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: `RouteX <${process.env.EMAIL_USER}>`,
    to: to,
    subject: 'Your One-Time Password (OTP)',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
        <h2>OTP Verification</h2>
        <p>Your One-Time Password is:</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #007BFF;">${otp}</p>
        <p>This OTP is valid for 10 minutes.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent successfully to ${to}`);
  } catch (error) {
    console.error(`❌ Error sending email:`, error);
    throw new Error('Could not send OTP email.');
  }
};

export { sendOtpEmail }