import React, { lazy, Suspense, useRef } from 'react';
import { featured } from '../data';
import { Reveal, RevealHeading, useEdgeSettle } from '../lib/motion.jsx';
import { Tags, TextLink, cx } from './ui';

const DEMOS = {
  routing: lazy(() => import('./work/RoutingDemo')),
  pipeline: lazy(() => import('./work/PipelineDemo')),
  bisection: lazy(() => import('./work/BisectionDemo')),
};

function Panel({ p, flip, last }) {
  const Demo = DEMOS[p.visual];
  const edge = useRef(null);
  useEdgeSettle(edge);
  return (
    <article
      ref={edge}
      id={p.slug}
      data-scene
      className={`scene on-light flex flex-col justify-center mx-3 -mt-12 scroll-mt-16 rounded-t-[40px] sm:mx-5 lg:mx-8 xl:mx-12 text-ink shadow-[0_-24px_48px_-24px_rgba(13,18,64,0.35)] md:-mt-16 md:rounded-t-[64px]${last ? ' rounded-b-[40px] md:rounded-b-[64px]' : ''}`}
      style={{ background: p.color }}
    >
      <div className="page grid w-full items-center gap-12 pb-20 pt-[calc(68px+2rem)] lg:grid-cols-12 lg:gap-10 lg:pb-10 lg:pt-[calc(68px+1.25rem)] short:pb-6 short:pt-[calc(68px+0.75rem)]">
        <Reveal className={cx('lg:col-span-5', flip && 'lg:order-2 lg:col-start-8')}>
          <p className="meta">{p.kicker}</p>
          <RevealHeading as="h3" className="t-wide mt-2 text-[clamp(36px,3.7vw,60px)]">{p.name}</RevealHeading>
          <p className="mt-4 text-lead short:mt-3 short:text-[18px] short:leading-[1.45]">{p.summary}</p>
          <p className="mt-3 text-small">{p.detail}</p>
          <dl className="mt-5 grid gap-2 border-t-2 border-ink/15 pt-4">
            {p.facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[8rem_1fr] gap-4">
                <dt className="text-small opacity-70">{k}</dt>
                <dd className="text-small font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <Tags items={p.stack} className="mt-4" />
          <TextLink href={p.link} className="mt-2">
            Code on GitHub
          </TextLink>
        </Reveal>
        <Reveal className={cx('lg:col-span-7', flip && 'lg:order-1 lg:col-start-1')} mode="card">
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
    <section id="work" className="bg-mint pb-24 md:pb-32" aria-labelledby="work-title">
      <div data-scene className="scene on-light flex flex-col justify-center bg-mint text-ink">
        <div className="page pb-28 pt-20 md:pb-36 md:pt-28">
        <RevealHeading id="work-title" className="t-wide max-w-[16ch] text-[clamp(44px,6vw,100px)]">
          Three projects I’d walk you through
        </RevealHeading>
        </div>
      </div>
      {featured.map((p, i) => (
        <Panel key={p.slug} p={p} flip={i % 2 === 1} last={i === featured.length - 1} />
      ))}
    </section>
  );
}
