export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://slrjlearn.in/#organization",
    name: "SLRJ Learn",
    alternateName: "SLRJ Learn Platform",
    url: "https://slrjlearn.in",
    logo: "https://slrjlearn.in/logo.png",
    image: "https://slrjlearn.in/og-image.jpg",
    description: "SLRJ Learn is an engineering education and tech learning hub with structured roadmaps, computer science notes, and modern web development tutorials.",
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
    "@id": "https://slrjlearn.in/#website",
    url: "https://slrjlearn.in",
    name: "SLRJ Learn",
    description: "SLRJ Learn creates modern programming courses, CS roadmaps, and tech learning experiences.",
    publisher: {
      "@id": "https://slrjlearn.in/#organization"
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
