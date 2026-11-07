import React from 'react';
import { Church, Camera, Car, Cake, Sparkles } from 'lucide-react';
import { INVITATION_CONFIG, ScheduleItem } from '../config/invitation';

export const TimelineSection: React.FC = () => {
  const getIcon = (type: ScheduleItem['iconType']) => {
    switch (type) {
      case 'church':
        return <Church className="w-5 h-5 text-[#4682B4]" />;
      case 'camera':
        return <Camera className="w-5 h-5 text-[#E998AF]" />;
      case 'car':
        return <Car className="w-5 h-5 text-[#3d658c]" />;
      case 'party':
        return <Cake className="w-5 h-5 text-[#E998AF]" />;
    }
  };

  return (
    <section className="py-12 px-4 relative z-10" id="schedule">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#4682B4] uppercase block mb-1">
            ROYAL PROGRAM
          </span>
          <h2 className="font-royal text-2xl sm:text-3xl font-bold text-[#294867]">
            CELEBRATION TIMELINE
          </h2>
          <p className="text-xs sm:text-sm text-[#3d658c] mt-1">
            Saturday, December 5, 2026 · Follow the snowflakes
          </p>
        </div>

        {/* Elsa Decorative Vignette */}
        <div className="flex justify-center mb-8">
          <div className="relative max-w-[200px] sm:max-w-[240px] drop-shadow-xl animate-float">
            <img
              src="/images/characters/elsa-timeline.png"
              alt="Elsa surrounded by an icy blue snowflake frame"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Vertical Snowflake Timeline */}
        <div className="relative pl-8 sm:pl-10 space-y-8 before:absolute before:left-3.5 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#B9E2F5] via-[#E998AF] to-[#B9E2F5] before:border-l before:border-dashed before:border-[#4682B4]">
          {INVITATION_CONFIG.schedule.map((item, index) => (
            <div key={index} className="relative group">
              {/* Snowflake Node */}
              <div className="absolute -left-8 sm:-left-10 top-0.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-[#B9E2F5] group-hover:border-[#E998AF] shadow-md flex items-center justify-center transition-transform group-hover:scale-110 z-10">
                <span className="text-xs sm:text-sm">❄</span>
              </div>

              {/* Event Card */}
              <div className="frosted-glass rounded-2xl p-5 border border-white/80 shadow-md group-hover:shadow-lg transition-all">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF6FF] text-xs font-bold text-[#294867] tracking-wider">
                    {item.time}
                  </span>
                  <div className="p-1.5 rounded-full bg-white/80 shadow-xs">
                    {getIcon(item.iconType)}
                  </div>
                </div>

                <h3 className="font-royal text-base sm:text-lg font-bold text-[#294867]">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#3d658c] mt-1 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-3 pt-2.5 border-t border-[#B9E2F5]/40 flex items-center gap-1.5 text-xs text-[#52799f] font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#E998AF]" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
