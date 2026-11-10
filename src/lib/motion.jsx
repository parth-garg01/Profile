// Motion helpers. Nothing here is tied to scroll position: things animate once when they
// first reach the screen, or in answer to the visitor. Reduced motion turns all of it off.
import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export { gsap };

export const EASE = 'power3.out';
export const EASE_SOFT = 'expo.out';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

/** Calls `onEnter` the first time the element is at least `amount` visible. */
export function useOnceInView(ref, onEnter, { amount = 0.2, margin = '0px 0px -8% 0px' } = {}) {
  const cb = useRef(onEnter);
  cb.current = onEnter;
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      cb.current();
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          cb.current();
        }
      },
      { threshold: amount, rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, amount, margin]);
}

/** In-view flag that follows visibility (used to pause and resume live demos). */
export function useInView(ref, { amount = 0.35 } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: amount });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, amount]);
  return inView;
}

const radiusOf = (el) => parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
const fullClip = (r) => `inset(0% 0% 0% 0% round ${r}px)`;

/**
 * Reveal: plays once, the first time the group reaches the screen. Each mode borrows a shape
 * the page already uses, so entrances read as part of the design rather than a generic fade-up.
 *   fade  - the children simply come up in opacity, trailing the heading.
 *   pill  - each child starts as a small pill (the button shape) and grows out to its own
 *           corners; its contents arrive once it is open.
 *   sweep - each child is wiped in from the left, the same sweep the hover states use.
 */
export const Reveal = forwardRef(function Reveal(
  { as: Tag = 'div', mode = 'fade', stagger = 0.09, delay = 0, amount = 0.15, children, ...rest },
  outerRef,
) {
  const ref = useRef(null);
  const setRef = (n) => {
    ref.current = n;
    if (typeof outerRef === 'function') outerRef(n);
    else if (outerRef) outerRef.current = n;
  };
  const armed = useRef(false);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    armed.current = true;
    const kids = [...ref.current.children];
    if (mode === 'pill') {
      kids.forEach((k) => {
        gsap.set(k, { clipPath: 'inset(42% 34% 42% 34% round 999px)' });
        gsap.set(k.children, { opacity: 0 });
      });
    } else if (mode === 'sweep') {
      kids.forEach((k) => gsap.set(k, { clipPath: `inset(0% 100% 0% 0% round ${radiusOf(k)}px)` }));
    } else {
      gsap.set(kids, { opacity: 0 });
    }
  }, []);

  useOnceInView(
    ref,
    () => {
      if (!armed.current) return;
      const kids = [...ref.current.children];
      if (mode === 'pill') {
        kids.forEach((k, i) => {
          const at = delay + i * Math.max(stagger, 0.12);
          gsap.to(k, { clipPath: fullClip(radiusOf(k)), duration: 1.15, ease: 'expo.inOut', delay: at, clearProps: 'clipPath' });
          gsap.to(k.children, { opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.06, delay: at + 0.6 });
        });
      } else if (mode === 'sweep') {
        kids.forEach((k, i) =>
          gsap.to(k, { clipPath: fullClip(radiusOf(k)), duration: 1, ease: 'power3.inOut', delay: delay + i * stagger, clearProps: 'clipPath' }),
        );
      } else {
        gsap.to(kids, { opacity: 1, duration: 0.9, ease: 'power2.out', stagger, delay: delay + 0.25 });
      }
    },
    { amount },
  );

  return React.createElement(Tag, { ref: setRef, ...rest }, children);
});

const VARS = { fontVariationSettings: "'wdth' var(--wdth), 'wght' var(--wght)" };

/**
 * Heading whose entrance follows its type voice, played once when it is first seen:
 *   t-wide   - each line starts condensed and light, and stretches out along the width axis.
 *   t-poster - each letter shoots up from the baseline.
 *   t-serif  - each word comes into focus, like ink settling.
 * While it plays, the text is split into its measured lines (so nothing reflows as the widths
 * change); when it finishes, the heading goes back to plain text.
 */
