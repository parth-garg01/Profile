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

/*
 * Scenes. Every top-level section (and each featured project panel) is a scene: it is sticky,
 * so the next scene slides up over it like a card being laid on a stack. A scene's contents stay
 * hidden while it is sliding in and only play once it has fully arrived at the top of the screen.
 */
const sceneState = new Map();
const stateOf = (el) => {
  let st = sceneState.get(el);
  if (!st) {
    st = { arrived: false, subs: new Set() };
    sceneState.set(el, st);
  }
  return st;
};
function onSceneArrive(el, fn) {
  const st = stateOf(el);
  if (st.arrived) {
    fn();
    return () => {};
  }
  st.subs.add(fn);
  return () => st.subs.delete(fn);
}
function markArrived(el) {
  const st = stateOf(el);
  if (st.arrived) return;
  st.arrived = true;
  st.subs.forEach((f) => f());
  st.subs.clear();
}

// How long each scene holds before the next slides in, as a fraction of the screen height.
const HOLD = 0.35;

/** Mount once (in App). Pins each scene, marks arrivals and hides scenes fully covered by the next. */
export function useScenes() {
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-scene]')];
    // A scene taller than the screen pins by its bottom edge, so all of it can be read first.
    // Then it holds still for a short stretch of scrolling (its bottom margin) before the next
    // scene starts to slide over, so one hard flick doesn't throw the next section in at once.
    // Phones grow and shrink the screen height as the address bar slides in and out while
    // scrolling. Measure the height once and only again when the width changes (rotation),
    // so the pins and holds don't shift the page mid-scroll.
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    const fit = () =>
      els.forEach((el, i) => {
        el.style.top = `${Math.min(0, vh - el.offsetHeight)}px`;
        if (i < els.length - 1) el.style.marginBottom = `${Math.round(vh * HOLD)}px`;
      });
    const onResize = () => {
      if (window.innerWidth !== vw) {
        vw = window.innerWidth;
        vh = window.innerHeight;
        fit();
      }
      queue();
    };
    let raf = 0;
    const check = () => {
      raf = 0;
      const vh = window.innerHeight;
      const atEnd = vh + window.scrollY >= document.documentElement.scrollHeight - 2;
      const tops = els.map((el) => el.getBoundingClientRect().top);
      els.forEach((el, i) => {
        if (tops[i] <= Math.max(24, vh * 0.04) || (atEnd && tops[i] < vh)) markArrived(el);
        const next = tops[i + 1];
        el.style.visibility = next !== undefined && next <= -120 ? 'hidden' : '';
      });
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    const ro = new ResizeObserver(() => {
      fit();
      queue();
    });
    els.forEach((el) => ro.observe(el));
    // In-page links: a pinned scene reports its pinned position, so scroll to where it sits in the
    // page instead, measured with the pin briefly released.
    const flowTop = (target) => {
      const pinned = target.closest('[data-scene]') || target;
      const { position, top } = pinned.style;
      pinned.style.position = 'static';
      const y = target.getBoundingClientRect().top + window.scrollY;
      Object.assign(pinned.style, { position, top });
      return y;
    };
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const id = decodeURIComponent(a.getAttribute('href').slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: Math.max(0, flowTop(target)), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      history.pushState(null, '', `#${id}`);
      target.focus?.({ preventScroll: true });
    };
    document.addEventListener('click', onClick);
    fit();
    check();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('click', onClick);
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', onResize);
    };
  }, []);
}

/**
 * Calls `onEnter` once, when the element is at least `amount` visible and its scene has arrived.
 * `gate: false` skips the scene check (for things that animate while the scene slides in).
 */
export function useOnceInView(ref, onEnter, { amount = 0.2, margin = '0px 0px -8% 0px', gate = true } = {}) {
  const cb = useRef(onEnter);
  cb.current = onEnter;
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      cb.current();
      return undefined;
    }
    let inView = false;
    let arrived = !gate;
    let fired = false;
    let io = null;
    let off = () => {};
    const tryFire = () => {
      if (fired || !inView || !arrived) return;
      fired = true;
      io?.disconnect();
      off();
      cb.current();
    };
    io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        tryFire();
      },
      { threshold: amount, rootMargin: margin },
    );
    io.observe(el);
    const scene = gate ? el.closest('[data-scene]') : null;
    if (scene) {
      off = onSceneArrive(scene, () => {
        arrived = true;
        tryFire();
      });
    } else arrived = true;
    return () => {
      io.disconnect();
      off();
    };
  }, [ref, amount, margin, gate]);
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
 * Reveal: plays once, when its scene has arrived and the group is on screen. No blur, no scaling:
 * everything is uncovered by a moving edge.
 *   fade  - each child rises a short way into an opening window (a mask wiping upward).
 *   card  - each child is uncovered from the bottom up, corners and all, while its contents
 *           travel up a little further, so the card seems to open rather than appear.
 *   sweep - each child is wiped in from the left, the same sweep the hover states use.
 */
