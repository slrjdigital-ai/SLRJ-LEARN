import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaWhatsapp, FaEnvelope, FaSnapchatGhost, FaFacebookF, FaTelegramPlane, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl sm:text-3xl font-black tracking-tight font-brand flex flex-wrap items-center gap-2 sm:gap-2.5 mb-3">
              <Image
                src="/logo.png?v=5"
                alt="SLRJ Digital Logo"
                width={44}
                height={44}
                unoptimized
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain bg-transparent filter drop-shadow-[0_0_12px_rgba(168,85,247,0.7)] drop-shadow-[0_0_4px_rgba(56,189,248,0.5)]"
              />
              <span className="flex"><span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-purple-400 to-purple-700">SL</span><span className="text-transparent bg-clip-text bg-gradient-to-b from-pink-300 via-pink-500 to-fuchsia-700 ml-[-0.05em]">RJ</span></span><span className="text-white text-sm sm:text-base font-bold tracking-[0.25em] sm:tracking-[0.4em] font-brand mt-1">DIGITAL</span>
            </Link>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 font-bold text-sm mb-4 tracking-widest uppercase">Design &bull; Build &bull; Grow</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              We build modern digital experiences that help businesses establish their online presence and grow.
            </p>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">About</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Services</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">Projects</Link></li>
              <li><Link href="/#feedback" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Feedback & Ratings</Link></li>
              <li><Link href="/contact"  className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services#business-websites" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Business Websites</Link></li>
              <li><Link href="/services#e-commerce"        className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">E-Commerce</Link></li>
              <li><Link href="/services#web-apps"          className="text-gray-400 hover:text-pink-400 transition-colors text-sm">Web Applications</Link></li>
              <li><Link href="/services#ui-ux"             className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">UI/UX Design</Link></li>
              <li><Link href="/services#maintenance"       className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Maintenance</Link></li>
            </ul>
          </div>

          {/* Connect — Social Icons */}
          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://instagram.com/slrj_digital"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#E1306C] hover:border-[#E1306C]/50 hover:bg-[#E1306C]/10 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <FaInstagram size={18} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://wa.me/918466974408"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#25D366] hover:border-[#25D366]/50 hover:bg-[#25D366]/10 transition-all duration-300 group"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={18} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="mailto:slrj.digital@gmail.com"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 group"
                aria-label="Email"
              >
                <FaEnvelope size={18} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://www.facebook.com/share/1M726Nnd7y/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#1877F2] hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10 transition-all duration-300 group"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://snapchat.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#FFFC00] hover:border-[#FFFC00]/50 hover:bg-[#FFFC00]/10 transition-all duration-300 group"
                aria-label="Snapchat"
              >
                <FaSnapchatGhost size={18} className="group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#0088cc] hover:border-[#0088cc]/50 hover:bg-[#0088cc]/10 transition-all duration-300 group"
                aria-label="Telegram"
              >
                <FaTelegramPlane size={18} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={18} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} SLRJ Digital. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/privacy-policy" className="text-gray-500 hover:text-purple-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-gray-500 hover:text-cyan-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

