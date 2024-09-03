// emailService.js (in your backend)

const nodemailer = require('nodemailer');

const sendUserCredentials = async (user) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or your email service
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: user.emailid,
    subject: 'Your User Credentials',
    text: `
      Hello ${user.username},

      Your account has been created with the following credentials:

      User ID: ${user.userid}
      Password: ${user.password}

      Please use these credentials to log in.

      Regards,
      Your Company Name
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendUserCredentials;