export function RevealHeading({ as: Tag = 'h2', className = '', children, delay = 0, ...rest }) {
  const voice = /\bt-poster/.test(className) ? 'poster' : /\bt-wide/.test(className) ? 'wide' : 'serif';
  const text = typeof children === 'string' ? children : null;
  const words = text ? text.split(' ') : [];
  const outer = useRef(null);
  const inner = useRef(null);
  const target = useRef(null);
  const [lines, setLines] = useState(null);
  const [done, setDone] = useState(() => !text);

  // Hidden until it is first seen. Lines are measured then, once the web fonts are in.
  useIsoLayoutEffect(() => {
    if (!text || prefersReducedMotion() || !inner.current) {
      setDone(true);
      return;
    }
    gsap.set(inner.current, { opacity: 0 });
  }, []);

  useOnceInView(
    outer,
    () => {
      if (done || !inner.current) return;
      const measure = () => {
        const rows = [];
        let top = null;
        inner.current.querySelectorAll('[data-w]').forEach((w, i) => {
          if (top === null || Math.abs(w.offsetTop - top) > 4) {
            rows.push([]);
            top = w.offsetTop;
          }
          rows[rows.length - 1].push(words[i]);
        });
        const cs = getComputedStyle(outer.current);
        target.current = { wdth: parseFloat(cs.getPropertyValue('--wdth')) || 100, wght: parseFloat(cs.getPropertyValue('--wght')) || 700 };
        setLines(rows);
      };
      if (document.fonts?.status === 'loaded') measure();
      else document.fonts.ready.then(measure);
    },
    { amount: 0.4 },
  );

  // Split into lines: set the starting state and play, before the split is painted.
  useIsoLayoutEffect(() => {
    if (!lines || done) return;
    const el = inner.current;
    const finish = () => setDone(true);
    gsap.set(el, { opacity: 1 });
    if (voice === 'wide') {
      const { wdth, wght } = target.current;
      gsap.fromTo(el.querySelectorAll('[data-line]'), { '--wdth': 50, '--wght': 240, opacity: 0 }, { '--wdth': wdth, '--wght': wght, opacity: 1, duration: 1.5, ease: 'expo.out', stagger: 0.12, delay, onComplete: finish });
    } else if (voice === 'poster') {
      gsap.fromTo(el.querySelectorAll('[data-c]'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.9, ease: 'expo.out', stagger: 0.025, delay, onComplete: finish });
    } else {
      gsap.fromTo(el.querySelectorAll('[data-w]'), { opacity: 0, filter: 'blur(14px)', y: '0.16em' }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.05, delay, onComplete: finish });
    }
  }, [lines]);

  const word = (w, i) => (
    <React.Fragment key={i}>
      {i > 0 && ' '}
      <span data-w className={lines ? 'inline-block' : undefined}>
        {voice === 'poster' && lines
          ? [...w].map((c, ci) => (
              <span key={ci} data-c className="inline-block">
                {c}
              </span>
            ))
          : w}
      </span>
    </React.Fragment>
  );

  let content = children;
  if (!done) {
    content = lines
      ? lines.map((ws, li) => (
          <span key={li} data-line className="block whitespace-nowrap" style={voice === 'wide' ? VARS : undefined}>
            {ws.map(word)}
          </span>
        ))
      : words.map(word);
  }

  return (
    <Tag ref={outer} className={className} aria-label={!done ? text : undefined} {...rest}>
      {done ? content : <span ref={inner} aria-hidden="true">{content}</span>}
    </Tag>
  );
}

/**
 * For the stacked panels: the top edge arrives as one soft curve across the whole width and
 * settles into its rounded corners as the panel lands on the one before it.
 */
export function useEdgeSettle(ref) {
  const armed = useRef(false);
  const start = useRef(null);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (prefersReducedMotion() || !el) return;
    const depth = Math.max(-parseFloat(getComputedStyle(el).marginTop) || 0, 32);
    start.current = `${Math.round(el.offsetWidth / 2)}px ${depth}px`;
    gsap.set(el, { borderTopLeftRadius: start.current, borderTopRightRadius: start.current });
    armed.current = true;
  }, []);
  useOnceInView(
    ref,
    () => {
      if (!armed.current) return;
      const el = ref.current;
      gsap.set(el, { clearProps: 'borderTopLeftRadius,borderTopRightRadius' });
      const r = getComputedStyle(el).borderTopLeftRadius;
      const end = `${parseFloat(r)}px ${parseFloat(r)}px`;
      gsap.fromTo(
        el,
        { borderTopLeftRadius: start.current, borderTopRightRadius: start.current },
        { borderTopLeftRadius: end, borderTopRightRadius: end, duration: 1.4, ease: 'expo.out', clearProps: 'borderTopLeftRadius,borderTopRightRadius' },
      );
    },
    { amount: 0, margin: '0px 0px -12% 0px' },
  );
}
