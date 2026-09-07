import React from 'react';
import { RECOMMENDED_AREAS } from '../data/franchiseData';
import { Building2, Home, Footprints, Bike, Store, CheckCircle } from 'lucide-react';

export const RecommendedAreas: React.FC = () => {
  const icons = [
    <Building2 className="w-6 h-6" key="apt" />,
    <Home className="w-6 h-6" key="villa" />,
    <Footprints className="w-6 h-6" key="foot" />,
    <Bike className="w-6 h-6" key="bike" />,
    <Store className="w-6 h-6" key="shop" />
  ];

  return (
    <section id="areas" className="py-20 bg-white border-b border-[#E7E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-950 border border-yellow-300 font-black text-sm sm:text-base uppercase tracking-wider">
            추천 생활밀착형 입지
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#2D1503] tracking-tight break-keep">
            생활 가까이에 있을수록 <span className="text-[#B91C1C]">강해지는 브랜드</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#2D1503] font-bold leading-relaxed break-keep">
            임대료가 비싼 중심 번화가가 아니어도 괜찮습니다.
            <br className="hidden sm:inline" />
            이웃들의 퇴근길, 가족들의 주말 야식 동선과 맞닿은 생활 밀착형 입지에서 가장 강력한 생명력을 발휘합니다.
          </p>
        </div>

        {/* 5 Areas Grid + 1 Consultation Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {RECOMMENDED_AREAS.map((area, idx) => (
            <div
              key={idx}
              id={`area-card-${idx}`}
              className="bg-[#FDFBF7] rounded-2xl p-6 sm:p-7 border border-[#E7E2D8] shadow-xs hover:shadow-md hover:border-[#B91C1C] transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-yellow-100 text-[#2D1503] flex items-center justify-center mb-4 group-hover:bg-[#B91C1C] group-hover:text-white transition-colors duration-200">
                  {icons[idx]}
                </div>

                <h3 className="text-lg sm:text-xl font-black text-[#2D1503] mb-2.5 tracking-tight group-hover:text-[#B91C1C] transition-colors break-keep">
                  {area.title}
                </h3>

                <p className="text-[#2D1503] text-base font-medium leading-relaxed mb-4 break-keep">
                  {area.desc}
                </p>
              </div>

              <div className="pt-3.5 border-t border-[#E7E2D8]">
                <span className="text-sm sm:text-base font-black text-[#5C320A] block mb-2">상권 핵심 장점</span>
                <ul className="space-y-2">
                  {area.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-base text-[#2D1503] font-bold">
                      <CheckCircle className="w-4 h-4 text-[#B91C1C] shrink-0" />
                      <span className="break-keep">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* 6th Card: Free Location Analysis Service by Headquarters */}
          <div className="bg-[#2D1503] text-white rounded-2xl p-6 sm:p-7 border border-[#2D1503] shadow-md flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-md bg-[#B91C1C] text-white font-black text-sm sm:text-base mb-4">
                본사 무료 상권 분석 지원
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2.5 text-white break-keep">
                희망하시는 상권이 있나요?
              </h3>
              <p className="text-stone-100 text-base font-medium leading-relaxed mb-5 break-keep">
                점포가 없으셔도 걱정하지 마세요. 본사 전문 상권분석팀이 원하시는 지역의 유동인구, 배후 세대, 경쟁점을 직접 현장 실사하여 최적의 알짜 입지를 추천해 드립니다.
              </p>
            </div>

            <a
              href="#inquiry"
              className="w-full py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-[#2D1503] font-black text-base text-center active:scale-95 transition-all shadow-xs block"
            >
              무료 상권 분석 신청하기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
