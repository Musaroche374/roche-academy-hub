import React from 'react';

interface RocheLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
  variant?: 'default' | 'white' | 'gold';
}

export const RocheLogo: React.FC<RocheLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  showTagline = false,
  variant = 'default',
}) => {
  const sizeMap = {
    sm: { icon: 34, title: 'text-sm', tag: 'text-[9px]' },
    md: { icon: 48, title: 'text-lg', tag: 'text-xs' },
    lg: { icon: 64, title: 'text-2xl', tag: 'text-sm' },
    xl: { icon: 96, title: 'text-3xl', tag: 'text-base' },
  };

  const primaryColor = variant === 'white' ? '#FFFFFF' : variant === 'gold' ? '#F5E8C7' : '#0A3D62';
  const pageBg = variant === 'white' ? '#0A3D62' : '#FFFFFF';
  const textClass = variant === 'white' ? 'text-white' : variant === 'gold' ? 'text-[#F5E8C7]' : 'text-[#0A3D62]';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={sizeMap[size].icon}
        height={sizeMap[size].icon}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105 drop-shadow-sm"
      >
        {/* Globe Grid behind the R */}
        <g id="globe-grid">
          {/* Outer circle of the globe */}
          <circle
            cx="115"
            cy="75"
            r="56"
            stroke={primaryColor}
            strokeWidth="5"
            fill="none"
          />
          {/* Vertical central meridian */}
          <ellipse
            cx="115"
            cy="75"
            rx="28"
            ry="56"
            stroke={primaryColor}
            strokeWidth="3.5"
            fill="none"
          />
          <line
            x1="115"
            y1="19"
            x2="115"
            y2="131"
            stroke={primaryColor}
            strokeWidth="3.5"
          />
          {/* Latitude parallels */}
          <ellipse
            cx="115"
            cy="75"
            rx="56"
            ry="24"
            stroke={primaryColor}
            strokeWidth="3.5"
            fill="none"
          />
          <ellipse
            cx="115"
            cy="52"
            rx="50"
            ry="14"
            stroke={primaryColor}
            strokeWidth="3"
            fill="none"
          />
          <ellipse
            cx="115"
            cy="98"
            rx="50"
            ry="14"
            stroke={primaryColor}
            strokeWidth="3"
            fill="none"
          />
        </g>

        {/* The Open Book at the bottom */}
        <g id="open-book">
          {/* Left page outline & fill */}
          <path
            d="M 100 145 C 75 130 45 135 25 142 L 32 165 C 55 156 80 152 100 167 Z"
            fill={pageBg}
            stroke={primaryColor}
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* Right page outline & fill */}
          <path
            d="M 100 145 C 125 130 155 135 175 142 L 168 165 C 145 156 120 152 100 167 Z"
            fill={pageBg}
            stroke={primaryColor}
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* Inner page text/line markers left */}
          <path
            d="M 40 148 C 60 142 80 140 92 147"
            stroke={primaryColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 43 155 C 62 149 80 148 92 154"
            stroke={primaryColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Inner page text/line markers right */}
          <path
            d="M 108 147 C 120 140 140 142 160 148"
            stroke={primaryColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 108 154 C 120 148 138 149 157 155"
            stroke={primaryColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Spine center bottom notch */}
          <path
            d="M 97 167 L 100 163 L 103 167 Z"
            fill={primaryColor}
          />
        </g>

        {/* The Bold Stylized 'R' emerging from the book */}
        <g id="roche-r">
          {/* Main bold R contour */}
          <path
            d="M 40 40 
               L 112 40 
               C 134 40 146 52 146 68 
               C 146 82 134 94 116 97 
               L 138 142 
               L 114 142 
               L 95 101 
               L 62 101 
               L 62 142 
               C 55 138 46 130 40 115 
               Z 
               M 62 58 
               L 62 85 
               L 108 85 
               C 119 85 125 79 125 71 
               C 125 63 119 58 108 58 
               Z"
            fill={primaryColor}
            fillRule="evenodd"
          />
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-black tracking-[0.18em] uppercase ${sizeMap[size].title} ${textClass} leading-tight font-display`}
          >
            ROCHE ACADEMY
          </span>
          {showTagline && (
            <span className={`text-slate-500 font-medium tracking-wide ${sizeMap[size].tag} mt-0.5`}>
              Science, Math &amp; Geography Hub
            </span>
          )}
        </div>
      )}
    </div>
  );
};
