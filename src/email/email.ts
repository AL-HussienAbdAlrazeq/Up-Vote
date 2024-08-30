import jwt from "jsonwebtoken";

import nodemailer from "nodemailer";
import { emailHtml } from "./emailHtml";
export const sendEmail = async (email: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hessenabdalrazek1@gmail.com",
      pass: "okwk pxjv uwio plaj",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  jwt.sign(
    { email },
    "my-secret-key",
    { expiresIn: "5m" },
    async(err,token) => {
      const info = await transporter.sendMail({
        from: '"Up-Vote" <hessenabdalrazek1@gmail.com>',
        to: email,
        subject: "🧙‍♂️Verify Account",
        html: emailHtml(token),
      });
    }
  );
};
