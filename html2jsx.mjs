import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('./screens_html').filter(f => f.endsWith('.html'));
if (!fs.existsSync('./src/pages')) fs.mkdirSync('./src/pages');

for (const file of files) {
  const html = fs.readFileSync(`./screens_html/${file}`, 'utf-8');
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  if (!bodyMatch) continue;
  let body = bodyMatch[1];
  
  body = body.replace(/class=/g, 'className=');
  body = body.replace(/for=/g, 'htmlFor=');
  body = body.replace(/<!--[\s\S]*?-->/g, ''); // Remove comments
  
  // Self close tags
  body = body.replace(/<(img|input|br|hr)([^>]*?)\s*>/g, (match, tag, rest) => {
    if (rest.trim().endsWith('/')) return match;
    return `<${tag}${rest} />`;
  });

  // Handle inline styles by stripping them or doing a naive conversion
  body = body.replace(/style="([^"]*)"/g, (match, styleStr) => {
     if (styleStr.includes('font-variation-settings')) {
         return `style={{ fontVariationSettings: "'wght' 700" }}`;
     }
     return `style={{}}`;
  });

  // Remove empty src attributes which might cause warnings or errors
  body = body.replace(/src=""/g, `src="/placeholder.png"`);

  const componentName = file.replace('.html', '');
  const jsx = `import React from 'react';\nimport { Link } from 'react-router-dom';\n\nexport default function ${componentName}() {\n  return (\n    <div className="bg-background text-on-surface min-h-screen relative w-full overflow-x-hidden">\n      ${body}\n    </div>\n  );\n}`;
  fs.writeFileSync(`./src/pages/${componentName}.tsx`, jsx);
}
console.log('Finished converting HTML to JSX');
