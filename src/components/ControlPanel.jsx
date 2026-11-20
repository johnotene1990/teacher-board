import React from 'react';
import {
  Pointer,
  CircleDot,
  Eraser,
  Hand,
  Sparkles,
  Play,
  Square,
  ArrowLeft,
  ArrowRight,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { BOARD_NUMBERS, CHALK_COLORS } from '../data/boardData';

export default function ControlPanel({
  selectedNum,
  circledMap,
  chalkColor,
  autoLesson,
  muted,
  onToggleMute,
  onSelectChalk,
  onPointAtNumber,
  onCircleNumber,
  onEraseAll,
  onWalk,
  onWave,
  onCelebrate,
  onToggleAutoLesson,
}) {
  return (
    <div className="p-6 space-y-5 bg-white">
      {/* Row 1: Number Grid & Chalk Color Picker */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            1. Choose a Number to Point & Pronounce
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Chalk Color:</span>
            {CHALK_COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => onSelectChalk(c.hex)}
                title={c.name}
                className={`w-5 h-5 rounded-full border border-slate-400 transition-transform ${
                  c.ringClass
                } ${
                  chalkColor === c.hex
                    ? 'scale-125 ring-2 ring-slate-900'
                    : 'opacity-80 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-9 gap-2">
          {BOARD_NUMBERS.map((num) => {
            const active = selectedNum?.id === num.id;
            const isCircled = Boolean(circledMap[num.id]);

            return (
              <button
                key={num.id}
                onClick={() => onPointAtNumber(num)}
                className={`relative py-2.5 rounded-xl font-bold text-base transition-all border ${
                  active
                    ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-md -translate-y-0.5'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {num.label}
                {isCircled && (
                  <span
                    className="absolute top-1 right-1 w-2 h-2 rounded-full"
                    style={{ backgroundColor: circledMap[num.id] }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 2: Stickman Action Buttons */}
      <div>
        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          2. Stickman Actions & Voice Controls
        </span>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => selectedNum && onPointAtNumber(selectedNum)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition"
          >
            <Pointer className="w-4 h-4" />
            Point at {selectedNum?.label}
          </button>

          <button
            onClick={onCircleNumber}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition"
          >
            <CircleDot className="w-4 h-4" />
            Circle {selectedNum?.label}
          </button>

          <button
            onClick={onEraseAll}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition"
          >
            <Eraser className="w-4 h-4" />
            Erase Board
          </button>

          <button
            onClick={() => onWalk('left')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Walk Left
          </button>

          <button
            onClick={() => onWalk('right')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
          >
            Walk Right
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onWave}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-sky-600 hover:bg-sky-700 text-white shadow-sm transition"
          >
            <Hand className="w-4 h-4" />
            Wave Hello
          </button>

          <button
            onClick={onCelebrate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition"
          >
            <Sparkles className="w-4 h-4" />
            Celebrate
          </button>

          <button
            onClick={onToggleMute}
            className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
              muted
                ? 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                : 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm'
            }`}
          >
            {muted ? (
              <>
                <VolumeX className="w-4 h-4" />
                Muted
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                Voice On
              </>
            )}
          </button>

          <button
            onClick={onToggleAutoLesson}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition ml-auto ${
              autoLesson
                ? 'bg-slate-900 text-amber-300'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {autoLesson ? (
              <>
                <Square className="w-4 h-4" />
                Stop Auto Lesson
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Auto Lesson
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}