import type { ReactNode } from 'react';

/**
 * Syntax highlighting liviano (regex-based) usado por el explorador de
 * código y las mini-ventanas de las cards de proyectos.
 * Los colores provienen de los tokens `--code-*`.
 */
const KEYWORDS = new Set([
  'async', 'await', 'const', 'let', 'var', 'return', 'class', 'interface', 'export', 'import',
  'extends', 'implements', 'function', 'from', 'type', 'enum', 'default', 'new', 'try', 'catch',
  'finally', 'throw', 'if', 'else', 'for', 'of', 'in', 'while', 'switch', 'case', 'break',
  'continue', 'yield', 'static', 'public', 'private', 'protected', 'readonly', 'as', 'void',
  'never', 'satisfies', 'instanceof', 'typeof', 'delete', 'do',
  // extras para Python / SQL / Dart
  'def', 'self', 'None', 'True', 'False', 'CREATE', 'TABLE', 'INSERT', 'INTO', 'VALUES',
  'SELECT', 'FROM', 'WHERE', 'ORDER', 'BY', 'DESC', 'PRIMARY', 'KEY', 'NOT', 'NULL', 'DEFAULT',
]);

const PATTERN =
  /(#[^\n]*|\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`(?:\\[\s\S]|[^`\\])*`|'(?:\\[\s\S]|[^'\\])*'|"(?:\\[\s\S]|[^"\\])*")|(@[A-Za-z_$][\w$]*)|(\b\d[\d_.]*\b)|([A-Za-z_$][\w$]*)|([{}()[\];:,.<>=+\-*/!?&|%]+)/g;

export function highlight(code: string): ReactNode[] {
  const paint = (value: string, color: string, key: number) => (
    <span key={`t${key}`} style={{ color }}>
      {value}
    </span>
  );
  const out: ReactNode[] = [];
  let cursor = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  PATTERN.lastIndex = 0;
  while ((match = PATTERN.exec(code)) !== null) {
    if (match.index > cursor) out.push(code.slice(cursor, match.index));
    const [raw, comment, string, decorator, num, word, punct] = match;
    if (comment) out.push(paint(raw, 'var(--code-comment)', key++));
    else if (string) out.push(paint(raw, 'var(--code-str)', key++));
    else if (decorator) out.push(paint(raw, 'var(--code-fn)', key++));
    else if (num) out.push(paint(raw, 'var(--code-num)', key++));
    else if (word) {
      if (KEYWORDS.has(raw)) out.push(paint(raw, 'var(--code-key)', key++));
      else if (raw === 'true' || raw === 'false' || raw === 'null' || raw === 'undefined')
        out.push(paint(raw, 'var(--code-num)', key++));
      else if (code[match.index + raw.length] === '(') out.push(paint(raw, 'var(--code-fn)', key++));
      else if (/^[A-Z]/.test(raw)) out.push(paint(raw, 'var(--code-type)', key++));
      else out.push(paint(raw, 'var(--text-secondary)', key++));
    } else if (punct) out.push(paint(raw, 'var(--code-punct)', key++));
    cursor = match.index + raw.length;
  }
  if (cursor < code.length) out.push(code.slice(cursor));
  return out;
}
