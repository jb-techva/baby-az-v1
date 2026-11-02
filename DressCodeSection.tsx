import React, { useState } from 'react';
import { Sparkles, Shirt, Info } from 'lucide-react';
import { INVITATION_CONFIG } from '../config/invitation';

export const DressCodeSection: React.FC = () => {
  const { dressCode } = INVITATION_CONFIG;
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  return (
    <section className="py-10 px-4 relative z-10" id="dress-code">
      <div className="max-w-xl mx-auto">
        <div className="frosted-glass rounded-3xl p-6 sm:p-8 border border-[#B9E2F5]/80 shadow-xl text-center relative overflow-hidden">
          {/* Header */}
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#EAF6FF] text-[#4682B4] mb-3 shadow-inner">
            <Shirt className="w-6 h-6 text-[#E998AF]" />
          </div>

          <h2 className="font-royal text-2xl sm:text-3xl font-bold text-[#294867] mb-2">
            {dressCode.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#3d658c] max-w-md mx-auto mb-6">
            {dressCode.description}
          </p>

          {/* Color Palette Swatches */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
            {dressCode.colors.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedColor(selectedColor === c.name ? null : c.name)}
                className="flex flex-col items-center gap-1.5 focus:outline-none group cursor-pointer"
                title={`${c.name} - Tap to see suggestion`}
              >
                <div
                  className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full shadow-md transition-all duration-300 group-hover:scale-110 flex items-center justify-center ${
                    selectedColor === c.name ? 'ring-3 ring-[#294867] ring-offset-2 scale-110' : ''
                  }`}
                  style={{
                    backgroundColor: c.hex,
                    border: `2px solid ${c.border}`,
                  }}
                >
                  {selectedColor === c.name && (
                    <Sparkles className="w-4 h-4 text-[#294867]" />
                  )}
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-[#294867] tracking-tight">
                  {c.name}
                </span>
              </button>
            ))}
          </div>

          {/* Clear note that these are suggestions */}
          <div className="flex items-center justify-center gap-2 text-xs text-[#52799f] bg-white/70 py-2.5 px-4 rounded-xl border border-[#B9E2F5]/40 max-w-md mx-auto">
            <Info className="w-4 h-4 text-[#E998AF] shrink-0" />
            <span>{dressCode.note}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
