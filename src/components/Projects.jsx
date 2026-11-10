import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES, categoryById, projects } from '../data';
import { gsap, prefersReducedMotion, RevealHeading } from '../lib/motion.jsx';
import { cx } from './ui';

function Row({ p }) {
  const cat = categoryById[p.cat];
  return (
    <li data-row className="border-t-2 border-cream/15">
      <a
        href={p.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative grid gap-x-8 gap-y-2 px-1 py-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)_5rem] md:px-4 md:py-7"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-left scale-x-0 rounded-[18px] transition-transform duration-[650ms] ease-soft group-hover:scale-x-100 group-focus-visible:scale-x-100"
          style={{ background: cat.color }}
        />
        <span className="relative transition-colors duration-300 group-hover:text-ink group-focus-visible:text-ink">
          <span className="display block text-[clamp(26px,2.6vw,38px)] leading-[1.02]" style={{ '--wdth': 92 }}>
            {p.name}
          </span>
          {p.team && <span className="mt-2 block text-small text-mist transition-colors duration-300 group-hover:text-ink/75">Team project</span>}
        </span>
        <span className="relative transition-colors duration-300 group-hover:text-ink group-focus-visible:text-ink">
          <span className="block max-w-read text-body">{p.summary}</span>
          <span className="mt-2 block text-small text-mist transition-colors duration-300 group-hover:text-ink/75">{p.stack}</span>
        </span>
        <span className="relative flex items-start justify-between gap-3 font-semibold transition-colors duration-300 group-hover:text-ink md:flex-col md:items-end">
          <span>{p.year}</span>
          <ArrowUpRight size={24} aria-hidden="true" className="transition-transform duration-500 ease-soft group-hover:-translate-y-1 group-hover:translate-x-1" />
        </span>
        <span className="sr-only"> (code on GitHub, opens in a new tab)</span>
      </a>
    </li>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const list = useRef(null);
  const tabs = useRef(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const animate = useRef(false);

  // Grouped by category, in the same order as the filter, newest first inside each group,
  // so the hover colours run in bands instead of jumping around.
  const groups = useMemo(
    () =>
      CATEGORIES.filter((c) => filter === 'all' || c.id === filter)
        .map((c) => ({ cat: c, items: projects.filter((p) => p.cat === c.id).sort((a, b) => b.year - a.year) }))
        .filter((g) => g.items.length),
    [filter],
  );
  const shown = groups.reduce((n, g) => n + g.items.length, 0);
  const counts = useMemo(() => Object.fromEntries(CATEGORIES.map((c) => [c.id, projects.filter((p) => p.cat === c.id).length])), []);

  // The selected filter has a pill, in that category's colour, that glides to it.
  useLayoutEffect(() => {
    const b = tabs.current?.querySelector('[aria-pressed="true"]');
    if (b) setPill({ left: b.offsetLeft, width: b.offsetWidth });
  }, [filter]);

  // When the list changes, the rows ease in one after another.
  useLayoutEffect(() => {
    if (!animate.current || prefersReducedMotion()) return;
    animate.current = false;
    gsap.fromTo(list.current.querySelectorAll('[data-row]'), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.035, clearProps: 'transform' });
  }, [filter]);

  const choose = (id) => {
    animate.current = true;
    setFilter(id);
  };

  const options = [{ id: 'all', name: 'All', count: projects.length, color: '#FFF4E0' }, ...CATEGORIES.map((c) => ({ ...c, count: counts[c.id] }))];
  const pillColor = options.find((o) => o.id === filter).color;

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="page">
        <RevealHeading id="projects-title" className="h-section">
          More things I’ve built
        </RevealHeading>

        <div className="mt-10 overflow-x-auto pb-2">
          <div ref={tabs} role="group" aria-label="Filter projects" className="relative inline-flex gap-1 rounded-full border-2 border-cream/20 p-1">
            <span aria-hidden="true" className="absolute inset-y-1 rounded-full transition-all duration-500 ease-soft" style={{ left: pill.left, width: pill.width, background: pillColor }} />
            {options.map((o) => (
              <button
                key={o.id}
                type="button"
                aria-pressed={filter === o.id}
                onClick={() => choose(o.id)}
                className={cx(
                  'relative z-10 inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full px-4 text-small font-semibold transition-colors duration-500',
                  filter === o.id ? 'text-ink' : 'text-cream hover:opacity-80',
                )}
              >
                {o.id !== 'all' && (
                  <span aria-hidden="true" className={cx('h-2.5 w-2.5 rounded-full transition-colors duration-500', filter === o.id && 'ring-2 ring-ink/40')} style={{ background: o.color }} />
                )}
                {o.name}
                <span className={cx('text-tag', filter === o.id ? 'text-ink/70' : 'text-mist')}>{o.count}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {shown} projects.
        </p>

        <div ref={list} className="mt-6">
          {groups.map((g) => (
            <div key={g.cat.id} className="mt-10 first:mt-4">
              <h3 data-row className="flex items-center gap-3 pb-4 text-small font-semibold">
                <span aria-hidden="true" className="h-3.5 w-10 rounded-full" style={{ background: g.cat.color }} />
                {g.cat.name}
                <span className="font-normal text-mist">{g.items.length}</span>
              </h3>
              <ul className="border-b-2 border-cream/15">
                {g.items.map((p) => (
                  <Row key={p.name} p={p} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
