import React from 'react';
import { BrandImages } from '../assets/images';
import { COMPANY_INFO } from '../data/franchiseData';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';

export const ClosingBanner: React.FC = () => {
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
    <section id="closing-banner" className="relative py-28 sm:py-36 overflow-hidden bg-[#422006] text-[#FDFBF7]">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={BrandImages.closingBanner}
          alt="바삭하고 촉촉한 만나옛날통닭"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.38]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#200e02]/95 via-[#422006]/80 to-[#200e02]/65" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-5 sm:space-y-7">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B91C1C]/40 border border-[#B91C1C]/70 text-yellow-200 font-bold text-sm sm:text-base tracking-wider uppercase backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="font-black">지역별 선점 및 상권 보호 혜택</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#FDFBF7] tracking-tight leading-tight break-keep">
            좋은 상권은 <br className="sm:hidden" />
            <span className="text-yellow-400">오래 기다려주지 않습니다.</span>
          </h2>

          {/* Subcopy */}
          <p className="text-lg sm:text-xl md:text-2xl text-[#E7E2D8] leading-relaxed font-semibold break-keep">
            창업을 고민하고 계시다면 먼저 희망하시는 지역의 출점 가능 여부부터 확인해 보세요.
            <br className="hidden sm:inline" />
            만나옛날통닭 본사가 1:1 맞춤 상담으로 예비 점주님의 든든한 성공 파트너가 되어 드립니다.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={scrollToInquiry}
              id="closing-inquiry-cta"
              className="cursor-pointer min-h-[56px] inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#B91C1C] hover:bg-red-800 text-white font-black text-base sm:text-lg shadow-xl shadow-red-950/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <MapPin className="w-5 h-5 text-yellow-300 shrink-0" />
              <span>내 희망지역 출점 문의하기</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </button>

            <a
              href={`tel:${COMPANY_INFO.phone}`}
              onClick={() => {
                window.location.href = `tel:${COMPANY_INFO.phone}`;
              }}
              className="min-h-[56px] inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#FDFBF7] font-black text-base sm:text-lg backdrop-blur-sm border border-[#E7E2D8]/40 transition-all active:scale-95 text-center"
            >
              <span>가맹문의 {COMPANY_INFO.phone} / 직통 {COMPANY_INFO.directPhone}</span>
            </a>
          </div>

          <p className="text-sm text-[#E7E2D8] font-medium pt-1 break-keep">
            * 가맹 상담 및 상권 분석은 100% 무료로 진행되며 일체의 계약 강요가 없습니다.
          </p>
        </div>
      </div>
    </section>
  );
};
