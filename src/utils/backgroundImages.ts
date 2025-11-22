/**
 * Dynamic gradient backgrounds for pages
 * Using beautiful animated gradients instead of static images
 */

/**
 * Generate a beautiful animated gradient background based on route
 */
export function getBackgroundForRoute(pathname: string, dayNumber?: number): string {
  // Use CSS gradients instead of images for better performance and aesthetics
  // These create beautiful, smooth animated backgrounds
  
  if (pathname === '/' || pathname === '/nabi-trip' || pathname === '/nabi-trip/') {
    // Home page - vibrant travel theme
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)';
  }
  
  // DayDetail pages - different gradient for each day
  if (dayNumber !== undefined) {
    const dayGradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', // Day 1
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)', // Day 2
      'linear-gradient(135deg, #fa709a 0%, #fee140 50%, #ff6a88 100%)', // Day 3
      'linear-gradient(135deg, #30cfd0 0%, #330867 50%, #764ba2 100%)', // Day 4
      'linear-gradient(135deg, #f6d365 0%, #fda085 50%, #ff6a88 100%)', // Day 5
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d299c2 100%)', // Day 6
      'linear-gradient(135deg, #84fab0 0%, #8fd3f4 50%, #a8edea 100%)', // Day 7
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)', // Day 8
    ];
    return dayGradients[(dayNumber - 1) % dayGradients.length];
  }
  
  // TripOverview - default beautiful gradient
  return 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';
}
