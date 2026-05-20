# Netlify FAQ Implementation Plan

## Overview

This document outlines a complete implementation plan for maintaining FAQ content in a separate Markdown file for websites deployed on Netlify via GitHub. This approach uses a build script that processes the Markdown file during Netlify's build process and inserts the content into both the HTML and schema.json files.

## Goals

- Maintain FAQ content in a separate Markdown file
- Automatically update the website FAQ section during build
- Update schema.json with the latest FAQ content
- Ensure SEO-friendliness by having FAQ content directly in the HTML
- Minimize client-side JavaScript requirements

## Implementation Steps

### 1. Create the FAQ Markdown File

Create a new file at `data/faq.md` with the following format:

```markdown
# Frequently Asked Questions

## What is your first question?
This is the answer to the first question. It can be multiple paragraphs.

This is a second paragraph of the answer.

## Do you have a second question?
Yes, this is the answer to the second question.

## How about a third question?
This is the answer to the third question.
```

The format is:
- Level 1 heading (`#`) for the section title
- Level 2 headings (`##`) for each question
- Plain text below each question for the answer
- Blank lines between paragraphs for multi-paragraph answers

### 2. Create the Build Script

Create a file named `build-faq.js` in the root of your repository:

```javascript
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
      // This is the FAQ section title
      title = line.substring(2).trim();
    } else if (line.startsWith('## ')) {
      // If we were building a question, save it
      if (currentQuestion) {
        questions.push({
          question: currentQuestion,
          answer: currentAnswer.trim()
        });
      }
      
      // Start a new question
      currentQuestion = line.substring(3).trim();
      currentAnswer = '';
    } else if (currentQuestion) {
      // Add to the current answer
      if (line.trim() === '') {
        // Empty line - add a paragraph break if we have content
        if (currentAnswer !== '') {
          currentAnswer += '\n\n';
        }
      } else {
        // Add the line to the answer
        currentAnswer += line;
      }
    }
  }
  
  // Add the last question if there is one
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
    
    // Convert markdown paragraphs to HTML paragraphs
    const answerHtml = item.answer
      .split('\n\n')
      .map(p => `<p style="margin: 0;">${p}</p>`)
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

// Function to update schema.json with FAQ data
function generateSchemaJson(faqData) {
  // Read the existing schema.json
  const schemaPath = path.join(__dirname, 'data', 'schema.json');
  const schemaJson = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  
  // Find or create the FAQ schema
  const faqSchemaIndex = schemaJson.findIndex(item => item['@type'] === 'FAQPage');
  
  if (faqSchemaIndex !== -1) {
    // Update existing FAQ schema
    schemaJson[faqSchemaIndex].mainEntity = faqData.questions.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }));
  } else {
    // Create new FAQ schema
    schemaJson.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqData.questions.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    });
  }
  
  return JSON.stringify(schemaJson, null, 2);
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

  // Generate the updated schema JSON
  const schemaJson = generateSchemaJson(faqData);

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

  // Write the updated index.html
  console.log(`Writing updated index.html to ${indexPath}`);
  fs.writeFileSync(indexPath, indexHtml);

  // Write the updated schema.json
  const schemaPath = path.join(__dirname, 'data', 'schema.json');
  console.log(`Writing updated schema.json to ${schemaPath}`);
  fs.writeFileSync(schemaPath, schemaJson);

  console.log('FAQ build process completed successfully!');
} catch (error) {
  console.error('Error in FAQ build process:', error);
  process.exit(1);
}
```

### 3. Update package.json

If you don't already have a package.json file, create one:

```json
{
  "name": "insurance-landing-page",
  "version": "1.0.0",
  "description": "Insurance landing page with dynamic FAQ",
  "scripts": {
    "build": "node build-faq.js"
  },
  "dependencies": {}
}
```

If you already have a package.json file, just add the build script to the "scripts" section.

### 4. Configure Netlify Build Settings

Create or update the `netlify.toml` file in your repository root:

```toml
[build]
  command = "npm run build"

[build.environment]
  NODE_VERSION = "16"
```

Alternatively, you can configure this in the Netlify dashboard under Build & Deploy > Build settings.

### 5. Update the FAQ Section in index.html

You don't need to make any changes to your HTML structure if you're using the build script above, as it will automatically replace the entire FAQ section. However, if you want to add a placeholder for clarity, you can update the FAQ section in your index.html:

