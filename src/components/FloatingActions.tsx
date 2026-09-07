import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/franchiseData';
import { getKakaoChannelConfig, KakaoChannelConfig } from '../services/inquiryService';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [channelConfig, setChannelConfig] = useState<KakaoChannelConfig>(getKakaoChannelConfig());

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    const handleChannelUpdate = (e: any) => {
      setChannelConfig(e.detail || getKakaoChannelConfig());
    };
    window.addEventListener('manna:channel_updated', handleChannelUpdate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('manna:channel_updated', handleChannelUpdate);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToInquiry = () => {
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
    <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-3">
      {/* Kakao Business Channel 1:1 Chat Floating Button */}
      <a
        href={channelConfig.chatUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-kakao-channel-btn"
        className="cursor-pointer group flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#FEE500] hover:bg-[#FDD800] text-[#3C1E1E] font-black text-base shadow-lg hover:scale-105 active:scale-95 transition-all border border-[#E6CF00]"
        title="카카오톡 비즈니스 채널 1:1 실시간 상담"
      >
        <div className="w-5 h-5 rounded-full bg-[#3C1E1E] flex items-center justify-center text-[#FEE500]">
          <MessageCircle className="w-3.5 h-3.5 fill-[#FEE500]" />
        </div>
        <span>카톡 1:1 가맹상담</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </a>

      {/* Fast Inquiry Bubble */}
      <button
        onClick={scrollToInquiry}
        id="floating-inquiry-btn"
        className="cursor-pointer group flex items-center gap-2 px-5 py-3 rounded-full bg-[#2D1503] hover:bg-black text-white font-black text-base shadow-md hover:scale-105 active:scale-95 transition-all border border-stone-700"
        title="빠른 가맹 문의 간편접수"
      >
        <MessageCircle className="w-4 h-4 text-yellow-400" />
        <span>가맹문의 간편접수</span>
      </button>

      {/* Direct Call Floating Button */}
      <a
        href={`tel:${COMPANY_INFO.phone}`}
        id="floating-call-btn"
        className="group flex items-center gap-2 px-5 py-3 rounded-full bg-[#B91C1C] text-white font-black text-base shadow-md hover:scale-105 hover:bg-red-800 active:scale-95 transition-all"
        title="본사 직통 전화상담"
      >
        <Phone className="w-4 h-4" />
        <span>{COMPANY_INFO.phone}</span>
      </a>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          id="floating-top-btn"
          className="cursor-pointer p-3 rounded-full bg-[#FDFBF7] text-[#422006] shadow-xs border border-[#E7E2D8] hover:bg-white active:scale-90 transition-all"
          aria-label="최상단으로 이동"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
