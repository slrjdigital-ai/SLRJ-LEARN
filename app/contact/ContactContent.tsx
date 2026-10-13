"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, MessageCircle, Camera, Phone, MapPin, Send, AlertCircle, Sparkles } from "lucide-react";

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

function ContactForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams?.get("service");

  const [form, setForm] = useState<FormState>(() => {
    let initialService = "";
    if (serviceParam) {
      const serviceMap: Record<string, string> = {
        "business-websites": "Business Website",
        "ecommerce": "E-Commerce",
        "e-commerce": "E-Commerce",
        "web-apps": "Web Application",
        "ui-ux": "UI/UX Design",
        "optimization": "Performance Optimization",
        "maintenance": "Website Maintenance",
      };
      initialService = serviceMap[serviceParam] || serviceParam;
    }
    return { ...EMPTY_FORM, service: initialService };
  });

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
          data.error || "Something went wrong. Please try again or contact us directly."
        );
      }
    } catch {
      setErrorMessage(
        "Something went wrong. Please try again or contact us directly."
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
    "w-full bg-[#070517]/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors";

  if (isSubmitted) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
          <Send size={32} />
        </div>
        <h3 className="text-3xl font-bold mb-4 font-brand text-white">Project Request Received</h3>
        <p className="text-gray-300 max-w-md leading-relaxed text-base">
          Thanks! Your project request has been received. We&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form id="contactForm" onSubmit={handleEmailSubmit} suppressHydrationWarning className="space-y-6">
      {/* Hidden Honeypot Field for Spam Protection */}
      <input
        type="text"
        id="honeypot"
        name="honeypot"
        suppressHydrationWarning
        value={form.honeypot}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Error Notification Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-start gap-3">
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
            Full Name <span className="text-purple-400">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            suppressHydrationWarning
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="businessName" className="text-sm font-medium text-gray-300">
            Business / Organization
          </label>
          <input
            id="businessName"
            type="text"
            suppressHydrationWarning
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
            suppressHydrationWarning
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-300">
            Phone / WhatsApp Number
          </label>
          <input
            id="phone"
            type="tel"
            suppressHydrationWarning
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
            suppressHydrationWarning
            value={form.service}
            onChange={handleChange}
            className={inputClass + " appearance-none cursor-pointer"}
          >
            <option value="" disabled className="bg-[#0A0D14]">Select a service</option>
            <option value="Business Website"        className="bg-[#0A0D14]">Business Website</option>
            <option value="E-Commerce"              className="bg-[#0A0D14]">E-Commerce Platform</option>
            <option value="Web Application"         className="bg-[#0A0D14]">Web Application / SaaS MVP</option>
            <option value="UI/UX Design"            className="bg-[#0A0D14]">UI/UX Design System</option>
            <option value="Performance Optimization"className="bg-[#0A0D14]">Performance & Speed Optimization</option>
            <option value="Website Maintenance"     className="bg-[#0A0D14]">Website Maintenance & Support</option>
            <option value="Other"                   className="bg-[#0A0D14]">Custom Project Scope</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="budget" className="text-sm font-medium text-gray-300">
            Estimated Budget (USD / INR) <span className="text-purple-400">*</span>
          </label>
          <select
            id="budget"
            required
            suppressHydrationWarning
            value={form.budget}
            onChange={handleChange}
            className={inputClass + " appearance-none cursor-pointer"}
          >
            <option value="" disabled className="bg-[#0A0D14]">Select budget range</option>
            <option value="Under ₹15,000 / ~$180 USD"        className="bg-[#0A0D14]">Under ₹15,000 / ~$180 USD (Starter MVP)</option>
            <option value="₹15,000 – ₹35,000 / ~$180–$420 USD" className="bg-[#0A0D14]">₹15,000 – ₹35,000 / ~$180–$420 USD (Standard Business)</option>
            <option value="₹35,000 – ₹75,000 / ~$420–$900 USD" className="bg-[#0A0D14]">₹35,000 – ₹75,000 / ~$420–$900 USD (E-Commerce / Custom App)</option>
            <option value="₹75,000 – ₹1,50,000 / ~$900–$1,800 USD" className="bg-[#0A0D14]">₹75,000 – ₹1,50,000 / ~$900–$1,800 USD (Scale Platform)</option>
            <option value="₹1,50,000+ / ~$1,800+ USD"       className="bg-[#0A0D14]">₹1,50,000+ / ~$1,800+ USD (Enterprise Architecture)</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-300">
          Project Details & Goals <span className="text-purple-400">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          required
          suppressHydrationWarning
          value={form.message}
          onChange={handleChange}
          className={inputClass + " resize-none"}
          placeholder="Tell us about your project vision, target timeline, desired features, and references..."
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-base sm:text-lg rounded-xl px-8 py-4 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-98"
        >
          {isSubmitting && submitType === "email" ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending Proposal...
            </>
          ) : (
            <>
              <Send size={20} />
              Submit Project Brief
            </>
          )}
        </button>
        <button
          type="button"
          onClick={handleWhatsAppSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-emerald-600 via-[#25D366] to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base sm:text-lg rounded-xl px-8 py-4 hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-98"
        >
          {isSubmitting && submitType === "whatsapp" ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Opening WhatsApp...
            </>
          ) : (
            <>
              <MessageCircle size={20} />
              Discuss on WhatsApp
            </>
          )}
        </button>
      </div>

      <p className="text-center text-xs text-gray-400">
        Choose your preferred channel. We operate with high execution velocity and respond within 24 hours.
      </p>
    </form>
  );
}

