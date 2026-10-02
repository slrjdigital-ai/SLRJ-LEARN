import { services } from "@/data/services";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ContactCTA from "@/components/ContactCTA";

export const metadata = {
  title: "Services | SLRJ Digital",
  description: "Digital solutions for growing businesses. Web development, e-commerce, UI/UX and more."
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-transparent grid-bg relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            Digital Solutions <br className="hidden sm:block" /> <span className="gold-gradient-text">for Growing Businesses.</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto">
            We offer end-to-end web development services to establish, scale, and maintain your online presence.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-24">
            {services.map((service, idx) => (
              <div 
                key={service.id} 
                id={service.link.split('#')[1]}
                className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-purple-400 mb-6">
                    <service.icon size={32} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    {service.description} We use modern technologies to ensure performance, security, and scalability for your specific business requirements.
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {service.deliverables ? (
                      service.deliverables.split(', ').map((item, dIdx) => (
                        <div key={dIdx} className="flex items-center text-gray-300">
                          <CheckCircle2 size={20} className="text-cyan-400 mr-3 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))
                    ) : (
                      [1, 2, 3].map(item => (
                        <div key={item} className="flex items-center text-gray-300">
                          <CheckCircle2 size={20} className="text-cyan-400 mr-3 shrink-0" />
                          <span>Premium quality and modern standards</span>
                        </div>
                      ))
                    )}
                  </div>

                  <Link 
                    href="/contact" 
                    className="inline-flex items-center px-6 py-3 bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 text-white rounded-full font-medium transition-all duration-300"
                  >
                    Start Your Project <ArrowRight size={18} className="ml-2" />
                  </Link>
                </div>
                
                <div className="w-full lg:w-1/2">
                  <div className="glass-card aspect-[4/3] w-full flex items-center justify-center p-0 relative overflow-hidden group">
                     <Image 
                       src={`https://images.unsplash.com/photo-${[
                         '1460925895917-afdab827c52f', // Business
                         '1556742049-0cfed4f6a45d', // E-commerce
                         '1555099962-4199c345e5dd', // Web App
                         '1561070791-2526d30994b5', // UI/UX
                         '1551288049-bebda4e38f71', // Performance Optimization (Analytics & Speed Metrics)
                         '1454165804606-c3d57bc86b40'  // Maintenance
                       ][idx]}?q=80&w=1000&auto=format&fit=crop`}
                       alt={service.title}
                       fill
                       className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                     <div className="absolute bottom-6 left-6 z-10 flex items-center gap-3">
                       <div className="w-12 h-12 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-purple-400">
                         <service.icon size={24} />
                       </div>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}



