/**
 * Background image utilities for different locations
 * Uses Unsplash for high-quality, curated travel photos
 */

/**
 * Get background image URL based on location/city
 */
export function getLocationBackground(city: string): string {
  const backgrounds: Record<string, string> = {
    // Mexico City (CDMX) - Modern cityscape with landmarks
    'CDMX': 'https://images.unsplash.com/photo-1520986606214-8b456906c813?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'Mexico City': 'https://images.unsplash.com/photo-1520986606214-8b456906c813?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'Mexico City International Airport': 'https://images.unsplash.com/photo-1520986606214-8b456906c813?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    
    // Roma - Artistic, colorful neighborhood in Mexico City
    'Roma': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    
    // Polanco - Upscale, modern district in Mexico City
    'Polanco': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    
    // San Miguel de Allende - Colorful colonial architecture
    'San Miguel de Allende': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'SMA': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    
    // Guanajuato - Vibrant colorful hillside city
    'Guanajuato': 'https://images.unsplash.com/photo-1565693098696-fbb7a7c57d22?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    
    // Default Mexico - General Mexico landscape
    'default': 'https://images.unsplash.com/photo-1532990400857-e8d9d275d858?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    
    // Home page - Happy travel adventure style (colorful, joyful, playful)
    'home': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  };

  // Try exact match first
  if (backgrounds[city]) {
    return backgrounds[city];
  }

  // Try partial match
  const cityLower = city.toLowerCase();
  for (const [key, url] of Object.entries(backgrounds)) {
    if (cityLower.includes(key.toLowerCase()) || key.toLowerCase().includes(cityLower)) {
      return url;
    }
  }

  // Default Mexico background
  return backgrounds.default;
}

/**
 * Extract city/location from day information
 * Priority: accommodation > title
 */
export function extractLocationFromDay(dayTitle: string, accommodation?: string): string {
  const titleLower = dayTitle.toLowerCase();
  const accommodationLower = accommodation?.toLowerCase() || '';
  
  // Priority 1: Extract from accommodation (more specific)
  if (accommodation) {
    if (accommodationLower.includes('roma') || accommodationLower.includes('casa tenue')) {
      return 'Roma';
    }
    if (accommodationLower.includes('polanco')) {
      return 'Polanco';
    }
    if (accommodationLower.includes('numu') || accommodationLower.includes('sma') || accommodationLower.includes('san miguel')) {
      return 'San Miguel de Allende';
    }
    if (accommodationLower.includes('peñitas') || accommodationLower.includes('guanajuato')) {
      return 'Guanajuato';
    }
  }
  
  // Priority 2: Extract from title
  if (titleLower.includes('cdmx') || titleLower.includes('mexico city') || titleLower.includes('mex city')) {
    // Check if title specifies a neighborhood
    if (titleLower.includes('roma')) {
      return 'Roma';
    }
    if (titleLower.includes('polanco')) {
      return 'Polanco';
    }
    return 'CDMX';
  }
  
  if (titleLower.includes('san miguel')) {
    return 'San Miguel de Allende';
  }
  
  if (titleLower.includes('guanajuato')) {
    return 'Guanajuato';
  }
  
  // Default fallback
  return 'default';
}

