import {
  Type,
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Quote,
  List,
  ListOrdered,
  Table,
  Code,
  MinusSquare,
  Link,
  Image,
  CheckSquare,
  Strikethrough,
  Subscript,
  Superscript,
} from 'lucide-react';

export const toolbarGroups = [
  {
    name: 'headings',
    items: [
      { icon: Heading1, label: 'Heading 1', before: '# ' },
      { icon: Heading2, label: 'Heading 2', before: '## ' },
      { icon: Heading3, label: 'Heading 3', before: '### ' },
    ],
  },
  {
    name: 'formatting',
    items: [
      { icon: Bold, label: 'Bold', before: '**', after: '**' },
      { icon: Italic, label: 'Italic', before: '*', after: '*' },
      { icon: Strikethrough, label: 'Strikethrough', before: '~~', after: '~~' },
    ],
  },
  {
    name: 'lists',
    items: [
      { icon: List, label: 'Bullet List', before: '- ' },
      { icon: ListOrdered, label: 'Numbered List', before: '1. ' },
      { icon: CheckSquare, label: 'Task List', before: '- [ ] ' },
    ],
  },
  {
    name: 'content',
    items: [
      { icon: Quote, label: 'Blockquote', before: '> ' },
      { icon: Code, label: 'Code Block', before: '```\n', after: '\n```' },
      { icon: Table, label: 'Table', before: '| Header | Header |\n|---------|----------|\n| Cell | Cell |' },
      { icon: MinusSquare, label: 'Horizontal Rule', before: '\n---\n' },
    ],
  },
  {
    name: 'links',
    items: [
      { icon: Link, label: 'Link', before: '[', after: '](url)' },
      { icon: Image, label: 'Image', before: '![', after: '](url)' },
    ],
  },
  {
    name: 'scripts',
    items: [
      { icon: Subscript, label: 'Subscript', before: '~', after: '~' },
      { icon: Superscript, label: 'Superscript', before: '^', after: '^' },
    ],
  },
];