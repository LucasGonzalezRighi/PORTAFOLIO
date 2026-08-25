/**
 * Combina clases condicionales sin dependencias externas.
 * Uso: cn('base', isActive && 'active', className)
 */
export type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
