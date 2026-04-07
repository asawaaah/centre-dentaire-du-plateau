import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB
const ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ACCEPTED_EXTENSIONS = ['pdf', 'doc', 'docx'];

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not defined');
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    const formData = await request.formData();
    const firstName = formData.get('firstName') as string | null;
    const lastName = formData.get('lastName') as string | null;
    const email = formData.get('email') as string | null;
    const position = formData.get('position') as string | null;
    const cvFile = formData.get('cv') as File | null;
    const rawLocale = formData.get('locale') as string | null;
    const locale: 'fr' | 'en' = rawLocale === 'en' ? 'en' : 'fr';

    if (!firstName || !lastName || !email || !position) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!cvFile || cvFile.size === 0) {
      return NextResponse.json({ error: 'CV file is required' }, { status: 400 });
    }

    if (cvFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 });
    }

    const ext = cvFile.name.split('.').pop()?.toLowerCase() ?? '';
    if (!ACCEPTED_EXTENSIONS.includes(ext) && !ACCEPTED_TYPES.includes(cvFile.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    const cvBuffer = Buffer.from(await cvFile.arrayBuffer());
    const fullName = `${firstName} ${lastName}`;
    const resend = new Resend(process.env.RESEND_API_KEY);

    const confirmationSubject = locale === 'en'
      ? 'We received your application – Centre Dentaire du Plateau'
      : 'Nous avons bien reçu votre candidature – Centre Dentaire du Plateau';

    const confirmationHtml = locale === 'en' ? `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #171d1d; background-color: #f5fafa; padding: 40px; border-radius: 12px; border: 1px solid #eff5f5;">
        <h2 style="color: #006a66; margin-bottom: 16px; font-weight: bold;">Thank you, ${firstName}!</h2>
        <p style="line-height: 1.6; margin: 0 0 16px;">We have received your application for the position of <strong>${position}</strong>.</p>
        <p style="line-height: 1.6; margin: 0 0 24px;">We review every application carefully and will get in touch with you if an opportunity matching your profile becomes available.</p>
        <p style="line-height: 1.6; margin: 0;">Thank you for your interest in joining our team.</p>
        <hr style="border: none; border-top: 1px solid #eff5f5; margin: 32px 0;" />
        <p style="font-size: 12px; color: #666; text-align: center; margin: 0;">Centre Dentaire du Plateau · 1357 Avenue du Mont-Royal Est, Montréal · 514 528-1587</p>
      </div>
    ` : `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #171d1d; background-color: #f5fafa; padding: 40px; border-radius: 12px; border: 1px solid #eff5f5;">
        <h2 style="color: #006a66; margin-bottom: 16px; font-weight: bold;">Merci, ${firstName} !</h2>
        <p style="line-height: 1.6; margin: 0 0 16px;">Nous avons bien reçu votre candidature pour le poste de <strong>${position}</strong>.</p>
        <p style="line-height: 1.6; margin: 0 0 24px;">Nous étudions chaque candidature avec soin et vous contacterons si une opportunité correspondant à votre profil se présente.</p>
        <p style="line-height: 1.6; margin: 0;">Merci de l'intérêt que vous portez à notre équipe.</p>
        <hr style="border: none; border-top: 1px solid #eff5f5; margin: 32px 0;" />
        <p style="font-size: 12px; color: #666; text-align: center; margin: 0;">Centre Dentaire du Plateau · 1357 Avenue du Mont-Royal Est, Montréal · 514 528-1587</p>
      </div>
    `;

    const [notificationResult, confirmationResult] = await Promise.all([
      resend.emails.send({
        from: 'Centre Dentaire du Plateau <ne-pas-repondre@dentisteplateau.com>',
        to: ['asawauno@gmail.com', 'info@dentisteplateau.com'],
        replyTo: email,
        subject: `Nouvelle candidature : ${fullName} — ${position}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #171d1d; background-color: #f5fafa; padding: 40px; border-radius: 12px; border: 1px solid #eff5f5;">
            <h2 style="color: #006a66; margin-bottom: 24px; font-weight: bold;">Nouvelle candidature reçue</h2>
            <div style="margin-bottom: 24px;">
              <p style="margin: 8px 0;"><strong>Nom :</strong> ${fullName}</p>
              <p style="margin: 8px 0;"><strong>Email :</strong> ${email}</p>
              <p style="margin: 8px 0;"><strong>Poste recherché :</strong> ${position}</p>
            </div>
            <p style="margin: 0; color: #666; font-size: 13px;">Le CV est joint à cet email.</p>
            <hr style="border: none; border-top: 1px solid #eff5f5; margin: 32px 0;" />
            <p style="font-size: 12px; color: #666; text-align: center; margin: 0;">Cet email a été envoyé depuis le formulaire de carrière du site Centre Dentaire du Plateau.</p>
          </div>
        `,
        attachments: [
          {
            filename: cvFile.name,
            content: cvBuffer,
          },
        ],
      }),
      resend.emails.send({
        from: 'Centre Dentaire du Plateau <ne-pas-repondre@dentisteplateau.com>',
        to: [email],
        replyTo: 'info@dentisteplateau.com',
        subject: confirmationSubject,
        html: confirmationHtml,
      }).catch((err) => {
        console.error('Carriere confirmation email error:', err);
        return { data: null, error: err };
      }),
    ]);

    if (confirmationResult.error) {
      console.error('Carriere confirmation email failed:', confirmationResult.error);
    }

    if (notificationResult.error) {
      console.error('Carriere notification email error:', notificationResult.error);
      return NextResponse.json({ error: notificationResult.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Carriere server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
