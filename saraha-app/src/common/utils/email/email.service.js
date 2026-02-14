import nodemailer from "nodemailer";
import { EMAIL_PASSWORD, EMAIL_SERVICE, EMAIL_USER } from "../../../../config/config.service.js";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: EMAIL_SERVICE ?? "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });
};

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    html,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messsage: info.messageId };
  } catch (error) {
    throw new Error("Failed to send email");
  }
}

  export const sendOtpEmail = async (email, otp) => {
    const subject = "Verify your email";
    const html = `
        <h1>Verify your email</h1>
        <p>Please click on the link below to verify your email</p>
        <a href="https://localhost:3000/verify/${otp}">Verify Email</a>
        <p>If you did not request this email, please ignore this message.</p>
        <p>Thanks Saraha App</p>
    `;
  return await sendEmail({ to: email, subject, html });
};
