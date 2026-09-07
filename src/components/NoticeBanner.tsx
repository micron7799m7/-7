import React, { useState, useEffect } from 'react';
import { PROMOTION_NOTICES } from '../data/franchiseData';
import { Megaphone, ArrowRight, ChevronRight, Sparkles, Banknote } from 'lucide-react';

export const NoticeBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMOTION_NOTICES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentNotice = PROMOTION_NOTICES[currentIndex];

  const scrollToInquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#inquiry');
    if (el) {
      const headerOffset = 115;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      id="top-notice-bar"
      className="bg-[#240F02] text-white py-2 px-3 sm:px-6 lg:px-8 border-t border-yellow-700/20 shadow-xs relative z-30 select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Notice Content */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 overflow-hidden">
          <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded bg-[#B91C1C] text-white text-xs sm:text-sm font-black shrink-0 tracking-wide shadow-xs animate-pulse">
            <Megaphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300 shrink-0" />
            <span>NOTICE</span>
          </div>

          <span className="hidden md:inline-flex px-2.5 py-1 rounded bg-yellow-900/60 border border-yellow-600/40 text-yellow-300 text-xs sm:text-sm font-extrabold shrink-0">
            {currentNotice.tag}
          </span>

          {/* Ticker Text */}
          <div className="truncate text-sm sm:text-base font-black text-white flex items-center gap-2 min-w-0">
            <span key={currentNotice.id} className="text-yellow-300 font-black truncate">
              {currentNotice.title}
            </span>
            <span className="hidden lg:inline text-stone-300 font-medium text-xs sm:text-sm border-l border-white/20 pl-2 shrink-0">
              {currentNotice.subText}
            </span>
          </div>
        </div>

        {/* Right Action & Quick Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden xs:flex sm:flex items-center gap-1 text-xs text-stone-400">
            {PROMOTION_NOTICES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`cursor-pointer h-1.5 rounded-full transition-all ${
                  currentIndex === idx ? 'w-4 sm:w-5 bg-yellow-400' : 'w-1.5 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`공지 ${idx + 1}`}
              />
            ))}
          </div>

          <a
            href="#inquiry"
            onClick={scrollToInquiry}
            className="inline-flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-[#2D1503] font-black text-xs sm:text-sm md:text-base active:scale-95 transition-all shadow-xs whitespace-nowrap"
          >
            <span>상담·혜택 신청</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
