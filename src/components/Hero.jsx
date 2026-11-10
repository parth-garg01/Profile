import React, { useLayoutEffect, useRef } from 'react';
import { hero, profile } from '../data';
import { Github, Linkedin } from 'lucide-react';
import { Button } from './ui';
import { gsap, prefersReducedMotion } from '../lib/motion.jsx';

const REST_WIDTH = 112;

function NameLine({ text, className }) {
  return (
    <span className="reveal-line">
      <span className={className} aria-hidden="true">
        {text.split('').map((c, i) => (
          <span key={i} data-char className="name-char" style={{ '--wdth': REST_WIDTH, '--wght': 900 }}>
            {c}
          </span>
        ))}
      </span>
    </span>
  );
}

function IconLink({ href, label, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      title={label}
      className="group relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-ink text-ink transition-colors duration-500 ease-soft hover:text-cream"
    >
      <span aria-hidden="true" className="absolute inset-0 scale-0 rounded-full bg-ink transition-transform duration-500 ease-soft group-hover:scale-100" />
      <Icon className="relative" size={22} aria-hidden="true" />
    </a>
  );
}

export default function Hero() {
  const root = useRef(null);

  // One entrance: letters rise from their baseline while widening from condensed to full width,
  // then the text follows.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray('[data-char]');
      const state = chars.map(() => ({ w: 50 }));
      chars.forEach((c) => c.style.setProperty('--wdth', 50));
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from(chars, { yPercent: 110, duration: 1.3, stagger: 0.055 }, 0.1);
      chars.forEach((c, i) =>
        tl.to(
          state[i],
          {
            w: REST_WIDTH,
            duration: 1.6,
            onUpdate: () => c.style.setProperty('--wdth', state[i].w.toFixed(1)),
            onComplete: () => c.style.setProperty('--wdth', REST_WIDTH),
          },
          0.25 + i * 0.055,
        ),
      );
      tl.from('[data-hero-band]', { clipPath: 'inset(100% 0 0 0)', duration: 1.2, ease: 'expo.inOut', clearProps: 'clipPath' }, 0.45);
      tl.from('[data-hero-rise]', { y: 32, opacity: 0, duration: 1.1, stagger: 0.08, clearProps: 'transform' }, 0.95);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative flex min-h-[100svh] flex-col">
      <div className="flex flex-1 flex-col justify-center bg-blue pb-8 pt-[calc(68px+2rem)] md:pb-10 md:pt-[calc(68px+2.5rem)]">
        <div className="page">
          <h1 aria-label={profile.name} className="hero-name font-display uppercase tracking-[-0.03em]">
            <NameLine text={profile.first} className="block text-cream" />
            <NameLine text={profile.last} className="block text-sun" />
          </h1>
        </div>
      </div>

      <div data-hero-band className="on-light bg-pink text-ink">
        <div className="page grid gap-6 py-8 md:grid-cols-12 md:gap-10 md:py-10">
          <div className="md:col-span-5">
            <p data-hero-rise className="t-serif-i text-[clamp(32px,3.2vw,50px)]">
              {profile.role}
            </p>
            <p data-hero-rise className="mt-3 text-body opacity-80">
              {profile.programme}, {profile.institution}. {profile.year}.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p data-hero-rise className="max-w-read text-lead">
              {hero.lead}
            </p>
            <div data-hero-rise className="mt-6 flex flex-wrap gap-3">
              <Button href="#work" tone="light">See my work</Button>
              <Button href={profile.resume} variant="outline" tone="light" download>
                Resume
              </Button>
              <IconLink href={profile.contact.github} label="GitHub" Icon={Github} />
              <IconLink href={profile.contact.linkedin} label="LinkedIn" Icon={Linkedin} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
