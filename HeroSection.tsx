import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Crown, Calendar } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitation';

export const HeroSection: React.FC = () => {
  const { baby, eventDate, theme, characterArtwork } = INVITATION_CONFIG;

  return (
    <section className="relative pt-8 pb-16 px-4 overflow-hidden">
      {/* Fairytale Castle Scenic Background with Frosted Scrim */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={theme.castleBackgroundUrl}
          alt="Magical Frozen Winter Palace"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-35 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F9FCFF]/85 via-[#EAF6FF]/90 to-[#F9FCFF]" />
      </div>

      {/* Soft Icy-Blue Magical Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-[#B9E2F5]/35 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center text-center">
        {/* Royal Kicker Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-[#B9E2F5] shadow-xs mb-4 backdrop-blur-xs"
        >
          <Crown className="w-4 h-4 text-[#E998AF]" />
          <span className="font-royal text-[11px] sm:text-xs tracking-[0.2em] font-bold text-[#294867] uppercase">
            {baby.headline}
          </span>
          <Crown className="w-4 h-4 text-[#E998AF]" />
        </motion.div>

        {/* Central Baby AZ Royal Portrait Frame (First photo guests see) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[290px] sm:max-w-[340px] my-3"
        >
          {/* Shimmering crystal aura halo */}
          <div className="absolute -inset-3.5 rounded-[2.5rem] bg-gradient-to-tr from-[#B9E2F5]/60 via-[#F7D5E3]/50 to-[#DDE5EF]/70 blur-md pointer-events-none animate-pulse" />

          {/* Frozen-Inspired Portrait Frame Container */}
          <div className="relative rounded-[2.2rem] p-2 sm:p-2.5 bg-gradient-to-b from-white via-[#EAF6FF] to-[#DDE5EF] border-2 border-[#B9E2F5] shadow-2xl">
            {/* Inner frame with rounded corners preserving Baby AZ's natural sideways pose and blue tutu */}
            <div className="relative aspect-[3/4] w-full rounded-[1.8rem] overflow-hidden bg-slate-100 border border-white shadow-inner group">
              <img
                src={baby.heroPhoto || baby.portraitUrl}
                alt="Baby AZ in royal blue tutu outfit"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
              />

              {/* Gentle crystal vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#294867]/25 via-transparent to-transparent pointer-events-none" />

              {/* Crystal border shimmer highlight */}
              <div className="absolute inset-0 border border-white/40 rounded-[1.8rem] pointer-events-none" />
            </div>

            {/* Sparkle badge on top corner */}
            <div className="absolute -top-2.5 -left-2.5 z-20 bg-white/95 p-2 rounded-full shadow-lg border border-[#B9E2F5] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#E998AF]" />
            </div>

            {/* Snowflake badge on opposite top corner */}
            <div className="absolute -top-2 -right-2 z-20 bg-white/95 w-8 h-8 rounded-full shadow-lg border border-[#B9E2F5] flex items-center justify-center text-xs text-[#4682B4]">
              ❄
            </div>

            {/* Olaf Friend Corner Companion */}
            <div className="absolute -bottom-5 -right-5 z-20 w-24 sm:w-28 drop-shadow-xl animate-float pointer-events-none">
              <img
                src={characterArtwork.olafWaving}
                alt="Olaf Waving"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </motion.div>

        {/* Elegant Reveal of Celebrant Name */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="relative mt-4 mb-1"
        >
          <h1 className="font-royal text-3xl sm:text-5xl font-extrabold tracking-wider text-[#294867] uppercase drop-shadow-sm leading-tight">
            {baby.fullName}
          </h1>
          <div className="font-script text-3xl sm:text-5xl text-[#E998AF] -mt-1 sm:-mt-2">
            "{baby.nickname}"
          </div>
        </motion.div>

        {/* Milestone Subtitle Reveal Underneath */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-[#3d658c] uppercase mb-5"
        >
          <span className="h-px w-5 bg-[#B9E2F5]" />
          <span>{baby.milestone}</span>
          <span className="h-px w-5 bg-[#B9E2F5]" />
        </motion.div>

        {/* Event Date Callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="mb-6 inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl frosted-glass border-2 border-[#B9E2F5] shadow-md"
        >
          <Calendar className="w-4 h-4 text-[#E998AF]" />
          <span className="font-royal text-sm sm:text-base font-bold tracking-wide text-[#294867]">
            {eventDate.displayDate}
          </span>
        </motion.div>

        {/* Heartfelt Welcome Message Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="w-full frosted-glass rounded-3xl p-6 sm:p-8 border border-white/80 shadow-xl relative overflow-hidden text-left"
        >
          <div className="absolute -top-6 -right-6 text-[#EAF6FF] text-8xl font-serif pointer-events-none select-none opacity-40">
            ❄
          </div>

          <p className="font-serif italic text-sm sm:text-base text-[#294867] leading-relaxed relative z-10 text-center">
            "{baby.welcomeMessage}"
          </p>

          <div className="mt-5 pt-4 border-t border-[#B9E2F5]/50 flex flex-col items-center text-center">
            <span className="text-[11px] uppercase tracking-widest text-[#3d658c] font-semibold mb-0.5">
              With Love & Gratitude
            </span>
            <span className="font-script text-2xl sm:text-3xl text-[#E998AF]">
              {baby.parents.signature}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
