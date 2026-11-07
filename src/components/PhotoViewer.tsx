import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

type Photo = { url: string; title: string; caption?: string };
type View = { scale: number; x: number; y: number };
export function PhotoViewer({ photos, index, onIndexChange, onClose }: { photos: Photo[]; index: number; onIndexChange: (index: number) => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const [view, setView] = useState<View>({ scale: 1, x: 0, y: 0 });
  const current = useRef(view);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ view: View; center: { x: number; y: number }; distance: number; multi: boolean } | null>(null);
  const swipe = useRef<{ x: number; y: number; time: number; multi: boolean } | null>(null);
  const lastTap = useRef(0);
  const photo = photos[index];
  const navigate = (step: number) => onIndexChange((index + step + photos.length) % photos.length);
  const apply = (next: View) => {
    const box = stage.current, img = image.current;
    const scale = Math.max(1, Math.min(4, next.scale));
    const maxX = box && img ? Math.max(0, (img.clientWidth * scale - box.clientWidth) / 2) : 0;
    const maxY = box && img ? Math.max(0, (img.clientHeight * scale - box.clientHeight) / 2) : 0;
    const value = { scale, x: Math.max(-maxX, Math.min(maxX, next.x)), y: Math.max(-maxY, Math.min(maxY, next.y)) };
    current.current = value;
    setView(value);
  };
  const reset = () => apply({ scale: 1, x: 0, y: 0 });
  const zoom = (amount: number) => apply({ scale: current.current.scale + amount, x: current.current.x, y: current.current.y });
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.showModal();
    return () => { document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  useEffect(() => {
    pointers.current.clear(); gesture.current = null; swipe.current = null; lastTap.current = 0;
    reset();
  }, [index]);
  useEffect(() => {
    const onResize = () => apply(current.current);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const baseline = () => {
    const points = [...pointers.current.values()];
    if (!points.length) { gesture.current = null; return; }
    const a = points[0], b = points[1] || a;
    gesture.current = { view: { ...current.current }, center: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, distance: Math.hypot(a.x - b.x, a.y - b.y), multi: points.length > 1 };
  };
  const down = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) swipe.current = { x: e.clientX, y: e.clientY, time: Date.now(), multi: false };
    else if (swipe.current) swipe.current.multi = true;
    baseline();
  };
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId) || !gesture.current) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const points = [...pointers.current.values()], g = gesture.current;
    const a = points[0], b = points[1] || a;
    const center = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    let scale = g.view.scale;
    if (g.multi && points.length > 1 && g.distance > 0) scale = Math.max(1, Math.min(4, g.view.scale * Math.hypot(a.x - b.x, a.y - b.y) / g.distance));
    const rect = stage.current!.getBoundingClientRect();
    const ratio = scale / g.view.scale;
    apply({ scale, x: center.x - rect.left - rect.width / 2 - (g.center.x - rect.left - rect.width / 2 - g.view.x) * ratio, y: center.y - rect.top - rect.height / 2 - (g.center.y - rect.top - rect.height / 2 - g.view.y) * ratio });
  };
  const up = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.delete(e.pointerId);
    const start = swipe.current;
    if (!pointers.current.size && start && !start.multi && e.type === 'pointerup') {
      const dx = e.clientX - start.x, dy = e.clientY - start.y;
      if (current.current.scale === 1 && photos.length > 1 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && Date.now() - start.time < 800) navigate(dx < 0 ? 1 : -1);
      else if (e.pointerType !== 'mouse' && Math.hypot(dx, dy) < 12 && Date.now() - start.time < 300) {
        if (Date.now() - lastTap.current < 300) { current.current.scale > 1 ? reset() : zoom(1); lastTap.current = 0; }
        else lastTap.current = Date.now();
      }
    }
    baseline();
  };
  const control = 'rounded-full bg-white/15 hover:bg-white/25 border border-white/30 p-3 focus-visible:outline-2 focus-visible:outline-white disabled:opacity-40';
  return createPortal(
    <dialog ref={dialog} aria-label="Zoomable photo viewer" onCancel={e => { e.preventDefault(); onClose(); }}
      onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); navigate(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); navigate(-1); } if (e.key === '+' || e.key === '=') zoom(.5); if (e.key === '-') zoom(-.5); }}
      className="fixed inset-0 m-0 w-screen max-w-none h-[100dvh] max-h-none bg-slate-950/95 text-white backdrop:bg-slate-950/90 p-0 z-[1000]">
      <div className="h-full flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        <header className="shrink-0 flex items-center justify-between gap-2 px-4 py-3">
          <span className="text-sm text-[#B9E2F5]">{photos.length > 1 ? `Photo ${index + 1} of ${photos.length}` : 'Baby AZ'}</span>
          <button type="button" onClick={onClose} aria-label="Close photo viewer" className={control}><X size={22} /></button>
        </header>
        <div ref={stage} aria-label="Photo zoom and pan area" className="relative flex-1 min-h-0 overflow-hidden flex items-center justify-center select-none"
          style={{ touchAction: 'none', cursor: view.scale > 1 ? 'grab' : 'zoom-in' }}
          onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onLostPointerCapture={e => { if (pointers.current.delete(e.pointerId)) baseline(); }}
          onDoubleClick={() => current.current.scale > 1 ? reset() : zoom(1)}
          onWheel={e => { if (e.ctrlKey) return; zoom(e.deltaY < 0 ? .2 : -.2); }}>
          <img ref={image} src={photo.url} alt={photo.title} draggable={false} onLoad={reset}
            className="max-w-full max-h-full w-auto h-auto object-contain pointer-events-none"
            style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`, transformOrigin: 'center' }} />
        </div>
        <footer className="shrink-0 px-3 py-3 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            {photos.length > 1 && <button type="button" onClick={() => navigate(-1)} aria-label="Previous photo in viewer" className={control}><ChevronLeft size={20} /></button>}
            <button type="button" onClick={() => zoom(-.5)} disabled={view.scale <= 1} aria-label="Zoom out" className={control}><ZoomOut size={20} /></button>
            <output aria-live="polite" className="text-sm w-12">{Math.round(view.scale * 100)}%</output>
            <button type="button" onClick={() => zoom(.5)} disabled={view.scale >= 4} aria-label="Zoom in" className={control}><ZoomIn size={20} /></button>
            <button type="button" onClick={reset} aria-label="Reset zoom" className={control}><RotateCcw size={20} /></button>
            {photos.length > 1 && <button type="button" onClick={() => navigate(1)} aria-label="Next photo in viewer" className={control}><ChevronRight size={20} /></button>}
          </div>
          <p className="text-sm font-semibold">{photo.title}</p>
          <p className="text-xs text-[#B9E2F5]">Pinch or double-tap to zoom · Drag to explore{photos.length > 1 ? ' · Swipe at 100% to browse' : ''}</p>
        </footer>
      </div>
    </dialog>, document.body);
}
