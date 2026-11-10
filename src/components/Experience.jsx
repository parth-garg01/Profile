import React from 'react';
import { experience, recognition, toolkit } from '../data';
import { Reveal, RevealHeading } from '../lib/motion.jsx';

export function Experience() {
  return (
    <section id="experience" className="on-light section bg-cream text-ink" aria-labelledby="exp-title">
      <div className="page">
        <RevealHeading id="exp-title" className="t-serif text-[clamp(56px,7vw,116px)]">
          Where I’ve worked
        </RevealHeading>
        <Reveal as="ol" className="mt-14 border-b-2 border-ink/15" stagger={0.12}>
          {experience.map((e) => (
            <li key={e.org} className="grid gap-4 border-t-2 border-ink/15 py-10 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3">
                <p className="font-medium tabular-nums">{e.dates}</p>
                <p className="text-small opacity-70">{e.place}</p>
              </div>
              <div className="md:col-span-4">
                <h3 className="t-serif text-[clamp(38px,3.8vw,60px)]">{e.org}</h3>
                <p className="mt-2 text-lead opacity-80">{e.role}</p>
              </div>
              <ul className="grid gap-3 md:col-span-5">
                {e.points.map((pt) => (
                  <li key={pt.slice(0, 24)} className="grid grid-cols-[14px_1fr] gap-3 text-body">
                    <span aria-hidden="true" className="mt-[0.6em] h-2 w-2 rounded-full bg-coral" />
                    {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Recognition() {
  return (
    <section id="recognition" className="section bg-teal" aria-labelledby="rec-title">
      <div className="page grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <RevealHeading id="rec-title" className="t-wide text-[clamp(40px,4.6vw,74px)]">
            Recognition
          </RevealHeading>
          <Reveal as="ul" className="mt-12 grid gap-4">
            {recognition.map((r, i) => (
              <li
                key={r.title}
                className={i === 0 ? 'on-light rounded-[28px] bg-coral p-8 text-ink md:p-10' : 'rounded-[28px] border-2 border-cream/20 p-8 md:p-10'}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="meta">{r.where}</p>
                  <p className="meta">{r.year}</p>
                </div>
                <h3 className={i === 0 ? 't-wide mt-4 text-[clamp(34px,3.6vw,58px)]' : 't-wide mt-4 text-[clamp(24px,2.2vw,34px)] leading-[1.08]'}>{r.title}</h3>
                {r.note && <p className={i === 0 ? 'mt-3 text-body' : 'mt-3 text-body text-cream/75'}>{r.note}</p>}
              </li>
            ))}
          </Reveal>
        </div>

        <div className="flex flex-col lg:col-span-5">
          <RevealHeading as="h2" className="t-wide text-[clamp(40px,4.6vw,74px)]">
            Toolkit
          </RevealHeading>
          <Reveal as="dl" className="mt-12 flex flex-1 flex-col gap-7 lg:justify-between lg:gap-6">
            {toolkit.map(([k, v]) => (
              <div key={k} className="border-t-2 border-cream/15 pt-5">
                <dt className="text-lead font-medium text-sun">{k}</dt>
                <dd className="mt-2 text-[clamp(18px,1.45vw,22px)] leading-[1.5]">{v}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
