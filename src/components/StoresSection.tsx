import React, { useState } from 'react';
import { STORES } from '../data/franchiseData';
import { MapPin, Phone, Clock, ExternalLink, Copy, Check, Navigation, ChevronRight } from 'lucide-react';

export const StoresSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyAddress = (id: string, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="stores" className="py-20 bg-[#FDFBF7] border-b border-[#E7E2D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-950 border border-yellow-300 font-black text-sm sm:text-base uppercase tracking-wider">
            운영 중인 직영·가맹점
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#2D1503] tracking-tight break-keep">
            우리 동네에서 만나는 <span className="text-[#B91C1C]">만나옛날통닭</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#2D1503] font-bold leading-relaxed break-keep">
            실제 매장에서 검증된 높은 재방문율과 문전성시 현장.
            <br className="hidden sm:inline" />
            현장에 직접 방문하셔서 정성 가득한 맛과 활기찬 매장 분위기를 경험해 보세요.
          </p>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {STORES.map((store) => (
            <div
              key={store.id}
              id={`store-card-${store.id}`}
              className="bg-white rounded-2xl border border-[#E7E2D8] overflow-hidden shadow-xs hover:shadow-md hover:border-[#B91C1C] transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Store Photo */}
              <div className="relative aspect-[16/10] sm:aspect-auto sm:h-96 md:h-[420px] lg:h-[460px] overflow-hidden bg-stone-900">
                <img
                  src={store.image}
                  alt={store.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Region Tag */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#B91C1C] text-white font-black text-sm sm:text-base shadow-md">
                    {store.tag}
                  </span>
                </div>

                {/* Overlay Store Name */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight">{store.name}</h3>
                  <p className="text-base text-yellow-300 font-extrabold mt-0.5">{store.branchName}</p>
                </div>
              </div>

              {/* Store Details Body */}
              <div className="p-5 sm:p-7 space-y-4 sm:space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3.5">
                  {/* Address */}
                  <div className="flex items-start justify-between gap-2.5 text-base sm:text-lg">
                    <div className="flex items-start gap-2.5 text-[#2D1503]">
                      <MapPin className="w-5 h-5 text-[#B91C1C] shrink-0 mt-0.5" />
                      <span className="font-extrabold leading-snug break-keep">{store.address}</span>
                    </div>
                    <button
                      onClick={() => handleCopyAddress(store.id, store.address)}
                      className="cursor-pointer shrink-0 text-sm px-3.5 py-1.5 rounded-lg bg-yellow-50 border border-yellow-200 hover:bg-yellow-100 active:scale-95 text-[#2D1503] font-black inline-flex items-center gap-1 transition-colors"
                      title="주소 복사"
                    >
                      {copiedId === store.id ? (
                        <>
                          <Check className="w-4 h-4 text-green-700" />
                          <span className="text-green-800">복사완료</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#5C320A]" />
                          <span>주소복사</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2.5 text-base sm:text-lg text-[#2D1503]">
                    <Phone className="w-5 h-5 text-[#B91C1C] shrink-0" />
                    <span className="font-bold">매장 전화:</span>
                    <a
                      href={`tel:${store.phone}`}
                      className="font-black text-[#2D1503] hover:text-[#B91C1C] underline underline-offset-4 transition-colors text-base sm:text-lg"
                    >
                      {store.phone}
                    </a>
                  </div>

                  {/* Operating Hours */}
                  <div className="flex items-center gap-2.5 text-base sm:text-lg text-[#2D1503]">
                    <Clock className="w-5 h-5 text-amber-700 shrink-0" />
                    <span className="font-bold">영업 시간:</span>
                    <span className="text-[#2D1503] font-bold">{store.openHours}</span>
                  </div>

                  {/* Highlights Tags */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {store.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-sm sm:text-base font-bold px-3.5 py-1 rounded-md bg-yellow-100/80 border border-yellow-300/80 text-[#2D1503]"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Map & Call Actions */}
                <div className="pt-4 border-t border-[#E7E2D8] grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5">
                  <a
                    href={`tel:${store.phone}`}
                    className="col-span-2 sm:flex-1 py-3.5 px-3 rounded-xl bg-[#2D1503] text-white hover:bg-black active:scale-95 font-black text-base sm:text-lg text-center flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <Phone className="w-4 h-4" />
                    <span>매장 전화 바로걸기</span>
                  </a>

                  <a
                    href={store.naverMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-3 rounded-xl bg-[#03C75A] text-white hover:bg-[#02b350] active:scale-95 font-black text-base sm:text-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>네이버 지도</span>
                  </a>

                  <a
                    href={store.kakaoMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-3 rounded-xl bg-[#FEE500] text-[#191919] hover:bg-[#ebd300] active:scale-95 font-black text-base sm:text-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>카카오맵</span>
                  </a>
                </div>

                {store.id === 'dalbit' && (
                  <a
                    href="#reviews"
                    className="mt-2.5 py-3 px-4 rounded-xl bg-emerald-50 text-[#03C75A] hover:bg-emerald-100 active:scale-98 font-black text-base sm:text-lg flex items-center justify-center gap-2 border border-emerald-200/80 transition-all shadow-2xs"
                  >
                    <span>⭐ 네이버 방문자 영수증 실후기 11선 사진과 함께 보기</span>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Store Expansion Callout */}
        <div className="mt-8 sm:mt-12 text-center p-6 sm:p-8 rounded-2xl bg-yellow-50/90 border border-yellow-200/80 max-w-2xl mx-auto">
          <p className="text-base sm:text-lg font-black text-[#2D1503] break-keep">
            전국 주요 권역 신규 가맹점 적극 모집 중!
          </p>
          <p className="text-sm sm:text-base text-[#2D1503] font-semibold mt-1.5 break-keep">
            원하시는 지역의 첫 번째 만나옛날통닭 주인이 되어 안정적인 선점 효과를 누려보세요.
          </p>
          <a
            href="#inquiry"
            className="inline-block w-full sm:w-auto mt-4 px-7 py-3.5 rounded-full bg-[#B91C1C] hover:bg-red-800 text-white font-black text-sm sm:text-base transition-all shadow-xs active:scale-95"
          >
            내 희망 지역 출점 가능여부 확인하기
          </a>
        </div>
      </div>
    </section>
  );
};
