import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/franchiseData';
import { Sparkles, ShoppingBag, Beer, Check } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const [priceMode, setPriceMode] = useState<'takeout' | 'hall'>('takeout');

  return (
    <section id="menu" className="py-20 bg-white border-b border-[#E7E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-950 border border-yellow-300 font-black text-sm sm:text-base uppercase tracking-wider">
            시그니처 메뉴 라인업
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#2D1503] tracking-tight break-keep">
            옛날통닭 치킨 하면 생각나는 <span className="text-[#B91C1C]">바로 그 맛</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#2D1503] font-bold leading-relaxed break-keep">
            얇고 바삭한 황금빛 껍질과 촉촉한 육즙의 정통 옛날통닭부터 특제 양념, 별미 닭똥집까지.
            <br className="hidden sm:inline" />
            남녀노소 누구나 부담 없이 매일 찾게 되는 핵심 메뉴 라인업입니다.
          </p>
        </div>

        {/* Pricing Mode Toggle: Takeout vs Hall */}
        <div className="flex flex-col items-center justify-center gap-3 mb-10 sm:mb-12">
          <div className="inline-flex p-1.5 rounded-2xl sm:rounded-full bg-[#FDFBF7] border border-[#E7E2D8] shadow-inner max-w-full overflow-hidden">
            <button
              onClick={() => setPriceMode('takeout')}
              id="menu-toggle-takeout"
              className={`cursor-pointer flex items-center justify-center gap-2 px-5 sm:px-7 py-3 rounded-xl sm:rounded-full text-sm sm:text-base font-black transition-all duration-200 ${
                priceMode === 'takeout'
                  ? 'bg-[#B91C1C] text-white shadow-xs'
                  : 'text-[#2D1503] hover:text-black'
              }`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>포장 특별할인가</span>
              <span className={`text-xs sm:text-sm px-2.5 py-0.5 rounded-full font-black ${priceMode === 'takeout' ? 'bg-red-950/70 text-white' : 'bg-yellow-200 text-yellow-900'}`}>
                추천
              </span>
            </button>
            <button
              onClick={() => setPriceMode('hall')}
              id="menu-toggle-hall"
              className={`cursor-pointer flex items-center justify-center gap-2 px-5 sm:px-7 py-3 rounded-xl sm:rounded-full text-sm sm:text-base font-black transition-all duration-200 ${
                priceMode === 'hall'
                  ? 'bg-[#2D1503] text-white shadow-xs'
                  : 'text-[#2D1503] hover:text-black'
              }`}
            >
              <Beer className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>매장 홀 식사가</span>
            </button>
          </div>

          <p className="text-sm sm:text-base text-[#2D1503] font-bold text-center break-keep px-2">
            💡 옛날통닭 포장 주문 시 한마리 <strong className="text-[#B91C1C] text-base sm:text-lg font-black">9,900원</strong> / 두마리 <strong className="text-[#B91C1C] text-base sm:text-lg font-black">18,000원</strong>의 강력한 고객 집객 효과!
          </p>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {MENU_ITEMS.map((item) => {
            const currentPrice = priceMode === 'takeout' ? item.takeoutPrice : item.hallPrice;

            return (
              <div
                key={item.id}
                id={`menu-card-${item.id}`}
                className="bg-[#FDFBF7] rounded-2xl border border-[#E7E2D8] overflow-hidden shadow-xs hover:shadow-md hover:border-[#B91C1C] transition-all duration-300 flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] sm:aspect-[4/3] min-h-[260px] sm:min-h-[290px] overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3.5 py-1 rounded-full bg-[#B91C1C] text-white font-black text-sm shadow-md">
                        {item.badge}
                      </span>
                    </div>
                  )}

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-xl shadow-xs border border-[#E7E2D8]">
                    <span className="text-xs sm:text-sm text-[#5C320A] font-bold block leading-tight">
                      {priceMode === 'takeout' ? '포장가' : '홀가격'}
                    </span>
                    <span className="text-base sm:text-lg font-black text-[#2D1503] tracking-tight">
                      {currentPrice}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs sm:text-sm font-bold px-3 py-1 rounded-md bg-yellow-100 text-[#2D1503] border border-yellow-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-[#2D1503] tracking-tight mb-2 group-hover:text-[#B91C1C] transition-colors break-keep">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[#2D1503] text-base font-semibold leading-relaxed mb-4 break-keep">
                      {item.description}
                    </p>

                    {/* Feature points */}
                    <ul className="space-y-2 pt-3 border-t border-[#E7E2D8]">
                      {item.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-base font-bold text-[#2D1503]">
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#B91C1C] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Price Summary Row */}
                  <div className="pt-3.5 border-t border-[#E7E2D8] flex items-center justify-between text-base sm:text-lg">
                    <span className="text-[#5C320A] font-bold">
                      {priceMode === 'takeout' ? '포장 특가' : '홀 식사 기준'}
                    </span>
                    <span className="font-black text-[#2D1503]">
                      {item.name === '옛날통닭' && priceMode === 'takeout' ? (
                        <span className="text-[#B91C1C] font-black">한마리 9,900원 / 두마리 18,000원</span>
                      ) : (
                        currentPrice
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Menu Bottom Highlights: Harim 100% */}
        <div className="mt-10 sm:mt-12 bg-[#FDFBF7] rounded-2xl p-6 sm:p-8 border border-[#E7E2D8] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="flex items-start sm:items-center gap-4 text-left">
            <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-yellow-100 flex items-center justify-center text-[#2D1503] shrink-0 mt-1 sm:mt-0">
              <Sparkles className="w-6 sm:w-7 h-6 sm:h-7 text-[#B91C1C]" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-black text-[#2D1503] break-keep">
                100% 국내산 하림 신선육 & 매일 정제하는 깨끗한 전용 튀김유
              </h4>
              <p className="text-base text-[#2D1503] font-semibold mt-1.5 leading-relaxed break-keep">
                냉동육이나 저가 수입육을 절대 사용하지 않습니다. 본사 콜드체인 직배송으로 언제나 신선한 닭고기만을 가맹점에 공급합니다.
              </p>
            </div>
          </div>

          <a
            href="#inquiry"
            className="cursor-pointer w-full sm:w-auto shrink-0 px-7 py-4 rounded-full bg-[#B91C1C] hover:bg-red-800 text-white font-black text-base shadow-xs active:scale-95 transition-all text-center"
          >
            가맹 상담 신청하기
          </a>
        </div>
      </div>
    </section>
  );
};
