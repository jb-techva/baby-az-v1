import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, X, Sparkles } from 'lucide-react';
import { INVITATION_CONFIG, GalleryPhoto } from '../config/invitation';

export const GallerySection: React.FC = () => {
  const { gallery, gallerySection } = INVITATION_CONFIG;
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Touch coordinates for mobile swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : 0));
  }, [gallery.length]);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + gallery.length) % gallery.length : 0));
  }, [gallery.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextLightbox, prevLightbox]);

  // Mobile swipe gestures in Lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped left -> Next
      nextLightbox();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> Prev
      prevLightbox();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activePhoto = gallery[activeIndex] || gallery[0];

  return (
    <section className="py-12 px-4 relative z-10" id="gallery">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF6FF] border border-[#B9E2F5] text-xs font-bold text-[#4682B4] tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E998AF]" />
            <span>FAIRYTALE MEMORIES</span>
            <Sparkles className="w-3.5 h-3.5 text-[#E998AF]" />
          </div>

          <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-[#294867] uppercase tracking-wide">
            {gallerySection?.heading || "Baby AZ's Magical Moments"}
          </h2>

          <p className="font-serif italic text-xs sm:text-sm text-[#3d658c] mt-1.5 max-w-md mx-auto">
            "{gallerySection?.subtitle || 'Little moments, precious memories, and a whole lot of love.'}"
          </p>
        </div>

        {/* Featured Main Interactive Viewer Card */}
        <div className="relative frosted-glass rounded-3xl p-3 sm:p-5 border-2 border-[#B9E2F5] shadow-xl overflow-hidden mb-6">
          {/* Soft pink and icy blue light glow aura behind picture frame */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#B9E2F5]/40 via-[#F7D5E3]/35 to-transparent blur-lg pointer-events-none" />

          {/* Picture Frame with subtle shimmer border */}
          <div className="relative aspect-[3/4] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 border-2 border-white/80 shadow-md group">
            <img
              src={activePhoto.url}
              alt={activePhoto.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
            />

            {/* Subtle bottom gradient scrim for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

            {/* Expand Fullscreen Button */}
            <button
              onClick={() => openLightbox(activeIndex)}
              className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#294867] shadow-lg backdrop-blur-xs transition-transform hover:scale-110 active:scale-95 cursor-pointer z-10"
              aria-label="View Fullscreen"
              title="View Fullscreen"
            >
              <Maximize2 className="w-4 h-4 text-[#294867]" />
            </button>

            {/* Snowflake Decorative Badge */}
            <div className="absolute top-3 left-3 bg-white/85 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-semibold text-[#4682B4] border border-[#B9E2F5] shadow-xs flex items-center gap-1 pointer-events-none">
              <span>❄</span>
              <span className="text-[11px] font-bold text-[#294867]">
                {activeIndex + 1} / {gallery.length}
              </span>
            </div>

            {/* Previous / Next Arrow Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/85 hover:bg-white text-[#294867] shadow-lg backdrop-blur-xs transition-all hover:scale-110 active:scale-95 cursor-pointer z-10"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-5 h-5 text-[#294867]" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/85 hover:bg-white text-[#294867] shadow-lg backdrop-blur-xs transition-all hover:scale-110 active:scale-95 cursor-pointer z-10"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-5 h-5 text-[#294867]" />
            </button>

            {/* Photo Title & Caption */}
            <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
              <span className="font-royal text-sm sm:text-base font-bold drop-shadow-md block">
                {activePhoto.title}
              </span>
              <p className="text-xs text-white/90 drop-shadow line-clamp-1 mt-0.5">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>

        {/* 8-Photo Interactive Staggered Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {gallery.map((photo: GalleryPhoto, idx: number) => {
            const isSelected = activeIndex === idx;

            return (
              <motion.div
                key={photo.id || idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    openLightbox(idx);
                  }}
                  className={`relative w-full aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 group cursor-pointer focus:outline-none ${
                    isSelected
                      ? 'border-[#E998AF] ring-2 ring-[#B9E2F5] scale-102 shadow-lg'
                      : 'border-white/80 hover:border-[#B9E2F5] opacity-85 hover:opacity-100 shadow-sm'
                  }`}
                  aria-label={`View photo ${idx + 1}: ${photo.title}`}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Corner Snowflake Sparkle */}
                  <span className="absolute bottom-1 right-1 text-[10px] text-white drop-shadow opacity-75 group-hover:opacity-100">
                    ❄
                  </span>

                  {/* Subtle hover shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none"
              onClick={closeLightbox}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Soft icy-blue ambient glow in background */}
              <div className="absolute w-[500px] h-[500px] bg-[#B9E2F5]/15 rounded-full blur-3xl pointer-events-none" />

              <div
                className="relative max-w-2xl w-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top Action Bar */}
                <div className="w-full flex items-center justify-between text-white/90 mb-3 px-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B9E2F5]">
                    <span>❄</span>
                    <span>
                      Photo {lightboxIndex + 1} of {gallery.length}
                    </span>
                  </div>

                  {/* Obvious Close Button */}
                  <button
                    onClick={closeLightbox}
                    className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all cursor-pointer active:scale-95 border border-white/30"
                    aria-label="Close photo viewer"
                  >
                    <X className="w-4 h-4" />
                    <span>Close</span>
                  </button>
                </div>

                {/* Natural Aspect Ratio Photo Container (No cropping or distortion) */}
                <div className="relative max-h-[75vh] w-full flex items-center justify-center">
                  <img
                    src={gallery[lightboxIndex].url}
                    alt={gallery[lightboxIndex].title}
                    referrerPolicy="no-referrer"
                    className="max-h-[75vh] max-w-full w-auto h-auto object-contain rounded-2xl shadow-2xl border-2 border-[#B9E2F5]/40"
                  />

                  {/* Desktop Previous Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevLightbox();
                    }}
                    className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/85 text-white transition-all cursor-pointer border border-white/20 hover:scale-105"
                    aria-label="Previous Photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  {/* Desktop Next Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextLightbox();
                    }}
                    className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/85 text-white transition-all cursor-pointer border border-white/20 hover:scale-105"
                    aria-label="Next Photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Lightbox Caption & Details */}
                <div className="mt-3.5 text-center text-white px-4 max-w-md">
                  <h3 className="font-royal text-base sm:text-lg font-bold text-[#EAF6FF]">
                    {gallery[lightboxIndex].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B9E2F5] mt-1 font-serif italic">
                    {gallery[lightboxIndex].caption}
                  </p>
                  <span className="text-[11px] text-white/50 block mt-2">
                    Swipe left/right or use keyboard arrows to browse
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
