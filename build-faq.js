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
  name: "Contractors Choice Agency",
  url: "https://www.contractorschoiceagency.com",
  logo: "https://www.contractorschoiceagency.com/images/company-logo.webp",
  phone: "844-967-5247",
  address: {
    street: "[STREET ADDRESS]",
    city: "[CITY]",
    state: "[STATE]",
    zip: "[ZIP CODE]"
  }
};

// Function to generate schema JSON
function generateSchemas(faqData) {
  const today = new Date().toISOString().split('T')[0];
  
  // Create LocalBusiness schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": publisherConfig.name,
    "description": faqData.title ? `${faqData.title} - ${publisherConfig.name}` : publisherConfig.name,
    "url": publisherConfig.url,
    "telephone": publisherConfig.phone,
    "priceRange": "$$$",
    "image": {
      "@type": "ImageObject",
      "url": publisherConfig.logo,
      "width": "800",
      "height": "600"
    },
    "sameAs": [
      "[FACEBOOK URL]",
      "[LINKEDIN URL]"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": publisherConfig.address.street,
      "addressLocality": publisherConfig.address.city,
      "addressRegion": publisherConfig.address.state,
      "postalCode": publisherConfig.address.zip,
      "addressCountry": {
        "@type": "Country",
        "name": "US"
      }
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    }
  };

  // Create FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'name': faqData.title || 'FAQ',
    'description': faqData.title ? `${faqData.title} - Frequently Asked Questions` : 'Frequently Asked Questions',
    'datePublished': today,
    'dateModified': today,
    'publisher': {
      '@type': 'Organization',
      'name': publisherConfig.name,
      'url': publisherConfig.url,
      'logo': {
        '@type': 'ImageObject',
        'url': publisherConfig.logo,
        'width': 800,
        'height': 600
      },
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': publisherConfig.address.street,
        'addressLocality': publisherConfig.address.city,
        'addressRegion': publisherConfig.address.state,
        'postalCode': publisherConfig.address.zip,
        'addressCountry': 'US'
      },
      'telephone': publisherConfig.phone
    },
    'mainEntity': faqData.questions.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
        'datePublished': today
      }
    }))
  };

  return {
    localBusinessSchema,
    faqSchema
  };
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

  // Generate the schemas
  const { localBusinessSchema, faqSchema } = generateSchemas(faqData);

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

  // Create schema script tags
  const schemaScripts = `
    <script type="application/ld+json" id="localBusinessSchema">
      ${JSON.stringify(localBusinessSchema, null, 2)}
    </script>
    <script type="application/ld+json" id="faqSchema">
      ${JSON.stringify(faqSchema, null, 2)}
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
