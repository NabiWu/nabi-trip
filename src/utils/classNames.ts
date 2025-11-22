/**
 * Utility function for conditionally joining classNames together
 * Similar to the popular 'clsx' library but lightweight
 */

type ClassValue = 
  | string 
  | number 
  | boolean 
  | null 
  | undefined 
  | Record<string, boolean | null | undefined>
  | ClassValue[];

/**
 * Combines class names conditionally
 * 
 * @example
 * classNames('foo', 'bar') // => 'foo bar'
 * classNames('foo', { bar: true, baz: false }) // => 'foo bar'
 * classNames({ 'foo-bar': true }) // => 'foo-bar'
 * classNames({ 'foo-bar': false }) // => ''
 */
export function classNames(...classes: ClassValue[]): string {
  const result: string[] = [];

  for (const cls of classes) {
    if (!cls) continue;

    if (typeof cls === 'string' || typeof cls === 'number') {
      result.push(String(cls));
    } else if (Array.isArray(cls)) {
      const inner = classNames(...cls);
      if (inner) result.push(inner);
    } else if (typeof cls === 'object') {
      for (const key in cls) {
        if (cls[key]) {
          result.push(key);
        }
      }
    }
  }

  return result.join(' ');
}

/**
 * Alias for classNames - shorter name
 */
export const cn = classNames;

