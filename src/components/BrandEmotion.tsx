import React from 'react';
import { BrandImages } from '../assets/images';
import { Heart, Users, Sparkles, Beer } from 'lucide-react';

export const BrandEmotion: React.FC = () => {
  return (
    <section id="brand-emotion" className="relative py-28 sm:py-32 bg-[#422006] text-[#FDFBF7] overflow-hidden">
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={BrandImages.chimaekVibe}
          alt="만나옛날통닭에서 함께 즐기는 따뜻한 치맥 분위기"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#200e02] via-[#422006]/70 to-[#200e02]/85" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 font-black text-sm sm:text-base tracking-wider uppercase backdrop-blur-sm">
            <Heart className="w-4 h-4 text-[#B91C1C] fill-[#B91C1C]" />
            <span>우리 동네 따뜻한 온기 & 치맥의 즐거움</span>
          </div>

          {/* Slogan Poetry Display */}
          <div className="space-y-4 sm:space-y-5">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug break-keep">
              퇴근길 만나서 즐거운, <span className="text-yellow-300 font-black underline decoration-[#B91C1C] decoration-2 underline-offset-8">만나옛날통닭</span>
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug break-keep">
              가족과 함께 만나서 맛있는, <span className="text-yellow-300 font-black underline decoration-[#B91C1C] decoration-2 underline-offset-8">만나옛날통닭</span>
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug break-keep">
              친구들과 만나서 즐기는 치맥은 역시, <span className="text-yellow-300 font-black underline decoration-[#B91C1C] decoration-2 underline-offset-8">만나옛날통닭</span>
            </p>
          </div>

          {/* Core Philosophy Statement */}
          <div className="pt-6 border-t border-[#E7E2D8]/20">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-white tracking-tight break-keep leading-tight">
              “동네 사람들이 언제든 편하게 찾아오는 매장을 만듭니다”
            </h3>
            <p className="mt-4 text-stone-200 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto break-keep">
              어릴 적 아버지가 퇴근길에 품에 안고 오시던 노란 봉투의 고소한 온기.
              그 시절의 따스한 추억에 시원한 얼음 생맥주 한 잔의 여유를 더해
              언제 찾아도 반갑고 기분 좋은 우리 동네 아지트가 되겠습니다.
            </p>
          </div>

          {/* Value Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="bg-[#200e02]/85 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-center">
              <Users className="w-7 h-7 text-yellow-400 mx-auto mb-2.5" />
              <p className="font-black text-base sm:text-lg text-white">단골이 쌓이는 사랑방</p>
              <p className="text-sm sm:text-base text-stone-200 font-medium mt-1.5 break-keep">친근한 소통과 정이 넘치는 매장</p>
            </div>
            <div className="bg-[#200e02]/85 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-center">
              <Beer className="w-7 h-7 text-yellow-400 mx-auto mb-2.5" />
              <p className="font-black text-base sm:text-lg text-white">살얼음 생맥주 꿀조합</p>
              <p className="text-sm sm:text-base text-stone-200 font-medium mt-1.5 break-keep">사계절 내내 마르지 않는 주류 수요</p>
            </div>
            <div className="bg-[#200e02]/85 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-center">
              <Sparkles className="w-7 h-7 text-yellow-400 mx-auto mb-2.5" />
              <p className="font-black text-base sm:text-lg text-white">변함없는 겉바속촉 맛</p>
              <p className="text-sm sm:text-base text-stone-200 font-medium mt-1.5 break-keep">100% 하림 신선육의 정직한 조리</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
