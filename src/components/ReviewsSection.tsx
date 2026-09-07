import React, { useState } from 'react';
import { CUSTOMER_REVIEWS, REVIEW_SUMMARY_TAGS, STORES } from '../data/franchiseData';
import { CustomerReview } from '../types';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  Receipt, 
  Sparkles, 
  MapPin, 
  Quote, 
  Camera, 
  ChevronRight,
  UtensilsCrossed,
  X
} from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'crispy' | 'cost' | 'chimaek' | 'friendly'>('all');
  const [activePhotoModal, setActivePhotoModal] = useState<CustomerReview | null>(null);

  const filterTabs = [
    { key: 'all', label: '전체 후기', count: CUSTOMER_REVIEWS.length },
    { key: 'crispy', label: '🍗 바삭함·맛 극찬', count: CUSTOMER_REVIEWS.filter(r => r.category === 'crispy').length },
    { key: 'cost', label: '💰 압도적 갓성비', count: CUSTOMER_REVIEWS.filter(r => r.category === 'cost').length },
    { key: 'chimaek', label: '🍺 시원한 치맥·모임', count: CUSTOMER_REVIEWS.filter(r => r.category === 'chimaek').length },
    { key: 'friendly', label: '✨ 친절·매장 쾌적', count: CUSTOMER_REVIEWS.filter(r => r.category === 'friendly').length },
  ] as const;

  const filteredReviews = selectedCategory === 'all' 
    ? CUSTOMER_REVIEWS 
    : CUSTOMER_REVIEWS.filter(r => r.category === selectedCategory);

  const dalbitStore = STORES.find(s => s.id === 'dalbit');

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAF7F0] border-b border-[#E7E2D8] relative overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-red-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#03C75A]/10 border border-[#03C75A]/30 text-[#03C75A] text-sm sm:text-base font-bold mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#03C75A] animate-pulse" />
            <Receipt className="w-4 h-4 text-[#03C75A]" />
            네이버 플레이스 방문자 영수증 인증 100% 실후기
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#2D1503] tracking-tight leading-tight mb-4">
            손님이 직접 증명하는 <span className="text-[#C82A1A] underline decoration-amber-400 decoration-wavy underline-offset-8">맛과 갓성비</span>
          </h2>
          
          <p className="text-base sm:text-xl text-[#6B5E51] leading-relaxed font-medium">
            <strong className="text-[#2D1503] font-bold">만나옛날통닭 달빛공원본점</strong>을 방문하신 고객님들이 남겨주신 솔직 담백한 리얼 영수증 사진과 평가입니다. 단골 손님의 입소문이 지속 가능한 매출의 핵심입니다.
          </p>
        </div>

        {/* Naver Place Real Sentiment Metrics Box */}
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-[#E7E2D8] shadow-xs mb-10 sm:mb-12">
          <div className="flex items-center gap-4 pb-6 border-b border-[#F0EBE1]">
            <div className="w-14 h-14 rounded-2xl bg-[#03C75A] text-white flex items-center justify-center font-black text-2xl shadow-sm">
              N
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-[#2D1503]">
                  만나옛날통닭 달빛공원본점
                </h3>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-emerald-50 text-[#03C75A] text-sm font-bold border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" /> 인증 매장
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#7A6E63] mt-0.5">
                인천 연수구 센트럴로 415 (송도 달빛축제공원역 도보 3분)
              </p>
            </div>
          </div>

          {/* Popular Review Keywords as badges */}
          <div className="pt-5">
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#8C7E72] mb-3">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>방문 고객들이 가장 많이 선택한 대표 키워드 요약</span>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {REVIEW_SUMMARY_TAGS.map((item, idx) => (
                <div
                  key={idx}
                  className={`px-3.5 py-1.5 rounded-xl text-sm sm:text-base font-bold flex items-center gap-1.5 transition-all ${
                    item.highlight
                      ? 'bg-[#C82A1A]/10 text-[#C82A1A] border border-[#C82A1A]/30'
                      : 'bg-[#F7F4EC] text-[#4A3B2C] border border-[#E7E2D8]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className={`text-sm px-2 py-0.5 rounded-full font-black ${
                    item.highlight ? 'bg-[#C82A1A] text-white' : 'bg-[#E7E2D8] text-[#5A4B3C]'
                  }`}>
                    +{item.count}
                  </span>
                </div>
              ))}
              <div className="px-3.5 py-1.5 rounded-xl text-sm sm:text-base font-bold bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1">
                <span>⭐ 가심비 1위</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl text-sm sm:text-base font-bold bg-blue-50 text-blue-900 border border-blue-200 flex items-center gap-1">
                <span>🍺 살얼음 생맥주 극찬</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filterTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedCategory(tab.key)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                selectedCategory === tab.key
                  ? 'bg-[#2D1503] text-amber-300 shadow-sm scale-102'
                  : 'bg-white text-[#6B5E51] border border-[#E7E2D8] hover:bg-[#F4EFE6] hover:text-[#2D1503]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-sm px-2.5 py-0.5 rounded-full ${
                selectedCategory === tab.key ? 'bg-amber-400/30 text-amber-200 font-black' : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              id={`customer-${review.id}`}
              className="bg-white rounded-2xl border border-[#E7E2D8] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header: Author Profile & Verification */}
              <div className="p-5 pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-400 to-red-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-[#2D1503] text-base sm:text-lg">
                          {review.author}
                        </span>
                      </div>
                      <span className="text-sm sm:text-base text-[#8C7E72] font-medium">
                        {review.stats}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#03C75A] text-sm font-bold">
                    <Receipt className="w-4 h-4" />
                    <span>영수증 인증</span>
                  </div>
                </div>

                {/* Visit Context Metadata */}
                <div className="px-3.5 py-1.5 rounded-lg bg-[#FAF7F0] border border-[#F0EBE1] text-sm sm:text-base text-[#7A6E63] font-medium flex items-center gap-1.5">
                  <span className="truncate">{review.visitInfo}</span>
                </div>
              </div>

              {/* Photo Card with Dish Label & Zoom Trigger */}
              <div className="px-5">
                <div 
                  onClick={() => setActivePhotoModal(review)}
                  className="relative aspect-[4/3] sm:aspect-[4/3] min-h-[240px] sm:min-h-[260px] rounded-xl overflow-hidden cursor-pointer group/img bg-[#F0EBE1]"
                >
                  <img
                    src={review.image}
                    alt={review.dishName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-80 group-hover/img:opacity-90 transition-opacity" />
                  
                  {/* Dish Badge */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-sm sm:text-base font-bold bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20 truncate">
                      🍽️ {review.dishName}
                    </span>
                    <span className="text-sm flex items-center gap-1 bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-md text-amber-200 font-semibold shrink-0">
                      <Camera className="w-3.5 h-3.5" /> 크게보기
                    </span>
                  </div>

                  {/* Highlight Pill */}
                  {review.highlightTag && (
                    <div className="absolute top-2.5 left-3">
                      <span className="text-sm font-black px-3 py-1 rounded-md bg-[#C82A1A] text-white shadow-sm">
                        {review.highlightTag}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Review Quote Body */}
              <div className="p-5 pt-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start gap-2 mb-2">
                    <Quote className="w-4 h-4 text-[#C82A1A] shrink-0 mt-1 rotate-180 opacity-60" />
                    <p className="text-base sm:text-lg text-[#2D1503] font-semibold leading-relaxed">
                      "{review.content}"
                    </p>
                  </div>
                </div>

                {/* Tags Section */}
                <div className="pt-4 mt-3 border-t border-[#F0EBE1]">
                  <div className="flex flex-wrap gap-1.5">
                    {review.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center px-3 py-1 rounded-md bg-[#F4EFE6] text-[#6B5E51] text-sm sm:text-base font-semibold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust & Conversion Callout */}
        <div className="mt-14 sm:mt-18 bg-linear-to-br from-[#2D1503] to-[#432007] rounded-3xl p-7 sm:p-10 text-white relative overflow-hidden shadow-lg border border-amber-900/40">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-sm sm:text-base font-bold mb-3 border border-amber-400/30">
                <Sparkles className="w-4 h-4" />
                예비 가맹점주님을 위한 리얼 데이터
              </div>
              <h3 className="text-xl sm:text-3xl font-black tracking-tight leading-snug mb-3">
                “광고보다 강력한 것은 <span className="text-amber-400">손님의 자발적인 재방문 영수증</span>입니다”
              </h3>
              <p className="text-base sm:text-lg text-amber-100/90 leading-relaxed">
                만나옛날통닭은 겉치레 마케팅 대신, 1마리 9,900원 포장 특가와 100% 하림 신선육의 압도적인 맛으로 우리 동네 단골을 탄탄히 다집니다. 퇴근길 포장, 저녁 치맥 홀 손님, 주말 배달까지 3중 매출 구조로 검증된 수익성을 직접 만나보세요.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href={dalbitStore?.naverMapUrl || "https://map.naver.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-base text-center border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                네이버 플레이스 지도 확인
              </a>
              <a
                href="#inquiry"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#2D1503] font-black text-base text-center shadow-md transition-all flex items-center justify-center gap-2"
              >
                1:1 맞춤 창업 무료 상담
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Full Photo Modal */}
      {activePhotoModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActivePhotoModal(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] sm:aspect-auto sm:h-[480px] md:h-[540px] bg-black">
              <img
                src={activePhotoModal.image}
                alt={activePhotoModal.dishName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActivePhotoModal(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-4 text-white">
                <span className="text-sm px-3 py-1 rounded-md bg-[#C82A1A] font-bold">
                  {activePhotoModal.dishName}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-black text-[#2D1503] text-lg">
                    {activePhotoModal.author}
                  </span>
                  <span className="text-sm text-gray-500 font-medium">
                    ({activePhotoModal.stats})
                  </span>
                </div>
                <span className="px-3 py-1 rounded-md bg-emerald-50 text-[#03C75A] font-bold text-sm sm:text-base border border-emerald-200 flex items-center gap-1.5">
                  <Receipt className="w-4 h-4" /> 네이버 영수증 인증
                </span>
              </div>

              <p className="text-base sm:text-lg text-[#2D1503] font-medium leading-relaxed mb-4">
                "{activePhotoModal.content}"
              </p>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                {activePhotoModal.tags.map((tag, idx) => (
                  <span key={idx} className="text-sm px-3 py-1 rounded-md bg-gray-100 text-gray-700 font-semibold">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
