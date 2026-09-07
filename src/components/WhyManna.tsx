import React from 'react';
import { WHY_MANNA_CARDS } from '../data/franchiseData';
import { UtensilsCrossed, Store, Coins, GraduationCap, ArrowUpRight } from 'lucide-react';

export const WhyManna: React.FC = () => {
  const icons = [
    <UtensilsCrossed className="w-6 h-6" key="utensils" />,
    <Store className="w-6 h-6" key="store" />,
    <Coins className="w-6 h-6" key="coins" />,
    <GraduationCap className="w-6 h-6" key="grad" />
  ];

  return (
    <section id="why-manna" className="py-20 bg-[#FDFBF7] border-y border-[#E7E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-950 border border-yellow-300 font-black text-sm sm:text-base uppercase tracking-wider">
            만나옛날통닭만의 차별화 경쟁력
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#2D1503] tracking-tight break-keep">
            오래 사랑받는 장사는 <span className="text-[#B91C1C]">분명한 이유</span>가 있습니다
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#2D1503] font-bold leading-relaxed break-keep">
            반짝 유행하고 사라지는 유행성 프랜차이즈가 아닙니다.
            <br className="hidden sm:inline" />
            수십 년간 검증된 대중성과 탄탄한 3-Way 구조로 동네 상권에서 롱런하는 통닭집을 만듭니다.
          </p>
        </div>

        {/* 4 Core Competitiveness Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {WHY_MANNA_CARDS.map((card, idx) => (
            <div
              key={card.number}
              id={`why-card-${idx}`}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E2D8] shadow-xs hover:shadow-md hover:border-[#B91C1C] transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Number & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-100 text-[#2D1503] group-hover:bg-[#B91C1C] group-hover:text-white transition-colors duration-200 flex items-center justify-center">
                    {icons[idx]}
                  </div>
                  <span className="text-2xl font-black text-stone-300 group-hover:text-yellow-700/40 transition-colors">
                    {card.number}
                  </span>
                </div>

                {/* Badge */}
                <div className="mb-2.5">
                  <span className="inline-block px-3 py-1 rounded-md bg-yellow-50 text-[#2D1503] border border-yellow-200/80 font-black text-sm sm:text-base">
                    {card.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-black text-[#2D1503] mb-2.5 tracking-tight group-hover:text-[#B91C1C] transition-colors break-keep">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-[#2D1503] text-base font-medium leading-relaxed mb-4 break-keep">
                  {card.description}
                </p>
              </div>

              {/* Bottom Feature Tag */}
              <div className="pt-3.5 border-t border-[#E7E2D8]/80 flex items-center justify-between">
                <span className="text-sm sm:text-base font-black text-[#B91C1C]">
                  {card.highlight}
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#5C320A]/50 group-hover:text-[#B91C1C] transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Core Statement Banner */}
        <div className="mt-8 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-[#E7E2D8] shadow-xs flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C]" />
              <span className="text-sm sm:text-base font-black text-[#B91C1C] uppercase tracking-wider">안정적인 직공급 물류망</span>
            </div>
            <h4 className="text-lg sm:text-xl font-black text-[#2D1503] break-keep">
              100% 하림 국내산 생닭 직공급 & 본사 전용 배합 파우더
            </h4>
            <p className="text-base text-[#2D1503] font-medium leading-relaxed break-keep">
              안정된 원자재 유통망을 통해 가격 변동의 위험을 낮추고, 균일한 최고급 품질의 겉바속촉 맛을 보장합니다.
            </p>
          </div>

          <a
            href="#inquiry"
            className="cursor-pointer w-full md:w-auto text-center shrink-0 px-7 py-4 rounded-full bg-[#2D1503] text-white hover:bg-black active:scale-95 font-black text-base transition-all shadow-xs"
          >
            가맹 상담 문의하기
          </a>
        </div>
      </div>
    </section>
  );
};
