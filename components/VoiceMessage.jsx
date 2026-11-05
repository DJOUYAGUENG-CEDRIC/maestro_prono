'use client';

import { useEffect, useRef, useState } from 'react';
import { PROFILE_IMAGE } from '@/lib/config';

const SPEEDS = [1, 1.5, 2];
const BARS = Array.from({ length: 36 }, (_, i) =>
  Math.round(25 + 75 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6 + 1)))
);

function formatTime(sec) {
  if (!Number.isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}

export default function VoiceMessage({ src = '/welcome.m4a' }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [speedIdx, setSpeedIdx] = useState(0);

  const speed = SPEEDS[speedIdx];
  const progress = duration ? current / duration : 0;

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    if (!playing) return;
    let raf;
    const tick = () => {
      if (audioRef.current) setCurrent(audioRef.current.currentTime);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  };

  const seek = (e) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    a.currentTime = ratio * duration;
    setCurrent(a.currentTime);
  };

  return (
    <div className="flex justify-start">
      <div
        className="flex items-center gap-2.5 w-[85%] max-w-[300px] px-2.5 py-2 rounded-2xl shadow-sm"
        style={{ background: '#ffffff', borderBottomLeftRadius: '4px' }}
      >
        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => { setPlaying(false); setCurrent(0); }}
        />

        <div className="relative shrink-0">
          <img
            src={PROFILE_IMAGE}
            alt=""
            className="w-11 h-11 rounded-full object-cover"
          />
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause' : 'Lecture'}
          className="shrink-0 flex items-center justify-center w-8 h-8"
          style={{ color: '#229ED9' }}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        <div className="flex-1 min-w-0">
          <div
            className="relative flex items-center gap-[2px] h-7 cursor-pointer"
            onClick={seek}
            role="slider"
            aria-label="Position de lecture"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(current)}
          >
            {BARS.map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-full"
                style={{
                  height: `${h}%`,
                  background: i / BARS.length < progress ? '#229ED9' : '#c3d3de',
                }}
              />
            ))}
            <span
              className="absolute top-1/2 w-3 h-3 rounded-full pointer-events-none"
              style={{
                left: `${progress * 100}%`,
                background: '#229ED9',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 0 2px #ffffff',
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-[11px]" style={{ color: '#6b8497' }}>
              {formatTime(playing || current > 0 ? current : duration)}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSpeedIdx((i) => (i + 1) % SPEEDS.length)}
          aria-label="Changer la vitesse de lecture"
          className="shrink-0 rounded-full px-2 py-1 text-xs font-bold min-w-[2.75rem] text-center"
          style={{ background: '#e8f4fd', color: '#229ED9' }}
        >
          {speed}x
        </button>
      </div>
    </div>
  );
}
