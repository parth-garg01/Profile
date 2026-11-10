import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV, profile } from '../data';
import { cx } from './ui';
import { gsap, prefersReducedMotion } from '../lib/motion.jsx';

/**
 * Which section is on screen: the last one whose top has passed the middle of the screen.
 * (Sections are sticky and stay under the ones that cover them, so this goes by position.)
 */
function useCurrent() {
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    let raf = 0;
    const check = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      let id = null;
      els.forEach((el) => {
        if (el.getBoundingClientRect().top <= mid) id = el.id;
      });
      setCurrent(id);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, []);
  return current;
}

export default function Navbar() {
  const current = useCurrent();
  const [open, setOpen] = useState(false);
  const listRef = useRef(null);
  const [bar, setBar] = useState({ left: 0, width: 0, on: false });
  const panelRef = useRef(null);
  const menuBtn = useRef(null);

  // One underline that glides between links as the section changes.
  useLayoutEffect(() => {
    const a = listRef.current?.querySelector(`[data-id="${current}"]`);
    if (!a) {
      setBar((b) => ({ ...b, on: false }));
      return;
    }
    setBar({ left: a.offsetLeft, width: a.offsetWidth, on: true });
  }, [current]);

  // Mobile menu: panel drops in, links rise one after another.
  useEffect(() => {
    if (!open) return undefined;
    const panel = panelRef.current;
    if (!prefersReducedMotion()) {
      gsap.fromTo(panel, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'expo.out' });
      gsap.fromTo(panel.querySelectorAll('li'), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.06, delay: 0.1 });
    }
    panel.querySelector('a')?.focus();
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    const btn = menuBtn.current;
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      btn?.focus();
    };
  }, [open]);

  return (
    <>
      <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-[70] rounded-full bg-sun px-5 py-3 font-semibold text-ink">
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-cream/15 bg-blue/85 backdrop-blur-md">
        <div className="page flex h-[68px] items-center justify-between gap-6">
          <a href="#top" className="display text-[19px] text-cream" style={{ '--wdth': 110 }}>
            {profile.name}
          </a>
          <nav aria-label="Primary" className="flex items-center gap-2">
            <ul ref={listRef} className="relative hidden items-center gap-1 lg:flex">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    data-id={n.id}
                    href={`#${n.id}`}
                    aria-current={current === n.id ? 'location' : undefined}
                    className={cx(
                      'inline-flex h-11 items-center px-3 text-[15px] font-semibold transition-colors duration-300',
                      current === n.id ? 'text-sun' : 'text-cream hover:text-sun',
                    )}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-1.5 h-[3px] rounded-full bg-sun transition-all duration-500 ease-soft"
                style={{ left: bar.left + 12, width: Math.max(0, bar.width - 24), opacity: bar.on ? 1 : 0 }}
              />
            </ul>
            <a
              href={profile.resume}
              download
              className="ml-2 hidden h-11 items-center rounded-full bg-cream px-5 text-[15px] font-semibold text-ink transition-colors duration-300 hover:bg-sun sm:inline-flex"
            >
              Resume
            </a>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-cream/60 text-cream lg:hidden"
            >
              <Menu size={20} aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </button>
          </nav>
        </div>
      </header>

      {open && (
        <div ref={panelRef} id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] overflow-y-auto bg-sun text-ink">
          <div className="page flex h-[68px] items-center justify-between">
            <span className="display text-[19px]" style={{ '--wdth': 110 }}>
              {profile.name}
            </span>
            <button type="button" onClick={() => setOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink">
              <X size={20} aria-hidden="true" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <ul className="page grid gap-1 pt-10">
            {NAV.map((n) => (
              <li key={n.id} className="overflow-hidden">
                <a href={`#${n.id}`} onClick={() => setOpen(false)} className="display block py-2 text-[clamp(48px,14vw,96px)] leading-none" style={{ '--wdth': 80 }}>
                  {n.label}
                </a>
              </li>
            ))}
            <li className="overflow-hidden pt-6">
              <a href={profile.resume} download className="inline-flex h-14 items-center rounded-full bg-ink px-7 font-semibold text-cream">
                Download resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
