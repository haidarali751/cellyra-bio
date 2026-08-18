import React from "react";

export interface CapabilityVisualProps extends React.SVGProps<SVGSVGElement> {}

export const ComputationalBiologyVisual = ({
  className = "h-full w-full opacity-35 transition-all duration-700 group-hover:scale-110 group-hover:opacity-75",
  ...props
}: CapabilityVisualProps) => {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <radialGradient id="cap-glow-0" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#B7FFB1" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#B7FFB1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle
        cx="80"
        cy="80"
        r="65"
        stroke="#B7FFB1"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.3"
      />
      <circle
        cx="80"
        cy="80"
        r="45"
        stroke="#B7FFB1"
        strokeWidth="1"
        opacity="0.4"
        fill="url(#cap-glow-0)"
      />
      <circle
        cx="80"
        cy="80"
        r="18"
        fill="#B7FFB1"
        fillOpacity="0.2"
        stroke="#B7FFB1"
        strokeWidth="1.5"
      />

      {/* Node network */}
      <line
        x1="80"
        y1="80"
        x2="45"
        y2="45"
        stroke="#B7FFB1"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <line
        x1="80"
        y1="80"
        x2="115"
        y2="45"
        stroke="#B7FFB1"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <line
        x1="80"
        y1="80"
        x2="120"
        y2="105"
        stroke="#B7FFB1"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <line
        x1="80"
        y1="80"
        x2="40"
        y2="110"
        stroke="#B7FFB1"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <line
        x1="45"
        y1="45"
        x2="115"
        y2="45"
        stroke="#B7FFB1"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.4"
      />
      <line
        x1="115"
        y1="45"
        x2="120"
        y2="105"
        stroke="#B7FFB1"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.4"
      />

      <circle
        cx="45"
        cy="45"
        r="5"
        fill="#08090B"
        stroke="#B7FFB1"
        strokeWidth="2"
      />
      <circle
        cx="115"
        cy="45"
        r="5"
        fill="#08090B"
        stroke="#B7FFB1"
        strokeWidth="2"
      />
      <circle
        cx="120"
        cy="105"
        r="5"
        fill="#08090B"
        stroke="#B7FFB1"
        strokeWidth="2"
      />
      <circle
        cx="40"
        cy="110"
        r="5"
        fill="#08090B"
        stroke="#B7FFB1"
        strokeWidth="2"
      />
      <circle cx="80" cy="80" r="4" fill="#B7FFB1" />
    </svg>
  );
};

export const MolecularEngineeringVisual = ({
  className = "h-full w-full opacity-35 transition-all duration-700 group-hover:scale-110 group-hover:opacity-75",
  ...props
}: CapabilityVisualProps) => {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <radialGradient id="cap-glow-1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8FFFA0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8FFFA0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="80" cy="80" r="60" fill="url(#cap-glow-1)" opacity="0.3" />
      <path
        d="M30 80 Q55 35 80 80 T130 80"
        stroke="#8FFFA0"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M30 80 Q55 125 80 80 T130 80"
        stroke="#8FFFA0"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Helix bonds */}
      <line
        x1="55"
        y1="58"
        x2="55"
        y2="102"
        stroke="#8FFFA0"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <line
        x1="80"
        y1="70"
        x2="80"
        y2="90"
        stroke="#8FFFA0"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <line
        x1="105"
        y1="58"
        x2="105"
        y2="102"
        stroke="#8FFFA0"
        strokeWidth="1.5"
        opacity="0.6"
      />

      <circle cx="55" cy="58" r="4" fill="#8FFFA0" />
      <circle cx="55" cy="102" r="4" fill="#8FFFA0" />
      <circle cx="105" cy="58" r="4" fill="#8FFFA0" />
      <circle cx="105" cy="102" r="4" fill="#8FFFA0" />
      <circle cx="80" cy="80" r="5" fill="#8FFFA0" />
    </svg>
  );
};

