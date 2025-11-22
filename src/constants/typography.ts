/**
 * Typography constants for consistent text sizing across the application
 * All sizes follow a mobile-first approach with responsive breakpoints
 */

export const typography = {
  // Font sizes
  sizes: {
    // Body text
    body: {
      sm: 'text-sm md:text-base',
      base: 'text-base md:text-lg',
      lg: 'text-lg md:text-xl',
    },
    
    // Headings
    heading: {
      xs: 'text-xl md:text-2xl',
      sm: 'text-2xl md:text-3xl',
      base: 'text-3xl md:text-4xl',
      lg: 'text-4xl md:text-5xl',
      xl: 'text-5xl md:text-6xl',
      '2xl': 'text-6xl md:text-7xl',
    },
    
    // Labels and badges
    label: {
      xs: 'text-xs',
      sm: 'text-sm md:text-base',
      base: 'text-base',
    },
    
    // Navigation
    nav: {
      icon: 'text-2xl',
      label: 'text-xs',
    },
  },
  
  // Font weights
  weights: {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },
  
  // Line heights
  lineHeights: {
    tight: 'leading-tight',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
  },
  
  // Letter spacing
  tracking: {
    tighter: 'tracking-tighter',
    tight: 'tracking-tight',
    normal: 'tracking-normal',
    wide: 'tracking-wide',
    wider: 'tracking-wider',
    widest: 'tracking-widest',
  },
  
  // Text colors
  colors: {
    primary: 'text-white',
    secondary: 'text-slate-300',
    tertiary: 'text-slate-400',
    muted: 'text-slate-500',
    accent: {
      green: 'text-green-300',
      blue: 'text-blue-300',
      pink: 'text-pink-300',
      amber: 'text-amber-300',
    },
  },
} as const;

/**
 * Pre-composed typography classes for common use cases
 */
export const textStyles = {
  // Page titles
  pageTitle: `${typography.sizes.heading['2xl']} ${typography.weights.light} ${typography.colors.primary} ${typography.tracking.tight}`,
  
  // Section titles
  sectionTitle: `${typography.sizes.heading.base} ${typography.weights.bold} ${typography.colors.primary} ${typography.lineHeights.tight}`,
  
  // Card titles
  cardTitle: `${typography.sizes.heading.sm} ${typography.weights.bold} ${typography.colors.primary} ${typography.lineHeights.tight}`,
  
  // Body text
  body: `${typography.sizes.body.base} ${typography.colors.tertiary} ${typography.lineHeights.relaxed}`,
  
  // Labels
  label: `${typography.sizes.label.base} ${typography.weights.medium} ${typography.colors.secondary} ${typography.tracking.wider} uppercase`,
  
  // Button text
  button: `${typography.sizes.body.base} ${typography.weights.medium} ${typography.colors.primary}`,
  
  // Navigation
  navLabel: `${typography.sizes.nav.label} ${typography.weights.medium} ${typography.lineHeights.tight}`,
} as const;

