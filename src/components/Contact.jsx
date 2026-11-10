import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy, Download, Mail } from 'lucide-react';
import { contact, profile } from '../data';
import { Reveal, RevealHeading } from '../lib/motion.jsx';

function Channel({ label, value, href, download, external }) {
  const Icon = download ? Download : external ? ArrowUpRight : Mail;
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(download ? { download: '' } : {})}
        className="group relative flex min-h-[76px] items-center justify-between gap-4 overflow-hidden rounded-full bg-ink px-7 text-cream"
      >
        <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-cream transition-transform duration-[650ms] ease-soft group-hover:scale-x-100" />
        <span className="relative flex min-w-0 flex-col transition-colors duration-300 group-hover:text-ink sm:flex-row sm:items-baseline sm:gap-4">
          <span className="text-small text-mist transition-colors duration-300 group-hover:text-ink/70">{label}</span>
          <span className="truncate text-[18px] font-medium">{value}</span>
        </span>
        <Icon className="relative shrink-0 transition-all duration-500 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" size={22} aria-hidden="true" />
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    </li>
  );
}

export default function Contact() {
  const c = profile.contact;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(c.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <>
      <section id="contact" className="on-light bg-sun text-ink" aria-labelledby="contact-title">
        <div className="page grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:py-40">
          <div className="lg:col-span-6">
            <RevealHeading id="contact-title" className="t-wide text-[clamp(64px,7.5vw,120px)] leading-[0.92]">
              Say hello.
            </RevealHeading>
            <Reveal>
              <p className="mt-8 max-w-read text-lead">{contact.lead}</p>
              <button
                type="button"
                onClick={copy}
                className="mt-6 inline-flex h-12 items-center gap-2 rounded-full border-2 border-ink px-5 font-semibold transition-colors duration-300 hover:bg-ink hover:text-sun"
              >
                {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
                {copied ? 'Email copied' : 'Copy email address'}
              </button>
              <span className="sr-only" aria-live="polite">{copied ? 'Email address copied.' : ''}</span>
            </Reveal>
          </div>
          <Reveal as="ul" mode="sweep" className="grid content-end gap-3 lg:col-span-6" stagger={0.08}>
            <Channel label="Email" value={c.email} href={`mailto:${c.email}`} />
            <Channel label="GitHub" value={c.githubLabel} href={c.github} external />
            <Channel label="LinkedIn" value={c.linkedinLabel} href={c.linkedin} external />
            <Channel label="Google Scholar" value="Parth Garg" href={c.scholar} external />
            <Channel label="Resume" value="Download PDF" href={profile.resume} download />
          </Reveal>
        </div>
      </section>
      <footer className="bg-ink text-mist">
        <div className="page flex flex-wrap items-center justify-between gap-3 py-6 text-small">
          <p>© 2026 {profile.name}</p>
          <p>Last updated {profile.lastUpdated}</p>
        </div>
      </footer>
    </>
  );
}
