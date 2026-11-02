import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

interface OpeningEnvelopeProps {
  onOpen: () => void;
  onStart: () => void;
  isOpen: boolean;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({ onOpen, onStart, isOpen }) => {
  const [opening, setOpening] = useState(false);
  const started = useRef(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!opening) return;
    const timer = window.setTimeout(onOpen, reduce ? 100 : 2200);
    return () => window.clearTimeout(timer);
  }, [opening, onOpen, reduce]);
  useEffect(() => {
    if (isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [isOpen]);
  const open = () => {
    if (started.current) return;
    started.current = true;
    setOpening(true);
    onStart();
  };
  return <AnimatePresence>{!isOpen && <motion.div
    key="envelope" initial={{ opacity: 1 }} exit={{ opacity: 0 }}
    transition={{ duration: reduce ? 0.1 : 0.65 }}
    role="dialog" aria-modal="true" aria-label="Open Baby AZ's invitation"
    className="opening-scene fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden p-6 text-center"
  >
    <div className="opening-halo" aria-hidden="true" />
    <p className="text-xs tracking-[0.3em] mb-3">YOU'RE INVITED</p>
    <h1 className="font-royal text-2xl sm:text-4xl max-w-md leading-snug">A little snowflake.<br />A magical celebration.</h1>
    <motion.button type="button" onClick={open} disabled={opening}
      aria-label="Open the envelope" className="envelope-stage focus-visible:outline-4 focus-visible:outline-[#4682B4] rounded-xl"
      animate={opening || reduce ? { y: 0 } : { y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: opening || reduce ? 0 : Infinity }}>
      <span className="envelope-back" aria-hidden="true" />
      <motion.span className="envelope-letter" aria-hidden="true"
        animate={opening ? { y: reduce ? 0 : -125, scale: 1.06 } : { y: 0, scale: 1 }}
        transition={{ delay: reduce ? 0 : 0.65, duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}>
        <span className="text-2xl text-[#4682B4]">❄</span>
        <span className="font-script text-4xl mt-2">Baby AZ</span>
        <span className="text-[10px] tracking-[0.18em] mt-3">1ST BIRTHDAY & CHRISTENING</span>
        <span className="text-xs mt-2">A winter fairytale awaits</span>
      </motion.span>
      <span className="envelope-pocket" aria-hidden="true" />
      <motion.span className="envelope-flap" aria-hidden="true"
        animate={{ rotateX: opening && !reduce ? -180 : 0, zIndex: opening ? 1 : 5 }}
        transition={{ rotateX: { duration: reduce ? 0 : 0.7, delay: 0.12 }, zIndex: { delay: reduce ? 0 : 0.7, duration: 0 } }} />
      <motion.span className="envelope-seal" aria-hidden="true"
        animate={opening ? { scale: 1.4, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}>❄</motion.span>
      {opening && !reduce && Array.from({ length: 12 }, (_, i) => <motion.span key={i}
        className="absolute left-1/2 top-1/2 pointer-events-none text-[#4682B4] z-10" aria-hidden="true"
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={{ opacity: [0, 1, 0], x: Math.cos(i * Math.PI / 6) * 150, y: Math.sin(i * Math.PI / 6) * 140, rotate: 100 }}
        transition={{ duration: 1.2, delay: 0.25 }}>❄</motion.span>)}
    </motion.button>
    <button type="button" onClick={open} disabled={opening}
      className="rounded-2xl bg-[#294867] text-white px-10 py-4 font-royal tracking-widest shadow-lg hover:bg-[#3d658c] focus-visible:outline-4 focus-visible:outline-[#4682B4] disabled:cursor-wait">
      {opening ? 'A LITTLE MAGIC…' : 'OPEN INVITATION'}
    </button>
    <p role="status" className="text-xs mt-4 text-[#294867]/80">{opening ? 'Your invitation is on its way' : 'Tap the envelope to unlock music & your invitation'}</p>
    {opening && <button type="button" onClick={onOpen} className="mt-4 underline text-xs">Skip animation</button>}
  </motion.div>}</AnimatePresence>;
};
