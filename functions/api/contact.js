import { Resend } from "resend";

export async function onRequestPost(context) {
  try {
    const resend = new Resend(context.env.RESEND_API_KEY);
    const body = await context.request.json();

    const firstname = body.firstname?.trim();
    const email = body.email?.trim();
    const tel = body.tel?.trim();
    const message = body.message?.trim();

    if (!firstname || !email || !tel || !message) {
      return Response.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
    from: context.env.FROM_EMAIL,
    to: [context.env.TO_EMAIL],
    replyTo: email,
    subject: `New Contact Form Submission from ${firstname}`,
    html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${firstname}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Telephone:</strong> ${tel}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br>")}</p>
  `,
});
    if (error) {
      return Response.json(
        { error: "Failed to send email." },
        { status: 500 }
      );
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    return Response.json(
      { error: err?.message || "Server error." },
      { status: 500 }
    );
  }
}