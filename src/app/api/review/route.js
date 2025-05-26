import nodemailer from "nodemailer";

export async function POST(req) {
	const { name, email, affiliation, message } = await req.json();

	if (!name || !email || !affiliation || !message) {
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

	const internalMessage = {
		from: `"Whatcom Home Title Watcher" <${process.env.EMAIL_USER}>`,
		to: "HomeTitleWatcher@gmail.com",
		subject: `New Realtor Review: ${name}`,
		text: `${name} (${email}) from ${affiliation} submitted a recommendation:\n\n${message}`,
	};

	const confirmationMessage = {
		from: `"Whatcom Home Title Watcher" <${process.env.EMAIL_USER}>`,
		to: email,
		subject: "Thank you for your recommendation!",
		text: `Hi ${name},

Thanks for submitting your recommendation for Whatcom Home Title Watcher.

As promised, you’ll receive 50 promo codes good for one year of app access—a $120 value—to give to your home-buying clients.

If you have questions, reply to this email.

– The Home Title Watcher Team
`,
	};

	try {
		await transporter.sendMail(internalMessage);
		await transporter.sendMail(confirmationMessage);

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		console.error("Error sending email:", err);
		return new Response(JSON.stringify({ error: "Failed to send email" }), {
			status: 500,
		});
	}
}
