import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';

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
    const { name, email, phone, date, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
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
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL && process.env.GOOGLE_SHEETS_WEBHOOK_SECRET) {
      fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.GOOGLE_SHEETS_WEBHOOK_SECRET,
          submittedAt: new Date().toISOString(),
          name,
          email,
          phone: phone || '',
          preferredDate: date || '',
          message,
        }),
      }).catch((err) => console.error('Google Sheets logging failed:', err));
    }

    logToExcel({
      submittedAt: new Date().toISOString(),
      name,
      email,
      phone: phone || '',
      preferredDate: date || '',
      message,
    }).catch((err) => console.error('Excel logging failed:', err));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
