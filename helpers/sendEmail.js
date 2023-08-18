
import sgMail from "@sendgrid/mail";
import "dotenv/config";

const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;

const sendEmail = (data) => {
  const email = { ...data, from: SENDGRID_EMAIL };
  return sgMail.send(email);
 
};

sgMail.setApiKey(SENDGRID_API_KEY);

export default sendEmail;

