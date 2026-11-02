import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Sparkles, MailOpen, Heart } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitation';

interface OpeningEnvelopeProps {
  onOpen: () => void;
  onStart: () => void;
  isOpen: boolean;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({ onOpen, onStart, isOpen }) => {
  const [isOpeningAnimation, setIsOpeningAnimation] = useState(false);

  const reducedMotion = useReducedMotion();
  const started = useRef(false);
  useEffect(() => {
    if (!isOpeningAnimation) return;
    const timer = window.setTimeout(onOpen, reducedMotion ? 80 : 900);
    return () => window.clearTimeout(timer);
  }, [isOpeningAnimation, onOpen, reducedMotion]);
  useEffect(() => {
    if (isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [isOpen]);

  const handleOpenClick = () => {
    if (started.current) return;
    started.current = true;
    setIsOpeningAnimation(true);
    // Start music during the click; reveal only after the sparkle sequence.
    onStart();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="opening-overlay"
          role="dialog" aria-modal="true" aria-label="Baby AZ Frozen invitation"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: reducedMotion ? 1 : 1.04, y: reducedMotion ? 0 : -20 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#EAF6FF] via-[#F9FCFF] to-[#F7D5E3]/40 p-4 sm:p-6 overflow-hidden select-none"
        >
          {/* Subtle magical glow orbs in the background */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-[#B9E2F5]/35 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-[#F7D5E3]/35 rounded-full blur-3xl pointer-events-none" />

          {/* Clean, Centered Opening Layout */}
          <div className="relative w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center text-center z-10 my-auto">
            {/* 1. Small Kicker & 2. Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mb-4 sm:mb-5"
            >
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#4682B4] uppercase block mb-1.5">
                YOU'RE INVITED
              </span>
              <h1 className="font-royal text-2xl sm:text-3xl md:text-4xl text-[#294867] font-bold tracking-wide leading-tight">
                TO A MAGICAL CELEBRATION
              </h1>
            </motion.div>

            {/* 3. Transparent Olaf Holding the Envelope */}
            <motion.button
              type="button" aria-label="Open Olaf’s invitation" disabled={isOpeningAnimation}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: isOpeningAnimation && !reducedMotion ? 1.08 : 1, opacity: 1, y: isOpeningAnimation && !reducedMotion ? -8 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative my-2 sm:my-3 flex items-center justify-center cursor-pointer group rounded-2xl focus-visible:outline-4 focus-visible:outline-[#4682B4]"
              onClick={handleOpenClick}
            >
              {/* Subtle magical ambient glow directly behind Olaf */}
              <div className="absolute inset-0 bg-[#B9E2F5]/30 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500 pointer-events-none" />

              {/* Exact Transparent Olaf PNG (approx 190–220px on mobile, 220–250px on desktop) */}
              <img
                src={INVITATION_CONFIG.characterArtwork.olafEnvelope}
                alt="Olaf holding Frozen invitation envelope"
                referrerPolicy="no-referrer"
                className="relative z-10 w-[190px] sm:w-[230px] md:w-[245px] h-auto max-h-[46vh] object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105 active:scale-95"
              />

              {/* Sparkle badge around envelope */}
              <div className="absolute top-1/2 -right-2 sm:-right-3 z-20 bg-white/95 p-1.5 sm:p-2 rounded-full shadow-md border border-[#B9E2F5] animate-bounce pointer-events-none">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#E998AF]" />
              </div>
              {isOpeningAnimation && !reducedMotion && Array.from({ length: 10 }, (_, i) => (
                <motion.span key={i} aria-hidden="true"
                  className="absolute left-1/2 top-[55%] z-30 pointer-events-none text-[#4682B4]"
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 0.9, 0], x: Math.cos(i * Math.PI / 5) * 90, y: Math.sin(i * Math.PI / 5) * 85, rotate: 90, scale: [0.5, 1, 0.6] }}
                  transition={{ duration: 0.95, delay: i * 0.02 }}>❄</motion.span>
              ))}
            </motion.button>

            {/* 4. Large "CLICK TO OPEN" Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-full px-4 mt-3 sm:mt-4"
            >
              <button
                onClick={handleOpenClick}
                disabled={isOpeningAnimation}
                className="w-full relative group overflow-hidden py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-[#294867] via-[#3d658c] to-[#294867] text-white font-semibold text-base sm:text-lg tracking-widest shadow-xl border-2 border-[#B9E2F5] transition-all duration-300 hover:shadow-2xl hover:border-[#E998AF] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#B9E2F5]/50 cursor-pointer"
              >
                {/* Shimmer sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                <div className="flex items-center justify-center gap-3">
                  <MailOpen className="w-5 h-5 text-[#B9E2F5] transition-transform group-hover:scale-110" />
                  <span className="font-royal tracking-widest text-[#EAF6FF]">
                    {isOpeningAnimation ? "A LITTLE FROZEN MAGIC…" : "CLICK TO OPEN"}
                  </span>
                  <Sparkles className="w-5 h-5 text-[#E998AF] transition-transform group-hover:rotate-12" />
                </div>
              </button>

              {/* 5. Small Helper Text */}
              <div className="flex items-center justify-center gap-1.5 mt-2.5 sm:mt-3 text-xs text-[#294867]/80">
                <Heart className="w-3.5 h-3.5 text-[#E998AF] fill-[#E998AF]" />
                <span role="status">{isOpeningAnimation ? "Your invitation is on its way…" : "Tap to unlock music & personal invitation"}</span>
              </div>
              {isOpeningAnimation && <button type="button" onClick={onOpen} className="mt-3 text-xs underline text-[#294867]">Skip animation</button>}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
