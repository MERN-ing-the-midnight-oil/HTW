"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		affiliation: "",
		message: "",
	});
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch("/api/review", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		if (res.ok) {
			setSubmitted(true);
			setFormData({ name: "", email: "", affiliation: "", message: "" });
		}
	};

	return (
		<main className={styles.main}>
			<h1 className={styles.title}>Whatcom Home Title Watcher</h1>
			<p className={styles.subtitle}>
				Property title monitoring designed for real estate professionals.
			</p>

			<section className={styles.section}>
				<p>
					As a realtor, your clients trust you to protect their interests—even
					after closing. Title fraud is an emerging threat, and it doesn’t stop
					at identity theft. A forged deed or lien could go undetected for weeks
					or months—unless someone is watching.
				</p>
				<p>
					<strong>Whatcom Home Title Watcher</strong> checks the county's public
					property records every day. If a new document is filed against your
					client’s home, we send a real-time alert—often the same day.
				</p>
			</section>

			<section className={styles.section}>
				<h2>Endorsement Example</h2>
				<blockquote className={styles.quote}>
					“My client did a title transfer here in Whatcom County and I received
					a notification email from HomeTitleWatcher within hours of the
					transfer. Home Title Watcher really is watching!”
					<br /> — Jane Escrow, Dream Home Realty, Bellingham WA
				</blockquote>
			</section>

			<section className={styles.section}>
				<h2>Realtor Offer</h2>
				<p>
					Submit a short recommendation below and receive{" "}
					<strong>50 promo codes</strong> to give your home-buying clients. Each
					code grants one year of title monitoring at no cost—a $120 value.
				</p>

				{!submitted ? (
					<form
						className={styles.form}
						onSubmit={handleSubmit}>
						<label>
							Name
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</label>
						<label>
							Email
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</label>
						<label>
							Affiliation (e.g. Realty Office or Brokerage)
							<input
								type="text"
								name="affiliation"
								value={formData.affiliation}
								onChange={handleChange}
								required
							/>
						</label>
						<label>
							Your Endorsement or Feedback
							<textarea
								name="message"
								value={formData.message}
								onChange={handleChange}
								required
							/>
						</label>
						<button type="submit">Submit Recommendation</button>
					</form>
				) : (
					<p className={styles.confirmation}>
						Thank you! Your submission has been received. You’ll receive a
						confirmation email shortly.
					</p>
				)}
			</section>

			<footer className={styles.footer}>
				<p>© {new Date().getFullYear()} Whatcom Home Title Watcher</p>
			</footer>
		</main>
	);
}
