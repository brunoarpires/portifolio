'use client';

import { Children, useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectCardsCarouselProps {
  resetKey: string;
  children: React.ReactNode;
}

interface Metrics {
  visible: number;
  pageCount: number;
}

function readMetrics(scroller: HTMLElement, total: number): Metrics {
  const cards = [...scroller.querySelectorAll<HTMLElement>('[data-project-card]')];
  if (!cards.length || total <= 0) return { visible: 1, pageCount: 1 };
  const first = cards[0];
  const styles = getComputedStyle(scroller);
  const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
  const cardWidth = first.getBoundingClientRect().width;
  const step = cardWidth + gap;
  const visible = step <= 0 ? 1 : Math.max(1, Math.floor((scroller.clientWidth + gap) / step + 0.001));
  return { visible, pageCount: Math.max(1, Math.ceil(total / visible)) };
}

function currentPage(scroller: HTMLElement, visible: number): number {
  const cards = [...scroller.querySelectorAll<HTMLElement>('[data-project-card]')];
  if (!cards.length) return 0;
  let best = 0;
  let bestDist = Number.POSITIVE_INFINITY;
  const left = scroller.scrollLeft;
  cards.forEach((card, index) => {
    const dist = Math.abs(card.offsetLeft - left);
    if (dist < bestDist) {
      bestDist = dist;
      best = index;
    }
  });
  return Math.floor(best / Math.max(1, visible));
}

function scrollToPage(scroller: HTMLElement, page: number, visible: number, behavior: ScrollBehavior) {
  const cards = [...scroller.querySelectorAll<HTMLElement>('[data-project-card]')];
  const target = cards[page * visible];
  if (!target) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  scroller.scrollTo({ left: target.offsetLeft, behavior: reduce ? 'auto' : behavior });
}

export function ProjectCardsCarousel({ resetKey, children }: ProjectCardsCarouselProps) {
  const baseId = useId();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const total = items.length;
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const metricsRef = useRef<Metrics>({ visible: 1, pageCount: 1 });

  const measure = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const metrics = readMetrics(scroller, total);
    metricsRef.current = metrics;
    setPageCount(metrics.pageCount);
    setPage((current) => Math.min(current, metrics.pageCount - 1));
  }, [total]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollTo({ left: 0, behavior: 'auto' });
    setPage(0);
    measure();
  }, [resetKey, total, measure]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    measure();
    const observer = new ResizeObserver(() => measure());
    observer.observe(scroller);
    const onScroll = () => {
      setPage(currentPage(scroller, metricsRef.current.visible));
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, [measure, total]);

  const goTo = useCallback((nextPage: number, behavior: ScrollBehavior = 'smooth') => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const { pageCount: pages, visible: perPage } = metricsRef.current;
    const clamped = Math.max(0, Math.min(pages - 1, nextPage));
    setPage(clamped);
    scrollToPage(scroller, clamped, perPage, behavior);
  }, []);

  const showControls = pageCount > 1;
  const atStart = page <= 0;
  const atEnd = page >= pageCount - 1;

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Lista de projetos"
      tabIndex={showControls ? 0 : undefined}
      onKeyDown={(e) => {
        if (!showControls) return;
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goTo(page - 1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goTo(page + 1);
        } else if (e.key === 'Home') {
          e.preventDefault();
          goTo(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          goTo(pageCount - 1);
        }
      }}
      className="relative outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded-2xl"
    >
      <div
        id={baseId}
        ref={scrollerRef}
        className="flex items-stretch gap-6 md:gap-8 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth motion-reduce:scroll-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((child, index) => (
          <div
            key={index}
            data-project-card
            className="flex snap-start shrink-0 w-[calc(100%-2.75rem)] md:w-[calc((100%-2rem)/2)] 2xl:w-[calc((100%-4rem)/3)]"
          >
            <div className="flex w-full min-h-full">{child}</div>
          </div>
        ))}
      </div>

      {showControls && (
        <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            disabled={atStart}
            aria-label="Projetos anteriores"
            className="inline-flex items-center justify-center h-11 w-11 shrink-0 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 hover:border-sky-500/50 hover:text-sky-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:opacity-40 disabled:bg-transparent disabled:border-slate-800 disabled:text-slate-600 disabled:hover:bg-transparent disabled:pointer-events-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center justify-center gap-1.5 min-w-[4.5rem]">
            <p className="text-sm tabular-nums font-medium text-slate-300" aria-live="polite">
              {`${page + 1} / ${pageCount}`}
            </p>
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Grupos de projetos">
              {Array.from({ length: pageCount }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={index === page}
                  aria-label={`Ir para o grupo ${index + 1} de ${pageCount}`}
                  aria-controls={baseId}
                  onClick={() => goTo(index)}
                  className={`h-2 min-h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                    index === page ? 'w-5 bg-sky-400' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => goTo(page + 1)}
            disabled={atEnd}
            aria-label="Próximos projetos"
            className="inline-flex items-center justify-center h-11 w-11 shrink-0 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 hover:border-sky-500/50 hover:text-sky-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:opacity-40 disabled:bg-transparent disabled:border-slate-800 disabled:text-slate-600 disabled:hover:bg-transparent disabled:pointer-events-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
