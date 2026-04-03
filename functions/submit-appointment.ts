// Cloudflare Pages Function for submitting an appointment
// POST /submit-appointment

export async function onRequestPost({ request, env }: any) {
  try {
    const data = await request.json();
    
    // Here we will add logic:
    // 1. Send email through Resend using env.RESEND_API_KEY
    // 2. Add entry to Google Sheets
    
    return Response.json({ success: true, message: "Appointment request received." }, {
      headers: {
        "content-type": "application/json",
      }
    });
  } catch (error: any) {
    return Response.json({ success: false, error: "Bad Request" }, { status: 400 });
  }
}
