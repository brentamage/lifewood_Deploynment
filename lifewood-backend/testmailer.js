const { sendEmail } = require('./utils/mailer');

(async () => {
  try {
    await sendEmail('your.email@gmail.com', 'Test Email', 'This is a test from your Lifewood project!');
    console.log('✅ Test email sent successfully!');
  } catch (err) {
    console.error('❌ Failed to send test email:', err.message);
  }
})();
