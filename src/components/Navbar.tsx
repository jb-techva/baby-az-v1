import React from 'react';
import { Crown } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitation';

export const Navbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full frosted-glass border-b border-[#B9E2F5]/60 px-4 sm:px-8 py-3 transition-all">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-left group focus:outline-none shrink-0"
        >
          <Crown className="w-4 h-4 text-[#E998AF] group-hover:rotate-12 transition-transform" />
          <span className="font-royal text-base sm:text-lg font-extrabold text-[#294867] tracking-wider whitespace-nowrap">
            {INVITATION_CONFIG.celebrant.nickname}
          </span>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-[#3d658c]">
          <button
            onClick={() => scrollTo('venues')}
            className="hover:text-[#294867] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Venues
          </button>
          <button
            onClick={() => scrollTo('schedule')}
            className="hover:text-[#294867] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Timeline
          </button>
          <button
            onClick={() => scrollTo('gallery')}
            className="hover:text-[#294867] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Gallery
          </button>
          <button
            onClick={() => scrollTo('dress-code')}
            className="hover:text-[#294867] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Dress Code
          </button>
          <button
            onClick={() => scrollTo('registry')}
            className="hover:text-[#294867] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Wishlist
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => scrollTo('rsvp')}
            className="py-1.5 px-4 rounded-xl bg-gradient-to-r from-[#294867] to-[#3d658c] text-white text-xs font-bold tracking-wider uppercase shadow-sm hover:shadow hover:border-[#E998AF] border border-[#B9E2F5] transition-all whitespace-nowrap shrink-0 active:scale-95"
          >
            RSVP Now
          </button>
        </div>
      </div>
    </header>
  );
};
