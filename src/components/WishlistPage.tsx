import React, { useState } from 'react';
import { Crown, Sparkles, ArrowLeft, ExternalLink, Heart, Gift, BookOpen, ToyBrick, Shirt, Music, Palette, Info } from 'lucide-react';
import { INVITATION_CONFIG, WishlistItem } from '../config/invitation';

const giftPictures: Record<string, { file: string; alt: string }> = {
  'future-phone': { file: 'iphone-fully-paid', alt: 'iPhone 18 Pro Max reference image supplied by Baby AZ’s family' },
  clothes: { file: 'clothes', alt: 'Illustration of toddler clothes in icy blue, pink, and white' },
  'developmental-toys': { file: 'toys', alt: 'Illustration of stacking rings, blocks, and a shape sorter' },
  books: { file: 'books', alt: 'Illustration of board books, a storybook, and a coloring book' },
  'musical-instruments': { file: 'music', alt: 'Illustration of a toddler xylophone, drum, and shakers' },
  'art-supplies': { file: 'art', alt: 'Illustration of jumbo crayons and washable paints' },
  'future-fund': { file: 'fund', alt: 'Illustration of a piggy bank and coins for Baby AZ’s savings' },
};

interface WishlistPageProps {
  onBackToInvitation: () => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onBackToInvitation }) => {
  const { wishlist, celebrant } = INVITATION_CONFIG;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(wishlist.items.map((i) => i.category)))];

  const filteredItems = selectedCategory === 'all'
    ? wishlist.items
    : wishlist.items.filter((i) => i.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'books':
        return <BookOpen className="w-5 h-5 text-[#4682B4]" />;
      case 'learning & play':
        return <ToyBrick className="w-5 h-5 text-[#E998AF]" />;
      case 'clothes':
        return <Shirt className="w-5 h-5 text-[#3d658c]" />;
      case 'music':
        return <Music className="w-5 h-5 text-[#4682B4]" />;
      case 'arts & creativity':
        return <Palette className="w-5 h-5 text-[#E998AF]" />;
      default:
        return <Gift className="w-5 h-5 text-[#E998AF]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FCFF] text-[#294867] relative pb-20 selection:bg-[#B9E2F5] selection:text-[#294867]">
      {/* Top Header Bar with Sticky Back Button */}
      <header className="sticky top-0 z-30 w-full frosted-glass border-b border-[#B9E2F5]/60 px-4 sm:px-8 py-3.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBackToInvitation}
            className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-white/80 hover:bg-white text-xs font-bold text-[#294867] border border-[#B9E2F5] shadow-xs hover:border-[#E998AF] transition-all cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-[#E998AF]" />
            <span>BACK TO INVITATION</span>
          </button>

          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-[#E998AF]" />
            <span className="font-royal text-sm sm:text-base font-extrabold text-[#294867] tracking-wider">
              {celebrant.nickname}'s Wishlist
            </span>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative pt-10 pb-8 px-4 text-center overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF6FF] border border-[#B9E2F5] shadow-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E998AF]" />
            <span className="font-royal text-xs font-bold tracking-widest text-[#4682B4] uppercase">
              {wishlist.subtitle}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#E998AF]" />
          </div>

          <h1 className="font-royal text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#294867] tracking-wide mb-2 uppercase">
            Baby AZ's Magical Wishlist
          </h1>

          <p className="font-script text-2xl sm:text-3xl text-[#E998AF] mb-4">
            Little treasures for our growing princess
          </p>

          <p className="font-serif italic text-xs sm:text-sm text-[#3d658c] max-w-lg mx-auto leading-relaxed mb-6">
            "{wishlist.message}"
          </p>

          {/* Draft Status Banner */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#EAF6FF]/90 border border-[#B9E2F5] shadow-sm max-w-lg mx-auto flex items-center justify-center gap-2.5 text-xs text-[#294867]">
            <Info className="w-4 h-4 text-[#4682B4] shrink-0" />
            <span>
              <strong>For inspiration only:</strong> Similar items are welcome. Please feel free to choose any brand or store.
            </span>
          </div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <div className="max-w-3xl mx-auto px-4 mb-8">
        <div className="flex items-center gap-2 flex-wrap justify-center pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#294867] to-[#3d658c] text-white shadow-md'
                  : 'bg-white/80 text-[#3d658c] hover:bg-white hover:text-[#294867] border border-[#B9E2F5]/70'
              }`}
            >
              {cat === 'all' ? 'All Gifts' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gift Cards Grid */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filteredItems.map((item: WishlistItem) => {
            const hasValidLink = Boolean(item.shoppingUrl && item.shoppingUrl.trim().length > 0);

            return (
              <div
                key={item.id}
                className="frosted-glass rounded-3xl p-5 sm:p-6 border-2 border-[#B9E2F5] shadow-md hover:shadow-xl hover:border-[#E998AF] transition-all flex flex-col justify-between group"
              >
                <div>
                  {giftPictures[item.id] && (
                    <figure className="mb-4">
                      <img
                        src={`/images/wishlist/${giftPictures[item.id].file}.jpg`}
                        alt={giftPictures[item.id].alt}
                        width={768}
                        height={512}
                        loading="lazy"
                        decoding="async"
                        className={`w-full ${item.id === 'future-phone' ? 'aspect-video object-contain' : 'aspect-[3/2] object-cover'} rounded-2xl border border-[#B9E2F5]/60 bg-[#EAF6FF]`}
                      />
                      <figcaption className="text-[10px] text-[#52799f] text-center mt-1.5">Illustration for inspiration only</figcaption>
                    </figure>
                  )}
                  {/* Category Header with Icon */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#4682B4] bg-[#EAF6FF] px-2.5 py-1 rounded-full border border-[#B9E2F5]/60">
                      {item.category}
                    </span>
                    <div className="p-2 rounded-xl bg-white shadow-xs border border-[#B9E2F5]/40 group-hover:scale-105 transition-transform">
                      {getCategoryIcon(item.category)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-royal text-lg sm:text-xl font-bold text-[#294867] mb-2 leading-snug">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#3d658c] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Specs & Suggested Stores */}
                  <div className="space-y-1.5 mb-5 text-xs text-[#52799f] bg-white/70 p-3 rounded-2xl border border-[#B9E2F5]/40">
                    {item.sizeOrSpecs && (
                      <div className="flex items-start gap-1.5">
                        <span className="font-semibold text-[#294867]">Specs:</span>
                        <span>{item.sizeOrSpecs}</span>
                      </div>
                    )}
                    {item.storeName && (
                      <div className="flex items-start gap-1.5">
                        <span className="font-semibold text-[#294867]">Suggested:</span>
                        <span>{item.storeName}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Shopping Link / Coming Soon Action */}
                <div className="pt-2 border-t border-[#B9E2F5]/40">
                  {hasValidLink ? (
                    <a
                      href={item.shoppingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#294867] to-[#3d658c] text-white font-bold text-xs tracking-wider uppercase shadow-sm hover:shadow hover:brightness-105 transition-all"
                    >
                      <span>VIEW GIFT</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="w-full text-center py-2.5 px-4 rounded-xl bg-[#EAF6FF]/80 text-[#52799f] text-xs font-semibold tracking-wider uppercase border border-dashed border-[#B9E2F5]">
                      {item.id === 'future-fund' ? 'A thoughtful contribution' : 'Similar items are welcome'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Back Button & Note */}
        <div className="mt-12 text-center space-y-4">
          <button
            onClick={onBackToInvitation}
            className="inline-flex items-center gap-3 py-3.5 px-8 rounded-full bg-gradient-to-r from-[#294867] via-[#3d658c] to-[#294867] text-white font-bold text-sm tracking-widest uppercase shadow-xl hover:shadow-2xl hover:border-[#E998AF] border-2 border-[#B9E2F5] transition-all cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-[#B9E2F5]" />
            <span>BACK TO INVITATION</span>
          </button>

          <p className="text-xs text-[#52799f] flex items-start justify-center gap-1.5 max-w-lg mx-auto leading-relaxed">
            <Heart className="w-3.5 h-3.5 text-[#E998AF] fill-[#E998AF]" />
            <span>Your presence, love, and prayers are our greatest gifts. These are simply suggestions—gifts are appreciated but never expected.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
