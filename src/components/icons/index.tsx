/**
 * Icon components - Modern, minimal SVG icons
 * Replaces emojis with professional iconography
 */

interface IconProps {
  className?: string;
  size?: number;
}

export function CalendarIcon({ className = "w-6 h-6", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

export function LocationIcon({ className = "w-6 h-6", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export function HomeIcon({ className = "w-6 h-6", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

export function SparklesIcon({ className = "w-6 h-6", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

export function PlaneIcon({ className = "w-6 h-6", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );
}

export function BuildingIcon({ className = "w-6 h-6", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

export function LightBulbIcon({ className = "w-6 h-6", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

export function UtensilsIcon({ className = "w-6 h-6", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  );
}

export function MapPinIcon({ className = "w-6 h-6", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export function PlusIcon({ className = "w-6 h-6", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}

// Weather Icons
export function SunIcon({ className = "w-6 h-6", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

export function CloudIcon({ className = "w-6 h-6", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  );
}

export function CloudSunIcon({ className = "w-6 h-6", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function RainIcon({ className = "w-6 h-6", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 19v-2m4 2v-4m4 4v-2" />
    </svg>
  );
}

export function SnowIcon({ className = "w-6 h-6", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 19l2-2m4 0l2-2m-4 4l2-2m4 0l2-2" />
    </svg>
  );
}

export function ThunderIcon({ className = "w-6 h-6", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

export function FogIcon({ className = "w-6 h-6", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16h10M7 20h10" />
    </svg>
  );
}

export function RefreshIcon({ className = "w-6 h-6", size }: IconProps) {
  const sizeClass = size ? `w-${size} h-${size}` : className;
  return (
    <svg className={sizeClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

