import React from 'react';
import { Phone, Mail, MessageCircle, Heart, Sparkles } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitation';

export const FooterSection: React.FC = () => {
  const { contacts, celebrant } = INVITATION_CONFIG;

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

        {/* Contact Links Box */}
        {(contacts.phone || contacts.email || contacts.messengerUrl) && (
          <div className="frosted-glass rounded-3xl p-6 border border-[#B9E2F5]/80 shadow-lg mb-8 max-w-md mx-auto">
            <span className="text-xs uppercase tracking-wider font-bold text-[#294867] block mb-4">
              Questions or Wishes? Reach Out to {contacts.organizer}
            </span>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {contacts.phone && (
                <a
                  href={`tel:${contacts.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-[#B9E2F5] text-xs font-semibold text-[#294867] hover:border-[#E998AF] hover:text-[#E998AF] transition-all shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#4682B4]" />
                  <span>{contacts.phone}</span>
                </a>
              )}

              {contacts.messengerUrl && (
                <a
                  href={contacts.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-[#B9E2F5] text-xs font-semibold text-[#294867] hover:border-[#E998AF] hover:text-[#E998AF] transition-all shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#0084FF]" />
                  <span>Send Messenger</span>
                </a>
              )}

              {contacts.email && (
                <a
                  href={`mailto:${contacts.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-[#B9E2F5] text-xs font-semibold text-[#294867] hover:border-[#E998AF] hover:text-[#E998AF] transition-all shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E998AF]" />
                  <span>Email Parents</span>
                </a>
              )}
            </div>
          </div>
        )}

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
