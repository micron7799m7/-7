import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/franchiseData';
import { TermsModal } from './TermsModal';
import { getKakaoChannelConfig, KakaoChannelConfig } from '../services/inquiryService';
import { Phone, Mail, MapPin, ArrowUp, MessageCircle, Download } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);
  const [channelConfig, setChannelConfig] = useState<KakaoChannelConfig>(getKakaoChannelConfig());

  useEffect(() => {
    const handleChannelUpdate = (e: any) => {
      setChannelConfig(e.detail || getKakaoChannelConfig());
    };
    window.addEventListener('manna:channel_updated', handleChannelUpdate);
    return () => window.removeEventListener('manna:channel_updated', handleChannelUpdate);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#1A0B02] text-[#E7E2D8] pt-14 pb-28 sm:pb-16 border-t border-[#422006]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-10 border-b border-[#422006]">
          {/* Column 1: Brand & Slogan */}
          <div className="md:col-span-5 space-y-4">
            <Logo variant="dark" size="lg" />
            <p className="text-sm sm:text-base text-stone-200 max-w-sm leading-relaxed pt-2 break-keep font-medium">
              {COMPANY_INFO.subSlogan}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-sm sm:text-base px-3.5 py-1.5 rounded-md bg-[#3A1803] text-yellow-300 font-bold border border-yellow-700/50">
                100% 하림 국내산 신선육
              </span>
              <span className="text-sm sm:text-base px-3.5 py-1.5 rounded-md bg-[#3A1803] text-yellow-300 font-bold border border-yellow-700/50">
                1:1 맞춤 소자본 창업
              </span>
            </div>
          </div>

          {/* Column 2: Headquarters Contact Details */}
          <div className="md:col-span-4 space-y-3.5">
            <h4 className="text-base font-black text-white uppercase tracking-wider">
              본사 가맹 지원 센터
            </h4>
            <div className="space-y-2 text-sm sm:text-base leading-relaxed text-stone-300">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    onClick={() => {
                      window.location.href = `tel:${COMPANY_INFO.phone}`;
                    }}
                    className="font-black text-lg sm:text-xl text-yellow-300 hover:underline cursor-pointer"
                    title="터치 시 대표전화로 바로 연결"
                  >
                    가맹문의: {COMPANY_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 pl-6">
                  <a
                    href={`tel:${COMPANY_INFO.directPhone}`}
                    onClick={() => {
                      window.location.href = `tel:${COMPANY_INFO.directPhone}`;
                    }}
                    className="font-black text-base sm:text-lg text-amber-300 hover:underline cursor-pointer flex items-center gap-1.5"
                    title="터치 시 가맹직통 번호로 바로 연결"
                  >
                    <span className="text-xs font-bold text-stone-300">직통:</span>
                    <span>{COMPANY_INFO.directPhone} (24시 상담)</span>
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>이메일: {COMPANY_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#FEE500] text-[#3C1E1E] flex items-center justify-center shrink-0 font-black text-[9px]">
                  <MessageCircle className="w-3 h-3 fill-[#3C1E1E]" />
                </div>
                <a
                  href={channelConfig.chatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-sm sm:text-base text-yellow-300 hover:underline flex items-center gap-1.5"
                  title="카카오톡 비즈니스 채널 1:1 실시간 상담"
                >
                  <span>카카오톡 채널: {channelConfig.channelName} (1:1 상담)</span>
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span className="break-keep">본사: {COMPANY_INFO.address}</span>
              </div>
              <p className="text-stone-300 pt-1 font-medium text-sm sm:text-base">
                상담시간: {COMPANY_INFO.operatingHours}
              </p>
            </div>
          </div>

          {/* Column 3: Quick Navigation & Legal Links */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-base font-black text-white uppercase tracking-wider">
              빠른 이동
            </h4>
            <ul className="space-y-2.5 text-sm sm:text-base text-stone-300">
              <li>
                <a href="#why-manna" className="hover:text-yellow-300 transition-colors font-medium">
                  브랜드 경쟁력 소개
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-yellow-300 transition-colors font-medium">
                  대표 메뉴 및 포장 9,900원 특가
                </a>
              </li>
              <li>
                <a href="#cost" className="hover:text-yellow-300 transition-colors font-medium">
                  가맹 창업 비용 안내 (A/B타입)
                </a>
              </li>
              <li>
                <a href="#stores" className="hover:text-yellow-300 transition-colors font-medium">
                  실제 매장 (송도달빛공원점/천안1호점)
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-yellow-300 transition-colors font-medium">
                  실제 고객 영수증 실후기 (네이버 플레이스)
                </a>
              </li>
              <li>
                <a href="#inquiry" className="text-yellow-400 font-black hover:underline">
                  1:1 무료 가맹상담 신청 →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Hosting & Source Download Quick Bar */}
        <div className="my-6 p-4 sm:p-5 rounded-2xl bg-[#3A1803] border border-yellow-600/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/20 text-yellow-300 flex items-center justify-center shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-2 justify-center md:justify-start">
                <span>가비아(Gabia) 웹호스팅 업로드 파일 다운로드</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">하얀 화면 해결 완료</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-300">
                상대경로(./)와 .htaccess 설정이 완비된 최신 파일입니다. 다운로드 후 가비아 html 폴더에 압축을 풀어주세요.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap justify-center">
            <a
              href="/gabia-upload-dist.zip"
              download="gabia-upload-dist.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
              title="가비아 웹호스팅 html 폴더에 바로 올릴 수 있는 수정된 파일 (39.9MB)"
            >
              <Download className="w-4 h-4" />
              <span>가비아 호스팅용(ZIP) 다운로드</span>
            </a>
            <a
              href="/manna-tongdak-homepage.zip"
              download="manna-tongdak-homepage.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer px-3.5 py-2.5 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 font-black text-xs sm:text-sm border border-yellow-400/40 flex items-center gap-2 transition-all active:scale-95"
              title="전체 개발 소스코드 압축파일 (46.0MB)"
            >
              <Download className="w-4 h-4" />
              <span>전체 소스코드(ZIP)</span>
            </a>
          </div>
        </div>

        {/* Corporate Legal Footer Row */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm sm:text-base text-stone-300">
          <div className="space-y-1 text-center md:text-left leading-relaxed">
            <p className="space-x-1.5 sm:space-x-2 break-keep">
              <span>상호: {COMPANY_INFO.legalName}</span>
              <span className="opacity-40">|</span>
              <span>대표자: {COMPANY_INFO.ceo}</span>
              <span className="opacity-40">|</span>
              <span>사업자등록번호: {COMPANY_INFO.businessNumber}</span>
            </p>
            <p className="opacity-80">
              Copyright © {COMPANY_INFO.legalName}. All Rights Reserved.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap justify-center md:justify-end">
            <a
              href="/gabia-upload-dist.zip"
              download="gabia-upload-dist.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500/40 text-xs flex items-center gap-1.5 transition-colors"
              title="가비아 웹호스팅(html 폴더)에 바로 업로드하는 압축파일 다운로드"
            >
              <Download className="w-3.5 h-3.5" />
              <span>가비아 호스팅 업로드용(ZIP)</span>
            </a>
            <span className="opacity-40 hidden sm:inline">|</span>
            <a
              href="/manna-tongdak-homepage.zip"
              download="manna-tongdak-homepage.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer px-3 py-1.5 rounded-lg bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-300 font-bold border border-yellow-400/40 text-xs flex items-center gap-1.5 transition-colors"
              title="바탕화면 등에 저장할 수 있는 홈페이지 전체 소스코드 압축파일 다운로드"
            >
              <Download className="w-3.5 h-3.5" />
              <span>전체 소스코드(ZIP)</span>
            </a>
            <span className="opacity-40 hidden sm:inline">|</span>
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('manna:open_admin_modal'));
              }}
              className="cursor-pointer hover:text-yellow-300 text-stone-300 transition-colors p-1 flex items-center gap-1 font-bold"
              title="가맹문의 접수내역 및 실시간 알림 관리 (비밀번호 인증)"
            >
              <span>가맹관리자 로그인</span>
            </button>
            <span className="opacity-40">|</span>
            <button
              onClick={() => setModalType('terms')}
              className="cursor-pointer hover:text-white transition-colors p-1"
            >
              이용약관
            </button>
            <span className="opacity-40">|</span>
            <button
              onClick={() => setModalType('privacy')}
              className="cursor-pointer hover:text-white transition-colors font-bold text-yellow-200 p-1"
            >
              개인정보처리방침
            </button>
            <span className="opacity-40">|</span>
            <button
              onClick={scrollToTop}
              className="cursor-pointer p-2.5 rounded-lg bg-[#3A1803] hover:bg-[#B91C1C] text-white transition-colors ml-2"
              title="맨 위로"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Terms & Privacy Modal */}
      <TermsModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        type={modalType || 'privacy'}
      />
    </footer>
  );
};
