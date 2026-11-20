import React, { useState, useEffect } from 'react';
import { BOARD_NUMBERS, CHALK_COLORS } from '../../data/boardData';
import { speakNumber, speakText } from '../../utils/speakNumber';
import Blackboard from '../Blackboard';
import Stickman from '../Stickman';
import ControlPanel from '../ControlPanel';

export default function ClassroomPage() {
  const [stickmanX, setStickmanX] = useState(140);
  const [selectedNum, setSelectedNum] = useState(BOARD_NUMBERS[0]);
  const [circledMap, setCircledMap] = useState({});
  const [action, setAction] = useState('pointing');
  const [chalkColor, setChalkColor] = useState(CHALK_COLORS[0].hex);
  const [walkStep, setWalkStep] = useState(false);
  const [autoLesson, setAutoLesson] = useState(false);
  const [muted, setMuted] = useState(false);
  const [statusText, setStatusText] = useState(
    'Stickman is pointing at number 1.'
  );

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePointAtNumber = (numObj) => {
    setAutoLesson(false);
    setSelectedNum(numObj);
    const standX = numObj.x > 220 ? numObj.x - 65 : numObj.x + 65;
    setStickmanX(standX);
    setAction('pointing');
    setStatusText(`Pointing at number ${numObj.label}!`);
    speakNumber(numObj.label, { muted });
  };

  const handleCircleNumber = () => {
    if (!selectedNum) return;
    setAutoLesson(false);
    const standX =
      selectedNum.x > 220 ? selectedNum.x - 65 : selectedNum.x + 65;
    setStickmanX(standX);
    setAction('circling');
    setCircledMap((prev) => ({
      ...prev,
      [selectedNum.id]: chalkColor,
    }));
    setStatusText(`Circled number ${selectedNum.label} in chalk!`);
    speakText(`Circled ${selectedNum.label}`, { muted });
  };

  const handleEraseAll = () => {
    setAutoLesson(false);
    setAction('erasing');
    setCircledMap({});
    setStatusText('Erased all chalk circles from the blackboard.');
    speakText('Board erased', { muted });
    setTimeout(() => setAction('idle'), 800);
  };

  const handleWalk = (direction) => {
    setAutoLesson(false);
    setAction('walking');
    setWalkStep((prev) => !prev);
    setStickmanX((prev) => {
      const next = direction === 'left' ? prev - 55 : prev + 55;
      return Math.max(110, Math.min(790, next));
    });
    setStatusText(`Walking ${direction}...`);
    setTimeout(() => setAction('idle'), 450);
  };

  const handleWave = () => {
    setAutoLesson(false);
    setAction('waving');
    setStatusText('Stickman says hello to the class!');
    speakText('Hello class!', { muted });
  };

  const handleCelebrate = () => {
    setAutoLesson(false);
    setAction('celebrating');
    setStatusText('Great job! Stickman is celebrating!');
    speakText('Great job!', { muted });
    setTimeout(() => setAction('idle'), 1100);
  };

  useEffect(() => {
    if (!autoLesson) return;
    let index = 0;

    const runStep = () => {
      const target = BOARD_NUMBERS[index % BOARD_NUMBERS.length];
      const standX = target.x > 220 ? target.x - 65 : target.x + 65;
      setSelectedNum(target);
      setStickmanX(standX);
      setAction('pointing');
      setStatusText(`Auto Lesson: Pointing & circling ${target.label}...`);
      speakNumber(target.label, { muted });

      setTimeout(() => {
        setAction('circling');
        setCircledMap((prev) => ({
          ...prev,
          [target.id]: CHALK_COLORS[index % CHALK_COLORS.length].hex,
        }));
      }, 650);

      index += 1;
    };

    runStep();
    const interval = setInterval(runStep, 1900);
    return () => clearInterval(interval);
  }, [autoLesson, muted]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight">
              Interactive Stickman Classroom
            </h1>
            <p className="text-xs text-slate-400">
              React + Tailwind CSS + SVG Kinematics + Voice Pronunciation
            </p>
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-amber-400/15 text-amber-300 border border-amber-400/30">
            {statusText}
          </span>
        </div>

        {/* SVG Classroom Stage */}
        <div className="bg-gradient-to-b from-amber-50 to-orange-50/60 border-b border-slate-200">
          <svg
            viewBox="0 0 900 450"
            className="w-full h-auto block"
            role="img"
            aria-label="Stickman standing in front of a blackboard with numbers 1 to 9"
          >
            <rect
              x="0"
              y="395"
              width="900"
              height="55"
              fill="#d97706"
              opacity="0.22"
            />
            <line
              x1="0"
              y1="395"
              x2="900"
              y2="395"
              stroke="#b45309"
              strokeWidth="3"
              opacity="0.4"
            />

            <Blackboard
              selectedId={selectedNum?.id}
              circledMap={circledMap}
              onSelectNumber={handlePointAtNumber}
            />

            <Stickman
              x={stickmanX}
              action={action}
              targetNumber={selectedNum}
              walkStep={walkStep}
              chalkColor={chalkColor}
            />
          </svg>
        </div>

        {/* Action Controls */}
        <ControlPanel
          selectedNum={selectedNum}
          circledMap={circledMap}
          chalkColor={chalkColor}
          autoLesson={autoLesson}
          muted={muted}
          onToggleMute={() => setMuted((prev) => !prev)}
          onSelectChalk={setChalkColor}
          onPointAtNumber={handlePointAtNumber}
          onCircleNumber={handleCircleNumber}
          onEraseAll={handleEraseAll}
          onWalk={handleWalk}
          onWave={handleWave}
          onCelebrate={handleCelebrate}
          onToggleAutoLesson={() => setAutoLesson((prev) => !prev)}
        />
      </div>
    </div>
  );
}