import { NextResponse, after } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

async function logToExcel(data: {
  submittedAt: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  message: string;
}) {
  const tenantId = process.env.MS_TENANT_ID;
  const clientId = process.env.MS_CLIENT_ID;
  const clientSecret = process.env.MS_CLIENT_SECRET;
  const userId = process.env.MS_USER_ID;

  if (!tenantId || !clientId || !clientSecret || !userId) return;

  const tokenRes = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'https://graph.microsoft.com/.default',
      }),
    }
  );

  const { access_token } = await tokenRes.json();

  await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(userId)}/drive/root:/Formulaire%20RDV.xlsx:/workbook/tables/RDV/rows/add`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [[
          data.submittedAt,
          data.name,
          data.email,
          data.phone,
          data.preferredDate,
          data.message,
        ]],
      }),
    }
  );
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not defined');
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, phone, date, message, locale: rawLocale } = await request.json();
    const locale: 'fr' | 'en' = rawLocale === 'en' ? 'en' : 'fr';

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const logoPath = path.join(process.cwd(), 'public', 'images', 'logo-centre-dentaire-plateau-400px.png');
    const logoContent = fs.readFileSync(logoPath);

    const formattedDate = date
      ? new Date(date).toLocaleDateString(locale === 'en' ? 'en-CA' : 'fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })
      : null;

    const confirmationSubject = locale === 'en'
      ? 'We received your request – Centre Dentaire du Plateau'
      : 'Nous avons bien reçu votre demande – Centre Dentaire du Plateau';

    const confirmationHtml = locale === 'en' ? `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #171d1d; background-color: #f5fafa; padding: 40px; border-radius: 12px; border: 1px solid #eff5f5;">
        <img src="cid:logo" alt="Centre Dentaire du Plateau" style="height: 60px; margin-bottom: 28px; display: block;" />
        <h2 style="color: #006a66; margin-bottom: 16px; font-weight: bold;">Thank you, ${name}!</h2>
        <p style="line-height: 1.6; margin: 0 0 16px;">We have received your message and will get back to you as soon as possible.</p>
        <p style="line-height: 1.6; margin: 0 0 24px;">If you have any questions, feel free to reply to this email or call us at <strong>514 528-1587</strong>.</p>
        <div style="background-color: white; padding: 24px; border-radius: 8px; border: 1px solid #eff5f5; margin-bottom: 24px;">
          <h3 style="color: #006a66; margin-top: 0; margin-bottom: 12px; font-size: 15px;">Summary of your request</h3>
          ${formattedDate ? `<p style="margin: 6px 0;"><strong>Preferred date:</strong> ${formattedDate}</p>` : ''}
          <p style="margin: 6px 0 12px;"><strong>Your message:</strong></p>
          <p style="margin: 0; line-height: 1.6; white-space: pre-wrap; color: #444;">${message}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #eff5f5; margin: 32px 0;" />
        <p style="font-size: 12px; color: #666; text-align: center; margin: 0;">Centre Dentaire du Plateau · 1357 Avenue du Mont-Royal Est, Montréal · 514 528-1587</p>
      </div>
    ` : `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #171d1d; background-color: #f5fafa; padding: 40px; border-radius: 12px; border: 1px solid #eff5f5;">
        <img src="cid:logo" alt="Centre Dentaire du Plateau" style="height: 60px; margin-bottom: 28px; display: block;" />
        <h2 style="color: #006a66; margin-bottom: 16px; font-weight: bold;">Merci, ${name} !</h2>
        <p style="line-height: 1.6; margin: 0 0 16px;">Nous avons bien reçu votre message et nous vous contacterons dans les plus brefs délais.</p>
        <p style="line-height: 1.6; margin: 0 0 24px;">Si vous avez des questions, n'hésitez pas à répondre à ce courriel ou à nous appeler au <strong>514 528-1587</strong>.</p>
        <div style="background-color: white; padding: 24px; border-radius: 8px; border: 1px solid #eff5f5; margin-bottom: 24px;">
          <h3 style="color: #006a66; margin-top: 0; margin-bottom: 12px; font-size: 15px;">Récapitulatif de votre demande</h3>
          ${formattedDate ? `<p style="margin: 6px 0;"><strong>Date souhaitée :</strong> ${formattedDate}</p>` : ''}
          <p style="margin: 6px 0 12px;"><strong>Votre message :</strong></p>
          <p style="margin: 0; line-height: 1.6; white-space: pre-wrap; color: #444;">${message}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #eff5f5; margin: 32px 0;" />
        <p style="font-size: 12px; color: #666; text-align: center; margin: 0;">Centre Dentaire du Plateau · 1357 Avenue du Mont-Royal Est, Montréal · 514 528-1587</p>
      </div>
    `;

    const [{ data, error }, confirmationResult] = await Promise.all([
      resend.emails.send({
        from: 'Centre Dentaire du Plateau <ne-pas-repondre@dentisteplateau.com>',
        to: ['asawauno@gmail.com', 'info@dentisteplateau.com'],
        replyTo: email,
        subject: `Nouveau message de contact: ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #171d1d; background-color: #f5fafa; padding: 40px; border-radius: 12px; border: 1px solid #eff5f5;">
            <h2 style="color: #006a66; margin-bottom: 24px; font-weight: bold;">Nouveau message de contact</h2>

            <div style="margin-bottom: 24px;">
              <p style="margin: 8px 0;"><strong>Nom:</strong> ${name}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 8px 0;"><strong>Téléphone:</strong> ${phone || 'Non renseigné'}</p>
              <p style="margin: 8px 0;"><strong>Date souhaitée:</strong> ${date ? new Date(date).toLocaleDateString('en-GB') : 'Non renseignée'}</p>
            </div>

            <div style="background-color: white; padding: 24px; border-radius: 8px; border: 1px solid #eff5f5;">
              <h3 style="color: #006a66; margin-top: 0; margin-bottom: 12px; font-size: 16px;">Message :</h3>
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>

            <hr style="border: none; border-top: 1px solid #eff5f5; margin: 32px 0;" />
            <p style="font-size: 12px; color: #666; text-align: center; margin: 0;">Cet email a été envoyé depuis le formulaire de contact du site Centre Dentaire du Plateau.</p>
          </div>
        `,
      }),
      resend.emails.send({
        from: 'Centre Dentaire du Plateau <ne-pas-repondre@dentisteplateau.com>',
        to: [email],
        replyTo: 'info@dentisteplateau.com',
        subject: confirmationSubject,
        html: confirmationHtml,
        attachments: [
          {
            filename: 'logo.png',
            content: logoContent,
            contentId: 'logo',
          },
        ],
      }).catch((err) => {
        console.error('Confirmation email error:', err);
        return { data: null, error: err };
      }),
    ]);

    if (confirmationResult.error) {
      console.error('Confirmation email failed:', confirmationResult.error);
    }

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const logData = {
      submittedAt: new Date().toISOString(),
      name,
      email,
      phone: phone || '',
      preferredDate: date || '',
      message,
    };

    after(async () => {
      await Promise.all([
        process.env.GOOGLE_SHEETS_WEBHOOK_URL && process.env.GOOGLE_SHEETS_WEBHOOK_SECRET
          ? fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ secret: process.env.GOOGLE_SHEETS_WEBHOOK_SECRET, ...logData }),
          }).catch((err) => console.error('Google Sheets logging failed:', err))
          : Promise.resolve(),
        logToExcel(logData).catch((err) => console.error('Excel logging failed:', err)),
      ]);
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
