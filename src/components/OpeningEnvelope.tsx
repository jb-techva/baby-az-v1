import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MailOpen, Heart } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitation';

interface OpeningEnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({ onOpen, isOpen }) => {
  const [isOpeningAnimation, setIsOpeningAnimation] = useState(false);

  const handleOpenClick = () => {
    if (isOpeningAnimation) return;
    setIsOpeningAnimation(true);
    // Trigger audio & parent reveal
    onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="opening-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.7, type: 'spring' }}
              className="relative my-2 sm:my-3 flex items-center justify-center cursor-pointer group"
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
            </motion.div>

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
                    {isOpeningAnimation ? "OPENING THE PALACE GATES..." : "CLICK TO OPEN"}
                  </span>
                  <Sparkles className="w-5 h-5 text-[#E998AF] transition-transform group-hover:rotate-12" />
                </div>
              </button>

              {/* 5. Small Helper Text */}
              <div className="flex items-center justify-center gap-1.5 mt-2.5 sm:mt-3 text-xs text-[#294867]/80">
                <Heart className="w-3.5 h-3.5 text-[#E998AF] fill-[#E998AF]" />
                <span>Tap to unlock music & personal invitation</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
