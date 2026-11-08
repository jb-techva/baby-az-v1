/**
 * Baby AZ's Magical Frozen 1st Birthday & Christening Central Configuration
 * All text, images, dates, locations, and settings are centrally managed here.
 */

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  location: string;
  iconType: 'church' | 'camera' | 'car' | 'party';
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  category: string;
  description: string;
  sizeOrSpecs?: string;
  price?: string;
  storeName?: string;
  shoppingUrl?: string;
  iconEmoji?: string;
}

// Baby AZ gallery in the requested photo order
export const BABY_GALLERY_PHOTOS = [
  "/images/gallery/baby-az-g4.jpg",
  "/images/gallery/baby-az-snow-white.jpg",
  "/images/gallery/baby-az-g7.jpg",
  "/images/gallery/baby-az-blue-blooms.jpg",
  "/images/gallery/baby-az-unicorn.jpg",
  "/images/gallery/baby-az-g2.jpg",
  "/images/gallery/baby-az-sunglasses-swim.jpg",
  "/images/gallery/baby-az-g5.jpg",
  "/images/gallery/baby-az-engineer.jpg",
  "/images/gallery/baby-az-g6.jpg",
  "/images/gallery/baby-az-g9-updated.jpg",
  "/images/gallery/baby-az-g10.jpg"
];

