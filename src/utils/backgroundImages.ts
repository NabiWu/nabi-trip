/**
 * Background images for Mexico trip locations
 * 为三个主要城市准备的好看背景图片
 * All images use verified Unsplash URLs
 */

export const MEXICO_BACKGROUND_IMAGES = {
  // 主页 - 快乐旅行主题
  Home: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  
  // 墨西哥城 (CDMX) - Beautiful cityscape with iconic buildings
  CDMX: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  
  // 圣米格尔 (San Miguel de Allende) - Colorful colonial architecture
  SanMiguel: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  
  // 瓜纳华托 (Guanajuato) - Vibrant colorful hillside city
  Guanajuato: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
} as const;

/**
 * 根据页面路径获取背景图片
 */
export function getBackgroundForRoute(pathname: string, dayNumber?: number): string {
  // 主页
  if (pathname === '/' || pathname === '/nabi-trip' || pathname === '/nabi-trip/') {
    return MEXICO_BACKGROUND_IMAGES.Home;
  }
  
  // DayDetail 页面 - 根据天数分组
  if (dayNumber !== undefined) {
    // Day 4: San Miguel de Allende
    if (dayNumber === 4) {
      return MEXICO_BACKGROUND_IMAGES.SanMiguel;
    }
    // Day 5-6: Guanajuato
    if (dayNumber === 5 || dayNumber === 6) {
      return MEXICO_BACKGROUND_IMAGES.Guanajuato;
    }
    // Day 1-3, 7-8: CDMX
    return MEXICO_BACKGROUND_IMAGES.CDMX;
  }
  
  // TripOverview 或其他页面 - 使用 CDMX
  return MEXICO_BACKGROUND_IMAGES.CDMX;
}

