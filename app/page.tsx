'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Twitter, 
  Send, 
  Copy, 
  Check, 
  ExternalLink, 
  ChevronDown, 
  Rocket, 
  Users, 
  Award, 
  TrendingUp, 
  Coins, 
  MessageSquare, 
  Share2, 
  Zap, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Compass, 
  Heart,
  ChevronRight,
  Info
} from 'lucide-react';

// Import generated beach and rocket mascots
import beachMascot from '@/src/assets/images/justcoin_mascot_beach_1779528292504.png';
import rocketMascot from '@/src/assets/images/justcoin_mascot_rocket_1779528312943.png';

// Contract Address
const CONTRACT_ADDRESS = "CQDfbCK17ExoXA66nLS2XFrtwPVDhQJDdFRWErjx3Zba";

// Target roadmap details
const MILESTONES = [
  {
    target: "$1M MC",
    title: "🎯 Solid Foundation",
    description: "Build a rock-solid community base, roll out grassroots marketing campaigns, and grow organic holders globally.",
    status: "active",
    rewards: ["Solid Community Base", "Meme Campaigns", "Organic Holders Spike"],
    color: "bg-red-100"
  },
  {
    target: "$5M MC",
    title: "🤝 Major Partnerships & CEX",
    description: "Form alliances with prominent web3 communities and secure token listings on major prominent exchanges.",
    status: "pending",
    rewards: ["MEXC Exchange Listing", "WEEX Listing", "KuCoin Exchange Target"],
    color: "bg-orange-100"
  },
  {
    target: "$10M MC",
    title: "🔥 Strategic Stakeholders",
    description: "Collaborations with major web3 key opinion leaders (KOLs) and high-profile strategic venture contributors.",
    status: "pending",
    rewards: ["2+ Tier-1 KOL Partnerships", "Strategic Backer Round", "Viral Global Events"],
    color: "bg-yellow-100"
  },
  {
    target: "$20M MC",
    title: "🌍 Tier-1 Expansion",
    description: "Launch massive international marketing operations and pursue elite trading houses.",
    status: "pending",
    rewards: ["Bybit Integration", "Bitget Listing", "OKX Target Approval"],
    color: "bg-purple-100"
  },
  {
    target: "$100M MC",
    title: "🚀 Legendary Status",
    description: "Enter the stratosphere of global meme cultures. Achieving permanent recognition beyond traditional crypto borders.",
    status: "pending",
    rewards: ["Binance Exchange Listing", "Coinbase US Spot Listing", "Global Brand Partnerships", "100k+ Active Holders"],
    color: "bg-blue-100"
  }
];

// Meme quotes for the soundboard/interactive character
const MASCOT_QUOTES = [
  "CTO power is UNMATCHED! We are not going anywhere! 🚀",
  "The original team stepped away, so we built a skyscraper! 🔥",
  "Every dip is just a discounted pass to organic glory! 🪙",
  "Shiba is proof: community creates history. We are next! 🤝",
  "Who needs abandoned leadership? We have the PEOPLE! 🛡️",
  "Send this and raid! Clean up the timeline! 📣",
  "Billion MC is not a dream. It's a matter of TIME! 🎯",
];

// Raid tweets template database
const RAID_TWEETS = [
  "Original devs left, but the community built a fortress. $JUSTCOIN is the ultimate CTO. We are not stopping. 🚀 @JustCoinCTO #JustCoin",
  "Bigger than hype. Bigger than trends. Bigger than one team. Shiba Inu did it, and now $JUSTCOIN is doing it. Join the revolution! 🔥 🪙",
  "Moments like this are where legends are born. Real holders refuse to quit. We build together. $JUSTCOIN is rising from the dip! 💪 @JustCoinCTO",
  "No admin? No problem. The community took over. $JUSTCOIN is 100% decentralized, 100% powered by people. See you at a billion! 🚀 💎",
];

// TG Raid Copypasta
const TELEGRAM_SHILLS = [
  "🚀 $JUSTCOIN CTO is cooking! Deviation is 0, conviction is 100. Grab a bag and let's raid the timeline together! https://t.me/JustCoinCTO",
  "🔥 We are rebuilding stronger than ever. The team left, the people stepped up. This is a real Community Takeover. $JUSTCOIN to infinity!",
  "💎 Diamonds are forged in the dips. $JUSTCOIN CTO is ready to write history. Support our movement, share memes, and build the dream!",
];