export const INVITATION_CONFIG = {
  baby: {
    fullName: "Avryl Zaliyah",
    nickname: "Baby AZ",
    heroPhoto: "/images/baby-az-hero-g8.jpg",
    portraitUrl: "/images/baby-az-hero-g8.jpg",
    galleryPhotos: BABY_GALLERY_PHOTOS,
    milestone: "1st Birthday & Christening",
    headline: "A LITTLE SNOW PRINCESS TURNS ONE",
    birthdateSubtitle: "One Year of Magical Smiles & Pure Joy",
    parents: {
      mommy: "Mommy Chaye",
      daddy: "Daddy Jerome",
      signature: "Mommy Chaye & Daddy Jerome",
    },
    welcomeMessage:
      "Our little snow princess is turning ONE! With hearts full of love and gratitude, we are also celebrating the beautiful blessing of her Christening. Join us for a magical day of love, laughter, and unforgettable memories.",
    closingMessage: "Thank You for Being Part of Our Story",
    closingSubtext: "With love, Baby AZ & Family.",
  },

  // Alias for backward compatibility
  get celebrant() {
    return this.baby;
  },

  eventDate: {
    displayDate: "Saturday, December 5, 2026",
    dayOfWeek: "Saturday",
    fullDateString: "December 5, 2026",
    // Countdown target in Asia/Manila (UTC+8)
    countdownTargetIso: "2026-12-05T09:30:00+08:00",
  },

  theme: {
    colors: {
      snowWhite: "#F9FCFF",
      iceBlue: "#EAF6FF",
      crystalBlue: "#B9E2F5",
      silver: "#DDE5EF",
      blushPink: "#F7D5E3",
      fairytalePink: "#E998AF",
      deepBlue: "#294867",
    },
    castleBackgroundUrl: "/src/assets/images/frozen_castle_fairytale_bg_1792606609330.jpg",
  },

  characterArtwork: {
    olafEnvelope: "/images/characters/olaf-envelope.png",
    olafGift: "/images/characters/olaf-gift.png",
    olafWaving: "/assets/aistudio/Olaf_Hi_b2647508.png",
    elsaMusic: "/assets/aistudio/Elsa_9319f7d3.png",
    annaCake: "/assets/aistudio/Anna_bb8e4e14.png",
  },

  music: {
    audioPath: "/audio/baby-az-music.mp3",
    fallbackAudioPath: "/assets/aistudio/Do_You_Want_To_Build_A_Snowman_Karaoke_Instrumental_Frozen_3c6ce7f4.mp3",
    title: "Do You Want to Build a Snowman?",
    subtitle: "Magical Instrumental",
    defaultVolume: 0.3,
    loop: true,
  },

  venues: {
    christening: {
      title: "The Sacred Blessing",
      churchName: "Our Lady Queen of Peace Parish",
      name: "Our Lady Queen of Peace Parish",
      branch: "Queen's Row West",
      date: "December 5, 2026",
      time: "9:30 AM – 11:00 AM",
      address: "Queen's Row West, Bacoor City, Cavite",
      mapUrl: "https://maps.app.goo.gl/JfL1mQD5CjAhroPD8",
      mapsUrl: "https://maps.app.goo.gl/JfL1mQD5CjAhroPD8",
      photoUrl: "/images/venues/church-queen.jpg",
      image: "/images/venues/church-queen.jpg",
      imageAlt: "Actual photograph of Our Lady Queen of Peace Parish",
      badge: "Holy Sacrament",
      accent: "ice-blue",
      details: "Please arrive 15 minutes before 9:30 AM for registration and seating of sponsors and beloved guests.",
    },
    birthday: {
      title: "Baby AZ's Royal Birthday Celebration",
      venueName: "Jollibee Molino Bayanan",
      name: "Jollibee Molino Bayanan",
      branch: "Molino Bayanan",
      partyTheme: "Jollibee Fairytale Land",
      themeName: "Jollibee Fairytale Land",
      date: "December 5, 2026",
      time: "12:30 PM – 3:30 PM",
      address: "409 Molino Road, Bacoor, Cavite, Philippines",
      mapUrl: "https://maps.app.goo.gl/8AcWYJXASrsZs2eJ9",
      mapsUrl: "https://maps.app.goo.gl/8AcWYJXASrsZs2eJ9",
      photoUrl: "/images/venues/jollibee-bayanan.jpg",
      image: "/images/venues/jollibee-bayanan.jpg",
      imageAlt: "Actual photograph of Jollibee Molino Bayanan",
      badge: "Fairytale Party",
      accent: "fairytale-pink",
      details: "Join us for delightful games, festive Jollibee meals, royal mascot surprises, and sweet birthday cake!",
    },
  },

  schedule: [
    {
      time: "9:30 AM – 11:00 AM",
      title: "Christening Ceremony",
      description: "Our Lady Queen of Peace Parish",
      location: "Our Lady Queen of Peace Parish",
      iconType: "church",
    },
    {
      time: "11:00 AM – 12:00 PM",
      title: "Family & Friends Picture Taking",
      description: "At the church after the Christening",
      location: "Church Altar & Grounds",
      iconType: "camera",
    },
    {
      time: "12:00 PM – 12:30 PM",
      title: "Travel to Birthday Venue",
      description: "Transfer to Jollibee Molino Bayanan",
      location: "Transfer to Jollibee Molino Bayanan",
      iconType: "car",
    },
    {
      time: "12:30 PM – 3:30 PM",
      title: "Baby AZ's Royal Birthday Party",
      description: "Jollibee Fairytale Land",
      location: "Jollibee Fairytale Land, Molino Bayanan",
      iconType: "party",
    },
  ] as ScheduleItem[],

  gallerySection: {
    heading: "Baby AZ's Magical Moments",
    subtitle: "Little moments, precious memories, and a whole lot of love.",
  },

  gallery: [
    {
        "id": "photo-g4",
        "url": "/images/gallery/baby-az-g4.jpg",
        "title": "Storytime Princess",
        "caption": "Our little princess exploring her colorful storybook"
    },
    {
        "id": "photo-snow-white",
        "url": "/images/gallery/baby-az-snow-white.jpg",
        "title": "Little Snow White",
        "caption": "Baby AZ in her Snow White outfit on a snowy blue blanket"
    },
    {
        "id": "photo-g7",
        "url": "/images/gallery/baby-az-g7.jpg",
        "title": "Precious Little Smile",
        "caption": "A sweet close-up of Baby AZ wrapped in white"
    },
    {
        "id": "photo-blue-blooms",
        "url": "/images/gallery/baby-az-blue-blooms.jpg",
        "title": "Little Blue Blossom",
        "caption": "Baby AZ in her blue floral outfit against a pink snowflake backdrop"
    },
    {
        "id": "photo-unicorn",
        "url": "/images/gallery/baby-az-unicorn.jpg",
        "title": "Little Unicorn",
        "caption": "Baby AZ in her cozy unicorn costume in a snowy blue wonderland"
    },
    {
        "id": "photo-g2",
        "url": "/images/gallery/baby-az-g2.jpg",
        "title": "Winter Sparkle Style",
        "caption": "Baby AZ wearing blue sunglasses and her snowflake dress"
    },
    {
        "id": "photo-sunglasses-swim",
        "url": "/images/gallery/baby-az-sunglasses-swim.jpg",
        "title": "Cool Little Snow Princess",
        "caption": "Baby AZ in her blue swimsuit and sunglasses beneath snowy sparkles"
    },
    {
        "id": "photo-g5",
        "url": "/images/gallery/baby-az-g5.jpg",
        "title": "Royal Giggles",
        "caption": "Happy smiles in her high chair and blue princess dress"
    },
    {
        "id": "photo-engineer",
        "url": "/images/gallery/baby-az-engineer.jpg",
        "title": "Little Engineer",
        "caption": "Baby AZ in her yellow engineer outfit against a snowy blue background"
    },
    {
        "id": "photo-g6",
        "url": "/images/gallery/baby-az-g6.jpg",
        "title": "Little Attorney",
        "caption": "A joyful smile beneath an oversized graduation cap"
    },
    {
        "id": "photo-g9",
        "url": "/images/gallery/baby-az-g9-updated.jpg",
        "title": "Fairy Wand Wishes",
        "caption": "Baby AZ with her pink bag, blue wings, and fairy wand"
    },
    {
        "id": "photo-g10",
        "url": "/images/gallery/baby-az-g10.jpg",
        "title": "Purple Fairy Magic",
        "caption": "Baby AZ in her purple fairy dress and glowing wings"
    }
] as GalleryPhoto[],

  wishlist: {
    enabled: true,
    smallHeading: "A LITTLE SOMETHING FOR OUR PRINCESS",
    heading: "Baby AZ's Little Wishlist",
    subtitle: "GIFT REGISTRY",
    message:
      "Your presence and prayers are the greatest gifts of all. " +
      "But if you'd like to surprise our little princess with " +
      "something special, we've prepared a little wishlist " +
      "of things Baby AZ would love and use as she grows.",
    signature: "With love, Mommy Chaye & Daddy Jerome",
    buttonText: "VIEW BABY AZ'S WISHLIST",
    pageUrl: "/wishlist",
    status: "ready",
    characterImage: "/images/characters/olaf-gift.png",
    items: [
      {
            "id": "clothes",
            "name": "Clothes · 18–24 Months",
            "category": "Clothes",
            "description": "Comfy outfits for our growing little princess! Clothes in sizes 18–24 months would be lovely for her everyday adventures.",
            "sizeOrSpecs": "18–24 months",
            "iconEmoji": "👗"
      },
      {
            "id": "developmental-toys",
            "name": "Developmental Toys · Ages 12 Months+",
            "category": "Learning & Play",
            "description": "Playful gifts that encourage learning and discovery, such as stacking toys, shape sorters, blocks, and simple puzzles.",
            "sizeOrSpecs": "Age-rated 12 months+; toddler-safe pieces",
            "iconEmoji": "🧩"
      },
      {
            "id": "books",
            "name": "Books",
            "category": "Books",
            "description": "Board books, storybooks, and toddler-friendly coloring books to fill her little world with stories, colors, and imagination.",
            "sizeOrSpecs": "Sturdy pages and colorful illustrations",
            "iconEmoji": "📚"
      },
      {
            "id": "musical-instruments",
            "name": "Musical Instruments for Toddlers",
            "category": "Music",
            "description": "Little instruments for little hands! Toddler-friendly drums, shakers, or xylophones for exploring sounds and enjoying music.",
            "sizeOrSpecs": "Choose instruments age-rated for toddlers",
            "iconEmoji": "🎵"
      },
      {
            "id": "art-supplies",
            "name": "Art Supplies for Toddlers",
            "category": "Arts & Creativity",
            "description": "Washable, non-toxic, age-appropriate art supplies for her first colorful creations—with a little help from Mommy and Daddy.",
            "sizeOrSpecs": "Washable, non-toxic, and age-appropriate",
            "iconEmoji": "🎨"
      },
      {
            "id": "future-fund",
            "name": "A Gift for AZ’s Future Fund",
            "category": "Future Fund",
            "description": "If you prefer, a cash contribution would be warmly appreciated. We’ll deposit it into AZ’s bank account for her savings and future needs.",
            "sizeOrSpecs": "Any amount, given with love",
            "iconEmoji": "💝"
      }
] as WishlistItem[],
  },

  dressCode: {
    title: "Dress for a Winter Fairytale",
    description: "We invite you to celebrate in royal fairytale style or comfy smart-casual attire. Suggested colors:",
    colors: [
      { name: "Ice Blue", hex: "#B9E2F5", border: "#7bc3eb" },
      { name: "Snow White", hex: "#F9FCFF", border: "#DDE5EF" },
      { name: "Light Gray", hex: "#DDE5EF", border: "#9fb0c6" },
      { name: "Blush Pink", hex: "#F7D5E3", border: "#e8a4be" },
      { name: "Fairytale Pink", hex: "#E998AF", border: "#d76b88" },
    ],
    note: "These colors are completely optional suggestions — your comfortable presence is what matters most!",
  },

  giftNote: {
    title: "Your Presence Is the Greatest Gift",
    quote: "Your love, prayers, and presence mean the world to our family. Gifts are appreciated but never expected.",
    subtext: "If you wish to honor Baby AZ with a token of love, a monetary gift toward her future savings or a small toy/book from her wishlist is warmly received.",
  },

  contacts: {
    organizer: "Mommy Chaye & Daddy Jerome",
    phone: "+63 917 123 4567",
    email: "jeromebuere.techva@gmail.com",
    messengerUrl: "https://m.me/chaye.jerome",
  },

  rsvp: {
    deadlineText: "Please RSVP by November 20, 2026",
    deadlineDate: "November 20, 2026",
    maxAttendeesPerSubmission: 5,
    disclaimer: "By submitting, you agree to share your name and attendance count with Baby AZ's family for party catering purposes.",
  },
};
