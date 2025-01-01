import { useState, useCallback } from 'react';

const initialMarkdown = `# 🌟 Welcome to the Enhanced Markdown Editor 🌟

## 🚀 Features
- 🎨 Beautiful syntax highlighting
- ⏱️ Real-time preview
- 📄 Export to styled HTML
- 🖥️ Split view with adjustable panes
- 📝 Support for all Markdown features

### Example Table
| Feature | Status |
|---------|---------|
| Tables | ✅ |
| Code Blocks | ✅ |
| Task Lists | ✅ |

### 💻 Code Example
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

---

> Explore all the formatting options in the toolbar above!

- [x] Try the task lists
- [ ] Export your work
- [ ] Share with others

## 👨‍💻 Built with ❤️ by Gokulnath
`;

export function useMarkdown() {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  
  const insertText = useCallback((before: string, after = '') => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    
    const newText = text.substring(0, start) + 
                   before + selectedText + after + 
                   text.substring(end);
    
    setMarkdown(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        end + before.length
      );
    }, 0);
  }, []);

  return { markdown, setMarkdown, insertText };
}