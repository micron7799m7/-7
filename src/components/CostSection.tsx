import React, { useState } from 'react';
import { COST_PLANS } from '../data/franchiseData';
import { Check, Info, Sparkles, ArrowRight, Calculator } from 'lucide-react';

export const CostSection: React.FC = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<'A' | 'B' | 'C'>('A');

  const selectedPlan = COST_PLANS.find((p) => p.id === selectedPlanId) || COST_PLANS[0];

  return (
    <section id="cost" className="py-20 bg-[#FDFBF7] border-b border-[#E7E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-950 border border-yellow-300 font-black text-sm sm:text-base uppercase tracking-wider">
            투명한 창업 투자비용
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#2D1503] tracking-tight break-keep">
            창업 비용을 투명하게 <span className="text-[#B91C1C]">1:1 맞춤창업</span> 해드립니다
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#2D1503] font-bold leading-relaxed break-keep">
            불필요한 거품과 강제 조항을 완전히 걷어냈습니다.
            <br className="hidden sm:inline" />
            예비 점주님의 예산과 점포 여건에 맞춰 최적의 플랜(신규 표준 / 소자본 실속 / 업종변경)을 정직하게 제안합니다.
          </p>
        </div>

        {/* Loan Promotion Notice Banner */}
        <div id="cost-loan-notice" className="mb-10 p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border-2 border-[#B91C1C] shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-[#B91C1C] text-white text-sm font-black tracking-wide flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                  <span>NOTICE 공지</span>
                </span>
                <span className="text-sm sm:text-base font-black text-[#B91C1C] bg-red-100/80 border border-red-300 px-3 py-0.5 rounded-full">
                  본사 특별 금융지원 프로모션
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#2D1503] tracking-tight">
                본사협력 1000만원 무이자 대출 프로모션 진행 가능
              </h3>
              <p className="text-base sm:text-lg text-[#452005] font-bold leading-relaxed break-keep">
                초기 창업 자금 마련이 고민이신 예비 점주님을 위해 본사 협력 금융 연계를 통해 <strong>최대 1,000만원 무이자 대출 프로모션</strong>을 지원합니다.
                <br className="hidden sm:inline" />
                (신규 가맹 시 <strong>간판·외부 사인물 최대 500만원 지원</strong> 혜택과 중복 적용 가능!)
              </p>
            </div>
            <a
              href="#inquiry"
              className="cursor-pointer shrink-0 min-h-[50px] px-6 py-3.5 rounded-xl bg-[#B91C1C] hover:bg-red-800 text-white font-black text-base flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all text-center"
            >
              <span>1,000만원 무이자 대출 프로모션 상담 신청</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 3 Model Plan Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {COST_PLANS.map((plan) => {
            const isSelected = plan.id === selectedPlanId;

            return (
              <div
                key={plan.id}
                id={`cost-plan-card-${plan.id}`}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`cursor-pointer rounded-2xl p-5 sm:p-7 border-2 transition-all duration-200 flex flex-col justify-between relative bg-white ${
                  isSelected
                    ? 'border-[#B91C1C] shadow-lg ring-2 ring-[#B91C1C]/15 -translate-y-0.5'
                    : 'border-[#E7E2D8] hover:border-[#B91C1C]/50 shadow-xs'
                }`}
              >
                {/* Badge */}
                <div className="flex items-center justify-between mb-3.5">
                  <span
                    className={`px-3.5 py-1.5 rounded-full text-sm font-black ${
                      isSelected ? 'bg-[#B91C1C] text-white' : 'bg-[#FDFBF7] border border-[#E7E2D8] text-[#2D1503]'
                    }`}
                  >
                    {plan.badge}
                  </span>
                  <span className="text-sm sm:text-base font-black text-[#5C320A]">{plan.standardSize}</span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#2D1503] tracking-tight mb-1">
                    {plan.title}
                  </h3>
                  <p className="text-base text-[#5C320A] font-bold mb-4 leading-relaxed">
                    {plan.subtitle}
                  </p>

                  {/* Total Cost Display */}
                  <div className="p-4 rounded-xl bg-[#FDFBF7] border border-[#E7E2D8] mb-4 text-center">
                    <span className="text-sm sm:text-base text-[#5C320A] font-bold block mb-0.5">예상 창업비용</span>
                    <div className="text-2xl sm:text-3xl font-black tracking-tight">
                      <span className={isSelected ? 'text-[#B91C1C]' : 'text-[#2D1503]'}>
                        {plan.totalCost}
                      </span>
                    </div>
                  </div>

                  <p className="text-base text-[#2D1503] font-semibold leading-relaxed mb-4 break-keep">
                    {plan.description}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-[#E7E2D8] flex items-center justify-between">
                  <span className={`text-sm sm:text-base font-black ${isSelected ? 'text-[#B91C1C]' : 'text-[#5C320A]'}`}>
                    {isSelected ? '✓ 현재 선택됨 (아래 세부내역)' : '터치하여 세부내역 확인'}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-[#B91C1C] translate-x-1' : 'text-[#5C320A]/60'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Plan Detailed Breakdown Section */}
        <div className="bg-white rounded-2xl border border-[#E7E2D8] shadow-xs p-5 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E7E2D8]">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-yellow-100 text-yellow-950 border border-yellow-300 text-sm sm:text-base font-black">
                  {selectedPlan.title} 세부 견적
                </span>
                <span className="text-sm sm:text-base font-bold text-[#5C320A]">{selectedPlan.standardSize} 기준</span>
              </div>
              <h4 className="text-lg sm:text-2xl font-black text-[#2D1503] mt-2">
                투명한 공정별 상세 내역서
              </h4>
            </div>

            <div className="text-left sm:text-right bg-yellow-50/60 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-yellow-200/60">
              <span className="text-sm sm:text-base text-[#5C320A] font-bold block">총 예상 투자액</span>
              <span className="text-2xl sm:text-3xl font-black text-[#B91C1C]">
                {selectedPlan.totalCost}
              </span>
            </div>
          </div>

          {/* Mobile Breakdown View: Card-based for ultra readability on phones */}
          <div className="space-y-3 md:hidden">
            {selectedPlan.items.map((item, iIdx) => (
              <div key={iIdx} className="bg-[#FDFBF7] p-4 rounded-xl border border-[#E7E2D8]">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B91C1C] shrink-0 mt-0.5" />
                    <span className="font-black text-base text-[#2D1503]">{item.name}</span>
                  </div>
                  <span
                    className={`text-base font-black shrink-0 ${
                      item.cost.includes('지원') || item.cost.includes('면제')
                        ? 'text-[#B91C1C]'
                        : 'text-[#2D1503]'
                    }`}
                  >
                    {item.cost}
                  </span>
                </div>
                {item.note && (
                  <p className="text-base text-[#452005] font-semibold mt-2 pl-6 leading-relaxed break-keep">
                    {item.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Desktop & Tablet Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-base">
              <thead>
                <tr className="border-b border-[#E7E2D8] text-base text-[#2D1503] font-black uppercase tracking-wider bg-[#FDFBF7]">
                  <th className="py-3.5 px-4">구분 / 공정 항목</th>
                  <th className="py-3.5 px-4">예상 비용</th>
                  <th className="py-3.5 px-4">비고 및 본사 혜택 지원</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E2D8]/70 text-[#2D1503]">
                {selectedPlan.items.map((item, iIdx) => (
                  <tr key={iIdx} className="hover:bg-yellow-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#2D1503] flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#B91C1C] shrink-0" />
                      <span>{item.name}</span>
                    </td>
                    <td className="py-4 px-4 font-black text-[#2D1503]">
                      {item.cost.includes('지원') || item.cost.includes('면제') ? (
                        <span className="text-[#B91C1C] font-black">{item.cost}</span>
                      ) : (
                        item.cost
                      )}
                    </td>
                    <td className="py-4 px-4 text-base font-semibold text-[#452005]">
                      {item.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Additional Notes Box */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#FDFBF7] border border-[#E7E2D8] text-base text-[#2D1503] space-y-2 font-medium">
            <div className="flex items-center gap-2 font-black text-[#2D1503] text-lg">
              <Info className="w-5 h-5 text-[#B91C1C] shrink-0" />
              <span>창업 비용 유의사항 및 투명 보증</span>
            </div>
            <p className="leading-relaxed break-keep">
              * 별도 공사(철거, 전기증설, 외부 테라스/어닝, 화장실, 소방 등) 및 점포 보증금/권리금은 현장 상황에 따라 별도입니다.
            </p>
            <p className="leading-relaxed break-keep">
              * 가맹비 및 로열티 면제는 신규 선착순 가맹점 특별 프로모션 적용 기준입니다.
            </p>
            <p className="leading-relaxed break-keep">
              * 업종변경 및 실속형은 기존 설비를 최대한 실측 검토하여 추가 불필요 공사를 철저히 배제합니다.
            </p>
          </div>

          {/* Headquarters Trust Commitment */}
          <div className="pt-4 border-t border-[#E7E2D8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-[#B91C1C] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-base sm:text-lg font-black text-[#2D1503] break-keep">
                “처음이라도 만나옛날통닭과 함께라면 거품 없이 투명하게 시작할 수 있습니다.”
              </p>
            </div>

            <a
              href="#inquiry"
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#B91C1C] hover:bg-red-800 active:scale-95 text-base font-black text-white text-center transition-all shadow-xs"
            >
              내 점포 맞춤 견적 문의하기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
