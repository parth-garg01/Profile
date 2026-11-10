// TunePilot, one fine-tuning run from start to finish. An illustration of the flow in the README.
import React, { useEffect, useRef, useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { prefersReducedMotion, useOnceInView } from '../../lib/motion.jsx';
import { cx } from '../ui';

const STEPS = [
  ['Analyse the dataset', 'Schema, token estimate, quality warnings'],
  ['Pick a base model', 'Candidates from Hugging Face, ranked for the hardware'],
  ['Check it fits in VRAM', 'Rejects models that would not fit on the GPUs'],
  ['Write the training config', 'QLoRA or SFT'],
  ['Scan the notebook for secrets', 'Before anything is uploaded'],
  ['Ask for approval', 'Shows expected GPU hours and memory first'],
  ['Train on Kaggle', 'Free dual T4 GPUs'],
];

const STATES = ['queued', 'uploading', 'running', 'finished'];
const STEP_MS = 850;

export default function PipelineDemo() {
  const root = useRef(null);
  const [step, setStep] = useState(-1);
  const [run, setRun] = useState(0);
  const timers = useRef([]);

  const start = () => {
    timers.current.forEach(clearTimeout);
    if (prefersReducedMotion()) {
      setStep(STEPS.length + STATES.length);
      return;
    }
    setStep(-1);
    const total = STEPS.length + STATES.length;
    timers.current = Array.from({ length: total + 1 }, (_, i) => setTimeout(() => setStep(i), 300 + i * STEP_MS));
    setRun((r) => r + 1);
  };

  useOnceInView(root, start, { amount: 0.45 });
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const jobIdx = Math.min(STATES.length - 1, step - STEPS.length);
  const done = step >= STEPS.length + STATES.length - 1;
  const progress = Math.max(0, Math.min(1, (step + 0.5) / STEPS.length));

  return (
    <div ref={root} className="rounded-[24px] bg-ink p-5 text-cream md:p-7">
      <div className="flex items-baseline justify-between gap-3 text-small text-mist">
        <span>tunepilot run --backend kaggle</span>
        <span>{done ? 'Done' : step < 0 ? 'Ready' : 'Running'}</span>
      </div>

      <ol className="relative mt-6 grid gap-1">
        <span aria-hidden="true" className="absolute bottom-4 left-[15px] top-4 w-[2px] bg-cream/15" />
        <span
          aria-hidden="true"
          className="absolute left-[15px] top-4 w-[2px] origin-top bg-mint transition-transform duration-700 ease-soft"
          style={{ height: 'calc(100% - 2rem)', transform: `scaleY(${progress})` }}
        />
        {STEPS.map(([title, note], i) => {
          const state = step > i ? 'done' : step === i ? 'active' : 'idle';
          return (
            <li key={title} className="relative grid grid-cols-[32px_1fr] items-start gap-4 py-2">
              <span
                aria-hidden="true"
                className={cx(
                  'relative z-10 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-500 ease-soft',
                  state === 'done' && 'scale-100 border-mint bg-mint text-ink',
                  state === 'active' && 'scale-110 border-mint bg-ink',
                  state === 'idle' && 'border-cream/25 bg-ink',
                )}
              >
                {state === 'done' && <Check size={16} strokeWidth={3} />}
                {state === 'active' && <span className="h-2.5 w-2.5 animate-ping rounded-full bg-mint" />}
              </span>
              <span className={cx('transition-opacity duration-500', state === 'idle' ? 'opacity-45' : 'opacity-100')}>
                <span className="block font-semibold">{title}</span>
                <span className="block text-small text-mist">{note}</span>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 border-t border-cream/15 pt-5">
        <p className="text-small text-mist">Job, tracked in a SQLite state machine with retries and backoff</p>
        <div className="relative mt-3 grid grid-cols-4 gap-1 rounded-full bg-cream/10 p-1">
          <span
            aria-hidden="true"
            className="absolute inset-y-1 rounded-full bg-mint transition-all duration-700 ease-soft"
            style={{ left: `calc(${Math.max(0, jobIdx)} * (100% - 8px) / 4 + 4px)`, width: 'calc((100% - 8px) / 4)', opacity: jobIdx >= 0 ? 1 : 0 }}
          />
          {STATES.map((s, i) => (
            <span key={s} className={cx('relative z-10 py-2 text-center text-tag font-semibold transition-colors duration-500', jobIdx === i ? 'text-ink' : 'text-cream/70')}>
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-small text-mist">An illustration of one run.</span>
        <button
          key={run}
          type="button"
          onClick={start}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-cream px-5 text-small font-semibold text-ink transition-transform duration-300 hover:scale-[1.04] active:scale-95"
        >
          <RotateCcw size={16} aria-hidden="true" /> Run again
        </button>
      </div>
      <p className="sr-only" aria-live="polite">{done ? 'Run finished.' : ''}</p>
    </div>
  );
}
