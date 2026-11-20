import React from 'react';
import { BOARD_NUMBERS } from '../data/boardData';

export default function Blackboard({
  selectedId,
  circledMap,
  onSelectNumber,
}) {
  return (
    <g>
      <defs>
        <filter id="chalkRoughness" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2.2"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      {/* Outer Wooden Frame */}
      <rect
        x="85"
        y="30"
        width="730"
        height="275"
        rx="12"
        fill="#78350f"
        stroke="#451a03"
        strokeWidth="4"
      />

      {/* Inner Slate Board */}
      <rect
        x="102"
        y="46"
        width="696"
        height="243"
        rx="6"
        fill="#1e293b"
        stroke="#0f172a"
        strokeWidth="3"
      />

      {/* Board Header */}
      <text
        x="450"
        y="74"
        textAnchor="middle"
        fill="#94a3b8"
        fontSize="14"
        fontFamily="monospace"
        letterSpacing="3"
        opacity="0.75"
      >
        CLASSROOM NUMBER BOARD — CLICK ANY NUMBER
      </text>

      {/* Chalk Tray */}
      <rect
        x="72"
        y="302"
        width="756"
        height="14"
        rx="4"
        fill="#92400e"
        stroke="#451a03"
        strokeWidth="2"
      />
      <rect x="130" y="296" width="26" height="6" rx="2" fill="#f8fafc" />
      <rect x="165" y="296" width="22" height="6" rx="2" fill="#fde047" />
      <rect x="700" y="292" width="54" height="10" rx="2" fill="#334155" />
      <rect x="700" y="298" width="54" height="4" rx="1" fill="#cbd5e1" />

      {/* Numbers & Chalk Circles */}
      {BOARD_NUMBERS.map((num) => {
        const isSelected = selectedId === num.id;
        const circleColor = circledMap[num.id];

        return (
          <g
            key={num.id}
            onClick={() => onSelectNumber(num)}
            className="cursor-pointer group"
          >
            <circle cx={num.x} cy={num.y - 10} r="36" fill="transparent" />

            {isSelected && (
              <circle
                cx={num.x}
                cy={num.y - 12}
                r="34"
                fill="rgba(253, 224, 71, 0.12)"
                stroke="rgba(253, 224, 71, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            )}

            {circleColor && (
              <ellipse
                cx={num.x}
                cy={num.y - 12}
                rx="34"
                ry="32"
                fill="none"
                stroke={circleColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="260"
                filter="url(#chalkRoughness)"
                className="animate-draw-chalk"
              />
            )}

            <text
              x={num.x}
              y={num.y}
              textAnchor="middle"
              fill={isSelected ? '#fde047' : '#f1f5f9'}
              fontSize="44"
              fontWeight="bold"
              fontFamily="Comic Sans MS, Chalkboard SE, sans-serif"
              filter="url(#chalkRoughness)"
              className="transition-colors duration-200 select-none"
            >
              {num.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}