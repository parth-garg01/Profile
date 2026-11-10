// Adaptive Block Routing, drawn as a schematic. Cream square: block read by attention.
// Yellow square: block read by Mamba. Arcs join consecutive Mamba blocks: state carried across.
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { COLORS } from '../../data';
import { gsap, prefersReducedMotion, useMediaQuery, useOnceInView } from '../../lib/motion.jsx';
import { cx } from '../ui';

const SIZES = [4, 8, 16];

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const route = (seed, n) => {
  const r = rng(seed);
  return [0, 1].map(() => Array.from({ length: n }, () => (r() < 0.45 ? 'M' : 'T')));
};

function arcs(row) {
  const out = [];
  let prev = -1;
  row.forEach((k, i) => {
    if (k !== 'M') return;
    if (prev >= 0) out.push([prev, i]);
    prev = i;
  });
  return out;
}

export default function RoutingDemo() {
  const phone = useMediaQuery('(max-width: 767px)');
  const tokens = phone ? 32 : 64;
  const [size, setSize] = useState(4);
  const [seed, setSeed] = useState(7);
  const [carry, setCarry] = useState(true);
  const n = tokens / size;
  const grid = useMemo(() => route(seed * 31 + size, n), [seed, size, n]);
  const root = useRef(null);
  const shown = useRef(false);

  const play = (from = 'enter') => {
    if (prefersReducedMotion() || !root.current) return;
    const sq = root.current.querySelectorAll('[data-sq]');
    const paths = root.current.querySelectorAll('[data-arc]');
    if (from === 'enter') gsap.fromTo(sq, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.6)', stagger: { each: 0.012, from: 'start' } });
    else gsap.fromTo(sq, { rotateY: -90 }, { rotateY: 0, duration: 0.6, ease: 'power3.out', stagger: 0.01 });
    paths.forEach((p) => {
      const len = p.getTotalLength();
      gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset', delay: from === 'enter' ? 0.5 : 0.2 });
    });
  };

  useLayoutEffect(() => {
    if (!prefersReducedMotion()) gsap.set(root.current.querySelectorAll('[data-sq]'), { scale: 0, opacity: 0 });
  }, []);

  useOnceInView(root, () => {
    shown.current = true;
    play('enter');
  }, { amount: 0.4 });

  const pending = useRef(false);
  useLayoutEffect(() => {
    if (pending.current) {
      pending.current = false;
      play('change');
    }
  });

  const change = (fn) => {
    pending.current = true;
    fn();
  };

  const m = grid.flat().filter((k) => k === 'M').length;

  return (
    <div className="rounded-[24px] bg-ink p-5 text-cream md:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2 text-small text-mist">
        <span>{tokens} tokens, two layers</span>
        <span>
          {m} to Mamba, {grid.flat().length - m} to attention
        </span>
      </div>

      <div ref={root} className="mt-6 grid gap-7" style={{ perspective: 700 }}>
        {grid.map((row, r) => (
          <div key={r} className="grid grid-cols-[3.25rem_1fr] items-end gap-3">
            <span className="pb-1 text-small text-mist">Layer {r + 1}</span>
            <div>
              <svg viewBox="0 0 640 24" preserveAspectRatio="none" className={cx('block h-6 w-full overflow-visible transition-opacity duration-500', carry ? 'opacity-100' : 'opacity-0')} aria-hidden="true">
                {arcs(row).map(([a, b]) => {
                  const x1 = ((a + 0.5) / row.length) * 640;
                  const x2 = ((b + 0.5) / row.length) * 640;
                  return <path key={`${seed}-${size}-${a}-${b}`} data-arc d={`M ${x1} 24 Q ${(x1 + x2) / 2} ${b - a > 1 ? -14 : 2} ${x2} 24`} fill="none" stroke={COLORS.sun} strokeWidth="2" strokeLinecap="round" />;
                })}
              </svg>
              <ol className="flex gap-1" aria-label={`Layer ${r + 1}`}>
                {row.map((k, i) => (
                  <li
                    key={`${r}-${i}`}
                    data-sq
                    className="aspect-square min-w-0 flex-1 rounded-[3px] transition-colors duration-500"
                    style={{ background: k === 'M' ? COLORS.sun : COLORS.cream, maxHeight: 60 }}
                    aria-label={`Block ${i + 1}: ${k === 'M' ? 'Mamba' : 'attention'}`}
                  />
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-small">
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-[2px] bg-cream" aria-hidden="true" />Attention</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-[2px] bg-sun" aria-hidden="true" />Mamba</span>
        <span className="text-mist">A schematic, not model output.</span>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-cream/15 pt-5">
        <button
          type="button"
          onClick={() => change(() => setSeed((s) => s + 1))}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-sun px-5 text-small font-semibold text-ink transition-transform duration-300 hover:scale-[1.04] active:scale-95"
        >
          <RefreshCw size={16} aria-hidden="true" /> Route again
        </button>
        <div role="radiogroup" aria-label="Tokens per block" className="relative inline-flex h-11 rounded-full border-2 border-cream/25 p-1">
          <span
            aria-hidden="true"
            className="absolute inset-y-1 rounded-full bg-cream transition-all duration-500 ease-soft"
            style={{ left: `calc(${SIZES.indexOf(size)} * (100% - 8px) / 3 + 4px)`, width: 'calc((100% - 8px) / 3)' }}
          />
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={size === s}
              onClick={() => s !== size && change(() => setSize(s))}
              className={cx('relative z-10 w-14 rounded-full text-small font-semibold transition-colors duration-500', size === s ? 'text-ink' : 'text-cream')}
            >
              {s}
            </button>
          ))}
        </div>
        <span className="text-small text-mist">tokens per block</span>
        <button
          type="button"
          role="switch"
          aria-checked={carry}
          onClick={() => setCarry((c) => !c)}
          className="inline-flex h-11 items-center gap-3 text-small font-semibold"
        >
          <span aria-hidden="true" className={cx('relative h-6 w-11 rounded-full transition-colors duration-500', carry ? 'bg-sun' : 'bg-cream/25')}>
            <span className={cx('absolute top-1 h-4 w-4 rounded-full bg-ink transition-[left] duration-500 ease-soft', carry ? 'left-6' : 'left-1')} />
          </span>
          Carry state across blocks
        </button>
      </div>
    </div>
  );
}
