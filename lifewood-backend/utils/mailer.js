const nodemailer = require('nodemailer');
require('dotenv').config(); // load env vars

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your email user from .env
    pass: process.env.EMAIL_PASS  // your email password from .env
  }
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to,                           // list of receivers
      subject,                      // Subject line
      text                          // plain text body
    });
    console.log('Email sent: ', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmail };
