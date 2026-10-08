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
    description: "SLRJ creates modern websites, AI solutions, applications and digital experiences for businesses, startups and ambitious ideas.",
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
      "AI Solutions",
      "Next.js App Router",
      "React 19",
      "UI/UX Design",
      "E-Commerce Solutions",
      "Full-Stack Web Applications",
      "Performance Optimization"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://slrjdigital.in/#website",
    url: "https://slrjdigital.in",
    name: "SLRJ Digital",
    description: "SLRJ creates modern websites, AI solutions, applications and digital experiences for businesses, startups and ambitious ideas.",
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
