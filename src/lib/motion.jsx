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

/**
 * Reveal: the direct children ease up 40 px and fade in, one after another, the first time the
 * group reaches the screen. Plays once.
 */
export const Reveal = forwardRef(function Reveal(
  { as: Tag = 'div', stagger = 0.09, delay = 0, y = 40, amount = 0.15, children, ...rest },
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
    gsap.set(ref.current.children, { opacity: 0, y });
  }, []);

  useOnceInView(
    ref,
    () => {
      if (!armed.current) return;
      gsap.to(ref.current.children, { opacity: 1, y: 0, duration: 1.1, ease: EASE_SOFT, stagger, delay, clearProps: 'transform' });
    },
    { amount },
  );

  return React.createElement(Tag, { ref: setRef, ...rest }, children);
});

/** Heading whose text slides up from behind its own baseline the first time it is seen. */
export function RevealHeading({ as: Tag = 'h2', className, children, delay = 0, ...rest }) {
  const inner = useRef(null);
  const outer = useRef(null);
  const armed = useRef(false);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !inner.current) return;
    armed.current = true;
    gsap.set(inner.current, { yPercent: 105 });
  }, []);

  useOnceInView(
    outer,
    () => {
      if (!armed.current) return;
      gsap.to(inner.current, { yPercent: 0, duration: 1.2, ease: EASE_SOFT, delay });
    },
    { amount: 0.4 },
  );

  return (
    <Tag ref={outer} className={className} {...rest}>
      <span className="reveal-line">
        <span ref={inner}>{children}</span>
      </span>
    </Tag>
  );
}
