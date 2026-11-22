'use client';

import { useCallback, useId, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselSlide {
  src: string;
  alt: string;
  label?: string;
}

interface ProjectCarouselProps {
  title: string;
  slides: CarouselSlide[];
}

export function ProjectCarousel({ title, slides }: ProjectCarouselProps) {
  const baseId = useId();
  const [index, setIndex] = useState(0);
  const pointerStart = useRef<{ x: number; y: number; id: number } | null>(null);
  const count = slides.length;
  const goTo = useCallback(
    (next: number) => {
      if (!count) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  if (!count) return null;

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointerStart.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.id !== e.pointerId) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) next();
    else prev();
  };

  const current = slides[index];

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label={`Capturas de tela de ${title}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          next();
        } else if (e.key === 'Home') {
          e.preventDefault();
          goTo(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          goTo(count - 1);
        }
      }}
      className="relative outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70 focus-visible:ring-inset"
    >
      <div
        className="relative w-full aspect-[3/2] bg-slate-900/80 overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            id={`${baseId}-slide-${i}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${count}${slide.label ? `: ${slide.label}` : ''}`}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none ${
              i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.src}
              alt={i === index ? slide.alt : ''}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={75}
              priority={i === 0}
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent" />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Imagem anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/55 text-white hover:bg-black/75 border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Próxima imagem"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/55 text-white hover:bg-black/75 border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-2 z-10 flex flex-col items-center gap-1.5 pointer-events-none">
          {current.label && (
            <p className="text-[11px] font-medium text-white/95 bg-black/45 px-2 py-0.5 rounded-md" aria-live="polite">
              {current.label}
              <span className="sr-only">
                {` (${index + 1} de ${count})`}
              </span>
            </p>
          )}
          <div className="flex items-center gap-1.5 pointer-events-auto" role="tablist" aria-label="Escolher captura">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Ir para ${slide.label ?? `imagem ${i + 1}`}`}
                aria-controls={`${baseId}-slide-${i}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  i === index ? 'w-5 bg-sky-400' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