```html
<!-- FAQ Section - Content generated from faq.md -->
<section id="faq" class="section faq-section">
    <div class="container">
        <h2 class="section-title">[FAQ SECTION HEADLINE]</h2>
        
        <div style="max-width: 48rem; margin: 0 auto;">
            <!-- This content will be replaced by the build script -->
            <div class="faq-item">
                <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">[FAQ QUESTION 1]</h3>
                <p style="margin: 0;">[FAQ ANSWER 1]</p>
            </div>
            <!-- More FAQ items... -->
        </div>
    </div>
</section>
```

### 6. Testing Locally

Before deploying to Netlify, you can test your build script locally:

1. Make sure Node.js is installed on your computer
2. Open a terminal/command prompt
3. Navigate to your project folder
4. Run `node build-faq.js`
5. Check that index.html and schema.json were updated correctly

### 7. Deployment

Once you've implemented the changes:

1. Commit all changes to your GitHub repository
2. Push to the branch that triggers your Netlify deployments
3. Netlify will automatically run your build script during deployment
4. Verify that the deployed site shows the FAQ content correctly

## Updating FAQs in the Future

To update FAQs in the future:

1. Edit the `data/faq.md` file
2. Add, remove, or modify questions and answers
3. Commit and push the changes
4. Netlify will automatically rebuild the site with the updated FAQ content

No need to touch the HTML or any other files!

## Troubleshooting

If you encounter issues:

1. **Build fails on Netlify**:
   - Check the Netlify deploy logs for errors
   - Make sure the Node.js version is set correctly
   - Verify that the paths in the build script match your repository structure

2. **FAQ content not updating**:
   - Check that the faq.md file is being formatted correctly
   - Verify that the build script is being run during deployment
   - Check that the regex pattern for replacing the FAQ section is working correctly

3. **Schema.json not updating**:
   - Make sure the schema.json file is in the expected location
   - Check that the JSON structure matches what the script expects

## Example FAQ.md

Here's an example FAQ.md file for a concrete contractor insurance site:

```markdown
# Frequently Asked Questions About Concrete Contractor Insurance

## What types of insurance do concrete contractors need?
Concrete contractors typically need several types of insurance including:
- General Liability Insurance
- Workers' Compensation Insurance
- Commercial Auto Insurance
- Inland Marine Insurance (for equipment)
- Professional Liability Insurance (for design-build contractors)
- Umbrella/Excess Liability Insurance

Each provides different coverage for the various risks associated with concrete work.

## How much does concrete contractor insurance cost?
The cost of concrete contractor insurance varies widely based on several factors including:
- Your company's annual revenue
- Number of employees
- Types of projects you take on
- Location
- Claims history
- Coverage limits

On average, small concrete contractors might pay $2,000-$5,000 annually for a basic general liability policy, while larger operations could pay significantly more.

## Do I need workers' compensation insurance if I'm a sole proprietor?
In most states, sole proprietors without employees are not legally required to carry workers' compensation insurance for themselves. However, there are several reasons you might still need this coverage:

- Many general contractors and project owners require it before allowing you on a jobsite
- It provides medical coverage if you're injured while working
- Some states do require all contractors to have coverage regardless of employee status

Always check your specific state requirements and client contract requirements.

## What does general liability insurance cover for concrete contractors?
General liability insurance for concrete contractors typically covers:

- Third-party bodily injury (customer or visitor injuries)
- Third-party property damage (damage to a client's property)
- Completed operations (issues arising after project completion)
- Personal and advertising injury (slander, libel, copyright infringement)

It does NOT typically cover damage to your own equipment, employee injuries, or professional errors.

## Why is concrete contractor insurance more expensive than some other trades?
Concrete work often carries higher insurance rates because:

1. The material is heavy and can cause significant property damage
2. Concrete work involves specialized equipment that poses injury risks
3. Structural concrete work has long-term liability exposure if failures occur
4. The caustic nature of materials can cause chemical burns and injuries
5. Errors in concrete work can be extremely costly to remedy

Insurance companies base premiums on historical claims data, and concrete contractors face these specific risk factors.
```

## Conclusion

This implementation allows you to maintain your FAQ content in a separate Markdown file while ensuring the content is built directly into your HTML and schema.json during the Netlify build process. This approach is SEO-friendly and doesn't require any client-side JavaScript to load the FAQ content.

By using this approach, you can easily update your FAQ content without having to modify the HTML or any other files, simplifying content management while maintaining optimal performance and SEO.
