import React, { useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, AlertCircle, Users, Heart, ShieldCheck } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitation';

export const RsvpSection: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [attending, setAttending] = useState<boolean | null>(true);
  const [attendeesCount, setAttendeesCount] = useState<number>(1);
  const [companionNames, setCompanionNames] = useState<string[]>([]);
  const activeCompanions = attending ? Array.from({ length: Math.max(0, attendeesCount - 1) }, (_, i) => companionNames[i] || '') : [];
  const companionPrefix = activeCompanions.length ? 'Accompanying guests:\n' + activeCompanions.map(n => n.trim()).join('\n') + '\n\nWarm wishes:\n' : '';
  const messageLimit = 500 - companionPrefix.length;
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

  const requestId = useRef<string | null>(null);

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

    if (attending && (!Number.isInteger(attendeesCount) || attendeesCount < 1 || attendeesCount > 5)) {
      setError('Please select between 1 and 5 guests.');
      return;
    }
    if (activeCompanions.some(n => n.trim().length < 2 || n.trim().length > 80)) {
      setError('Please enter the full name of each accompanying guest.');
      return;
    }
    if (message.length > messageLimit) {
      setError(`Please shorten your warm wishes to ${messageLimit} characters to leave room for guest names.`);
      return;
    }
    if (isLoading) return;
    setIsLoading(true);
    if (!requestId.current) requestId.current = crypto.randomUUID();

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId: requestId.current,
          guestName: guestName.trim(),
          attending,
          attendeesCount: attending ? attendeesCount : 0,
          message: message.trim(),
          companionNames: activeCompanions.map(n => n.trim()),
          privacyAcknowledged,
          honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.success !== true) {
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
                  setAttending(true);
                  setAttendeesCount(1);
                  setCompanionNames([]);
                  requestId.current = null;
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
                  minLength={2}
                  maxLength={80}
                  value={guestName}
                  onChange={(e) => { setGuestName(e.target.value); requestId.current = null; }}
                  placeholder="e.g. Jeo Ong"
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
                      requestId.current = null;
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
                      requestId.current = null;
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
                      onChange={(e) => { setAttendeesCount(parseInt(e.target.value, 10)); requestId.current = null; }}
                      className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-[#B9E2F5] text-[#294867] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E998AF] transition-all cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
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

              {attending && attendeesCount > 1 && (
                <fieldset className="space-y-3">
                  <legend className="text-xs font-bold uppercase tracking-wider text-[#294867] mb-1.5">Names of Accompanying Guests</legend>
                  <p className="text-xs text-[#52799f]">Please enter the full names of everyone attending with you, including children. Do not include your own name.</p>
                  {activeCompanions.map((name, index) => (
                    <div key={index}>
                      <label htmlFor={`companion-${index}`} className="block text-xs font-semibold text-[#294867] mb-1.5">Guest {index + 2} — Full Name <span className="text-[#E998AF]">*</span></label>
                      <input id={`companion-${index}`} type="text" required minLength={2} maxLength={80} value={name}
                        onChange={e => { setCompanionNames(names => { const next = [...names]; next[index] = e.target.value; return next; }); requestId.current = null; }}
                        placeholder="Full name"
                        className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-[#B9E2F5] text-[#294867] text-sm focus:outline-none focus:ring-2 focus:ring-[#E998AF] placeholder:text-slate-400" />
                    </div>
                  ))}
                </fieldset>
              )}

              {/* Message / Wishes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#294867] mb-1.5">
                  Warm Wishes for Baby AZ (Optional)
                </label>
                <textarea
                  rows={3}
                  maxLength={messageLimit}
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); requestId.current = null; }}
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
                  By submitting, you agree to share your name, accompanying guests’ names, attendance count, and message with Baby AZ’s family for party planning.
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

          {/* Privacy indicator */}
          <div className="mt-6 pt-4 border-t border-[#B9E2F5]/40 flex items-center justify-between text-[11px] text-[#52799f]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Responses visible only to the family</span>
            </div>


          </div>
        </div>

      </div>
    </section>
  );
};
