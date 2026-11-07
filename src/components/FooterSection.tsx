import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitation';

export const FooterSection: React.FC = () => {
  const { celebrant } = INVITATION_CONFIG;

  return (
    <footer className="pt-12 pb-24 px-4 relative z-10 text-center" id="contact">
      <div className="max-w-xl mx-auto">
        {/* Heartfelt Closing Note */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#E998AF]" />
            <span className="font-royal text-xs uppercase tracking-[0.25em] text-[#4682B4]">
              FAIRYTALE CLOSING
            </span>
            <Sparkles className="w-4 h-4 text-[#E998AF]" />
          </div>

          <h3 className="font-royal text-2xl sm:text-3xl font-bold text-[#294867] mb-2">
            {celebrant.closingMessage}
          </h3>

          <p className="font-script text-3xl sm:text-4xl text-[#E998AF] mt-1">
            {celebrant.closingSubtext}
          </p>
        </div>

        {/* Bottom subtle note */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#52799f]">
          <span>Made with love for</span>
          <Heart className="w-3.5 h-3.5 text-[#E998AF] fill-[#E998AF]" />
          <span className="font-semibold text-[#294867]">Baby Avryl Zaliyah</span>
          <span>· 2026</span>
        </div>
      </div>
    </footer>
  );
};
