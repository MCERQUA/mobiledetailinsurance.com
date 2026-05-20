# Common Issues and Solutions

## Style Changes Not Visible

### Issue
CSS/Tailwind style changes don't appear on the live site.

### Root Causes
1. Tailwind purging CSS in production builds
2. Custom CSS being overridden by Tailwind
3. Browser caching old styles

### Solution
1. Always verify changes by:
   - Running `npm run dev` to see changes locally
   - Checking the production build with `npm run build && npm run preview`
2. For Tailwind changes:
   - Add new colors to tailwind.config.js
   - Use @apply or direct Tailwind classes in HTML
3. For custom CSS:
   - Use !important sparingly for overrides
   - Verify CSS specificity

### Prevention
- Document all style changes in brand-style-guide.md
- Include build verification steps in workflow

## Contact Modal Not Working

### Issue
The floating contact button modal was not opening when clicked.

### Root Causes
1. Missing JavaScript file inclusion
2. Duplicate form content causing structural issues
3. Incorrect HTML structure

### Solution
1. Added the JavaScript file at the end of the body:
```html
<script src="js/main.js"></script>
```

2. Removed duplicate form content in the modal section
3. Fixed HTML structure and nesting

### Prevention
- Always include necessary JavaScript files
- Avoid duplicate form content
- Maintain proper HTML structure and nesting
- Test interactive elements after making changes
