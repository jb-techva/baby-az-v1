import { useEffect } from 'react';

/** Imperative, bounded particles avoid rerendering the invitation on pointer movement. */
export function SnowflakeTrail() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(pointer: fine)');
    const particles = new Set<HTMLSpanElement>();
    let last = 0;
    const emit = (x: number, y: number) => {
      if (reduced.matches || particles.size >= 14) return;
      const flake = document.createElement('span');
      flake.className = 'cursor-snowflake';
      flake.textContent = '❄';
      flake.setAttribute('aria-hidden', 'true');
      flake.style.left = `${x}px`;
      flake.style.top = `${y}px`;
      document.body.appendChild(flake);
      particles.add(flake);
      flake.addEventListener('animationend', () => { flake.remove(); particles.delete(flake); }, { once: true });
    };
    const move = (e: PointerEvent) => {
      if (!fine.matches || e.pointerType === 'touch' || performance.now() - last < 80) return;
      last = performance.now(); emit(e.clientX, e.clientY);
    };
    const tap = (e: PointerEvent) => {
      if (e.pointerType !== 'touch' || !(e.target instanceof Element) || !e.target.closest('button, a')) return;
      [-12, 0, 12].forEach(dx => emit(e.clientX + dx, e.clientY));
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', tap, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', tap);
      particles.forEach(p => p.remove());
    };
  }, []);
  return null;
}
