'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import {
  saturdaySchedule, sundaySchedule, STAGE_META, TSTART, TEND, TDUR,
  parseTime, fmt, fmtMins, getOrlandoMinutes,
  type Stage, type SetTime, type Day,
} from '@/lib/schedule-data';
import { cn } from '@/lib/utils';

const PX_PER_MIN = 2.6;

function toY(mins: number) {
  return (mins - TSTART) * PX_PER_MIN;
}

const TOTAL_H = TDUR * PX_PER_MIN;
const HOUR_MARKS = Array.from({ length: 11 }, (_, i) => 13 + i); // 1 PM to 11 PM

// ─────────────────────────────────────────────────────────────
export default function App() {
  const selectedDay = 'sunday' as const;
  const schedule = sundaySchedule;

  const [saved, setSaved] = useState<Set<string>>(() => new Set());
  useEffect(() => {
    try {
      const raw = localStorage.getItem('rl-saved');
      if (raw) setSaved(new Set(JSON.parse(raw)));
    } catch {}
  }, []);

  function toggleSave(id: string) {
    setSaved(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      localStorage.setItem('rl-saved', JSON.stringify([...next]));
      return next;
    });
  }

  const [view, setView] = useState<'timeline' | 'map'>('timeline');
  const [liveMin, setLiveMin] = useState(TSTART);
  const nowMin = liveMin;

  useEffect(() => {
    setLiveMin(getOrlandoMinutes());
    const id = setInterval(() => setLiveMin(getOrlandoMinutes()), 150_000);
    return () => clearInterval(id);
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!scrollRef.current || view !== 'timeline') return;
    const target = toY(Math.max(TSTART, Math.min(TEND, nowMin)));
    scrollRef.current.scrollTop = Math.max(0, target - 120);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  const inFestival = nowMin >= TSTART && nowMin <= TEND;

  // Conflict detection — memoized so it only recalculates when saved set or day changes
  const conflictIds = useMemo(() => {
    const savedSets = schedule.filter(s => saved.has(s.id));
    const ids = new Set<string>();
    for (let i = 0; i < savedSets.length; i++) {
      for (let j = i + 1; j < savedSets.length; j++) {
        const a = savedSets[i], b = savedSets[j];
        const as = parseTime(a.startTime), ae = parseTime(a.endTime);
        const bs = parseTime(b.startTime), be = parseTime(b.endTime);
        if (as < be && bs < ae) {
          ids.add(a.id);
          ids.add(b.id);
        }
      }
    }
    return ids;
  }, [schedule, saved]);

  const dayLabel = 'Sun May 10';

  return (
    <div className="h-dvh flex flex-col bg-white overflow-hidden select-none">

      {/* Header */}
      <header className="shrink-0 bg-white border-b border-neutral-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-semibold tracking-widest text-neutral-400 uppercase leading-none">
              Rolling Loud · Orlando · {dayLabel}
            </p>
            <p className="font-bold text-base tracking-tight leading-none mt-1 text-neutral-900">
              {fmtMins(nowMin)}
              {inFestival && (
                <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 align-middle">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  LIVE
                </span>
              )}
            </p>
          </div>

          {/* View toggle */}
          <div className="flex border border-neutral-200 rounded-lg overflow-hidden text-[11px] font-semibold">
            <button
              onClick={() => setView('timeline')}
              className={cn(
                'px-3 py-1.5 transition-colors',
                view === 'timeline' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-500 hover:bg-neutral-50'
              )}
            >
              Timeline
            </button>
            <button
              onClick={() => setView('map')}
              className={cn(
                'px-3 py-1.5 transition-colors border-l border-neutral-200',
                view === 'map' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-500 hover:bg-neutral-50'
              )}
            >
              Map
            </button>
          </div>
        </div>



        {/* Legend */}
        <div className="flex items-center gap-2 mt-1.5">
          {(['ua', 'verizon', 'zigzag'] as Stage[]).map(s => (
            <div key={s} className="flex items-center gap-1">
              <span className={cn('w-1.5 h-1.5 rounded-sm shrink-0', STAGE_META[s].colorClass)} />
              <span className="text-[9px] font-medium text-neutral-400">{STAGE_META[s].short}</span>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-2">
            {saved.size > 0 && (
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-medium text-neutral-500">{saved.size} saved</span>
              </div>
            )}
            {conflictIds.size > 0 && (
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm border-2 border-red-500 bg-neutral-300 shrink-0" />
                <span className="text-[9px] font-medium text-red-500">conflict</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── TIMELINE VIEW ─────────────────────────────────── */}
      {view === 'timeline' && (
        <>
          {/* Stage column headers */}
          <div className="shrink-0 grid grid-cols-[36px_1fr_1fr_1fr] border-b border-neutral-200 bg-white">
            <div />
            {(['ua', 'zigzag', 'verizon'] as Stage[]).map(s => (
              <div
                key={s}
                className={cn(
                  'py-2 text-center text-[10px] font-bold tracking-wider',
                  STAGE_META[s].colorClass,
                  STAGE_META[s].textClass,
                )}
              >
                {STAGE_META[s].label}
              </div>
            ))}
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="relative grid grid-cols-[36px_1fr_1fr_1fr]" style={{ height: TOTAL_H + 40 }}>

              {/* Hour axis */}
              <div className="relative col-start-1">
                {HOUR_MARKS.map(h => {
                  const label = h > 12 ? `${h - 12}PM` : h === 12 ? '12PM' : `${h}AM`;
                  return (
                    <div key={h} className="absolute right-1 flex items-center" style={{ top: toY(h * 60) - 5 }}>
                      <span className="text-[9px] text-neutral-400 leading-none">{label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Hour grid lines */}
              {HOUR_MARKS.map(h => (
                <div
                  key={h}
                  className="absolute left-9 right-0 border-t border-neutral-100 pointer-events-none"
                  style={{ top: toY(h * 60) }}
                />
              ))}

              {/* Stage columns */}
              {(['ua', 'zigzag', 'verizon'] as Stage[]).map((stage, colIdx) => (
                <div key={stage} className={cn('relative', colIdx > 0 && 'border-l border-neutral-100')}>
                  {schedule.filter(s => s.stage === stage).map(set => (
                    <SetBlock
                      key={set.id}
                      set={set}
                      stage={stage}
                      isSaved={saved.has(set.id)}
                      isConflict={conflictIds.has(set.id)}
                      nowMin={nowMin}
                      onToggle={() => toggleSave(set.id)}
                    />
                  ))}
                </div>
              ))}

              {/* Now line */}
              {inFestival && (
                <div
                  className="absolute left-9 right-0 flex items-center pointer-events-none z-30"
                  style={{ top: toY(nowMin) }}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 -ml-1 shrink-0" />
                  <div className="flex-1 border-t-2 border-emerald-500" />
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ── MAP VIEW ──────────────────────────────────────── */}
      {view === 'map' && (
        <MapView
          schedule={schedule}
          nowMin={nowMin}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Timeline set block
// ─────────────────────────────────────────────────────────────
function SetBlock({
  set, stage, isSaved, isConflict, nowMin, onToggle,
}: {
  set: SetTime; stage: Stage; isSaved: boolean;
  isConflict: boolean; nowMin: number; onToggle: () => void;
}) {
  const startMin = parseTime(set.startTime);
  const endMin   = parseTime(set.endTime);
  const durMin   = endMin - startMin;
  const top = toY(startMin);
  const h   = durMin * PX_PER_MIN;
  const isNow  = nowMin >= startMin && nowMin < endMin;
  const isPast = nowMin >= endMin;
  const meta   = STAGE_META[stage];

  const bg = isSaved
    ? isConflict
      ? cn(meta.colorClass, 'border-2 border-red-500')
      : cn(meta.colorClass, 'border border-transparent')
    : 'bg-neutral-100 border border-neutral-200 hover:bg-neutral-200';

  const textColor = isSaved ? meta.textClass : 'text-neutral-600';

  return (
    <button
      onClick={onToggle}
      className={cn(
        'absolute inset-x-0.5 rounded transition-colors text-left overflow-hidden',
        'flex flex-col justify-center px-1',
        bg,
        isPast && 'opacity-25',
        isNow && !isSaved && 'ring-2 ring-emerald-400 ring-offset-0',
        isNow && isSaved && !isConflict && 'ring-2 ring-emerald-400 ring-offset-0',
        isNow && isSaved && isConflict && 'ring-2 ring-red-400 ring-offset-0',
      )}
      style={{ top, height: Math.max(h, 22) }}
    >
      <span className={cn('font-bold leading-none truncate text-[10px]', textColor)}>
        {set.artist}
      </span>
      <span className={cn('text-[8px] leading-none mt-0.5 opacity-80 truncate', textColor)}>
        {fmt(set.startTime)}–{fmt(set.endTime)}
      </span>
      {isNow && (
        <span className="absolute top-0.5 right-0.5 text-[6px] font-bold px-1 py-0.5 rounded bg-emerald-500 text-white leading-none">
          NOW
        </span>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Simplified Map view — just the map with current artists shown above/below
// ─────────────────────────────────────────────────────────────
function MapView({
  schedule,
  nowMin,
}: {
  schedule: SetTime[];
  nowMin: number;
}) {
  // Get current or next artist for each stage
  function getCurrentOrNext(stage: Stage): SetTime | null {
    const sets = schedule.filter(s => s.stage === stage);
    const nowSet = sets.find(s => nowMin >= parseTime(s.startTime) && nowMin < parseTime(s.endTime));
    if (nowSet) return nowSet;
    const upcoming = sets.filter(s => parseTime(s.startTime) > nowMin);
    return upcoming.length > 0 ? upcoming[0] : null;
  }

  const uaCurrent = getCurrentOrNext('ua');
  const verizonCurrent = getCurrentOrNext('verizon');
  const zigzagCurrent = getCurrentOrNext('zigzag');

  function isPlaying(set: SetTime | null): boolean {
    if (!set) return false;
    return nowMin >= parseTime(set.startTime) && nowMin < parseTime(set.endTime);
  }

  return (
    <div className="flex-1 flex flex-col bg-black overflow-hidden">
      {/* Current artists - top section */}
      <div className="shrink-0 px-3 py-3 space-y-2">
        <p className="text-[10px] font-semibold tracking-widest text-neutral-500 uppercase">Now Playing / Up Next</p>
        <div className="flex flex-col gap-2">
          {/* Under Armour */}
          <StageNowRow 
            stage="ua" 
            set={uaCurrent} 
            isPlaying={isPlaying(uaCurrent)} 
            nowMin={nowMin}
          />
          {/* Zig-Zag */}
          <StageNowRow 
            stage="zigzag" 
            set={zigzagCurrent} 
            isPlaying={isPlaying(zigzagCurrent)} 
            nowMin={nowMin}
          />
          {/* Verizon */}
          <StageNowRow 
            stage="verizon" 
            set={verizonCurrent} 
            isPlaying={isPlaying(verizonCurrent)} 
            nowMin={nowMin}
          />
        </div>
      </div>

      {/* Map image */}
      <div className="flex-1 overflow-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/festival-map.jpeg"
          alt="Rolling Loud Orlando festival grounds map"
          className="w-full block"
          draggable={false}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Stage row showing current/next artist
// ─────────────────────────────────────────────────────────────
function StageNowRow({
  stage,
  set,
  isPlaying,
  nowMin,
}: {
  stage: Stage;
  set: SetTime | null;
  isPlaying: boolean;
  nowMin: number;
}) {
  const meta = STAGE_META[stage];

  function minsLeft(s: SetTime) {
    return parseTime(s.endTime) - nowMin;
  }

  function minsUntil(s: SetTime) {
    return parseTime(s.startTime) - nowMin;
  }

  return (
    <div className={cn(
      'flex items-center gap-3 px-3 py-2 rounded-lg',
      meta.colorClass,
    )}>
      <div className="shrink-0 w-16">
        <span className={cn('text-[10px] font-bold tracking-wider', meta.textClass)}>
          {meta.short}
        </span>
      </div>
      
      {set ? (
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isPlaying && (
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-emerald-500 text-white">
                NOW
              </span>
            )}
            <span className={cn('font-bold text-sm', meta.textClass)}>
              {set.artist}
            </span>
          </div>
          <span className={cn('text-[11px]', meta.textClass, 'opacity-70')}>
            {isPlaying ? `${minsLeft(set)}m left` : `in ${minsUntil(set)}m`}
          </span>
        </div>
      ) : (
        <span className={cn('text-[11px]', meta.textClass, 'opacity-50')}>
          No more sets
        </span>
      )}
    </div>
  );
}
