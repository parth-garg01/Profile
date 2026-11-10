import React from 'react';
import { ArrowUpRight, ArrowRight, Download } from 'lucide-react';

export const cx = (...parts) => parts.filter(Boolean).join(' ');

const isExternal = (href) => /^https?:\/\//.test(href ?? '');
const linkProps = (href, download) => ({
  href,
  ...(isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
  ...(download ? { download: '' } : {}),
});

/**
 * Button. A colour fill sweeps in from the left on hover.
 * `fill` is the resting colour, `sweep` the hover colour; text colours follow.
 */
export function Button({ href, children, variant = 'solid', tone = 'dark', download, className }) {
  const Icon = download ? Download : isExternal(href) ? ArrowUpRight : ArrowRight;
  const solid = variant === 'solid';
  const ink = tone === 'light';
  return (
    <a
      {...linkProps(href, download)}
      className={cx(
        'group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full px-7 text-[16px] font-semibold transition-colors duration-500 ease-soft',
        ink
          ? solid
            ? 'bg-ink text-cream hover:text-ink'
            : 'border-2 border-ink text-ink hover:text-cream'
          : solid
            ? 'bg-sun text-ink hover:text-cream'
            : 'border-2 border-cream text-cream hover:text-ink',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cx(
          'absolute inset-0 origin-left scale-x-0 rounded-full transition-transform duration-500 ease-soft group-hover:scale-x-100',
          ink ? (solid ? 'bg-sun' : 'bg-ink') : solid ? 'bg-ink' : 'bg-cream',
        )}
      />
      <span className="relative">{children}</span>
      <Icon className="relative transition-transform duration-500 ease-soft group-hover:translate-x-1" size={18} aria-hidden="true" />
      {isExternal(href) && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

/** Inline link with an underline that grows from the left on hover. */
export function TextLink({ href, children, className, arrow = true, download }) {
  const Icon = download ? Download : isExternal(href) ? ArrowUpRight : ArrowRight;
  return (
    <a {...linkProps(href, download)} className={cx('group inline-flex min-h-[44px] items-center gap-1.5 font-semibold', className)}>
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_2px] bg-[position:0_100%] bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-soft group-hover:bg-[length:0%_2px] group-hover:bg-[position:100%_100%]">
        {children}
      </span>
      {arrow && <Icon size={16} aria-hidden="true" className="transition-transform duration-500 ease-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
      {isExternal(href) && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

export function Tags({ items = [], className }) {
  return (
    <ul className={cx('flex flex-wrap gap-2', className)} aria-label="Built with">
      {items.map((t) => (
        <li key={t} className="rounded-full border px-3 py-1 text-tag font-medium" style={{ borderColor: 'color-mix(in srgb, currentColor 35%, transparent)' }}>
          {t}
        </li>
      ))}
    </ul>
  );
}
