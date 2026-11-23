'use client';

import { useCallback, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface LightboxSlide {
  src: string;
  alt: string;
  label?: string;
}

interface ImageLightboxProps {
  title: string;
  slides: LightboxSlide[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

export function ImageLightbox({ title, slides, index, onIndexChange, onClose }: ImageLightboxProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointerStart = useRef<{ x: number; y: number; id: number } | null>(null);
  const indexRef = useRef(index);
  const onCloseRef = useRef(onClose);
  const onIndexChangeRef = useRef(onIndexChange);
  indexRef.current = index;
  onCloseRef.current = onClose;
  onIndexChangeRef.current = onIndexChange;

  const count = slides.length;
  const current = slides[index];

  const goTo = useCallback(
    (next: number) => {
      if (!count) return;
      onIndexChange(((next % count) + count) % count);
    },
    [count, onIndexChange],
  );
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const { body, documentElement } = document;
    const prevBody = body.style.overflow;
    const prevHtml = documentElement.style.overflow;
    body.style.overflow = 'hidden';
    documentElement.style.overflow = 'hidden';
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const total = count;
        if (!total) return;
        const delta = e.key === 'ArrowLeft' ? -1 : 1;
        const nextIndex = (((indexRef.current + delta) % total) + total) % total;
        onIndexChangeRef.current(nextIndex);
        return;
      }
      if (e.key !== 'Tab') return;
      const root = dialogRef.current;
      if (!root) return;
      const nodes = Array.from(
        root.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => el.tabIndex !== -1);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      body.style.overflow = prevBody;
      documentElement.style.overflow = prevHtml;
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [count]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointerStart.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.id !== e.pointerId || count < 2) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) next();
    else prev();
  };

  if (!current) return null;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Fechar visualização"
        className="absolute inset-0 bg-black/85 cursor-zoom-out"
        onClick={onClose}
      />

      <p id={titleId} className="sr-only">
        {`Visualização de ${title}: ${current.label ?? current.alt}. Imagem ${index + 1} de ${count}`}
      </p>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        <X className="w-5 h-5" />
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Imagem anterior"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/60 text-white hover:bg-black/80 border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Próxima imagem"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/60 text-white hover:bg-black/80 border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <div className="relative z-10 flex flex-col items-center gap-3 w-full max-w-[min(100vw-2rem,1400px)] pointer-events-none">
        <div
          className="relative w-full h-[min(100dvh-7rem,900px)] pointer-events-auto"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            pointerStart.current = null;
          }}
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            className="object-contain"
            sizes="100vw"
            quality={95}
            priority
          />
        </div>
        <div className="pointer-events-none flex flex-col items-center gap-1 text-white" aria-live="polite">
          {current.label && <p className="text-sm font-medium text-white/95">{current.label}</p>}
          <p className="text-xs tabular-nums text-white/80">{`${index + 1} / ${count}`}</p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
