const fs = require('fs');
const path = require('path');

// Function to parse FAQ markdown
function parseFaqMarkdown(markdown) {
  const lines = markdown.split('\n');
  let title = '';
  const questions = [];
  let currentQuestion = null;
  let currentAnswer = '';
  
  for (const line of lines) {
    if (line.startsWith('# ')) {
      title = line.substring(2).trim();
    } else if (line.startsWith('## ')) {
      if (currentQuestion) {
        questions.push({
          question: currentQuestion,
          answer: currentAnswer.trim()
        });
      }
      currentQuestion = line.substring(3).trim();
      currentAnswer = '';
    } else if (currentQuestion) {
      if (line.trim() === '') {
        if (currentAnswer !== '') {
          currentAnswer += '\n\n';
        }
      } else {
        currentAnswer += line;
      }
    }
  }
  
  if (currentQuestion) {
    questions.push({
      question: currentQuestion,
      answer: currentAnswer.trim()
    });
  }
  
  return {
    title,
    questions
  };
}

// Function to generate HTML for FAQ items
function generateFaqHtml(faqData) {
  let html = `<h2 class="section-title">${faqData.title}</h2>
    
    <div style="max-width: 48rem; margin: 0 auto;">`;

  faqData.questions.forEach((item, index) => {
    const isLast = index === faqData.questions.length - 1;
    const style = isLast ? 'border-bottom: none; margin-bottom: 0; padding-bottom: 0;' : '';
    
    // Convert markdown paragraphs and lists to HTML
    const answerHtml = item.answer
      .split('\n\n')
      .map(p => {
        if (p.startsWith('- ')) {
          // Convert bullet points to HTML list
          const items = p.split('\n').map(i => i.substring(2));
          return `<ul style="list-style-type: disc; padding-left: 1.5rem; margin: 0.5rem 0;">
            ${items.map(i => `<li>${i}</li>`).join('\n')}
          </ul>`;
        } else if (p.match(/^\d\./)) {
          // Convert numbered list to HTML
          const items = p.split('\n');
          return `<ol style="padding-left: 1.5rem; margin: 0.5rem 0;">
            ${items.map(i => `<li>${i.substring(i.indexOf('.') + 2)}</li>`).join('\n')}
          </ol>`;
        }
        return `<p style="margin: 0.5rem 0;">${p}</p>`;
      })
      .join('\n');
    
    html += `
        <div class="faq-item" style="${style}">
            <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">${item.question}</h3>
            ${answerHtml}
        </div>`;
  });

  html += `
    </div>`;
  
  return html;
}

// Configurable publisher info
const publisherConfig = {
  name: "Detailer Shield Insurance",
  parentName: "Contractors Choice Agency",
  url: "https://www.contractorschoiceagency.com",
  logo: "https://www.contractorschoiceagency.com/images/optimized/company-logo-large.webp",
  phone: "+1-844-967-5247",
  email: "josh@contractorschoiceagency.com",
  address: {
    street: "12220 E Riggs Road, Suite #105",
    city: "Chandler",
    state: "AZ",
    zip: "85249"
  }
};

