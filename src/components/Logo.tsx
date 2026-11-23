import type { MouseEvent, SVGProps } from 'react';

interface LogoProps {
  withWordmark?: boolean;
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

function Mark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="201 278 621 361"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path fill="currentColor" d="M 207,446.5 L 336,317.5 L 360,341.5 L 255,446.5 L 360,551.5 L 336,575.5 Z" />
      <path fill="currentColor" d="M 816,446.5 L 687,317.5 L 663,341.5 L 768,446.5 L 663,551.5 L 687,575.5 Z" />
      <path fill="currentColor" fillRule="evenodd" d="M 405,284 L 525,284 A 66 66 0 0 1 566.64,401.21 A 53 53 0 0 1 559.77,474 L 525,474 L 438,474 L 438,487 L 450,499 L 450,516 L 405,561 L 405,284 Z M 438,320 L 525,320 A 30 30 0 0 1 555,350 A 30 30 0 0 1 525,380 L 438,380 Z M 438,414 L 525,414 A 20 20 0 0 1 545,434 A 20 20 0 0 1 525,454 L 438,454 Z" />
      <path fill="currentColor" fillRule="evenodd" d="M 470,441 L 587,441 A 55 55 0 0 1 642,496 A 55 55 0 0 1 559.42,543.58 L 470,633 L 470,441 Z M 503,474 L 587,474 A 22 22 0 0 1 609,496 A 22 22 0 0 1 587,518 L 519,518 L 503,502 Z" />
    </svg>
  );
}

export function Logo({
  withWordmark = false,
  className = '',
  markClassName = 'h-8 w-auto',
  wordmarkClassName = 'inline',
  onClick,
}: LogoProps) {
  return (
    <a
      href="#home"
      onClick={(e) => onClick?.(e, '#home')}
      className={`group inline-flex items-center gap-2.5 shrink-0 text-sky-400 hover:text-sky-300 transition-colors ${className}`}
      aria-label="Bruno Pires — Início"
    >
      <Mark className={markClassName} />
      {withWordmark && (
        <span className={`${wordmarkClassName} text-[15px] font-medium tracking-wide text-slate-300 group-hover:text-white transition-colors leading-none`}>
          Bruno Pires
        </span>
      )}
    </a>
  );
}
