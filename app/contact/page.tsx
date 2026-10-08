"use client";

import { useState } from "react";
import { Mail, MessageCircle, Camera, Phone, MapPin, Send, AlertCircle } from "lucide-react";

const WHATSAPP_NUMBER = "918466974408";

type FormState = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  honeypot: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
  honeypot: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitType, setSubmitType] = useState<"email" | "whatsapp" | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitType("email");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setErrorMessage(null);
        setForm(EMPTY_FORM);
        setTimeout(() => setIsSubmitted(false), 8000);
      } else {
        setErrorMessage(
          data.error || "Failed to send email. Please check your information or try WhatsApp."
        );
      }
    } catch {
      setErrorMessage(
        "Network connection error. Please check your internet connection or use WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
      setSubmitType(null);
    }
  }

  function handleWhatsAppSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setErrorMessage(null);

    // Validate required fields
    if (!form.name || !form.email || !form.service || !form.budget || !form.message) {
      const formEl = document.getElementById("contactForm") as HTMLFormElement;
      if (formEl) formEl.reportValidity();
      return;
    }

    setIsSubmitting(true);
    setSubmitType("whatsapp");

    const text =
      "*New Project Request - SLRJ Digital*\n\n" +
      "*Name:* " + form.name + "\n" +
      "*Business:* " + (form.businessName || "N/A") + "\n" +
      "*Email:* " + form.email + "\n" +
      "*Phone:* " + (form.phone || "N/A") + "\n" +
      "*Service:* " + form.service + "\n" +
      "*Budget:* " + form.budget + "\n\n" +
      "*Project Details:*\n" + form.message;

    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
    window.open(url, "_blank");

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmitType(null);
      setForm(EMPTY_FORM);
      setTimeout(() => setIsSubmitted(false), 8000);
    }, 500);
  }

  const inputClass =
    "w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors";

  return (
    <section className="pt-28 sm:pt-32 pb-16 sm:pb-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            Let&apos;s Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Together.</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400">
            Tell us about your project and we&apos;ll get back to you with a proposal.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

          {/* ─── Left: Contact Info ─── */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            <div className="glass-card p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-5">

                <a
                  href="mailto:slrj.digital@gmail.com"
                  className="flex items-center text-gray-300 hover:text-purple-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-4 group-hover:bg-purple-500/10 shrink-0">
                    <Mail size={18} />
                  </div>
                  slrj.digital@gmail.com
                </a>

                <a
                  href="tel:+918466974408"
                  className="flex items-center text-gray-300 hover:text-purple-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-4 group-hover:bg-purple-500/10 shrink-0">
                    <Phone size={18} />
                  </div>
                  +91 84669 74408
                </a>

                <a
                  href="https://wa.me/918466974408"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-purple-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-4 group-hover:bg-purple-500/10 shrink-0">
                    <MessageCircle size={18} />
                  </div>
                  WhatsApp Message
                </a>

                <a
                  href="https://instagram.com/slrj_digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-purple-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-4 group-hover:bg-purple-500/10 shrink-0">
                    <Camera size={18} />
                  </div>
                  @slrj_digital
                </a>

                <div className="flex items-center text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-4 shrink-0 text-cyan-400">
                    <MapPin size={18} />
                  </div>
                  Andhra Pradesh, India
                </div>

              </div>
            </div>

            {/* Follow card */}
            <div className="glass-card p-8 bg-gradient-to-br from-white/5 to-purple-500/5 border-purple-500/20">
              <h3 className="text-lg font-bold mb-2">Follow us on Instagram</h3>
              <p className="text-sm text-gray-400 mb-4">
                Web development tips, behind-the-scenes and project showcases.
              </p>
              <a
                href="https://instagram.com/slrj_digital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 text-sm font-medium hover:underline"
              >
                @slrj_digital &rarr;
              </a>
            </div>
          </div>

          {/* ─── Right: Form ─── */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 sm:p-8 md:p-10">

              {isSubmitted ? (
                /* Success state */
                <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-6">
                    <Send size={32} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Message Received!</h3>
                  <p className="text-gray-400 max-w-md leading-relaxed">
                    Thank you for reaching out to SLRJ Digital. We have received your message and sent a confirmation to your email. We will get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                /* Form */
                <form id="contactForm" onSubmit={handleEmailSubmit} className="space-y-6">

                  {/* Hidden Honeypot Field for Spam Protection */}
                  <input
                    type="text"
                    id="honeypot"
                    name="honeypot"
                    value={form.honeypot}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Error Notification Banner */}
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-3 animate-fadeIn">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-red-200 mb-0.5">Submission Error</p>
                        <p>{errorMessage}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setErrorMessage(null)}
                        className="text-red-400 hover:text-white font-bold text-lg leading-none"
                        aria-label="Dismiss error"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-300">
                        Name <span className="text-purple-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="businessName" className="text-sm font-medium text-gray-300">
                        Business Name
                      </label>
                      <input
                        id="businessName"
                        type="text"
                        value={form.businessName}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Company Inc."
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-300">
                        Email Address <span className="text-purple-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-gray-300">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="service" className="text-sm font-medium text-gray-300">
                        Service Needed <span className="text-purple-400">*</span>
                      </label>
                      <select
                        id="service"
                        required
                        value={form.service}
                        onChange={handleChange}
                        className={inputClass + " appearance-none cursor-pointer"}
                      >
                        <option value="" disabled className="bg-[#0A0D14]">Select a service</option>
                        <option value="Business Website"    className="bg-[#0A0D14]">Business Website</option>
                        <option value="E-Commerce"          className="bg-[#0A0D14]">E-Commerce</option>
                        <option value="Web Application"     className="bg-[#0A0D14]">Web Application</option>
                        <option value="UI/UX Design"        className="bg-[#0A0D14]">UI/UX Design</option>
                        <option value="Website Maintenance" className="bg-[#0A0D14]">Website Maintenance</option>
                        <option value="Other"               className="bg-[#0A0D14]">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="budget" className="text-sm font-medium text-gray-300">
                        Estimated Budget <span className="text-purple-400">*</span>
                      </label>
                      <select
                        id="budget"
                        required
                        value={form.budget}
                        onChange={handleChange}
                        className={inputClass + " appearance-none cursor-pointer"}
                      >
                        <option value="" disabled className="bg-[#0A0D14]">Select budget range</option>
                        <option value="Under ₹10,000"       className="bg-[#0A0D14]">Under ₹10,000</option>
                        <option value="₹10,000 – ₹25,000"   className="bg-[#0A0D14]">₹10,000 – ₹25,000</option>
                        <option value="₹25,000 – ₹50,000"   className="bg-[#0A0D14]">₹25,000 – ₹50,000</option>
                        <option value="₹50,000 – ₹1,00,000" className="bg-[#0A0D14]">₹50,000 – ₹1,00,000</option>
                        <option value="₹1,00,000+"          className="bg-[#0A0D14]">₹1,00,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-300">
                      Project Details <span className="text-purple-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      className={inputClass + " resize-none"}
                      placeholder="Tell us about your goals, features you need, and any other requirements..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-lg px-8 py-4 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting && submitType === "email" ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      disabled={isSubmitting}
                      className="flex-1 bg-[#25D366] text-white font-bold text-lg rounded-lg px-8 py-4 hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting && submitType === "whatsapp" ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Opening...
                        </>
                      ) : (
                        <>
                          <MessageCircle size={20} />
                          WhatsApp
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-center text-xs text-gray-500">
                    Choose your preferred contact method. We usually respond within 24 hours.
                  </p>
                </form>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
