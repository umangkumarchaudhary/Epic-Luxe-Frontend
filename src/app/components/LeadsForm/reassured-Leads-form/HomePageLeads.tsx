import React, { useState } from 'react';

const HomePageLeads = () => {
	const [form, setForm] = useState({
		name: '',
		phone: '',
		email: '',
		model: '',
		message: '',
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		// Simulate API call
		setTimeout(() => {
			setLoading(false);
			setSuccess(true);
		}, 1200);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
			<form
				className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border border-gray-900"
				style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)', margin: '0 auto' }}
				onSubmit={handleSubmit}
			>
				<h2 className="text-2xl font-extrabold text-black mb-2 tracking-wide text-center" style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '0.08em' }}>
					Get Connected
				</h2>
				<div className="flex flex-col gap-4">
					<input
						type="text"
						name="name"
						value={form.name}
						onChange={handleChange}
						placeholder="Full Name"
						required
						className="px-4 py-3 rounded-lg bg-black text-white border border-gray-800 focus:border-gray-500 focus:outline-none font-medium text-base placeholder-gray-400 transition-all duration-200"
						style={{ fontFamily: 'Manrope, sans-serif' }}
					/>
					<input
						type="tel"
						name="phone"
						value={form.phone}
						onChange={handleChange}
						placeholder="Phone Number"
						required
						pattern="[0-9]{10}"
						className="px-4 py-3 rounded-lg bg-black text-white border border-gray-800 focus:border-gray-500 focus:outline-none font-medium text-base placeholder-gray-400 transition-all duration-200"
						style={{ fontFamily: 'Manrope, sans-serif' }}
					/>
					<input
						type="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						placeholder="Email Address"
						className="px-4 py-3 rounded-lg bg-black text-white border border-gray-800 focus:border-gray-500 focus:outline-none font-medium text-base placeholder-gray-400 transition-all duration-200"
						style={{ fontFamily: 'Manrope, sans-serif' }}
					/>
					<input
						type="text"
						name="model"
						value={form.model}
						onChange={handleChange}
						placeholder="Mercedes-Benz Model (e.g. S-Class)"
						className="px-4 py-3 rounded-lg bg-black text-white border border-gray-800 focus:border-gray-500 focus:outline-none font-medium text-base placeholder-gray-400 transition-all duration-200"
						style={{ fontFamily: 'Manrope, sans-serif' }}
					/>
					<textarea
						name="message"
						value={form.message}
						onChange={handleChange}
						placeholder="Your Message (optional)"
						rows={3}
						className="px-4 py-3 rounded-lg bg-black text-white border border-gray-800 focus:border-gray-500 focus:outline-none font-medium text-base placeholder-gray-400 transition-all duration-200 resize-none"
						style={{ fontFamily: 'Manrope, sans-serif' }}
					/>
				</div>
				<button
					type="submit"
					disabled={loading}
					className="w-full py-3 rounded-lg bg-gradient-to-r from-black via-gray-900 to-white text-white font-bold text-lg tracking-wide shadow-lg hover:from-white hover:to-black hover:text-black transition-all duration-300 border border-gray-900"
					style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '0.08em' }}
				>
					{loading ? 'Submitting...' : 'Submit Lead'}
				</button>
				<div className="text-xs text-gray-500 text-center mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
					By submitting, you agree with our <a href="https://dummy-privacy-url.com" className="underline text-black hover:text-gray-700">Privacy Policy</a> and <a href="https://dummy-terms-url.com" className="underline text-black hover:text-gray-700">Terms of Use</a>.
				</div>
				<button
					type="button"
					className="w-full py-3 rounded-lg bg-gradient-to-r from-white via-gray-900 to-black text-black font-bold text-lg tracking-wide shadow-lg hover:from-black hover:to-white hover:text-white transition-all duration-300 border border-gray-900 mt-2"
					style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '0.08em' }}
					onClick={() => window.location.href = 'tel:+919999999999'}
				>
					Skip Queuing, Call Now
				</button>
				{success && (
					<div className="text-green-600 text-center font-semibold mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
						Thank you! We will reach out to you soon.
					</div>
				)}
			</form>
			<style jsx global>{`
				body { overflow: hidden !important; }
			`}</style>
		</div>
	);
};

export default HomePageLeads;
