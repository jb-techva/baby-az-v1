import React from 'react';
import { Gift, Sparkles, Heart, ExternalLink, ArrowRight } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitation';

interface GiftRegistrySectionProps {
  onOpenWishlist: () => void;
}

export const GiftRegistrySection: React.FC<GiftRegistrySectionProps> = ({ onOpenWishlist }) => {
  const { wishlist, giftNote } = INVITATION_CONFIG;

  return (
    <section className="py-12 px-4 relative z-10" id="registry">
      <div className="max-w-xl mx-auto">
        {/* Main Frozen-Themed Gift Registry Card */}
        <div className="frosted-glass-pink rounded-3xl p-6 sm:p-9 border-2 border-[#F7D5E3] shadow-2xl text-center relative overflow-hidden">
          {/* Subtle Snowflake & Sparkle Ambient Glows */}
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#B9E2F5]/30 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-[#F7D5E3]/40 rounded-full blur-2xl pointer-events-none" />

          {/* Transparent Anna and Olaf wishlist artwork */}
          <div className="relative flex justify-center mb-4">
            <div className="relative w-36 sm:w-44 select-none animate-float group cursor-pointer" onClick={onOpenWishlist}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#B9E2F5]/40 to-transparent rounded-full blur-xl group-hover:scale-110 transition-transform duration-500" />
              <img
                src="/images/characters/anna-olaf-timeline.png"
                alt="Anna holding a birthday cake beside Olaf with a gift"
                referrerPolicy="no-referrer"
                className="relative z-10 w-full h-auto object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute -top-1 -right-1 z-20 bg-white/95 p-2 rounded-full shadow-md border border-[#F7D5E3] animate-bounce">
                <Gift className="w-4 h-4 text-[#E998AF]" />
              </div>
            </div>
          </div>

          {/* Small Heading */}
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#E998AF] uppercase block mb-1">
            {wishlist.smallHeading}
          </span>

          {/* Main Heading */}
          <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#294867] tracking-wide mb-1 uppercase">
            {wishlist.heading}
          </h2>

          {/* Subtitle */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF6FF] border border-[#B9E2F5] text-xs font-bold text-[#4682B4] tracking-widest uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#E998AF]" />
            <span>{wishlist.subtitle}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#E998AF]" />
          </div>

          {/* Heartfelt Message */}
          <div className="relative my-3 max-w-md mx-auto">
            <p className="font-serif italic text-sm sm:text-base text-[#294867] leading-relaxed">
              "{wishlist.message}"
            </p>

            <span className="font-script text-2xl sm:text-3xl text-[#E998AF] block mt-4">
              {wishlist.signature}
            </span>
          </div>

          {/* Prominent Rounded Pink Gift Registry Button */}
          <div className="mt-8 px-2">
            <button
              type="button"
              onClick={onOpenWishlist}
              className="w-full sm:w-auto min-w-[280px] inline-flex items-center justify-center gap-3 py-4 px-8 rounded-full bg-gradient-to-r from-[#E998AF] via-[#e57d9b] to-[#d76b88] text-white font-bold text-sm sm:text-base tracking-widest uppercase shadow-xl hover:shadow-2xl hover:brightness-105 active:scale-[0.98] transition-all border-2 border-white cursor-pointer group"
            >
              <Gift className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              <span>{wishlist.buttonText}</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Gentle presence note */}
          <div className="mt-6 pt-4 border-t border-[#F7D5E3]/80 flex items-center justify-center gap-2 text-xs text-[#52799f]">
            <Heart className="w-3.5 h-3.5 text-[#E998AF] fill-[#E998AF]" />
            <span>{giftNote.quote}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
