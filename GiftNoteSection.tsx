import React from 'react';
import { Gift, Heart } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitation';

export const GiftNoteSection: React.FC = () => {
  const { giftNote } = INVITATION_CONFIG;

  return (
    <section className="py-8 px-4 relative z-10" id="gifts">
      <div className="max-w-xl mx-auto">
        <div className="frosted-glass-pink rounded-3xl p-6 sm:p-8 border-2 border-[#F7D5E3] shadow-xl text-center relative overflow-hidden">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-white text-[#E998AF] mb-3 shadow-sm border border-[#F7D5E3]">
            <Gift className="w-6 h-6" />
          </div>

          <h2 className="font-royal text-2xl sm:text-3xl font-bold text-[#294867] mb-3">
            {giftNote.title}
          </h2>

          <div className="relative my-4 py-2">
            <span className="font-script text-3xl sm:text-4xl text-[#E998AF] block mb-1">
              "Your Presence Is Our Blessing"
            </span>
            <p className="font-serif italic text-sm sm:text-base text-[#294867] max-w-md mx-auto leading-relaxed">
              {giftNote.quote}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#F7D5E3] flex items-center justify-center gap-2 text-xs text-[#3d658c]">
            <Heart className="w-3.5 h-3.5 text-[#E998AF] fill-[#E998AF]" />
            <span>{giftNote.subtext}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
