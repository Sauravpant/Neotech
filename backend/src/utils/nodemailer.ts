import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

const sendMail = async (email, otp) => {
  const textContent = `Hi , please use this verification code to verify your account. Your verification code is ${otp}. It will expire in 5 minutes.`;
  const htmlContent = `
    <p>Hi , please use this verification code to verify your account.</p> <p> Your verification code is <b>${otp}</b>.</p>
    <p>It will expire in 5 minutes. Please use it promptly.</p>
  `;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    text: textContent,
    html: htmlContent,
  });
};

export default sendMail;
