import React, { useState } from 'react';

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FieldName = keyof FormState;

const subjectOptions = [
  'General Enquiry',
  'Exhibition Proposal',
  'Membership / Joining the Collective',
  'Press & Media',
  'Collaboration Proposal',
  'Workshop / Event',
  'Other',
];

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: FieldName, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
        <span className="text-xs tracking-label uppercase font-semibold text-black">Berlin</span>
        <span className="text-kkw-pink">→</span>
        <span className="text-xs tracking-label uppercase text-gray-500">Contact</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-8rem)]">
        {/* Left: address & info */}
        <div className="px-8 py-12 border-b lg:border-b-0 lg:border-r border-black">
          <h2 className="text-2xl font-bold tracking-display uppercase mb-10">Get in Touch</h2>

          <div className="space-y-8">
            <div>
              <span className="block text-xs tracking-label uppercase font-semibold text-kkw-pink mb-2">
                Location
              </span>
              <p className="text-sm text-gray-700 leading-relaxed">
                KreativKraftwerk<br />
                [Address Placeholder]<br />
                Berlin, Germany
              </p>
            </div>

            <div>
              <span className="block text-xs tracking-label uppercase font-semibold text-kkw-pink mb-2">
                General Contact
              </span>
              <a
                href="mailto:hello@kreativkraftwerk.de"
                className="text-sm text-gray-700 hover:text-kkw-pink transition-colors duration-200"
              >
                hello@kreativkraftwerk.de
              </a>
            </div>

            <div>
              <span className="block text-xs tracking-label uppercase font-semibold text-kkw-pink mb-2">
                Press & Media
              </span>
              <a
                href="mailto:press@kreativkraftwerk.de"
                className="text-sm text-gray-700 hover:text-kkw-pink transition-colors duration-200"
              >
                press@kreativkraftwerk.de
              </a>
            </div>

            <div>
              <span className="block text-xs tracking-label uppercase font-semibold text-kkw-pink mb-2">
                Studio Hours
              </span>
              <p className="text-sm text-gray-700 leading-relaxed">
                Tuesday – Friday, 11:00 – 19:00<br />
                Saturday, 12:00 – 17:00<br />
                <span className="text-gray-400">Closed Sunday & Monday</span>
              </p>
            </div>

            <div>
              <span className="block text-xs tracking-label uppercase font-semibold text-kkw-pink mb-3">
                Follow
              </span>
              <div className="flex gap-4">
                {['Instagram', 'Newsletter', 'LinkedIn'].map(platform => (
                  <button
                    key={platform}
                    className="text-xs tracking-label uppercase text-gray-400 hover:text-kkw-pink border-b border-transparent hover:border-kkw-pink transition-all duration-200"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: contact form */}
        <div className="px-8 py-12">
          {submitted ? (
            <div className="flex flex-col items-start justify-center h-full">
              <span className="text-kkw-pink text-xs tracking-label uppercase font-semibold mb-4">Message Sent</span>
              <h3 className="text-2xl font-bold mb-4">Thank you for reaching out.</h3>
              <p className="text-sm text-gray-500 mb-8 max-w-sm">
                We've received your message and will be in touch soon. We look forward to the exchange.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                className="text-xs tracking-label uppercase font-semibold border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors duration-200"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold tracking-display uppercase mb-8">Kontaktformular</h2>

              {/* Name */}
              <div>
                <label className="block text-xs tracking-label uppercase font-semibold mb-2">
                  Name <span className="text-kkw-pink">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder="Your name"
                  className="w-full border-b border-black outline-none py-2 text-sm placeholder-gray-300 focus:border-kkw-pink transition-colors duration-200 bg-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs tracking-label uppercase font-semibold mb-2">
                  Email <span className="text-kkw-pink">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className="w-full border-b border-black outline-none py-2 text-sm placeholder-gray-300 focus:border-kkw-pink transition-colors duration-200 bg-transparent"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs tracking-label uppercase font-semibold mb-2">
                  Subject <span className="text-kkw-pink">*</span>
                </label>
                <select
                  required
                  value={form.subject}
                  onChange={e => handleChange('subject', e.target.value)}
                  className="w-full border-b border-black outline-none py-2 text-sm text-gray-700 focus:border-kkw-pink transition-colors duration-200 bg-transparent appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a subject</option>
                  {subjectOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs tracking-label uppercase font-semibold mb-2">
                  Message <span className="text-kkw-pink">*</span>
                </label>
                <textarea
                  required
                  value={form.message}
                  onChange={e => handleChange('message', e.target.value)}
                  placeholder="Your message…"
                  rows={5}
                  className="w-full border-b border-black outline-none py-2 text-sm placeholder-gray-300 focus:border-kkw-pink transition-colors duration-200 bg-transparent resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 bg-black text-white text-xs tracking-nav uppercase font-semibold px-8 py-3 hover:bg-kkw-pink transition-colors duration-200"
              >
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
