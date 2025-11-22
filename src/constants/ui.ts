/**
 * UI constants for spacing, sizing, and layout
 */

export const ui = {
  // Bottom navigation
  bottomNav: {
    height: {
      mobile: '3rem', // Reduced from 3.5rem for more compact design
      desktop: 'auto', // Hidden on desktop
    },
    padding: {
      container: 'py-1.5',
      item: 'px-3 py-1',
    },
  },
  
  // Safe area insets (for notched devices)
  safeArea: {
    bottom: '3rem', // Matches bottom nav height
    top: '1rem',
  },
  
  // Border radius
  radius: {
    sm: 'rounded-xl',
    base: 'rounded-2xl',
    lg: 'rounded-3xl',
    full: 'rounded-full',
  },
  
  // Border styles
  border: {
    default: 'border border-white/[0.08]',
    hover: 'border-white/[0.15]',
    active: 'border-white/[0.2]',
  },
  
  // Background styles
  background: {
    card: 'bg-black/70 backdrop-blur-xl',
    cardHover: 'bg-black/60',
    overlay: 'bg-black/40',
    glass: 'bg-white/[0.05] backdrop-blur-md',
  },
  
  // Spacing
  spacing: {
    xs: 'gap-1',
    sm: 'gap-2',
    base: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  },
  
  // Padding
  padding: {
    xs: 'p-3',
    sm: 'p-4',
    base: 'p-5 md:p-6',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-12',
  },
  
  // Transitions
  transition: {
    default: 'transition-all duration-300',
    fast: 'transition-all duration-150',
    slow: 'transition-all duration-500',
  },
  
  // Shadows
  shadow: {
    card: 'hover:shadow-2xl hover:shadow-black/50',
    glow: 'shadow-lg',
  },
} as const;

/**
 * Z-index layers for proper stacking
 */
export const zIndex = {
  background: 0,
  base: 10,
  elevated: 20,
  overlay: 30,
  modal: 40,
  navigation: 50,
} as const;

