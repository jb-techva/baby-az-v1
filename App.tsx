import React, { useState, useEffect, useCallback } from 'react';
import { SnowflakeTrail } from './components/SnowflakeTrail';
import { SnowBackground } from './components/SnowBackground';
import { AudioPlayer } from './components/AudioPlayer';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CountdownSection } from './components/CountdownSection';
import { VenuesSection } from './components/VenuesSection';
import { TimelineSection } from './components/TimelineSection';
import { DressCodeSection } from './components/DressCodeSection';
import { GiftRegistrySection } from './components/GiftRegistrySection';
import { GallerySection } from './components/GallerySection';
import { RsvpSection } from './components/RsvpSection';
import { FooterSection } from './components/FooterSection';
import { WishlistPage } from './components/WishlistPage';

export default function App() {
  const isInitialWishlist = typeof window !== 'undefined' && window.location.pathname.startsWith('/wishlist');
  const [currentView, setCurrentView] = useState<'invitation' | 'wishlist'>(
    isInitialWishlist ? 'wishlist' : 'invitation'
  );
  const [isOpened, setIsOpened] = useState(isInitialWishlist);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);

  // Sync with browser navigation
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.startsWith('/wishlist')) {
        setCurrentView('wishlist');
        setIsOpened(true);
      } else {
        setCurrentView('invitation');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenInvitation = useCallback(() => {
    setIsOpened(true);
    window.scrollTo({ top: 0 });
  }, []);

  const navigateToWishlist = () => {
    setCurrentView('wishlist');
    if (typeof window !== 'undefined') {
      window.history.pushState({ view: 'wishlist' }, '', '/wishlist');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToInvitation = () => {
    setCurrentView('invitation');
    if (typeof window !== 'undefined') {
      window.history.pushState({ view: 'invitation' }, '', '/');
      setTimeout(() => {
        const el = document.getElementById('registry');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FCFF] text-[#294867] relative selection:bg-[#B9E2F5] selection:text-[#294867]">
      {/* Falling Snow Canvas */}
      <SnowBackground />
      <SnowflakeTrail />

      {/* Opening Envelope Screen (Fullscreen until user taps "CLICK TO OPEN") */}
      {currentView === 'invitation' && (
        <OpeningEnvelope isOpen={isOpened} onOpen={handleOpenInvitation} onStart={() => setAutoPlayAudio(true)} />
      )}

      {/* Persistent Audio Player (Plays continuous instrumental throughout website) */}
      <AudioPlayer autoPlayTriggered={autoPlayAudio} />

      {currentView === 'wishlist' ? (
        <WishlistPage onBackToInvitation={navigateToInvitation} />
      ) : (
        /* Main Website Content (Visible after opening, or rendered behind for smooth transition) */
        <div inert={!isOpened} aria-hidden={!isOpened} className={`transition-opacity duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
          <Navbar />

          <main className="relative pb-12">
            <HeroSection key={isOpened ? "revealed" : "waiting"} />
            <CountdownSection />
            <VenuesSection />
            <TimelineSection />
            <DressCodeSection />
            <GiftRegistrySection onOpenWishlist={navigateToWishlist} />
            <GallerySection />
            <RsvpSection />
          </main>

          <FooterSection />
        </div>
      )}
    </div>
  );
}
