/**
 * Beautiful default backgrounds for cards
 * Using gradient patterns and colors inspired by travel destinations
 */

/**
 * Generate a beautiful gradient background based on index
 * Creates unique, vibrant gradients for each card
 */
export function getCardGradient(index: number): string {
  const gradients = [
    // Vibrant sunset colors
    'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    // Ocean blues
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)',
    // Warm desert
    'linear-gradient(135deg, #fa709a 0%, #fee140 50%, #ff6a88 100%)',
    // Tropical paradise
    'linear-gradient(135deg, #30cfd0 0%, #330867 50%, #764ba2 100%)',
    // Golden hour
    'linear-gradient(135deg, #f6d365 0%, #fda085 50%, #ff6a88 100%)',
    // Purple dream
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d299c2 100%)',
    // Forest green
    'linear-gradient(135deg, #84fab0 0%, #8fd3f4 50%, #a8edea 100%)',
    // Sunset orange
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
    // Deep blue
    'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    // Coral reef
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff8a80 100%)',
  ];

  return gradients[index % gradients.length];
}

/**
 * Generate animated gradient background with multiple colors
 */
export function getAnimatedGradient(index: number): string {
  const colorSets = [
    ['#667eea', '#764ba2', '#f093fb'],
    ['#4facfe', '#00f2fe', '#43e97b'],
    ['#fa709a', '#fee140', '#ff6a88'],
    ['#30cfd0', '#330867', '#764ba2'],
    ['#f6d365', '#fda085', '#ff6a88'],
  ];

  const colors = colorSets[index % colorSets.length];
  return `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`;
}

/**
 * Get a beautiful pattern overlay for cards
 */
export function getCardPattern(index: number): string {
  const patterns = [
    'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
    'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
    'radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
    'radial-gradient(circle at 60% 40%, rgba(255,255,255,0.1) 0%, transparent 50%)',
  ];

  return patterns[index % patterns.length];
}

/**
 * Generate a complete card background style
 */
export function getCardBackgroundStyle(
  imageUrl?: string,
  index: number = 0
): React.CSSProperties {
  if (imageUrl) {
    return {
      backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%), url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }

  const gradient = getCardGradient(index);
  const pattern = getCardPattern(index);

  return {
    background: `${pattern}, ${gradient}`,
    backgroundSize: 'cover, cover',
    backgroundPosition: 'center, center',
  };
}

