"use client";

import { useState } from "react";

type FormData = {
	fullName: string;
	subject: string;
	email: string;
	message: string;
};

type FormErrors = {
	fullName?: string;
	subject?: string;
	email?: string;
	message?: string;
};

export default function ContactPage() {
	const [formData, setFormData] = useState<FormData>({
		fullName: "",
		subject: "",
		email: "",
		message: "",
	});

	const [errors, setErrors] = useState<FormErrors>({});
	const [successMessage, setSuccessMessage] = useState("");

	function validateForm() {
		const newErrors: FormErrors = {};

		if (formData.fullName.trim().length < 3) {
			newErrors.fullName = "Full name must be at least 3 characters.";
		}

		if (formData.subject.trim().length < 3) {
			newErrors.subject = "Subject must be at least 3 characters.";
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			newErrors.email = "Please enter a valid email address.";
		}

		if (formData.message.trim().length < 10) {
			newErrors.message = "Message must be at least 10 characters.";
		}

		return newErrors;
	}

	function handleChange(
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) {
		const { name, value } = event.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const validationErrors = validateForm();
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			setSuccessMessage("Form submitted successfully.");
			setFormData({
				fullName: "",
				subject: "",
				email: "",
				message: "",
			});
		} else {
			setSuccessMessage("");
		}
	}

	return (
		<main className="p-6 max-w-xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">Contact</h1>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="fullName" className="block mb-1">
						Full Name
					</label>
					<input
						id="fullName"
						name="fullName"
						type="text"
						value={formData.fullName}
						onChange={handleChange}
						className="w-full border p-2 rounded"
					/>
					{errors.fullName && (
						<p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
					)}
				</div>

				<div>
					<label htmlFor="subject" className="block mb-1">
						Subject
					</label>
					<input
						id="subject"
						name="subject"
						type="text"
						value={formData.subject}
						onChange={handleChange}
						className="w-full border p-2 rounded"
					/>
					{errors.subject && (
						<p className="text-red-600 text-sm mt-1">{errors.subject}</p>
					)}
				</div>

				<div>
					<label htmlFor="email" className="block mb-1">
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
						className="w-full border p-2 rounded"
					/>
					{errors.email && (
						<p className="text-red-600 text-sm mt-1">{errors.email}</p>
					)}
				</div>

				<div>
					<label htmlFor="message" className="block mb-1">
						Message
					</label>
					<textarea
						id="message"
						name="message"
						value={formData.message}
						onChange={handleChange}
						className="w-full border p-2 rounded min-h-[120px]"
					/>
					{errors.message && (
						<p className="text-red-600 text-sm mt-1">{errors.message}</p>
					)}
				</div>

				<button type="submit" className="border px-4 py-2 rounded">
					Submit
				</button>

				{successMessage && (
					<p className="text-green-600 mt-4">{successMessage}</p>
				)}
			</form>
		</main>
	);
}
