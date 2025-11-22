/**
 * Style variants for commonly used UI patterns
 * Centralizes repetitive style combinations for easier maintenance
 */

/**
 * Card style variants
 */
export const cardVariants = {
  // Base card style with glass effect
  base: 'bg-black/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/[0.2] transition-all duration-500',
  
  // Card with hover effects
  hoverable: 'hover:border-white/[0.3] hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1',
  
  // Card content container
  content: 'bg-black/60 backdrop-blur-sm rounded-2xl border border-white/[0.2]',
  
  // Glass card with white background
  glass: 'bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10',
  
  // Glass card with hover
  glassHover: 'hover:border-white/20 hover:shadow-lg',
  
  // Small card variant
  small: 'bg-black/60 rounded-2xl border border-white/[0.2]',
} as const;

/**
 * Button style variants
 */
export const buttonVariants = {
  // Primary button style
  primary: 'bg-black/30 hover:bg-black/50 border border-white/[0.12] hover:border-white/[0.2] text-white transition-all duration-300',
  
  // Secondary button style
  secondary: 'bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/[0.15] text-slate-300 hover:text-white transition-all duration-300',
  
  // Blue accent button
  blue: 'bg-blue-500/20 hover:bg-blue-500/30 active:bg-blue-500/40 text-blue-300 rounded-lg border border-blue-500/30 transition-all',
  
  // Glass button
  glass: 'bg-white/10 active:bg-white/20 rounded-lg border border-white/20 transition-all',
  
  // Navigation button
  nav: 'px-5 md:px-6 py-3 rounded-2xl transition-all duration-300 text-base text-center font-medium min-h-[44px] flex items-center justify-center',
} as const;

/**
 * Badge style variants
 */
export const badgeVariants = {
  // Default badge
  default: 'text-base text-slate-400 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08]',
  
  // Badge with backdrop blur
  glass: 'px-4 py-2 rounded-full font-medium backdrop-blur-md bg-white/[0.15] text-white border border-white/30 shadow-lg',
  
  // Small badge
  small: 'text-sm text-slate-400 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08]',
} as const;

/**
 * Gradient background variants
 */
export const gradientVariants = {
  // Purple to blue to pink gradient
  purple: 'bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl border border-white/20',
  
  // Green to emerald to teal gradient
  green: 'bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 backdrop-blur-lg rounded-2xl border border-green-400/30 hover:border-green-400/50',
  
  // Blue to indigo to purple gradient
  blue: 'bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl border border-blue-400/30 hover:border-blue-400/50',
  
  // Amber to orange to red gradient
  amber: 'bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-lg rounded-2xl border border-amber-400/30',
  
  // Pink to rose to orange gradient
  pink: 'bg-gradient-to-br from-pink-500/20 via-rose-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl border border-pink-400/30 hover:border-pink-400/50',
  
  // Slate to gray to zinc gradient
  slate: 'bg-gradient-to-br from-slate-500/20 via-gray-500/20 to-zinc-500/20 backdrop-blur-lg rounded-2xl border border-slate-400/30',
  
  // Large gradient cards with hover effects
  purpleLarge: 'bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl border border-blue-400/30',
  greenLarge: 'bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-3xl border border-green-400/30',
  grayLarge: 'bg-gradient-to-br from-gray-500/20 via-slate-500/20 to-zinc-500/20 backdrop-blur-xl rounded-3xl border border-gray-400/30',
} as const;

/**
 * Navigation style variants
 */
export const navVariants = {
  // Sticky navigation bar
  sticky: 'sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/[0.1]',
  
  // Bottom navigation
  bottom: 'bg-black/95 backdrop-blur-xl',
} as const;

/**
 * Divider style variants
 */
export const dividerVariants = {
  default: 'h-px bg-white/10',
  subtle: 'border-t border-white/[0.05]',
  medium: 'border-t border-white/10',
} as const;