export default function Home() {
  // States
  const [copiedAddr, setCopiedAddr] = useState(false);
  const [activeMascotQuote, setActiveMascotQuote] = useState(MASCOT_QUOTES[0]);
  const [simulatedMc, setSimulatedMc] = useState(1); // 1M initially
  const [customTweet, setCustomTweet] = useState(RAID_TWEETS[0]);
  const [customShill, setCustomShill] = useState(TELEGRAM_SHILLS[0]);
  const [chatMessages, setChatMessages] = useState<Array<{user: string; msg: string; time: string}>>([
    { user: "SolanaSlayer", msg: "the chart looks prime for accumulation! CTO is massive 💎", time: "09:21" },
    { user: "MemeKing", msg: "Just swept 10 SOL this dip page looks so premium! 🔥", time: "09:22" },
    { user: "JustHodler", msg: "MEXC target is closer than we think, raid X now!", time: "09:23" },
    { user: "CryptoGirl_99", msg: "love the beach mascot! super clean aesthetic. we building long term", time: "09:24" },
  ]);
  const [newChatMsg, setNewChatMsg] = useState('');

  // Ref for the scrollable container of mock chat
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Sound soundboard visual effect timer
  const [audioPulse, setAudioPulse] = useState(false);

  // Copy contract helper
  const handleCopyContract = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopiedAddr(true);
    setTimeout(() => setCopiedAddr(false), 2000);
  };

  // Change active quote randomly
  const handleMascotDialogue = () => {
    setAudioPulse(true);
    setTimeout(() => setAudioPulse(false), 300);
    const filtered = MASCOT_QUOTES.filter(q => q !== activeMascotQuote);
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setActiveMascotQuote(random);
  };

  // Switch raid tweet randomly
  const handleNextTweet = () => {
    const filtered = RAID_TWEETS.filter(t => t !== customTweet);
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setCustomTweet(random);
  };

  // Switch Telegram shill template
  const handleNextShill = () => {
    const filtered = TELEGRAM_SHILLS.filter(s => s !== customShill);
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setCustomShill(random);
  };

  // Copy custom text
  const [copiedTweet, setCopiedTweet] = useState(false);
  const handleCopyTweet = () => {
    navigator.clipboard.writeText(customTweet);
    setCopiedTweet(true);
    setTimeout(() => setCopiedTweet(false), 2000);
  };

  const [copiedShill, setCopiedShill] = useState(false);
  const handleCopyShill = () => {
    navigator.clipboard.writeText(customShill);
    setCopiedShill(true);
    setTimeout(() => setCopiedShill(false), 2000);
  };

  // Send custom chat message
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatMsg.trim()) return;
    const now = new Date();
    const timeStr = now.toTimeString().substring(0, 5);
    setChatMessages((prev) => [
      ...prev,
      { user: "You (Holder)", msg: newChatMsg.trim(), time: timeStr }
    ]);
    setNewChatMsg('');
  };

  // Simulate incoming community chats periodically
  useEffect(() => {
    const names = ["MoonBoy", "SolSniper", "GigaChad", "AlphaHunter", "CoinWhale", "CTOFighter", "Bullish_Jim"];
    const quotes = [
      "Let's push to the 5M target guys!",
      "Binance is watching this comeback. Count me in 🚀",
      "Sharing the site to all my networks right now!",
      "This is literally the cleanest layout in crypto. Dev is cooking!",
      "JustCoin CTO holds the line! No surrender!",
      "Swept the floor again. 20M is programmed.",
      "LFG JUSTCOIN FAMILY! ❤️"
    ];

    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      const timeStr = new Date().toTimeString().substring(0, 5);
      
      setChatMessages((prev) => {
        const keeps = prev.slice(-12); // keep last 12
        return [...keeps, { user: randomName, msg: randomQuote, time: timeStr }];
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Scroll mock chat to bottom inside container ONLY to prevent entire page scroll-hijacking
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatMessages]);

  // Adjust selected milestone index based on slider MC
  const milestoneIndex = simulatedMc >= 100 ? 4 : simulatedMc >= 20 ? 3 : simulatedMc >= 10 ? 2 : simulatedMc >= 5 ? 1 : 0;

  return (
    <div className="min-h-screen bg-brand-yellow font-sans text-brand-dark flex flex-col selection:bg-brand-dark selection:text-white pb-16">
      
      {/* 1. SCROLLING MARQUEE BANNER */}
      <div className="bg-brand-dark text-white py-2.5 overflow-hidden border-b-4 border-brand-dark flex select-none font-mono text-sm tracking-wide font-bold">
        <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap flex gap-8 shrink-0">
          <span> $JUSTCOIN COMMUNITY TAKEOVER (CTO) IN FULL FORCE!</span>
          <span>•</span>
          <span> 100% DECENTRALIZED</span>
          <span>•</span>
          <span> TARGET MC: $100M+ ONWARD</span>
          <span>•</span>
          <span> THE CHART DIP IS THE ROCKET LAUNCHER</span>
          <span>•</span>
          <span> LOVE, COMMUNITY, AND POWER TOGETHER</span>
          <span>•</span>
        </div>
        <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap flex gap-8 shrink-0" aria-hidden="true">
          <span>$JUSTCOIN COMMUNITY TAKEOVER (CTO) IN FULL FORCE!</span>
          <span>•</span>
          <span> 100% DECENTRALIZED</span>
          <span>•</span>
          <span> TARGET MC: $100M+ ONWARD</span>
          <span>•</span>
          <span> THE CHART DIP IS THE ROCKET LAUNCHER</span>
          <span>•</span>
          <span> LOVE, COMMUNITY, AND POWER TOGETHER</span>
          <span>•</span>
        </div>
      </div>

      {/* STICKY NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 px-4 md:px-8 py-4 max-w-7xl w-full mx-auto">
        <nav className="bg-brand-cream border-4 border-brand-dark rounded-none p-4 flex justify-between items-center shadow-[6px_6px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-brand-yellow rounded-none border-2 border-brand-dark flex items-center justify-center font-display font-black text-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] italic">
              <img src="./justcoin_logo.svg" alt="" />
            </div>
            <span className="hidden md:inline font-display font-black text-xl tracking-tighter italic uppercase text-brand-dark">
  JustCoin{" "}
  <span className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
    CTO
  </span>
</span>
          </div>


          <div className="flex items-center gap-3">
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noreferrer" 
              className="h-9 w-9 bg-brand-cream border-2 border-brand-dark rounded-none flex items-center justify-center hover:bg-brand-yellow transition-all shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px]"
            >
              <Twitter size={16} />
            </a>
            <a 
              href="https://t.me" 
              target="_blank" 
              rel="noreferrer" 
              className="h-9 w-9 bg-brand-cream border-2 border-brand-dark rounded-none flex items-center justify-center hover:bg-brand-yellow transition-all shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px]"
            >
              <Send size={16} />
            </a>
            <a 
              href="#buy" 
              className="bg-brand-dark text-[#FFD700] px-5 py-2 rounded-none border-2 border-brand-dark font-display font-black text-sm uppercase tracking-wider hover:bg-white hover:text-brand-dark transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px]"
            >
              Buy Now
            </a>
          </div>
        </nav>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 flex-1 w-full space-y-16 mt-4">

        {/* 2. HERO SECTION */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* Hero Story details */}
          <div className="lg:col-span-7 bg-brand-cream border-4 border-brand-dark rounded-none p-6 md:p-8 flex flex-col justify-between shadow-[12px_12px_0px_rgba(0,0,0,1)] z-10 relative">
            <div className="space-y-6">
              
              {/* Badge info */}
              <div className="inline-flex items-center gap-2 bg-brand-yellow px-4 py-2 rounded-none border-2 border-brand-dark font-mono font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                <Sparkles size={14} className="text-brand-dark animate-spin hidden" />
                <span>COMMUNITY TAKEOVER IS LIVE</span>
              </div>

              <div className="space-y-4">
                <h1 className="font-display font-black text-6xl md:text-8xl tracking-tight leading-[0.85] uppercase text-brand-dark">
                  The <span className="text-brand-yellow drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">People&apos;s</span><br/>
                  Comeback
                </h1>
                
                <p className="font-sans text-base md:text-lg leading-tight text-brand-dark font-medium pb-1">
                  JustCoin started as a simple idea, a token built around <strong>love, fun, unity,</strong> and bringing people together. At its peak, the vision was massive. But when the original team stepped away, leaving the chart on a dip, the real holders stood shoulder to shoulder.
                </p>
                <p className="font-sans text-base md:text-lg leading-tight text-brand-dark font-black">
                  We refused to let the dream die. This is not just another token; it is a full <span className="bg-brand-dark text-white px-2 py-0.5 whitespace-nowrap">Community Takeover (CTO)</span> movement. We believe some of the biggest movements in crypto are born during moments like this.
                </p>
              </div>

              {/* Simple grid metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono">
                <div className="border-2 border-brand-dark p-4 bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-none">
                  <span className="block text-xs uppercase font-extrabold opacity-60">Ownership</span>
                  <span className="text-xl font-black uppercase tracking-tight">100% Shared</span>
                </div>
                <div className="border-2 border-brand-dark p-4 bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-none">
                  <span className="block text-xs uppercase font-extrabold opacity-60">Liquidity</span>
                  <span className="text-xl font-black uppercase tracking-tight">Burned</span>
                </div>
                <div className="border-2 border-brand-dark p-4 bg-brand-dark text-white shadow-[6px_6px_0px_rgba(255,255,255,1)] rounded-none col-span-2 sm:col-span-1">
                  <span className="block text-xs uppercase font-extrabold opacity-50 text-brand-yellow">Spirit</span>
                  <span className="text-xl font-black uppercase tracking-tight text-brand-yellow">Unbreakable</span>
                </div>
              </div>
            </div>

            {/* Contract and Social CTA row */}
            <div className="space-y-4 mt-8 pt-6 border-t-2 border-dashed border-brand-dark/20">
              <span className="font-display font-black text-sm text-brand-dark uppercase tracking-widest block italic">
                🚨 Copy Token Contract Address:
              </span>
              
              {/* Copy Contract widget */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="bg-brand-dark p-3.5 rounded-none text-white font-mono text-xs flex-1 flex justify-between items-center border-2 border-brand-dark overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className="truncate select-all">{CONTRACT_ADDRESS}</span>
                </div>
                <button 
                  onClick={handleCopyContract}
                  className="bg-brand-yellow px-6 py-3 rounded-none border-2 border-brand-dark font-display font-black text-sm uppercase tracking-wider hover:bg-neutral-100 transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
                >
                  {copiedAddr ? (
                    <>
                      <Check size={16} className="text-emerald-700 animate-bounce" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a 
                  href="https://t.me" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-brand-dark text-white hover:bg-white hover:text-brand-dark px-6 py-3 rounded-none border-2 border-brand-dark font-display font-black text-xs uppercase tracking-wide transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                >
                  <Send size={16} />
                  <span>Join Official Telegram</span>
                </a>
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-brand-cream hover:bg-brand-yellow px-6 py-3 rounded-none border-2 border-brand-dark font-display font-black text-xs uppercase tracking-wide transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                >
                  <Twitter size={16} />
                  <span>Follow On X </span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Hero (Beach Mascot Display + Interactive dialogue widget) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between select-none">
            
            {/* Mascot Container card */}
            <div className="bg-brand-cream border-4 border-brand-dark rounded-none p-6 shadow-[12px_12px_0px_rgba(0,0,0,1)] text-center flex-1 flex flex-col justify-center items-center relative overflow-hidden">
              
              {/* Awning/canopy border mockup at top, resembling image of sixtep */}
              <div className="absolute top-0 inset-x-0 h-6 bg-brand-dark flex justify-around">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-12 h-12 rounded-b-full bg-brand-dark border-4 border-brand-dark translate-y-[-2px]" />
                ))}
              </div>

              {/* Interactive Speech bubble */}
              <div className="mt-8 mb-4 max-w-xs relative bg-brand-dark text-white p-4 rounded-none border-2 border-brand-dark shadow-[4px_4px_0px_rgba(0,0,0,1)] font-display font-black text-sm leading-relaxed">
                <span>&ldquo;{activeMascotQuote}&rdquo;</span>
                
                {/* Speech Bubble Arrow pointing down */}
                <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-brand-dark"></div>
              </div>

              {/* High fidelity beach mascot generation rendering */}
              <div className="relative w-72 h-72 md:w-80 md:h-80 transition-transform duration-500 hover:rotate-3">
                <Image 
                  src={beachMascot} 
                  alt="JustCoin Playful Beach Mascot" 
                  fill
                  className="object-contain filter drop-shadow-[4px_6px_0px_#000000]"
                  priority
                />
              </div>

              {/* Soundboard interaction bar */}
              <button 
                onClick={handleMascotDialogue}
                className={`mt-4 bg-brand-yellow hover:bg-[#ffeb60] px-5 py-2.5 rounded-none border-2 border-brand-dark font-display font-black text-xs uppercase tracking-wider transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 ${audioPulse ? 'scale-95' : ''}`}
              >
                <span>$JUSTCOIN </span>
              </button>

              {/* Mascot Status Badge */}
              <div className="absolute bottom-3 right-3 bg-brand-yellow border-2 border-brand-dark text-brand-dark text-[10px] font-mono font-black px-2.5 py-1 rounded-none shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                📍 STATUS: CHILLING AT THE BEACH
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 hidden">
              <div className="bg-[#FFFFFF] border-4 border-brand-dark rounded-none p-4 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all">
                <div className="flex gap-2 items-center text-brand-dark font-black text-xs uppercase mb-1">
                  <span className="bg-brand-yellow p-1 border border-brand-dark rounded-none"><Users size={12} /></span>
                  <span>Holders</span>
                </div>
                <div className="font-mono text-2xl font-black text-brand-dark">
                  1,521+
                </div>
                <span className="text-[10px] text-brand-dark/70 font-bold block mt-1">▲ +2.2% </span>
              </div>

              <div className="bg-[#FFFFFF] border-4 border-brand-dark rounded-none p-4 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all">
                <div className="flex gap-2 items-center text-brand-dark font-black text-xs uppercase mb-1">
                  <span className="bg-brand-yellow p-1 border border-brand-dark rounded-none"><TrendingUp size={12} /></span>
                  <span>Market Cap</span>
                </div>
                <div className="font-mono text-2xl font-black text-brand-dark italic">
                  $3.52K
                </div>
                <span className="text-[10px] text-brand-dark/70 font-bold block mt-1">▲ Growing Organic Community</span>
              </div>
            </div>

          </div>
        </section>
        <section id="simulator" className="bg-brand-cream border-4 border-brand-dark rounded-none p-6 md:p-8 shadow-[12px_12px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-brand-dark font-black hidden md:block">
            TO THE MOON
          </div>

          <div className="max-w-2xl space-y-4 mb-8">
            <h2 className="font-display font-black text-4xl md:text-6xl text-brand-dark uppercase tracking-tighter italic">
              CTO Targets & Milestones
            </h2>
            <p className="font-sans text-brand-dark font-medium leading-tight">
              We aren&apos;t here for quick hype cycles. We&apos;ve built an extensive ladder of milestones and official targets. <strong>Use the interactive slider below</strong> to see what exchange targets and strategic partnerships unlock as we reach higher market caps!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Slider interaction */}
            <div className="lg:col-span-5 space-y-6 bg-brand-yellow/30 p-6 rounded-none border-2 border-brand-dark shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              
              <div className="space-y-3">
                <label className="flex justify-between font-display font-black text-sm uppercase tracking-wider">
                  <span>Market Cap:</span>
                  <span className="font-mono text-brand-yellow bg-brand-dark px-3 py-1 rounded-none text-sm font-black border border-brand-dark shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    ${simulatedMc}M USD
                  </span>
                </label>
                
                {/* Standard input range */}
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="1"
                  value={simulatedMc}
                  onChange={(e) => setSimulatedMc(Number(e.target.value))}
                  className="w-full h-4 bg-brand-dark rounded-none appearance-none cursor-pointer accent-brand-yellow border-2 border-brand-dark focus:outline-none"
                />
                
                <div className="flex justify-between font-mono text-[10px] font-black text-brand-dark pt-1">
                  <span>$1M MC</span>
                  <span>$10M</span>
                  <span>$25M</span>
                  <span>$50M</span>
                  <span>$100M MC 🚀</span>
                </div>
              </div>

              {/* Fast presets */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-black text-brand-dark block uppercase tracking-wider">Jump Immediately to targets:</span>
                <div className="flex flex-wrap gap-2">
                  {[1, 5, 10, 20, 100].map((val) => (
                    <button
                      key={val}
                      onClick={() => setSimulatedMc(val)}
                      className={`px-3 py-1.5 font-mono text-xs font-black rounded-none border-2 border-brand-dark transition-all ${simulatedMc === val ? 'bg-brand-dark text-brand-yellow shadow-[3px_3px_0px_rgba(0,0,0,1)]' : 'bg-white text-brand-dark hover:bg-brand-yellow shadow-[2px_2px_0px_rgba(0,0,0,1)]'}`}
                    >
                      ${val}M MC
                    </button>
                  ))}
                </div>
              </div>

              {/* Status info box */}
              <div className="bg-white border-2 border-brand-dark p-4 rounded-none space-y-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2 text-xs font-mono font-black text-brand-dark/60">
                  <Info size={14} className="text-brand-dark" />
                  <span>DESCRIPTION:</span>
                </div>
                <p className="font-display font-black text-2xl uppercase tracking-tighter text-brand-dark">
                  {MILESTONES[milestoneIndex].target} Target
                </p>
                <p className="text-xs text-brand-dark font-medium leading-tight">
                  {MILESTONES[milestoneIndex].description}
                </p>
              </div>

            </div>

            {/* Right side: Dynamic showcase */}
            <div className="lg:col-span-7 bg-[#FFFFFF] border-4 border-brand-dark rounded-none overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)]">
              
              {/* Header */}
              <div className="bg-brand-dark p-4 text-white flex justify-between items-center border-b-2 border-brand-dark">
                <span className="font-display font-black text-sm uppercase tracking-widest italic">
                  🔓 UNLOCKED BENEFITS ({MILESTONES[milestoneIndex].target})
                </span>
              </div>

              <div className="p-6 space-y-6">
                
                {/* Visual unlock showcase */}
                <div className="space-y-3">
                  <span className="text-xs font-mono font-extrabold text-brand-dark block uppercase tracking-wider">Target Listings & Actions:</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {MILESTONES[milestoneIndex].rewards.map((reward, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        key={reward} 
                        className="flex items-center gap-3 bg-brand-yellow/30 p-3 rounded-none border-2 border-brand-dark shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                      >
                        <div className="h-6 w-6 bg-brand-dark text-brand-yellow rounded-none flex items-center justify-center font-bold text-xs uppercase">
                          {i + 1}
                        </div>
                        <span className="text-sm font-display font-black text-brand-dark uppercase tracking-tight">{reward}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Simulated CEX details bar */}
                <div className="bg-brand-yellow border-2 border-brand-dark rounded-none p-4 space-y-3 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center gap-2">
                    <span className="bg-brand-dark text-brand-yellow p-1 border border-brand-dark rounded-none">
                      <Award size={14} />
                    </span>
                    <span className="font-display font-black text-sm uppercase tracking-wider">Unlocked CEX Platforms</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {simulatedMc >= 100 ? (
                      <>
                        <span className="px-3 py-1.5 bg-brand-dark text-white rounded-none border-2 border-brand-dark text-xs font-mono font-black uppercase">Binance Hub</span>
                        <span className="px-3 py-1.5 bg-brand-dark text-white rounded-none border-2 border-brand-dark text-xs font-mono font-black uppercase">Coinbase Spot</span>
                        <span className="px-3 py-1.5 bg-white text-brand-dark rounded-none border-2 border-brand-dark text-xs font-mono font-black uppercase">Bybit Tier-1</span>
                        <span className="px-3 py-1.5 bg-white text-brand-dark rounded-none border-2 border-brand-dark text-xs font-mono font-black uppercase">KuCoin Global</span>
                        <span className="px-3 py-1.5 bg-white text-brand-dark rounded-none border-2 border-brand-dark text-xs font-mono font-black uppercase">MEXC Listing</span>
                      </>
                    ) : simulatedMc >= 20 ? (
                      <>
                        <span className="px-3 py-1.5 bg-brand-dark text-white rounded-none border-2 border-brand-dark text-xs font-mono font-black uppercase">Bybit Listing</span>
                        <span className="px-3 py-1.5 bg-brand-dark text-white rounded-none border-2 border-brand-dark text-xs font-mono font-black uppercase">Bitget Approved</span>
                        <span className="px-3 py-1.5 bg-brand-dark text-white rounded-none border-2 border-brand-dark text-xs font-mono font-black uppercase">OKX Registered</span>
                        <span className="px-3 py-1.5 bg-white text-brand-dark rounded-none border-2 border-dashed border-brand-dark/30 text-xs font-mono font-black uppercase opacity-50 line-through">Binance ($100M)</span>
                      </>
                    ) : simulatedMc >= 5 ? (
                      <>
                        <span className="px-3 py-1.5 bg-brand-dark text-white rounded-none border-2 border-brand-dark text-xs font-mono font-black uppercase">MEXC Listing</span>
                        <span className="px-3 py-1.5 bg-brand-dark text-white rounded-none border-2 border-brand-dark text-xs font-mono font-black uppercase">WEEX Global</span>
                        <span className="px-3 py-1.5 bg-brand-dark text-white rounded-none border-2 border-brand-dark text-xs font-mono font-black uppercase">KuCoin Portal</span>
                        <span className="px-3 py-1.5 bg-white text-brand-dark/40 rounded-none border-2 border-dashed border-brand-dark/30 text-xs font-mono font-black uppercase opacity-50 line-through">Bybit ($20M)</span>
                      </>
                    ) : (
                      <span className="text-xs text-brand-dark font-mono font-black uppercase italic">No exchange targets unlocked yet. Ramp MC to at least $5M!</span>
                    )}
                  </div>
                </div>

                {/* Progress bar info */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-[11px] font-black text-brand-dark">
                    <span>ROAD TO BINANCE & COINBASE ($100M)</span>
                    <span>{simulatedMc}% COMPLETE</span>
                  </div>
                  <div className="w-full h-4 bg-slate-100 rounded-none border-2 border-brand-dark overflow-hidden">
                    <div 
                      className="h-full bg-brand-yellow border-r-2 border-brand-dark transition-all duration-300"
                      style={{ width: `${Math.min(100, simulatedMc)}%` }}
                    />
                  </div>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* 4. THE BELIEF & NARRATIVE SECTION */}
        <section className="bg-brand-dark text-white rounded-none p-6 md:p-8 shadow-[12px_12px_0px_#FFD700] border-4 border-brand-dark space-y-10">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-brand-yellow font-mono text-xs font-black uppercase tracking-widest block">
              DECIDED BY THE PEOPLE
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl tracking-tighter leading-none uppercase italic text-brand-yellow">
              Communities Create Legends
            </h2>
            <p className="font-sans text-slate-300 text-sm md:text-md">
              Meme cultures don&apos;t survive because of highly corporate venture rounds. They thrive when standard citizens align with a unified mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-display">
            
            {/* Box 1 */}
            <div className="bg-neutral-900 p-6 rounded-none border-2 border-brand-yellow/30 space-y-4 hover:border-brand-yellow transition-colors group shadow-[4px_4px_0px_#000000]">
              <div className="h-10 w-10 bg-brand-yellow rounded-none flex items-center justify-center text-brand-dark font-black shadow-[3px_3px_0px_rgba(255,255,255,1)] group-hover:rotate-6 transition-transform italic">
                01
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-brand-yellow">No Central Failure Point</h3>
              <p className="font-sans text-sm text-slate-300 leading-[1.3] font-medium">
                With abandoned team wallets and contract ownership gone, there are no developers who can execute sudden actions. The community coordinates the marketing, design, and decisions.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-neutral-900 p-6 rounded-none border-2 border-brand-yellow/30 space-y-4 hover:border-brand-yellow transition-colors group shadow-[4px_4px_0px_#000000]">
              <div className="h-10 w-10 bg-brand-yellow rounded-none flex items-center justify-center text-brand-dark font-black shadow-[3px_3px_0px_rgba(255,255,255,1)] group-hover:rotate-6 transition-transform italic">
                02
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-brand-yellow">Historically Proven Formula</h3>
              <p className="font-sans text-sm text-slate-300 leading-[1.3] font-medium">
                Shiba Inu, Pepe, and legendary tokens experienced extreme foundational drop events initially. It is within the depths of those corrections that coordinate movements of die-hard supporters are born.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-neutral-900 p-6 rounded-none border-2 border-brand-yellow/30 space-y-4 hover:border-brand-yellow transition-colors group font-semibold shadow-[4px_4px_0px_#000000]">
              <div className="h-10 w-10 bg-brand-yellow rounded-none flex items-center justify-center text-brand-dark font-black shadow-[3px_3px_0px_rgba(255,255,255,1)] group-hover:rotate-6 transition-transform italic">
                03
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-brand-yellow">Organic Worldwide Swarm</h3>
              <p className="font-sans text-sm text-slate-300 leading-[1.3] font-normal text-slate-300">
                Every holder becomes a marketing team worker, a raider, a designer, and a contributor. Our global expansion strategy relies on organic worldwide representation across Twitter and TG.
              </p>
            </div>

          </div>

          {/* Inspirational horizontal board */}
          <div className="bg-brand-yellow rounded-none p-6 text-brand-dark grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-[3px] border-brand-dark shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <div className="lg:col-span-8 space-y-2">
              <h4 className="font-display font-black text-2xl uppercase tracking-tighter">
                Ready to Join the Comeback Story of the Year?
              </h4>
              <p className="font-sans text-sm font-semibold opacity-90 leading-tight">
                This is not just another CTO. We are building a strong community driven movement with long term vision and massive goals ahead.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-brand-dark text-[#FFD700] px-6 py-3 rounded-none font-display font-black text-xs uppercase tracking-wider border-2 border-brand-dark shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:bg-white hover:text-brand-dark transition-all inline-flex items-center gap-2"
              >
                <span>JOIN TELEGRAM</span>
                <ChevronRight size={16} />
              </a>
            </div>
          </div>

        </section>
      </main>

      {/* 8. FOOTER WITH CANOPY SCALLOP */}
      <footer className="w-full mt-24 relative">
        
        {/* Canopy scallop border separating yellow main content from dark grey footer */}
        <div className="canopy-scallop absolute top-[-10px] inset-x-0 z-10" />

        <div className="bg-brand-dark text-white pt-16 pb-12 border-t-4 border-brand-dark">
          <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Left Column */}
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 bg-brand-yellow text-brand-dark rounded-none flex items-center justify-center font-display font-black text-xl border-2 border-brand-dark shadow-[3px_3px_0px_#FFFFFF]">
                    <img src="/justcoin_logo.svg" alt="" />
                  </div>
                  <span className="font-display font-black text-2xl tracking-tighter text-brand-yellow uppercase italic">
                    JustCoin <span className="text-xs bg-white text-brand-dark border border-brand-dark rounded-none px-1.5 py-0.5 tracking-wide shadow-[2px_2px_0px_rgba(0,0,0,1)] not-italic">CTO</span>
                  </span>
                </div>
                
                <p className="font-sans text-xs md:text-sm text-slate-400 leading-relaxed font-semibold">
                  A decentralized, community driven movement aiming to push JustCoin to global elite stature. Built shoulder to shoulder by holders worldwide.
                </p>
              </div>

              {/* Middle Column links */}
              <div className="md:col-span-3 space-y-4">
                <h5 className="font-display font-black text-sm uppercase text-brand-yellow tracking-wider italic">
                  Community Links
                </h5>
                <ul className="font-mono text-xs space-y-2.5 text-slate-300 font-bold">
                  <li><a href="https://t.me" target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition-colors block">Telegram</a></li>
                  <li><a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition-colors block">X (Twitter)</a></li>
                  <li><a href="https://dexscreener.com" target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition-colors block">DexScreener Chart</a></li>
                </ul>
              </div>

              {/* Right Column disclaimer */}
              <div className="md:col-span-4 space-y-4">
                <h5 className="font-display font-black text-sm uppercase text-brand-yellow tracking-wider italic">
                  ⚠️ DISCLAIMER
                </h5>
                
                <div className="bg-slate-900 border border-slate-700 p-4 rounded-none text-[10px] font-sans text-slate-400 leading-relaxed font-bold">
                  $JUSTCOIN is a 100% decentralized meme coin for fun. It has no formal utility, registered investment teams, or security guarantees. Price fluctuations can be extreme. Build with absolute responsibility.
                </div>
              </div>

            </div>

            {/* Bottom Credit and info */}
            <div className="pt-8 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 font-mono text-[10px] font-bold">
              <span>© {new Date().getFullYear()} JUSTCOIN COMMUNITY TAKEOVER.</span>
              <div className="flex gap-4">
                <span>CONTRACT: DECENTRALIZED</span>
                <span>LIQUIDITY: BURNED</span>
              </div>
            </div>

          </div>
        </div>

      </footer>

    </div>
  );
}
