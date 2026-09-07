import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  showSubtitle = true,
  className = ''
}) => {
  const iconSizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14'
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const subtitleSizes = {
    sm: 'text-xs',
    md: 'text-sm sm:text-base',
    lg: 'text-base'
  };

  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`} id="brand-logo">
      {/* Official Emblem: Circular badge with rooster */}
      <div className={`relative ${iconSizes[size]} shrink-0 rounded-full flex items-center justify-center shadow-sm overflow-hidden bg-[#1E1E1E] border-2 border-amber-400`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Inner ring */}
          <circle cx="50" cy="50" r="46" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="3 2" />
          
          {/* Rooster Comb (Red) */}
          <path
            d="M52 22C52 22 55 16 60 17C64 17 65 22 66 23C67 22 71 21 73 24C75 27 73 31 72 32C71 33 72 34 70 36C67 38 65 37 63 36"
            fill="#DC2626"
          />
          {/* Rooster Wattle (Red) */}
          <path
            d="M62 47C62 50 59 54 56 53C54 52 55 46 58 45"
            fill="#DC2626"
          />
          {/* Rooster Beak */}
          <path
            d="M66 38L77 42L67 46Z"
            fill="#FBBF24"
          />
          {/* Rooster Head and Neck */}
          <path
            d="M52 32C52 28 58 26 64 30C69 33 68 41 65 44C62 47 58 50 58 55C58 60 62 65 62 65L50 67C50 67 47 58 46 50C45 42 47 36 52 32Z"
            fill="#F59E0B"
          />
          {/* Rooster Eye */}
          <circle cx="61" cy="35" r="2.5" fill="#1E1E1E" />
          <circle cx="61.5" cy="34.5" r="0.8" fill="#FFFFFF" />

          {/* Rooster Body & Wing */}
          <path
            d="M50 67C46 66 38 63 32 55C26 47 24 38 24 38C24 38 29 44 36 46C31 41 29 32 29 32C29 32 35 38 42 41C39 34 38 25 38 25C38 25 44 32 48 38C50 44 50 55 50 67Z"
            fill="#FBBF24"
          />
          
          {/* Tail Plumes */}
          <path
            d="M32 55C27 57 20 56 16 52C21 58 26 62 34 64C28 66 22 67 17 65C23 69 31 71 40 69C45 74 53 77 62 76C55 77 47 74 42 70"
            fill="#E5A118"
          />
          
          {/* Base Stand */}
          <path
            d="M48 68L45 82H40L45 70M54 68L55 82H50L52 70"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col justify-center text-left leading-none">
        <div className={`font-black tracking-tight flex items-baseline gap-1 ${titleSizes[size]}`}>
          <span className="text-[#B91C1C] font-black">만나</span>
          <span className={isDark ? 'text-white' : 'text-[#422006]'}>옛날통닭</span>
        </div>
        {showSubtitle && (
          <span
            className={`mt-1 font-semibold tracking-normal ${subtitleSizes[size]} ${
              isDark ? 'text-stone-300' : 'text-[#5C320A]'
            } hidden xs:block sm:block`}
          >
            만나서 즐거운, 만나서 맛있는 옛날통닭
          </span>
        )}
      </div>
    </div>
  );
};
