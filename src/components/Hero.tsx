import React from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/franchiseData';
import { BrandImages } from '../assets/images';
import { ArrowRight, Flame, ShieldCheck, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenInquiryModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiryModal }) => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
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
    <section
      id="hero-section"
      className="relative pt-10 pb-16 md:pt-14 md:pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-[#FDFBF7] border-b border-[#E7E2D8]"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#422006_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Left Column: Brand Copy & CTAs */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-5 sm:space-y-6">
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-950 border border-yellow-300 shadow-xs">
              <Flame className="w-4 h-4 text-[#B91C1C]" />
              <span className="text-sm sm:text-base md:text-lg font-black tracking-tight">
                겉은빠삭 속은촉촉! 100% 하림 생닭 옛날 그 맛 그대로
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-black text-[#2D1503] tracking-tight leading-[1.22] break-keep">
              맛있는게 생각날때~{' '}
              <br className="hidden sm:inline" />
              <span className="relative inline-block text-[#B91C1C]">
                만나옛날통닭
              </span>
            </h1>

            {/* Subcopy */}
            <p className="text-base sm:text-lg md:text-xl text-[#2D1503] font-bold leading-relaxed max-w-2xl mx-auto lg:mx-0 break-keep">
              누구나 편하게 찾는 우리 동네 정겨운 통닭집.
              <br />
              <span className="font-black text-[#2D1503]">익숙하고 검증된 대중적인 맛</span>에{' '}
              <span className="font-black text-[#B91C1C]">홀·포장·배달 3-Way 수익 시스템</span>을 더했습니다.
            </p>

            {/* Sub Slogan Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E7E2D8] shadow-xs max-w-xl mx-auto lg:mx-0 flex items-start gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 text-[#B91C1C] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-base sm:text-lg text-[#2D1503] font-bold leading-relaxed break-keep">
                {COMPANY_INFO.subSlogan}
              </p>
            </div>

            {/* Notice Callout */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-red-50 via-yellow-50 to-amber-50 border border-yellow-300/80 shadow-xs max-w-xl mx-auto lg:mx-0 flex items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="px-2.5 py-1 rounded-md bg-[#B91C1C] text-white font-black text-xs sm:text-sm md:text-base shrink-0 tracking-wide">
                  NOTICE
                </span>
                <span className="text-sm sm:text-base md:text-lg font-black text-[#2D1503] truncate">
                  본사협력 1000만원 무이자 대출 프로모션 진행 가능!
                </span>
              </div>
              <button
                onClick={() => scrollTo('#cost-loan-notice')}
                className="cursor-pointer text-sm sm:text-base md:text-lg font-black text-[#B91C1C] hover:underline shrink-0 flex items-center gap-0.5"
              >
                <span>혜택보기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => scrollTo('#inquiry')}
                id="hero-inquiry-cta"
                className="cursor-pointer w-full sm:w-auto min-h-[54px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl sm:rounded-full bg-[#B91C1C] hover:bg-red-800 text-white font-black text-base sm:text-lg shadow-lg shadow-red-900/20 active:scale-98 transition-all duration-200"
              >
                <span>무료 가맹상담 신청하기</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => scrollTo('#why-manna')}
                id="hero-learn-more-btn"
                className="cursor-pointer w-full sm:w-auto min-h-[54px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl sm:rounded-full bg-white text-[#2D1503] border-2 border-[#2D1503] font-black text-base sm:text-lg hover:bg-[#FDFBF7] active:scale-98 transition-all duration-200"
              >
                <span>창업 경쟁력 확인하기</span>
              </button>
            </div>

            {/* Key Value Points (Trust Signals) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-[#E7E2D8] text-left">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-yellow-50/60 sm:bg-transparent border sm:border-0 border-yellow-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#B91C1C] shrink-0" />
                <span className="text-sm sm:text-base font-extrabold text-[#2D1503]">100% 하림 신선육</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-yellow-50/60 sm:bg-transparent border sm:border-0 border-yellow-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#B91C1C] shrink-0" />
                <span className="text-sm sm:text-base font-extrabold text-[#2D1503]">포장 9,900원 폭발 집객</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-yellow-50/60 sm:bg-transparent border sm:border-0 border-yellow-200/60">
                <CheckCircle2 className="w-4 h-4 text-[#B91C1C] shrink-0" />
                <span className="text-sm sm:text-base font-extrabold text-[#2D1503]">홀·포장·배달 3-Way</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (Enlarged lg:col-span-7) */}
          <div className="lg:col-span-7 relative mt-4 lg:mt-0">
            {/* Background Ambient Glow */}
            <div className="absolute -inset-4 bg-yellow-400/25 rounded-3xl blur-2xl -z-10" />

            {/* Main Featured Image Card (Fixed frame, smoothly moves/scales on hover identical to lower cards) */}
            <div
              id="hero-featured-photo-card"
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 sm:border-[6px] border-white bg-stone-900 aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[630px] xl:h-[700px] w-full cursor-pointer select-none group"
            >
              <img
                src={BrandImages.chimaekVibe}
                alt="만나옛날통닭 매장 활기찬 치맥 분위기"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Gradient Vignette for readable text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Overlay Bottom Description */}
              <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 text-white pointer-events-none">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-snug drop-shadow-md">
                      겉바속촉 수제 옛날통닭 &amp; 살얼음 생맥주
                    </h3>
                    <p className="text-base sm:text-lg text-yellow-200 font-bold mt-1 drop-shadow-sm">
                      남녀노소 누구나 즐기는 활기찬 치맥 아지트
                    </p>
                  </div>
                  <div className="text-right shrink-0 bg-black/50 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-white/20 shadow-md">
                    <span className="text-sm sm:text-base text-stone-200 block font-bold">통닭 포장가</span>
                    <span className="text-2xl sm:text-3xl font-black text-yellow-400">9,900원</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Trust Micro-cards (Shown on mobile under the image) */}
            <div className="grid grid-cols-2 gap-2.5 mt-3 sm:hidden">
              <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] shadow-xs flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#2D1503] text-white flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs sm:text-sm text-[#5C320A] font-bold leading-none">안정적 매출</p>
                  <p className="text-sm sm:text-base font-black text-[#2D1503] mt-1">3-Way 복합구조</p>
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E7E2D8] shadow-xs flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-yellow-100 text-[#B91C1C] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs sm:text-sm text-[#5C320A] font-bold leading-none">소자본 맞춤</p>
                  <p className="text-sm sm:text-base font-black text-[#2D1503] mt-1">업종변경 지원</p>
                </div>
              </div>
            </div>

            {/* Floating Trust Card 1: 3-Way Model (Desktop/Tablet) with subtle float */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden sm:flex items-center gap-3 absolute -bottom-6 -left-6 bg-white p-3.5 rounded-xl shadow-lg border border-[#E7E2D8] max-w-[260px] z-20 pointer-events-none"
            >
              <div className="w-10 h-10 rounded-lg bg-[#2D1503] text-white flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-sm font-bold text-[#5C320A]">안정적 매출 구조</p>
                <p className="text-base sm:text-lg font-black text-[#2D1503]">홀 + 포장 + 배달</p>
              </div>
            </motion.div>

            {/* Floating Trust Card 2: Support (Desktop/Tablet) with subtle float */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="hidden sm:flex items-center gap-3 absolute -top-4 -right-4 bg-white p-3.5 rounded-xl shadow-lg border border-[#E7E2D8] z-20 pointer-events-none"
            >
              <div className="w-10 h-10 rounded-lg bg-yellow-100 text-[#B91C1C] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-sm font-bold text-[#5C320A]">1:1 맞춤 창업</p>
                <p className="text-base sm:text-lg font-black text-[#2D1503]">실속 & 업종변경 지원</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

