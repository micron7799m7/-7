import React from 'react';
import { STARTUP_STEPS } from '../data/franchiseData';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const StartupSteps: React.FC = () => {
  return (
    <section id="steps" className="py-20 bg-[#FDFBF7] border-b border-[#E7E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-950 border border-yellow-300 font-black text-sm sm:text-base uppercase tracking-wider">
            6단계 체계적 창업 절차
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#2D1503] tracking-tight break-keep">
            처음 장사하는 분도 <span className="text-[#B91C1C]">이해하기 쉽게</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#2D1503] font-bold leading-relaxed break-keep">
            점포 선정부터 조리 교육, 오픈 현장 지원까지.
            <br className="hidden sm:inline" />
            본사 전문 슈퍼바이저가 단계별로 밀착 동행하여 불안감 없이 안전하게 오픈을 이끕니다.
          </p>
        </div>

        {/* Steps Grid (Desktop 3x2, Mobile 1 col) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 relative">
          {STARTUP_STEPS.map((item) => (
            <div
              key={item.number}
              id={`startup-step-${item.number}`}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E2D8] shadow-xs hover:shadow-md hover:border-[#B91C1C] transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Corner Watermark Number */}
              <div className="absolute top-2 right-4 text-5xl font-black text-stone-200 select-none group-hover:text-yellow-700/30 transition-colors pointer-events-none">
                {item.number}
              </div>

              <div>
                {/* Step Pill */}
                <div className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#2D1503] text-white font-black text-sm sm:text-base mb-3 shadow-xs">
                  <span>{item.step}</span>
                </div>

                {/* Step Title */}
                <h3 className="text-xl font-black text-[#2D1503] mb-2.5 tracking-tight group-hover:text-[#B91C1C] transition-colors break-keep">
                  {item.title}
                </h3>

                {/* Step Desc */}
                <p className="text-[#2D1503] text-base sm:text-lg font-semibold leading-relaxed mb-4 break-keep">
                  {item.desc}
                </p>

                {/* Sub details bullet points */}
                <ul className="space-y-2 pt-3 border-t border-[#E7E2D8]">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 text-base font-bold text-[#2D1503]">
                      <CheckCircle2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#B91C1C] shrink-0 mt-0.5" />
                      <span className="break-keep">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Step Indicator */}
              <div className="pt-4 mt-4 border-t border-[#E7E2D8]/80 flex items-center justify-between text-sm sm:text-base text-[#5C320A] font-bold">
                <span>단계별 1:1 밀착 전담</span>
                <span className="text-[#B91C1C] font-black group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  진행 안내 <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Fast Launch Banner */}
        <div className="mt-8 sm:mt-12 p-6 sm:p-7 rounded-2xl bg-yellow-50/90 border border-yellow-200/80 text-[#2D1503] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-sm sm:text-base font-black text-[#B91C1C] block uppercase tracking-wider">신속하고 안정적인 오픈</span>
            <p className="text-base sm:text-lg font-black text-[#2D1503] mt-1 break-keep">
              점포 확보 시 평균 2~3주 내 신속 오픈! (업종변경 시 기존 설비 활용 7~10일 만에 재오픈 가능)
            </p>
          </div>
          <a
            href="#inquiry"
            className="cursor-pointer w-full sm:w-auto text-center shrink-0 px-7 py-3.5 rounded-full bg-[#B91C1C] hover:bg-red-800 text-white font-black text-base sm:text-lg shadow-xs active:scale-95 transition-transform"
          >
            내 일정 상담하기
          </a>
        </div>
      </div>
    </section>
  );
};
