import React from 'react';

export default function Stickman({
  x,
  action,
  targetNumber,
  walkStep,
  chalkColor,
}) {
  const jumpOffset = action === 'celebrating' ? -18 : 0;
  const headY = 252 + jumpOffset;
  const shoulderY = 285 + jumpOffset;
  const hipY = 355 + jumpOffset;
  const footY = 422 + jumpOffset;

  let rightHandX = x + 34;
  let rightHandY = shoulderY + 32;
  let pointerTipX = null;
  let pointerTipY = null;

  if ((action === 'pointing' || action === 'circling') && targetNumber) {
    const dx = targetNumber.x - x;
    const dy = targetNumber.y - 12 - shoulderY;
    const dist = Math.hypot(dx, dy) || 1;
    const ux = dx / dist;
    const uy = dy / dist;

    rightHandX = x + ux * 46;
    rightHandY = shoulderY + uy * 46;

    const stickLength = Math.max(30, dist - 58);
    pointerTipX = rightHandX + ux * stickLength;
    pointerTipY = rightHandY + uy * stickLength;
  } else if (action === 'celebrating') {
    rightHandX = x + 36;
    rightHandY = shoulderY - 38;
  } else if (action === 'erasing') {
    rightHandX = x + 42;
    rightHandY = shoulderY - 22;
  }

  let leftHandX = x - 34;
  let leftHandY = shoulderY + 32;
  if (action === 'celebrating') {
    leftHandX = x - 36;
    leftHandY = shoulderY - 38;
  } else if (action === 'waving') {
    leftHandX = x - 38;
    leftHandY = shoulderY - 28;
  }

  const stride = walkStep ? 14 : -14;
  const leftFootX = action === 'walking' ? x - 18 + stride : x - 20;
  const rightFootX = action === 'walking' ? x + 18 - stride : x + 20;

  return (
    <g className="transition-transform duration-300 ease-out">
      {/* Floor Shadow */}
      <ellipse
        cx={x}
        cy={426}
        rx={action === 'celebrating' ? 20 : 28}
        ry={6}
        fill="rgba(15, 23, 42, 0.22)"
      />

      {/* Head */}
      <circle
        cx={x}
        cy={headY}
        r="22"
        fill="#ffffff"
        stroke="#0f172a"
        strokeWidth="4.5"
      />

      {/* Eyes */}
      <circle
        cx={action === 'pointing' || action === 'circling' ? x - 4 : x - 7}
        cy={headY - 4}
        r="2.5"
        fill="#0f172a"
      />
      <circle
        cx={action === 'pointing' || action === 'circling' ? x + 6 : x + 7}
        cy={headY - 4}
        r="2.5"
        fill="#0f172a"
      />

      {/* Smile */}
      <path
        d={`M ${x - 7} ${headY + 5} Q ${x} ${headY + 13} ${x + 7} ${headY + 5}`}
        fill="none"
        stroke="#0f172a"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Torso */}
      <line
        x1={x}
        y1={headY + 22}
        x2={x}
        y2={hipY}
        stroke="#0f172a"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Left Arm */}
      <g
        style={{ transformOrigin: `${x}px ${shoulderY}px` }}
        className={action === 'waving' ? 'animate-wave-arm' : ''}
      >
        <line
          x1={x}
          y1={shoulderY}
          x2={leftHandX}
          y2={leftHandY}
          stroke="#0f172a"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>

      {/* Right Arm */}
      <line
        x1={x}
        y1={shoulderY}
        x2={rightHandX}
        y2={rightHandY}
        stroke="#0f172a"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Wooden Pointer Stick */}
      {action === 'pointing' && pointerTipX !== null && (
        <g>
          <line
            x1={rightHandX}
            y1={rightHandY}
            x2={pointerTipX}
            y2={pointerTipY}
            stroke="#b45309"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx={pointerTipX} cy={pointerTipY} r="4" fill="#ef4444" />
        </g>
      )}

      {/* Chalk Piece */}
      {action === 'circling' && (
        <circle
          cx={rightHandX}
          cy={rightHandY}
          r="5"
          fill={chalkColor}
          stroke="#0f172a"
          strokeWidth="1.5"
        />
      )}

      {/* Board Eraser */}
      {action === 'erasing' && (
        <rect
          x={rightHandX - 12}
          y={rightHandY - 8}
          width="24"
          height="14"
          rx="3"
          fill="#334155"
          stroke="#0f172a"
          strokeWidth="2"
        />
      )}

      {/* Legs */}
      <line
        x1={x}
        y1={hipY}
        x2={leftFootX}
        y2={footY}
        stroke="#0f172a"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <line
        x1={x}
        y1={hipY}
        x2={rightFootX}
        y2={footY}
        stroke="#0f172a"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </g>
  );
}