// Function to generate the canonical @graph + FAQPage
// Emits ONE <script type="application/ld+json"> with the full graph
// (Organization + LocalBusiness + WebSite + Service + BreadcrumbList + FAQPage)
function generateSchemas(faqData) {
  const today = new Date().toISOString().split('T')[0];

  const orgRef = `${publisherConfig.url}/#organization`;
  const lbRef = `${publisherConfig.url}/#localbusiness`;
  const wsRef = `${publisherConfig.url}/#website`;
  const serviceRef = `${publisherConfig.url}/#service-mobile-detailing-insurance`;
  const breadcrumbRef = `${publisherConfig.url}/#breadcrumb-home`;
  const faqRef = `${publisherConfig.url}/#faqpage`;

  const graph = [
    {
      "@type": "Organization",
      "@id": orgRef,
      "name": publisherConfig.name,
      "alternateName": "Detailer Shield",
      "parentOrganization": {
        "@type": "Organization",
        "name": publisherConfig.parentName,
        "url": publisherConfig.url
      },
      "url": publisherConfig.url,
      "logo": {
        "@type": "ImageObject",
        "url": publisherConfig.logo,
        "width": 800,
        "height": 600
      },
      "telephone": publisherConfig.phone,
      "email": publisherConfig.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": publisherConfig.address.street,
        "addressLocality": publisherConfig.address.city,
        "addressRegion": publisherConfig.address.state,
        "postalCode": publisherConfig.address.zip,
        "addressCountry": "US"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": lbRef,
      "name": publisherConfig.name,
      "image": publisherConfig.logo,
      "url": publisherConfig.url,
      "telephone": publisherConfig.phone,
      "email": publisherConfig.email,
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": publisherConfig.address.street,
        "addressLocality": publisherConfig.address.city,
        "addressRegion": publisherConfig.address.state,
        "postalCode": publisherConfig.address.zip,
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 33.3062,
        "longitude": -111.8413
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    },
    {
      "@type": "WebSite",
      "@id": wsRef,
      "url": publisherConfig.url,
      "name": publisherConfig.name,
      "publisher": { "@id": orgRef },
      "inLanguage": "en-US"
    },
    {
      "@type": "Service",
      "@id": serviceRef,
      "name": "Mobile Detailing Insurance",
      "serviceType": "Mobile Detailing Insurance",
      "provider": { "@id": orgRef },
      "areaServed": { "@type": "Country", "name": "United States" },
      "description": "Specialized business insurance for mobile detailing operators — general liability, equipment, tools, vehicle, and pollution coverage tailored to mobile detailing operations.",
      "url": publisherConfig.url + "/"
    },
    {
      "@type": "BreadcrumbList",
      "@id": breadcrumbRef,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": publisherConfig.url + "/"
        }
      ]
    }
  ];

  // Append FAQPage only when there are real questions
  if (faqData && Array.isArray(faqData.questions) && faqData.questions.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": faqRef,
      "name": faqData.title || "Frequently Asked Questions",
      "description": faqData.title
        ? `${faqData.title} - Frequently Asked Questions`
        : "Frequently Asked Questions",
      "datePublished": today,
      "dateModified": today,
      "publisher": { "@id": orgRef },
      "inLanguage": "en-US",
      "mainEntity": faqData.questions.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
          "datePublished": today
        }
      }))
    });
  }

  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": graph
  };

  return { graphSchema };
}

// Main execution
try {
  console.log('Starting FAQ build process...');

  // Read the FAQ markdown file
  const faqPath = path.join(__dirname, 'data', 'faq.md');
  console.log(`Reading FAQ from ${faqPath}`);
  const faqMarkdown = fs.readFileSync(faqPath, 'utf8');

  // Parse the markdown
  const faqData = parseFaqMarkdown(faqMarkdown);
  console.log(`Parsed ${faqData.questions.length} FAQ items`);

  // Generate the FAQ HTML
  const faqHtml = generateFaqHtml(faqData);

  // Generate the schemas (single @graph)
  const { graphSchema } = generateSchemas(faqData);

  // Read the index.html file
  const indexPath = path.join(__dirname, 'index.html');
  console.log(`Reading index.html from ${indexPath}`);
  let indexHtml = fs.readFileSync(indexPath, 'utf8');

  // Replace the FAQ section in the HTML
  const faqSectionRegex = /<section id="faq"[^>]*>[\s\S]*?<\/section>/;
  const newFaqSection = `<section id="faq" class="section faq-section">
    <div class="container">
      ${faqHtml}
    </div>
  </section>`;

  indexHtml = indexHtml.replace(faqSectionRegex, newFaqSection);

  // Single canonical @graph schema for index.html
  // Includes Organization + LocalBusiness + WebSite + Service + BreadcrumbList + FAQPage
  const schemaScripts = `
    <script type="application/ld+json" id="siteGraphSchema">
      ${JSON.stringify(graphSchema, null, 2)}
    </script>`;

  // Remove all existing schema scripts
  indexHtml = indexHtml.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*/g, '');

  // Add schema scripts before </head>
  indexHtml = indexHtml.replace('</head>', `${schemaScripts}\n</head>`);

  // Write the updated index.html
  console.log(`Writing updated index.html to ${indexPath}`);
  fs.writeFileSync(indexPath, indexHtml);

  console.log('FAQ build process completed successfully!');
} catch (error) {
  console.error('Error in FAQ build process:', error);
  process.exit(1);
}
