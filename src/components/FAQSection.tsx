import React, { useState } from 'react';
import { FAQS, COMPANY_INFO } from '../data/franchiseData';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-white border-b border-[#E7E2D8] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-950 border border-yellow-300 font-black text-sm sm:text-base uppercase tracking-wider">
            자주 묻는 질문
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#2D1503] tracking-tight break-keep">
            예비 점주님들이 <span className="text-[#B91C1C]">가장 많이 묻는 질문</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#2D1503] font-bold leading-relaxed break-keep">
            궁금하신 사항을 미리 확인해 보세요. 더 자세한 문의는 언제든 본사로 편하게 연락 주시면 친절히 상담해 드립니다.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 sm:space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                id={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#B91C1C] bg-yellow-50/40 shadow-xs'
                    : 'border-[#E7E2D8] bg-[#FDFBF7] hover:border-yellow-700/50'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-4 sm:py-5 px-4 sm:px-6 text-left flex items-start sm:items-center justify-between gap-3 sm:gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg bg-yellow-100 text-[#2D1503] font-black text-sm sm:text-base flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                      Q
                    </span>
                    <span className="font-black text-[#2D1503] text-base sm:text-xl tracking-tight leading-snug break-keep">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 sm:w-9 h-8 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-yellow-200 text-[#2D1503]' : 'bg-[#E7E2D8]/80 text-[#2D1503]'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1 text-base leading-relaxed border-t border-[#E7E2D8]">
                    <div className="flex items-start gap-3.5 bg-white p-4 sm:p-6 rounded-xl border border-[#E7E2D8] mt-2">
                      <span className="w-7 h-7 rounded-md bg-[#B91C1C] text-white font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                        A
                      </span>
                      <p className="text-[#2D1503] font-semibold leading-relaxed break-keep text-base sm:text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Additional Questions Prompt */}
        <div className="mt-8 sm:mt-12 text-center p-6 sm:p-7 rounded-2xl bg-[#FDFBF7] border border-[#E7E2D8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center text-[#2D1503] shrink-0">
              <HelpCircle className="w-7 h-7 text-[#B91C1C]" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-black text-[#2D1503] break-keep">찾으시는 질문이 없으신가요?</p>
              <p className="text-base text-[#452005] font-semibold break-keep mt-0.5">
                본사 가맹 지원팀(
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="font-black text-[#B91C1C] underline hover:text-red-800"
                  title="터치 시 대표전화 통화 연결"
                >
                  {COMPANY_INFO.phone}
                </a>
                {' '}/ 직통{' '}
                <a
                  href={`tel:${COMPANY_INFO.directPhone}`}
                  className="font-black text-[#B91C1C] underline hover:text-red-800"
                  title="터치 시 직통전화 통화 연결"
                >
                  {COMPANY_INFO.directPhone}
                </a>
                )으로 문의하시면 빠르고 상세하게 안내해 드립니다.
              </p>
            </div>
          </div>

          <a
            href={`tel:${COMPANY_INFO.phone}`}
            onClick={() => {
              window.location.href = `tel:${COMPANY_INFO.phone}`;
            }}
            className="cursor-pointer w-full sm:w-auto shrink-0 px-7 py-4 rounded-full bg-[#B91C1C] hover:bg-red-800 text-white font-black text-base flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all text-center"
          >
            <PhoneCall className="w-5 h-5 text-yellow-300" />
            <span>{COMPANY_INFO.phone} 바로 통화하기</span>
          </a>
        </div>
      </div>
    </section>
  );
};
