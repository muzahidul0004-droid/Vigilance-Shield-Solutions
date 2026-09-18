import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'header' | 'icon' | 'hero' | 'footer';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'header',
  size = 'md',
}) => {
  // SVG Defs for metallic gradients
  const SvgDefs = () => (
    <defs>
      {/* Silver metallic gradient */}
      <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="30%" stopColor="#D8E2EC" />
        <stop offset="70%" stopColor="#8E9DAE" />
        <stop offset="100%" stopColor="#BAC7D5" />
      </linearGradient>

      {/* Gold metallic gradient */}
      <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="25%" stopColor="#F59E0B" />
        <stop offset="50%" stopColor="#D97706" />
        <stop offset="85%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>

      {/* Gold foil soft glow */}
      <linearGradient id="gold-bright" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#CA8A04" />
      </linearGradient>

      {/* Shield Inner Dark Background */}
      <linearGradient id="shield-inner" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#131B26" />
        <stop offset="100%" stopColor="#080C12" />
      </linearGradient>

      {/* Subtle drop shadow */}
      <filter id="badge-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#D4AF37" floodOpacity="0.25" />
      </filter>
    </defs>
  );

  // Shield dimensions
  const shieldWidth = size === 'sm' ? 36 : size === 'md' ? 46 : size === 'lg' ? 68 : 96;
  const shieldHeight = (shieldWidth * 110) / 96;

  const ShieldIcon = () => (
    <svg
      width={shieldWidth}
      height={shieldHeight}
      viewBox="0 0 100 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
    >
      <SvgDefs />
      
      {/* Outer Shield Border - Left Half Silver */}
      <path
        d="M 50,6 L 16,22 C 16,66 28,95 50,110 L 50,6 Z"
        fill="url(#silver-grad)"
      />
      {/* Outer Shield Border - Right Half Gold */}
      <path
        d="M 50,6 L 84,22 C 84,66 72,95 50,110 L 50,6 Z"
        fill="url(#gold-grad)"
      />

      {/* Inner Dark Shield Body */}
      <path
        d="M 50,14 L 23,27 C 23,63 33,88 50,102 C 67,88 77,63 77,27 L 50,14 Z"
        fill="url(#shield-inner)"
      />

      {/* Inner Bevel Rim Highlight */}
      <path
        d="M 50,16 L 25,28 C 25,62 34,86 50,99"
        stroke="#E2E8F0"
        strokeWidth="1.2"
        strokeOpacity="0.6"
        fill="none"
      />
      <path
        d="M 50,16 L 75,28 C 75,62 66,86 50,99"
        stroke="#FCD34D"
        strokeWidth="1.2"
        strokeOpacity="0.7"
        fill="none"
      />

      {/* Monogram 'V' (Silver Serif letter) */}
      <path
        d="M 28,34 L 38,34 L 48,72 L 53,72 L 67,34 L 59,34 L 50,61 L 40,34 L 28,34 Z"
        fill="url(#silver-grad)"
      />
      {/* Serif brackets on V */}
      <rect x="27" y="32.5" width="12" height="2" rx="0.5" fill="url(#silver-grad)" />
      <rect x="58" y="32.5" width="10" height="2" rx="0.5" fill="url(#silver-grad)" />

      {/* Monogram 'S' (Warm Polished Gold swooping in front & through the V) */}
      <path
        d="M 68,36 C 65,34 59,33 53,35 C 47,37 45,42 46,47 C 47,52 52,55 58,57 C 66,60 72,63 72,70 C 72,79 63,84 53,83 C 46,82 40,78 37,74 L 42,68 C 45,71 49,74 54,74 C 59,74 62,72 62,68 C 62,64 57,61 51,59 C 43,56 38,52 38,44 C 38,36 46,29 55,29 C 62,29 67,32 70,35 L 68,36 Z"
        fill="url(#gold-grad)"
        style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.6))' }}
      />
    </svg>
  );

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <ShieldIcon />
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="relative mb-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-600/10 rounded-full blur-2xl opacity-75" />
          <ShieldIcon />
        </div>
        <div className="space-y-2">
          <h1 className="font-['Cinzel'] tracking-[0.18em] text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-amber-200 to-amber-400 drop-shadow-sm">
            Vigilance Shield
          </h1>
          <div className="flex items-center justify-center gap-3 py-1">
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-amber-500 to-amber-300" />
            <span className="font-['Cinzel'] text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-amber-400">
              & Solutions
            </span>
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-amber-500 to-amber-300" />
          </div>
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-amber-200/80 uppercase">
            Contracts • Compliance • Protection • Business Solutions
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 ${className}`}>
        <ShieldIcon />
        <div>
          <div className="font-['Cinzel'] text-xl font-bold tracking-[0.14em] text-slate-100">
            VIGILANCE SHIELD
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="h-[1px] w-6 bg-amber-500/70" />
            <span className="font-['Cinzel'] text-xs font-semibold tracking-[0.24em] text-amber-400">
              & SOLUTIONS
            </span>
            <span className="h-[1px] w-6 bg-amber-500/70" />
          </div>
          <p className="text-[10px] tracking-[0.2em] text-slate-400 font-medium mt-1 uppercase">
            Protecting Interests. Delivering Solutions.
          </p>
        </div>
      </div>
    );
  }

  // Header / Standard compact brand lockup
  return (
    <div className={`group flex items-center gap-3 cursor-pointer ${className}`}>
      <ShieldIcon />
      <div className="flex flex-col">
        <span className="font-['Cinzel'] text-base sm:text-lg font-bold tracking-[0.16em] text-slate-100 transition-colors group-hover:text-amber-300">
          VIGILANCE SHIELD
        </span>
        <div className="flex items-center gap-1.5 -mt-0.5">
          <span className="h-[1px] w-3 bg-amber-500/80" />
          <span className="font-['Cinzel'] text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] text-amber-400">
            & SOLUTIONS
          </span>
          <span className="h-[1px] w-3 bg-amber-500/80" />
        </div>
      </div>
    </div>
  );
};
