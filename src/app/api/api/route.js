import nodemailer from "nodemailer";

export async function POST(req) {
	const { name, email, message } = await req.json();

	if (!name || !email || !message) {
		return new Response(JSON.stringify({ error: "Missing required fields" }), {
			status: 400,
		});
	}

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	const siteMessage = {
		from: `"Home Title Watcher" <${process.env.EMAIL_USER}>`,
		to: "HomeTitleWatcher@gmail.com",
		subject: `New Realtor Review from ${name}`,
		text: `${name} (${email}) submitted a review:\n\n${message}`,
	};

	const confirmationMessage = {
		from: `"Home Title Watcher" <${process.env.EMAIL_USER}>`,
		to: email,
		subject: "Your 50 Promo Codes Are On the Way!",
		text: `Hi ${name},

Thanks for submitting your recommendation for Whatcom Home Title Watcher!

As part of our soft launch, you’ll receive full access to the Whatcom Home Title Watcher app.

Once the soft launch period ends, you’ll also receive 10 free promo codes (a $1,200 value) to share with your clients. Each code provides a 1-year subscription to Whatcom Home Title Watcher, activated when the client signs up.

We’ll notify you as soon as the codes are ready to distribute.

— The Home Title Watcher Team
`,
	};

	try {
		await transporter.sendMail(siteMessage);
		await transporter.sendMail(confirmationMessage);

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		console.error("Email error:", err);
		return new Response(JSON.stringify({ error: "Failed to send email" }), {
			status: 500,
		});
	}
}