export const PrecisionTherapeuticsVisual = ({
  className = "h-full w-full opacity-35 transition-all duration-700 group-hover:scale-110 group-hover:opacity-75",
  ...props
}: CapabilityVisualProps) => {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <radialGradient id="cap-glow-2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle
        cx="80"
        cy="80"
        r="55"
        stroke="#4ECDC4"
        strokeWidth="1.5"
        opacity="0.25"
        strokeDasharray="4 4"
      />
      <circle
        cx="80"
        cy="80"
        r="38"
        stroke="#4ECDC4"
        strokeWidth="1.5"
        opacity="0.5"
        fill="url(#cap-glow-2)"
      />
      <circle
        cx="80"
        cy="80"
        r="14"
        fill="#4ECDC4"
        fillOpacity="0.25"
        stroke="#4ECDC4"
        strokeWidth="2"
      />

      {/* Targeting crosshairs */}
      <line
        x1="80"
        y1="20"
        x2="80"
        y2="40"
        stroke="#4ECDC4"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="80"
        y1="120"
        x2="80"
        y2="140"
        stroke="#4ECDC4"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="80"
        x2="40"
        y2="80"
        stroke="#4ECDC4"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="120"
        y1="80"
        x2="140"
        y2="80"
        stroke="#4ECDC4"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <circle cx="80" cy="80" r="3" fill="#4ECDC4" />
      <rect
        x="52"
        y="52"
        width="56"
        height="56"
        rx="6"
        stroke="#4ECDC4"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.4"
      />
    </svg>
  );
};

export const SyntheticBiologyVisual = ({
  className = "h-full w-full opacity-35 transition-all duration-700 group-hover:scale-110 group-hover:opacity-75",
  ...props
}: CapabilityVisualProps) => {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <radialGradient id="cap-glow-3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#B7FFB1" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#B7FFB1" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Circuit logic paths */}
      <path
        d="M25 80 L60 80 L80 45 L110 45 L135 45"
        stroke="#B7FFB1"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M60 80 L80 115 L110 115 L135 115"
        stroke="#B7FFB1"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="60" cy="80" r="18" fill="url(#cap-glow-3)" opacity="0.5" />
      <circle cx="25" cy="80" r="4.5" fill="#B7FFB1" />
      <circle
        cx="60"
        cy="80"
        r="5.5"
        fill="#08090B"
        stroke="#B7FFB1"
        strokeWidth="2.5"
      />
      <circle cx="80" cy="45" r="4.5" fill="#B7FFB1" />
      <circle cx="80" cy="115" r="4.5" fill="#B7FFB1" />
      <circle
        cx="135"
        cy="45"
        r="5.5"
        fill="#08090B"
        stroke="#B7FFB1"
        strokeWidth="2.5"
      />
      <circle
        cx="135"
        cy="115"
        r="5.5"
        fill="#08090B"
        stroke="#B7FFB1"
        strokeWidth="2.5"
      />

      {/* Logic gate box */}
      <rect
        x="92"
        y="32"
        width="26"
        height="26"
        rx="4"
        fill="#08090B"
        stroke="#B7FFB1"
        strokeWidth="1.5"
      />
      <path
        d="M100 45 L110 45"
        stroke="#B7FFB1"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M105 40 L105 50"
        stroke="#B7FFB1"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const EpigeneticVisual = ({
  className = "h-full w-full opacity-35 transition-all duration-700 group-hover:scale-110 group-hover:opacity-75",
  ...props
}: CapabilityVisualProps) => {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <radialGradient id="cap-glow-4" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e879f9" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#e879f9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="80" cy="80" r="50" fill="url(#cap-glow-4)" opacity="0.3" />
      <circle
        cx="80"
        cy="80"
        r="28"
        stroke="#e879f9"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <circle cx="80" cy="80" r="16" fill="#e879f9" fillOpacity="0.25" stroke="#e879f9" strokeWidth="2" />
      <path d="M40 80 Q60 50 80 80 T120 80" stroke="#e879f9" strokeWidth="2" fill="none" />
      <circle cx="50" cy="65" r="4" fill="#e879f9" />
      <circle cx="110" cy="95" r="4" fill="#e879f9" />
      <line x1="50" y1="65" x2="50" y2="76" stroke="#e879f9" strokeWidth="1.5" />
      <line x1="110" y1="95" x2="110" y2="84" stroke="#e879f9" strokeWidth="1.5" />
    </svg>
  );
};

export const MicrofluidicVisual = ({
  className = "h-full w-full opacity-35 transition-all duration-700 group-hover:scale-110 group-hover:opacity-75",
  ...props
}: CapabilityVisualProps) => {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <radialGradient id="cap-glow-5" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="80" cy="80" r="55" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      <path d="M25 80 L65 80 L90 50 L135 50" stroke="#38bdf8" strokeWidth="2" fill="none" />
      <path d="M65 80 L90 110 L135 110" stroke="#38bdf8" strokeWidth="2" fill="none" />
      <circle cx="45" cy="80" r="6" fill="#38bdf8" fillOpacity="0.5" stroke="#38bdf8" strokeWidth="1.5" />
      <circle cx="105" cy="50" r="5" fill="#38bdf8" />
      <circle cx="125" cy="50" r="5" fill="#38bdf8" />
      <circle cx="105" cy="110" r="5" fill="#38bdf8" />
      <circle cx="125" cy="110" r="5" fill="#38bdf8" />
    </svg>
  );
};

