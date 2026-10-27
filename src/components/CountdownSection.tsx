import React, { useEffect, useState } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitation';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hasStarted: boolean;
}

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    hasStarted: false,
  });

  useEffect(() => {
    const targetTime = new Date(INVITATION_CONFIG.eventDate.countdownTargetIso).getTime();

    const calculateTime = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          hasStarted: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        hasStarted: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  const timeCards = [
    { label: 'DAYS', value: formatNumber(timeLeft.days) },
    { label: 'HOURS', value: formatNumber(timeLeft.hours) },
    { label: 'MINUTES', value: formatNumber(timeLeft.minutes) },
    { label: 'SECONDS', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <section className="py-8 px-4 relative z-10">
      <div className="max-w-xl mx-auto">
        <div className="frosted-glass rounded-3xl p-6 sm:p-8 border border-[#B9E2F5]/80 shadow-xl text-center relative overflow-hidden">
          {/* Subtle ice header */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-[#E998AF]" />
            <h2 className="font-royal text-sm sm:text-base font-bold tracking-[0.2em] text-[#294867] uppercase">
              COUNTDOWN TO THE ROYAL CELEBRATION
            </h2>
            <Sparkles className="w-4 h-4 text-[#B9E2F5]" />
          </div>

          <p className="text-xs sm:text-sm text-[#4682B4] mb-6">
            Saturday, December 5, 2026 · 9:00 AM (Philippine Time)
          </p>

          {timeLeft.hasStarted ? (
            <div className="py-4 px-6 rounded-2xl bg-gradient-to-r from-[#EAF6FF] to-[#F7D5E3] border border-[#B9E2F5]">
              <span className="font-royal text-lg font-bold text-[#294867]">
                ✨ The Celebration Has Begun! ✨
              </span>
              <p className="text-sm text-[#3d658c] mt-1">
                Welcome to Baby AZ's 1st Birthday & Christening!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {timeCards.map((card, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/90 border border-[#B9E2F5] shadow-md relative group hover:border-[#E998AF] transition-colors"
                >
                  <span className="font-royal text-2xl sm:text-4xl font-extrabold text-[#294867] tabular-nums tracking-tight">
                    {card.value}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#4682B4] mt-1 uppercase">
                    {card.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
