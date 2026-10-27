import React from 'react';
import { MapPin, Navigation, Clock, Church, PartyPopper, ExternalLink, Calendar } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitation';

export const VenuesSection: React.FC = () => {
  const { christening, birthday } = INVITATION_CONFIG.venues;

  return (
    <section className="py-12 px-4 relative z-10" id="venues">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#4682B4] uppercase block mb-1">
            WHERE & WHEN
          </span>
          <h2 className="font-royal text-2xl sm:text-3xl font-bold text-[#294867]">
            CONFIRMED EVENT VENUES
          </h2>
          <p className="text-xs sm:text-sm text-[#3d658c] mt-1">
            Two blessed celebrations in Bacoor, Cavite, Philippines
          </p>
        </div>

        <div className="space-y-8">
          {/* Card 1: Christening (Icy Blue & Silver with Actual Church Photo) */}
          <div className="frosted-glass rounded-3xl overflow-hidden border-2 border-[#B9E2F5] shadow-xl transition-all duration-300 hover:shadow-2xl">
            {/* Church Photo Container with Subtle Icy-Blue & Silver Decorative Border */}
            <div className="p-3 sm:p-3.5 bg-gradient-to-b from-[#EAF6FF] to-white/60">
              <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full rounded-2xl overflow-hidden bg-slate-100 border-2 border-[#B9E2F5]/70 shadow-inner group">
                <img
                  src={christening.photoUrl}
                  alt={christening.imageAlt || christening.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
                />

                {/* Subtle top scrim preserving archway signage legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

                {/* Sacrament Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#B9E2F5] flex items-center gap-1.5 shadow-md">
                  <Church className="w-3.5 h-3.5 text-[#4682B4]" />
                  <span className="text-[11px] font-royal font-bold text-[#294867] tracking-wider uppercase">
                    {christening.title}
                  </span>
                </div>
              </div>
            </div>

            {/* Venue Details */}
            <div className="p-6 sm:p-8 pt-4">
              <span className="text-xs uppercase tracking-widest text-[#4682B4] font-bold block mb-1">
                {christening.title}
              </span>
              <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#294867] mb-1">
                {christening.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#52799f] mb-4">
                {christening.branch}, Bacoor City, Cavite
              </p>

              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-3 text-sm text-[#294867]">
                  <Calendar className="w-4 h-4 text-[#4682B4] shrink-0" />
                  <span className="font-semibold">{christening.date}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-[#294867]">
                  <Clock className="w-4 h-4 text-[#4682B4] shrink-0" />
                  <span className="font-bold text-[#294867]">{christening.time}</span>
                </div>

                <div className="flex items-start gap-3 text-sm text-[#3d658c]">
                  <MapPin className="w-4 h-4 text-[#4682B4] shrink-0 mt-0.5" />
                  <span>{christening.address}</span>
                </div>

                <p className="text-xs text-[#52799f] bg-[#EAF6FF]/70 p-3 rounded-xl border border-[#B9E2F5]/50">
                  {christening.details}
                </p>
              </div>

              {/* Get Directions Button */}
              <a
                href={christening.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#294867] to-[#3d658c] text-white font-semibold text-sm tracking-wider uppercase shadow-md hover:shadow-lg hover:border-[#E998AF] transition-all active:scale-[0.98] group"
              >
                <Navigation className="w-4 h-4 text-[#B9E2F5] group-hover:rotate-12 transition-transform" />
                <span>GET DIRECTIONS</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Card 2: Birthday Party (Fairytale Pink & Frozen Accents with Actual Jollibee Photo) */}
          <div className="frosted-glass-pink rounded-3xl overflow-hidden border-2 border-[#F7D5E3] shadow-xl transition-all duration-300 hover:shadow-2xl">
            {/* Jollibee Photo Container with Consistent Frame and Subtle Pink Border */}
            <div className="p-3 sm:p-3.5 bg-gradient-to-b from-[#F7D5E3]/40 to-white/60">
              <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full rounded-2xl overflow-hidden bg-slate-100 border-2 border-[#F7D5E3]/80 shadow-inner group">
                <img
                  src={birthday.photoUrl}
                  alt={birthday.imageAlt || birthday.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

                {/* Fairytale Land Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#F7D5E3] flex items-center gap-1.5 shadow-md">
                  <PartyPopper className="w-3.5 h-3.5 text-[#E998AF]" />
                  <span className="text-[11px] font-royal font-bold text-[#E998AF] tracking-wider uppercase">
                    {birthday.themeName}
                  </span>
                </div>
              </div>
            </div>

            {/* Venue Details */}
            <div className="p-6 sm:p-8 pt-4">
              <span className="text-xs uppercase tracking-widest text-[#E998AF] font-bold block mb-1">
                {birthday.title}
              </span>
              <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#294867] mb-1">
                {birthday.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#E998AF] mb-4">
                Official party theme: {birthday.partyTheme}
              </p>

              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-3 text-sm text-[#294867]">
                  <Calendar className="w-4 h-4 text-[#E998AF] shrink-0" />
                  <span className="font-semibold">{birthday.date}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-[#294867]">
                  <Clock className="w-4 h-4 text-[#E998AF] shrink-0" />
                  <span className="font-bold text-[#294867]">{birthday.time}</span>
                </div>

                <div className="flex items-start gap-3 text-sm text-[#3d658c]">
                  <MapPin className="w-4 h-4 text-[#E998AF] shrink-0 mt-0.5" />
                  <span>{birthday.address}</span>
                </div>

                <p className="text-xs text-[#3d658c] bg-[#F7D5E3]/40 p-3 rounded-xl border border-[#F7D5E3]/60">
                  {birthday.details}
                </p>
              </div>

              {/* Get Directions Button */}
              <a
                href={birthday.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#E998AF] via-[#e57d9b] to-[#d76b88] text-white font-semibold text-sm tracking-wider uppercase shadow-md hover:shadow-lg transition-all active:scale-[0.98] group"
              >
                <Navigation className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                <span>GET DIRECTIONS</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