export const QuantumBioVisual = ({
  className = "h-full w-full opacity-35 transition-all duration-700 group-hover:scale-110 group-hover:opacity-75",
  ...props
}: CapabilityVisualProps) => {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <radialGradient id="cap-glow-6" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="80" cy="80" rx="55" ry="20" stroke="#fbbf24" strokeWidth="1.5" opacity="0.7" transform="rotate(-30 80 80)" />
      <ellipse cx="80" cy="80" rx="55" ry="20" stroke="#fbbf24" strokeWidth="1.5" opacity="0.7" transform="rotate(30 80 80)" />
      <ellipse cx="80" cy="80" rx="55" ry="20" stroke="#fbbf24" strokeWidth="1.5" opacity="0.7" transform="rotate(90 80 80)" />
      <circle cx="80" cy="80" r="8" fill="#fbbf24" />
      <circle cx="120" cy="65" r="3.5" fill="#fbbf24" />
      <circle cx="45" cy="95" r="3.5" fill="#fbbf24" />
    </svg>
  );
};

export const AutonomousRoboticVisual = ({
  className = "h-full w-full opacity-35 transition-all duration-700 group-hover:scale-110 group-hover:opacity-75",
  ...props
}: CapabilityVisualProps) => {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <radialGradient id="cap-glow-7" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="35" y="35" width="90" height="90" rx="10" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
      {[50, 70, 90, 110].map((x) =>
        [50, 70, 90, 110].map((y) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={x === 70 && y === 70 ? 4 : 2.5}
            fill="#34d399"
            opacity={(x + y) % 3 === 0 ? 0.9 : 0.35}
          />
        ))
      )}
      <circle cx="80" cy="80" r="30" stroke="#34d399" strokeWidth="1" opacity="0.6" />
    </svg>
  );
};

export const CapabilityVisual = ({
  index,
  className,
}: {
  index: number;
  className?: string;
}) => {
  switch (index) {
    case 0:
      return <ComputationalBiologyVisual className={className} />;
    case 1:
      return <MolecularEngineeringVisual className={className} />;
    case 2:
      return <PrecisionTherapeuticsVisual className={className} />;
    case 3:
      return <SyntheticBiologyVisual className={className} />;
    case 4:
      return <EpigeneticVisual className={className} />;
    case 5:
      return <MicrofluidicVisual className={className} />;
    case 6:
      return <QuantumBioVisual className={className} />;
    case 7:
      return <AutonomousRoboticVisual className={className} />;
    default:
      return <ComputationalBiologyVisual className={className} />;
  }
};
