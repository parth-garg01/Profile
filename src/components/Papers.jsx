import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { papers, profile } from '../data';
import { Reveal, RevealHeading } from '../lib/motion.jsx';
import { TextLink } from './ui';

function CopyNumber({ value }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-10 items-center gap-2 rounded-full border-2 border-ink px-4 text-small font-semibold transition-colors duration-300 hover:bg-ink hover:text-mint"
      aria-label={copied ? 'Application number copied' : 'Copy application number'}
    >
      {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function Papers() {
  const { paper, patent } = papers;
  return (
    <section id="papers" className="section relative -mt-12 rounded-t-[40px] bg-violet shadow-[0_-24px_48px_-24px_rgba(13,18,64,0.35)] md:-mt-16 md:rounded-t-[64px]" aria-labelledby="papers-title">
      <div className="page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <RevealHeading id="papers-title" className="t-serif text-[clamp(52px,6.4vw,104px)]">
            Papers and patents
          </RevealHeading>
          <TextLink href={profile.contact.scholar} className="text-cream">
            Google Scholar
          </TextLink>
        </div>

        <Reveal className="mt-14 grid gap-6 lg:grid-cols-2" y={60} stagger={0.14}>
          <article className="on-light flex flex-col rounded-[28px] bg-cream p-8 text-ink md:p-12">
            <p className="meta">
              {paper.publisher}, {paper.year}. {paper.role}.
            </p>
            <h3 className="mt-6 font-serif text-[clamp(30px,3vw,46px)] leading-[1.08]">{paper.title}</h3>
            <p className="mt-6 text-small font-semibold opacity-75">{paper.venue}</p>
            <p className="mt-6 max-w-read text-body">{paper.note}</p>
            <div className="mt-auto flex flex-wrap gap-x-6 pt-8">
              <TextLink href={paper.doi}>Read on IEEE Xplore</TextLink>
              <TextLink href={paper.code}>Code</TextLink>
            </div>
          </article>

          <article className="on-light grid overflow-hidden rounded-[28px] bg-mint text-ink sm:grid-cols-[1fr_auto]">
            <div className="flex flex-col p-8 md:p-12">
              <p className="meta">Patent application, {patent.office}</p>
              <h3 className="t-poster-sm mt-6 text-[clamp(26px,2.3vw,36px)]">{patent.title}</h3>
              <dl className="mt-8 grid gap-4">
                <div>
                  <dt className="text-small font-semibold opacity-70">Application number</dt>
                  <dd className="mt-1 flex flex-wrap items-center gap-3">
                    <span className="t-wide text-[clamp(22px,2vw,30px)] tabular-nums">
                      {patent.number}
                    </span>
                    <CopyNumber value={patent.number} />
                  </dd>
                </div>
                <div>
                  <dt className="text-small font-semibold opacity-70">Published</dt>
                  <dd className="font-semibold">{patent.published}</dd>
                </div>
              </dl>
              <p className="mt-6 max-w-read text-body">{patent.note}</p>
            </div>
            <figure className="flex items-center justify-center p-5 pt-0 sm:w-[min(24vw,300px)] sm:p-6 sm:pl-0">
              <img
                src={patent.photo}
                alt="The BlindSpot prototype: a camera on a tripod, wired to a Raspberry Pi in a case."
                className="aspect-[536/1050] max-h-[520px] w-full rounded-[20px] bg-cream object-contain"
                loading="lazy"
              />
            </figure>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
