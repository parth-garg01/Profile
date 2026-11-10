// Morph's probabilistic bisection, drawn as an illustration. Each probe runs the test at one
// latency; the belief about where it starts failing narrows until the boundary is found.
// Final numbers are the README's demo: breaks above about 134 ms, 90% interval 111 to 161 ms.
import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { COLORS } from '../../data';
import { gsap, prefersReducedMotion, useOnceInView } from '../../lib/motion.jsx';

const W = 600;
const H = 240;
const PAD = { l: 16, r: 16, t: 24, b: 40 };
const MAX = 400;
const x = (ms) => PAD.l + (ms / MAX) * (W - PAD.l - PAD.r);

// Probe sequence and the belief after each probe (mean, spread).
const PROBES = [
  { ms: 200, fail: true, after: [130, 70] },
  { ms: 100, fail: false, after: [150, 45] },
  { ms: 160, fail: true, after: [128, 30] },
  { ms: 120, fail: false, after: [140, 22] },
  { ms: 145, fail: true, after: [133, 17] },
  { ms: 128, fail: false, after: [134, 15] },
];
const START = [200, 120];
const FINAL = { mean: 134, lo: 111, hi: 161 };

function curve(mean, sd) {
  const pts = [];
  const base = H - PAD.b;
  const peak = PAD.t + 8;
  for (let ms = 0; ms <= MAX; ms += 4) {
    const g = Math.exp(-0.5 * ((ms - mean) / sd) ** 2);
    pts.push(`${x(ms).toFixed(1)},${(base - g * (base - peak)).toFixed(1)}`);
  }
  return `M ${x(0)},${base} L ${pts.join(' L ')} L ${x(MAX)},${base} Z`;
}

export default function BisectionDemo() {
  const root = useRef(null);
  const pathRef = useRef(null);
  const [shown, setShown] = useState(0);
  const [finished, setFinished] = useState(false);
  const tl = useRef(null);

  const play = () => {
    tl.current?.kill();
    const belief = { m: START[0], s: START[1] };
    const draw = () => pathRef.current?.setAttribute('d', curve(belief.m, belief.s));
    if (prefersReducedMotion()) {
      belief.m = PROBES.at(-1).after[0];
      belief.s = PROBES.at(-1).after[1];
      draw();
      setShown(PROBES.length);
      setFinished(true);
      return;
    }
    setShown(0);
    setFinished(false);
    draw();
    const t = gsap.timeline({ delay: 0.3 });
    PROBES.forEach((p, i) => {
      t.call(() => setShown(i + 1), null, i * 0.95);
      t.to(belief, { m: p.after[0], s: p.after[1], duration: 0.8, ease: 'power3.inOut', onUpdate: draw }, i * 0.95 + 0.15);
    });
    t.call(() => setFinished(true), null, PROBES.length * 0.95 + 0.2);
    tl.current = t;
  };

  useOnceInView(root, play, { amount: 0.45 });
  useEffect(() => () => tl.current?.kill(), []);

  const base = H - PAD.b;

  return (
    <div ref={root} className="rounded-[24px] bg-ink p-5 text-cream md:p-7">
      <div className="flex items-baseline justify-between gap-3 text-small text-mist">
        <span>morph threshold --parameter network.latency_ms</span>
        <span>{shown} / {PROBES.length} probes</span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-5 block w-full" role="img" aria-label={`Illustration: probes at different latencies narrow the failure boundary to about ${FINAL.mean} milliseconds, with a 90 percent interval of ${FINAL.lo} to ${FINAL.hi}.`}>
        <rect
          x={x(FINAL.lo)}
          y={PAD.t}
          width={x(FINAL.hi) - x(FINAL.lo)}
          height={base - PAD.t}
          fill={COLORS.coral}
          opacity={finished ? 0.22 : 0}
          style={{ transition: 'opacity 700ms ease' }}
        />
        <path ref={pathRef} d={curve(START[0], START[1])} fill={COLORS.cream} fillOpacity="0.14" stroke={COLORS.cream} strokeWidth="2" />
        <line x1={x(0)} x2={x(MAX)} y1={base} y2={base} stroke={COLORS.cream} strokeOpacity="0.3" />
        {[0, 100, 200, 300, 400].map((ms) => (
          <text key={ms} x={x(ms)} y={H - 14} fill={COLORS.mist} fontSize="13" textAnchor={ms === 0 ? 'start' : ms === MAX ? 'end' : 'middle'} fontFamily="Instrument Sans Variable, sans-serif">
            {ms} ms
          </text>
        ))}
        {PROBES.slice(0, shown).map((p, i) => (
          <g key={`${p.ms}-${i}`} className="probe" style={{ transformOrigin: `${x(p.ms)}px ${base}px` }}>
            <line x1={x(p.ms)} x2={x(p.ms)} y1={base} y2={PAD.t + 4} stroke={p.fail ? COLORS.coral : COLORS.mint} strokeWidth="2" strokeDasharray="3 5" />
            <circle cx={x(p.ms)} cy={base} r="7" fill={p.fail ? COLORS.coral : COLORS.mint} />
          </g>
        ))}
        <g style={{ opacity: finished ? 1 : 0, transition: 'opacity 700ms ease' }}>
          <line x1={x(FINAL.mean)} x2={x(FINAL.mean)} y1={PAD.t - 6} y2={base} stroke={COLORS.sun} strokeWidth="3" />
          <text x={x(FINAL.mean) + 10} y={PAD.t + 8} fill={COLORS.sun} fontSize="15" fontWeight="700" fontFamily="Instrument Sans Variable, sans-serif">
            ~{FINAL.mean} ms
          </text>
        </g>
      </svg>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-small">
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-mint" aria-hidden="true" />Test passed</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-coral" aria-hidden="true" />Test failed</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-5 rounded-sm bg-cream/30" aria-hidden="true" />Where the boundary probably is</span>
      </div>

      <p className="mt-5 min-h-[3em] border-t border-cream/15 pt-5 text-body" aria-live="polite">
        {finished ? (
          <>
            The lock lease breaks when latency goes above about <strong className="text-sun">{FINAL.mean} ms</strong> (90% interval {FINAL.lo} to {FINAL.hi} ms).
          </>
        ) : (
          <span className="text-mist">Narrowing down where the test starts to fail…</span>
        )}
      </p>

      <div className="mt-4 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={play}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-cream px-5 text-small font-semibold text-ink transition-transform duration-300 hover:scale-[1.04] active:scale-95"
        >
          <RotateCcw size={16} aria-hidden="true" /> Replay
        </button>
      </div>
    </div>
  );
}
