import React from 'react';
import { about } from '../data';
import { Reveal, RevealHeading } from '../lib/motion.jsx';

export default function About() {
  return (
    <section id="about" data-scene className="scene on-light section bg-cream text-ink">
      <div className="page grid gap-14 lg:grid-cols-12 lg:gap-10">
        <RevealHeading className="t-serif text-[clamp(46px,5.6vw,92px)] lg:col-span-7">{about.statement}</RevealHeading>

        <Reveal className="grid content-start gap-5 text-lead lg:col-span-5 lg:pt-3">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </Reveal>

        <Reveal mode="card" className="grid gap-5 md:grid-cols-2 lg:col-span-12 lg:grid-cols-12">
          <div className="rounded-[28px] bg-sun p-8 text-ink md:p-10 lg:col-span-7">
            <p className="meta">Working on now</p>
            <p className="t-serif mt-4 text-[clamp(28px,2.6vw,42px)] leading-[1.08]">
              {about.now}
            </p>
          </div>
          <div className="flex items-end rounded-[28px] bg-coral p-8 md:p-10 lg:col-span-5">
            <p className="t-serif text-[clamp(28px,2.6vw,40px)] leading-[1.1]">{about.outside}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
