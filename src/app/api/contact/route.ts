import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export async function POST(req: Request) {
  const data: ContactForm = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Site Contact" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_USER,
    subject: `Message de ${data.name} - ${data.subject}`,
    html: `
      <p><strong>Nom :</strong> ${data.name}</p>
      <p><strong>Email :</strong> ${data.email}</p>
      <p><strong>Téléphone :</strong> ${data.phone}</p>
      <p><strong>Sujet :</strong> ${data.subject}</p>
      <p><strong>Message :</strong><br />${data.message}</p>
    `
  };
  
  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error("Erreur inconnue :", err);
  }
  return NextResponse.json({ error: 'Échec de l’envoi' }, { status: 500 });
}
}
