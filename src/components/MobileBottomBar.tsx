import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/franchiseData';
import { getKakaoChannelConfig, KakaoChannelConfig } from '../services/inquiryService';
import { Phone, MessageCircle, FileText } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const [channelConfig, setChannelConfig] = useState<KakaoChannelConfig>(getKakaoChannelConfig());

  useEffect(() => {
    const handleChannelUpdate = (e: any) => {
      setChannelConfig(e.detail || getKakaoChannelConfig());
    };
    window.addEventListener('manna:channel_updated', handleChannelUpdate);
    return () => window.removeEventListener('manna:channel_updated', handleChannelUpdate);
  }, []);

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
      id="mobile-sticky-cta-bar"
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white/95 backdrop-blur-md border-t border-[#E7E2D8] pt-2 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] px-2.5 shadow-[0_-4px_16px_rgba(45,21,3,0.12)] grid grid-cols-3 gap-2"
    >
      {/* Phone Call CTA */}
      <a
        href={`tel:${COMPANY_INFO.phone}`}
        onClick={() => {
          window.location.href = `tel:${COMPANY_INFO.phone}`;
        }}
        id="mobile-bottom-call-btn"
        className="min-h-[48px] py-2.5 px-1 rounded-xl bg-[#B91C1C] hover:bg-red-800 text-white font-black text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-all shadow-xs text-center"
        title="가맹문의 직통 전화 바로걸기"
      >
        <Phone className="w-4 h-4 text-yellow-300 shrink-0" />
        <span className="truncate font-black">{COMPANY_INFO.phone}</span>
      </a>

      {/* Kakao Business Channel 1:1 Chat CTA */}
      <a
        href={channelConfig.chatUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="mobile-bottom-kakao-btn"
        className="min-h-[48px] py-2.5 px-1 rounded-xl bg-[#FEE500] hover:bg-[#FDD800] text-[#3C1E1E] font-black text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-all shadow-xs border border-[#E6CF00] text-center"
        title="카카오톡 비즈니스 채널 1:1 상담 바로가기"
      >
        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4 fill-[#3C1E1E] text-[#3C1E1E] shrink-0" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <span className="truncate font-black">카톡 1:1상담</span>
      </a>

      {/* Inquiry Form Scroll CTA */}
      <button
        onClick={scrollToInquiry}
        id="mobile-bottom-inquiry-btn"
        className="cursor-pointer min-h-[48px] py-2.5 px-1 rounded-xl bg-[#2D1503] hover:bg-black text-white font-black text-xs flex flex-col items-center justify-center gap-1 shadow-xs active:scale-95 transition-all text-center border border-stone-700"
      >
        <FileText className="w-4 h-4 text-yellow-300 shrink-0" />
        <span className="truncate">간편문의 접수</span>
      </button>
    </div>
  );
};