export default function ContactContent() {
  return (
    <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 bg-transparent min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono font-bold tracking-[0.25em] uppercase mb-4 backdrop-blur-md">
            <Sparkles size={13} className="text-purple-400" />
            <span>Direct Engineering Consultation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 font-brand">
            Let&apos;s Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Together.</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-300">
            Tell us about your project vision and our architects will prepare an architectural proposal and transparent roadmap.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* ─── Left: Contact Info ─── */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            <div className="glass-card p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-6 font-brand text-white">Direct Communication</h3>
              <div className="space-y-5">
                <a
                  href="mailto:slrj.digital@gmail.com"
                  className="flex items-center text-gray-300 hover:text-purple-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4 group-hover:bg-purple-500/15 group-hover:border-purple-500/30 shrink-0 text-purple-300 transition-colors">
                    <Mail size={18} />
                  </div>
                  <span className="text-sm font-medium">slrj.digital@gmail.com</span>
                </a>

                <a
                  href="tel:+918466974408"
                  className="flex items-center text-gray-300 hover:text-purple-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4 group-hover:bg-purple-500/15 group-hover:border-purple-500/30 shrink-0 text-cyan-300 transition-colors">
                    <Phone size={18} />
                  </div>
                  <span className="text-sm font-medium">+91 84669 74408</span>
                </a>

                <a
                  href="https://wa.me/918466974408"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-emerald-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4 group-hover:bg-emerald-500/15 group-hover:border-emerald-500/30 shrink-0 text-emerald-400 transition-colors">
                    <MessageCircle size={18} />
                  </div>
                  <span className="text-sm font-medium">WhatsApp Direct Chat</span>
                </a>

                <a
                  href="https://instagram.com/slrj_digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-pink-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4 group-hover:bg-pink-500/15 group-hover:border-pink-500/30 shrink-0 text-pink-400 transition-colors">
                    <Camera size={18} />
                  </div>
                  <span className="text-sm font-medium">@slrj_digital</span>
                </a>

                <div className="flex items-center text-gray-300">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4 shrink-0 text-cyan-400">
                    <MapPin size={18} />
                  </div>
                  <span className="text-sm font-medium">Andhra Pradesh, India</span>
                </div>
              </div>
            </div>

            {/* SLA Guarantee Box */}
            <div className="glass-card p-6 sm:p-8 bg-gradient-to-br from-purple-950/20 via-transparent to-cyan-950/20 border-purple-500/30">
              <h3 className="text-base font-bold mb-2 font-brand text-white">Client Engagement Charter</h3>
              <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                Every project is secured by milestone sign-offs, full source code intellectual property transfer, and a 30-day post-launch warranty.
              </p>
              <div className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Response Time: Within 24 Hours</span>
              </div>
            </div>
          </div>

          {/* ─── Right: Form ─── */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 sm:p-8 md:p-10">
              <Suspense fallback={<div className="p-12 text-center text-gray-400 font-mono text-sm">Loading project consultation form...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
