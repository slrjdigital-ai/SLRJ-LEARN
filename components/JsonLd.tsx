export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://slrjdigital.in/#organization",
    name: "SLRJ Digital",
    alternateName: "SLRJ Digital Web Agency",
    url: "https://slrjdigital.in",
    logo: "https://slrjdigital.in/logo.png",
    image: "https://slrjdigital.in/og-image.jpg",
    description: "Premium digital agency and software engineering firm specializing in Next.js, React, high-performance web applications, and custom UI/UX design.",
    telephone: "+91-84669-74408",
    email: "slrj.digital@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "16.5062",
      longitude: "80.6480"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        opens: "09:00",
        closes: "21:00"
      }
    ],
    sameAs: [
      "https://instagram.com/slrj_digital",
      "https://wa.me/918466974408",
      "https://www.linkedin.com/in/slrj-digital-461868440"
    ],
    priceRange: "₹₹₹",
    knowsAbout: [
      "Web Development",
      "Next.js App Router",
      "React 19",
      "UI/UX Design",
      "E-Commerce Solutions",
      "Full-Stack Web Applications",
      "Core Web Vitals Optimization"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://slrjdigital.in/#website",
    url: "https://slrjdigital.in",
    name: "SLRJ Digital",
    description: "Turning Ideas Into Digital Experiences. Premium Next.js and React web development agency.",
    publisher: {
      "@id": "https://slrjdigital.in/#organization"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
