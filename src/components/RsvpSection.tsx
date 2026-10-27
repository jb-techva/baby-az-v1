import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, AlertCircle, Users, Heart, Download, ShieldCheck } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitation';

export const RsvpSection: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [attending, setAttending] = useState<boolean | null>(true);
  const [attendeesCount, setAttendeesCount] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(true);
  const [honeypot, setHoneypot] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successResponse, setSuccessResponse] = useState<{
    message: string;
    status: 'attending' | 'declined';
    attendeesCount: number;
  } | null>(null);

  // Admin CSV export state
  const [showAdminPinModal, setShowAdminPinModal] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [adminError, setAdminError] = useState<string | null>(null);

  const triggerSnowConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#B9E2F5', '#E998AF', '#F7D5E3', '#ffffff', '#294867'],
      });
    } catch {
      // Ignore if canvas confetti is blocked
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!guestName.trim()) {
      setError('Please provide your name.');
      return;
    }

    if (attending === null) {
      setError('Please let us know if you can attend or not.');
      return;
    }

    if (!privacyAcknowledged) {
      setError('Please acknowledge the privacy notice to proceed.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guestName: guestName.trim(),
          attending,
          attendeesCount: attending ? attendeesCount : 0,
          message: message.trim(),
          privacyAcknowledged,
          honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit RSVP.');
      }

      setSuccessResponse({
        message: data.message,
        status: data.status,
        attendeesCount: data.attendeesCount,
      });

      if (attending) {
        triggerSnowConfetti();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminExport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPin) {
      setAdminError('Please enter admin PIN');
      return;
    }
    // Download directly
    window.location.href = `/api/rsvp/export-csv?pin=${encodeURIComponent(adminPin.trim())}`;
    setShowAdminPinModal(false);
    setAdminPin('');
    setAdminError(null);
  };

  return (
    <section className="py-12 px-4 relative z-10" id="rsvp">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#E998AF] uppercase block mb-1">
            CELEBRATE WITH US
          </span>
          <h2 className="font-royal text-2xl sm:text-3xl font-bold text-[#294867]">
            ROYAL RSVP
          </h2>
          <p className="text-xs sm:text-sm text-[#4682B4] mt-1 font-medium">
            {INVITATION_CONFIG.rsvp.deadlineText}
          </p>
        </div>

        <div className="frosted-glass rounded-3xl p-6 sm:p-8 border-2 border-[#B9E2F5] shadow-2xl relative overflow-hidden">
          {successResponse ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-md animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h3 className="font-royal text-2xl font-bold text-[#294867]">
                {successResponse.status === 'attending'
                  ? 'Your Seat is Reserved!'
                  : 'RSVP Received'}
              </h3>

              <p className="text-sm sm:text-base text-[#3d658c] max-w-md mx-auto leading-relaxed">
                {successResponse.message}
              </p>

              {successResponse.status === 'attending' && (
                <div className="p-4 rounded-2xl bg-[#EAF6FF] border border-[#B9E2F5] max-w-sm mx-auto text-xs text-[#294867] flex items-center justify-center gap-2">
                  <Users className="w-4 h-4 text-[#E998AF]" />
                  <span>
                    Total Reserved Guests: <strong>{successResponse.attendeesCount}</strong>
                  </span>
                </div>
              )}

              <button
                onClick={() => {
                  setSuccessResponse(null);
                  setGuestName('');
                  setMessage('');
                }}
                className="mt-4 px-6 py-2.5 rounded-xl text-xs font-semibold text-[#4682B4] hover:text-[#294867] hover:bg-white/80 transition-colors"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Spam honeypot hidden field */}
              <input
                type="text"
                name="user_nickname"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Guest Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#294867] mb-1.5">
                  Your Full Name <span className="text-[#E998AF]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Maria Santos & Family"
                  className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-[#B9E2F5] text-[#294867] text-sm focus:outline-none focus:ring-2 focus:ring-[#E998AF] focus:border-transparent transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Attendance Choice */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#294867] mb-1.5">
                  Will You Attend? <span className="text-[#E998AF]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setAttending(true);
                      if (attendeesCount === 0) setAttendeesCount(1);
                    }}
                    className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold tracking-wide border-2 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      attending === true
                        ? 'bg-gradient-to-r from-[#294867] to-[#3d658c] text-white border-[#B9E2F5] shadow-md scale-[1.02]'
                        : 'bg-white/70 text-[#294867] border-slate-200 hover:border-[#B9E2F5]'
                    }`}
                  >
                    <span>✨ Joyfully Accept</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAttending(false);
                      setAttendeesCount(0);
                    }}
                    className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold tracking-wide border-2 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      attending === false
                        ? 'bg-[#E998AF] text-white border-[#F7D5E3] shadow-md scale-[1.02]'
                        : 'bg-white/70 text-[#294867] border-slate-200 hover:border-[#F7D5E3]'
                    }`}
                  >
                    <span>Regretfully Decline</span>
                  </button>
                </div>
              </div>

              {/* Number of Attendees (Only shown if attending) */}
              {attending && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#294867] mb-1.5">
                    Total Number of Attendees <span className="text-[#E998AF]">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <select
                      value={attendeesCount}
                      onChange={(e) => setAttendeesCount(parseInt(e.target.value, 10))}
                      className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-[#B9E2F5] text-[#294867] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E998AF] transition-all cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest (Self)' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <span className="text-[11px] text-[#52799f] mt-1 block">
                    Please count both adults and children for catering seat reservations.
                  </span>
                </div>
              )}

              {/* Message / Wishes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#294867] mb-1.5">
                  Warm Wishes for Baby AZ (Optional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a heartfelt message, blessing, or bible verse for our little snow princess..."
                  className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-[#B9E2F5] text-[#294867] text-sm focus:outline-none focus:ring-2 focus:ring-[#E998AF] focus:border-transparent transition-all placeholder:text-slate-400 resize-none"
                />
              </div>

              {/* Privacy Acknowledgement */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={privacyAcknowledged}
                  onChange={(e) => setPrivacyAcknowledged(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#294867] rounded border-slate-300 focus:ring-[#E998AF]"
                />
                <label htmlFor="privacy" className="text-xs text-[#52799f] leading-snug cursor-pointer">
                  {INVITATION_CONFIG.rsvp.disclaimer}
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#294867] via-[#3d658c] to-[#294867] text-white font-bold text-sm sm:text-base tracking-widest uppercase shadow-xl hover:shadow-2xl border-2 border-[#B9E2F5] transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 group cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#B9E2F5] group-hover:translate-x-0.5 transition-transform" />
                    <span>CONFIRM RSVP</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Secure indicator & Parent CSV download access */}
          <div className="mt-6 pt-4 border-t border-[#B9E2F5]/40 flex items-center justify-between text-[11px] text-[#52799f]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Private & Secure RSVP</span>
            </div>

            <button
              type="button"
              onClick={() => setShowAdminPinModal(true)}
              className="text-[#4682B4] hover:text-[#294867] underline flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>Organizer Export</span>
            </button>
          </div>
        </div>

        {/* Organizer PIN Modal for downloading CSV */}
        {showAdminPinModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-[#B9E2F5]">
              <h4 className="font-royal text-lg font-bold text-[#294867] mb-2">
                Download RSVP CSV
              </h4>
              <p className="text-xs text-[#3d658c] mb-4">
                Enter your organizer PIN to download the guest list. Default PIN is <strong>2026</strong>.
              </p>

              <form onSubmit={handleAdminExport} className="space-y-3">
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  placeholder="Enter PIN (e.g. 2026)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#294867]"
                  autoFocus
                />

                {adminError && (
                  <p className="text-xs text-red-600">{adminError}</p>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminPinModal(false);
                      setAdminError(null);
                    }}
                    className="w-1/2 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2 text-xs font-bold text-white bg-[#294867] hover:bg-[#1e364e] rounded-xl shadow"
                  >
                    Download
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
