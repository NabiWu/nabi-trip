import { 
  SunIcon, 
  CloudIcon, 
  CloudSunIcon, 
  RainIcon, 
  SnowIcon, 
  ThunderIcon, 
  FogIcon 
} from './index';

interface WeatherIconProps {
  code: string;
  className?: string;
  size?: number;
}

/**
 * Weather icon component that maps weather codes to appropriate icons
 */
export function WeatherIcon({ code, className = "w-8 h-8", size }: WeatherIconProps) {
  const codeNum = parseInt(code);
  
  // Thunderstorm (200-299)
  if (codeNum >= 200 && codeNum < 300) {
    return <ThunderIcon className={className} size={size} />;
  }
  
  // Drizzle/Rain (300-599)
  if (codeNum >= 300 && codeNum < 600) {
    return <RainIcon className={className} size={size} />;
  }
  
  // Snow (600-699)
  if (codeNum >= 600 && codeNum < 700) {
    return <SnowIcon className={className} size={size} />;
  }
  
  // Atmosphere/Fog (700-799)
  if (codeNum >= 700 && codeNum < 800) {
    return <FogIcon className={className} size={size} />;
  }
  
  // Clear (800)
  if (codeNum === 800) {
    return <SunIcon className={className} size={size} />;
  }
  
  // Clouds (801-809)
  if (codeNum >= 801 && codeNum < 810) {
    if (codeNum === 801) {
      return <CloudSunIcon className={className} size={size} />;
    }
    return <CloudIcon className={className} size={size} />;
  }
  
  // Default - Cloud with sun
  return <CloudSunIcon className={className} size={size} />;
}

