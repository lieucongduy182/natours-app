import nodemailer from 'nodemailer';

export const sendMail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'Cris-DuyLC <cris-duylc@gmail.com>',
    to: email,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};
