import React, { lazy, Suspense } from 'react';
import { featured } from '../data';
import { Reveal, RevealHeading } from '../lib/motion.jsx';
import { Tags, TextLink, cx } from './ui';

const DEMOS = {
  routing: lazy(() => import('./work/RoutingDemo')),
  pipeline: lazy(() => import('./work/PipelineDemo')),
  bisection: lazy(() => import('./work/BisectionDemo')),
};

function Panel({ p, flip }) {
  const Demo = DEMOS[p.visual];
  return (
    <article
      id={p.slug}
      className="on-light relative -mt-12 scroll-mt-16 rounded-t-[40px] text-ink shadow-[0_-24px_48px_-24px_rgba(13,18,64,0.35)] md:-mt-16 md:rounded-t-[64px]"
      style={{ background: p.color }}
    >
      <div className="page grid items-center gap-12 pb-24 pt-16 md:pb-32 md:pt-24 lg:grid-cols-12 lg:gap-10">
        <Reveal className={cx('lg:col-span-5', flip && 'lg:order-2 lg:col-start-8')}>
          <p className="t-serif-i text-[clamp(22px,1.9vw,28px)] leading-tight">{p.kicker}</p>
          <h3 className="t-wide mt-3 text-[clamp(40px,4.3vw,70px)]">{p.name}</h3>
          <p className="mt-6 text-lead">{p.summary}</p>
          <p className="mt-4 text-body">{p.detail}</p>
          <dl className="mt-8 grid gap-3 border-t-2 border-ink/15 pt-6">
            {p.facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[8rem_1fr] gap-4">
                <dt className="text-small font-semibold opacity-70">{k}</dt>
                <dd className="text-small font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <Tags items={p.stack} className="mt-6" />
          <TextLink href={p.link} className="mt-5">
            Code on GitHub
          </TextLink>
        </Reveal>
        <Reveal className={cx('lg:col-span-7', flip && 'lg:order-1 lg:col-start-1')} y={64}>
          <div>
            <Suspense fallback={<div className="h-[440px] rounded-[24px] bg-ink" />}>
              <Demo />
            </Suspense>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title">
      <div className="on-light bg-mint text-ink">
        <div className="page pb-28 pt-20 md:pb-36 md:pt-28">
        <RevealHeading id="work-title" className="t-poster max-w-[12ch] text-[clamp(64px,9.5vw,156px)]">
          Three projects I’d walk you through
        </RevealHeading>
        </div>
      </div>
      {featured.map((p, i) => (
        <Panel key={p.slug} p={p} flip={i % 2 === 1} />
      ))}
    </section>
  );
}
