//--
import sgMail from "@sendgrid/mail";
import "dotenv/config";

const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;

const sendEmail = (data) => {
  const email = { ...data, from: SENDGRID_EMAIL };
  return sgMail.send(email);
 
};

sgMail.setApiKey(SENDGRID_API_KEY);

export default sendEmail;

// sgMail
//   .send(emeil)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

// //--UKR.NET
// import nodemailer from "nodemailer";
// import "dotenv/config";
// const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: "smtp.ukr.net",
//   port: 465, // 25, 2525
//   secure: true,
//   auth: {
//     user: UKR_NET_EMAIL,
//     pass: UKR_NET_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   from: UKR_NET_EMAIL,
//   to: "wimav52416@gienig.com",
//   subject: "Test email",
//   html: "<p><strong>Test emeil</strong> from localhost:3000</p>",
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));