export const Reveal = forwardRef(function Reveal(
  { as: Tag = 'div', mode = 'fade', stagger = 0.1, delay = 0, amount = 0.15, children, ...rest },
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
    [...ref.current.children].forEach((k) => {
      const r = radiusOf(k);
      if (mode === 'card') {
        gsap.set(k, { clipPath: `inset(100% 0% 0% 0% round ${r}px)` });
        gsap.set(k.children, { y: 70 });
      } else if (mode === 'sweep') {
        gsap.set(k, { clipPath: `inset(0% 100% 0% 0% round ${r}px)` });
      } else {
        gsap.set(k, { clipPath: `inset(0% 0% 100% 0% round ${r}px)`, y: 36 });
      }
    });
  }, []);

  useOnceInView(
    ref,
    () => {
      if (!armed.current) return;
      [...ref.current.children].forEach((k, i) => {
        const at = delay + i * stagger;
        const clip = fullClip(radiusOf(k));
        if (mode === 'card') {
          gsap.to(k, { clipPath: clip, duration: 1.3, ease: 'expo.inOut', delay: at, clearProps: 'clipPath' });
          gsap.to(k.children, { y: 0, duration: 1.6, ease: 'expo.out', delay: at + 0.35, clearProps: 'transform' });
        } else if (mode === 'sweep') {
          gsap.to(k, { clipPath: clip, duration: 1.1, ease: 'expo.inOut', delay: at, clearProps: 'clipPath' });
        } else {
          gsap.to(k, { clipPath: clip, y: 0, duration: 1.3, ease: 'expo.out', delay: at + 0.2, clearProps: 'clipPath,transform' });
        }
      });
    },
    { amount },
  );

  return React.createElement(Tag, { ref: setRef, ...rest }, children);
});

/**
 * Heading that rises line by line from behind its own baseline, once its scene has arrived.
 * Lines are measured at that moment (fonts are in by then); when it finishes, the heading goes
 * back to plain text.
 */
export function RevealHeading({ as: Tag = 'h2', className = '', children, delay = 0, ...rest }) {
  const text = typeof children === 'string' ? children : null;
  const words = text ? text.split(' ') : [];
  const outer = useRef(null);
  const inner = useRef(null);
  const [lines, setLines] = useState(null);
  const [done, setDone] = useState(() => !text);

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
        setLines(rows);
      };
      if (!document.fonts || document.fonts.status === 'loaded') measure();
      else document.fonts.ready.then(measure);
    },
    { amount: 0.3 },
  );

  useIsoLayoutEffect(() => {
    if (!lines || done) return;
    const el = inner.current;
    gsap.set(el, { opacity: 1 });
    gsap.fromTo(
      el.querySelectorAll('[data-line] > span'),
      { yPercent: 115 },
      { yPercent: 0, duration: 1.4, ease: 'expo.out', stagger: 0.09, delay, onComplete: () => setDone(true) },
    );
  }, [lines]);

  let content = children;
  if (!done) {
    content = lines
      ? lines.map((ws, li) => (
          <span key={li} data-line className="mask-line">
            <span className="block whitespace-nowrap">{ws.join(' ')}</span>
          </span>
        ))
      : words.map((w, i) => (
          <React.Fragment key={i}>
            {i > 0 && ' '}
            <span data-w>{w}</span>
          </React.Fragment>
        ));
  }

  return (
    <Tag ref={outer} className={className} aria-label={!done ? text : undefined} {...rest}>
      {done ? content : <span ref={inner} aria-hidden="true">{content}</span>}
    </Tag>
  );
}

/**
 * For the stacked panels: the top edge arrives as one soft curve across the whole width and
 * settles into its rounded corners as the panel slides over the one before it.
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
      const r = parseFloat(getComputedStyle(el).borderTopLeftRadius);
      const end = `${r}px ${r}px`;
      gsap.fromTo(
        el,
        { borderTopLeftRadius: start.current, borderTopRightRadius: start.current },
        { borderTopLeftRadius: end, borderTopRightRadius: end, duration: 1.4, ease: 'expo.out', clearProps: 'borderTopLeftRadius,borderTopRightRadius' },
      );
    },
    { amount: 0, margin: '0px 0px -12% 0px', gate: false },
  );
}
