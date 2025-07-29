import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // 1. Récupération et validation des données
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis." },
        { status: 400 }
      );
    }

    // 2. Vérification des variables d'environnement
    if (!process.env.GMAIL_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error("Configuration SMTP manquante.");
    }

    // 3. Configuration de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 4. Template HTML de l'email (version responsive)
    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; }
        .header { background-color: #f97316; padding: 25px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 24px; }
        .content { padding: 25px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-top: none; }
        .detail { margin-bottom: 16px; }
        .detail strong { color: #4F46E5; display: inline-block; width: 90px; font-weight: 600; }
        .message { white-space: pre-line; background: white; padding: 15px; border: 1px solid #e5e7eb; margin-top: 10px; }
        .footer { margin-top: 25px; text-align: center; font-size: 12px; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Nouveau message de contact pour la societé Palotem sarl</h1>
      </div>
      <div class="content">
        <div class="detail"><strong>Nom :</strong> ${name}</div>
        <div class="detail"><strong>Email :</strong> <a href="mailto:${email}">${email}</a></div>
        ${phone ? `<div class="detail"><strong>Téléphone :</strong> <a href="tel:${phone}">${phone}</a></div>` : ''}
        <div class="detail"><strong>Sujet :</strong> ${subject}</div>
        <div class="detail">
          <strong>Message :</strong>
          <div class="message">${message}</div>
        </div>
      </div>
      <div class="footer">
        <p>Message envoyé depuis le formulaire de contact de votre site</p>
        <p>© ${new Date().getFullYear()} ${process.env.SITE_NAME || 'Votre Entreprise'}</p>
      </div>
    </body>
    </html>
    `;

    // 5. Envoi de l'email
    await transporter.sendMail({
      from: `"Formulaire de Contact" <${process.env.GMAIL_EMAIL}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL || process.env.GMAIL_EMAIL,
      subject: `[Contact] ${subject}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du message." },
      { status: 500 }
    );
  }
}

// Blocage des méthodes non autorisées
export async function GET() {
  return NextResponse.json(
    { error: "Méthode non autorisée." },
    { status: 405 }
  );
}