import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { COMPANY_INFO } from '../data/franchiseData';
import { NoticeBanner } from './NoticeBanner';
import { Phone, Menu as MenuIcon, X, ChevronRight, Sparkles, ShieldCheck, MessageCircle } from 'lucide-react';
import { getKakaoChannelConfig, KakaoChannelConfig } from '../services/inquiryService';

interface HeaderProps {
  onOpenInquiryModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInquiryModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [channelConfig, setChannelConfig] = useState<KakaoChannelConfig>(getKakaoChannelConfig());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const handleChannelUpdate = (e: any) => {
      setChannelConfig(e.detail || getKakaoChannelConfig());
    };
    window.addEventListener('manna:channel_updated', handleChannelUpdate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('manna:channel_updated', handleChannelUpdate);
    };
  }, []);

  const navItems = [
    { label: '브랜드 소개', href: '#why-manna' },
    { label: '대표 메뉴', href: '#menu' },
    { label: '창업 경쟁력', href: '#steps' },
    { label: '추천 상권', href: '#areas' },
    { label: '실제 매장', href: '#stores' },
    { label: '고객 후기', href: '#reviews' },
    { label: '가맹 비용', href: '#cost' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 115;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector('#inquiry');
    if (element) {
      const headerOffset = 115;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else if (onOpenInquiryModal) {
      onOpenInquiryModal();
    }
  };

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 right-0 z-50 shadow-xs transition-all duration-300"
    >
      {/* Primary Navigation Bar */}
      <div
        className={`transition-all duration-200 border-b border-[#E7E2D8] ${
          isScrolled
            ? 'bg-[#FDFBF7]/95 backdrop-blur-md py-2 sm:py-2.5'
            : 'bg-[#FDFBF7]/98 backdrop-blur-sm py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group transition-transform active:scale-95"
              aria-label="만나옛날통닭 홈으로 이동"
            >
              <Logo size="md" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-7" aria-label="메인 메뉴">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-base font-bold text-[#2D1503] hover:text-[#B91C1C] transition-colors py-1 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B91C1C] transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Desktop Right CTA Section */}
            <div className="hidden sm:flex items-center space-x-3">
              {/* Kakao Channel Chat Button */}
              <a
                href={channelConfig.chatUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="header-kakao-btn"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#FEE500] hover:bg-[#FDD800] text-[#3C1E1E] font-black text-sm shadow-xs border border-[#E6CF00] transition-all hover:scale-105 active:scale-95"
                title="카카오톡 비즈니스 채널 1:1 채팅"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-[#3C1E1E]" />
                <span>카톡 1:1상담</span>
              </a>

              {/* Phone Call Button */}
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                id="header-phone-btn"
                className="flex items-center gap-2 px-2.5 py-1.5 text-[#2D1503] hover:text-[#B91C1C] transition-colors group"
                title="본사 가맹상담 직통전화"
              >
                <div className="w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-900 group-hover:bg-red-100 group-hover:text-[#B91C1C] transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold text-[#5C320A] leading-none">가맹문의 / 직통</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-black tracking-tight text-[#2D1503] leading-tight">
                      {COMPANY_INFO.phone}
                    </span>
                    <span className="text-xs font-bold text-[#B91C1C] leading-tight">
                      {COMPANY_INFO.directPhone}
                    </span>
                  </div>
                </div>
              </a>

              {/* Main Application CTA */}
              <button
                onClick={handleCtaClick}
                id="header-inquiry-cta"
                className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B91C1C] hover:bg-red-800 text-white font-black text-base shadow-md shadow-red-900/15 hover:shadow-lg active:scale-95 transition-all duration-150"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>가맹상담 신청</span>
              </button>

              {/* Admin Portal Quick Access */}
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('manna:open_admin_modal'));
                }}
                className="cursor-pointer p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-[#2D1503] hover:text-[#B91C1C] transition-colors"
                title="가맹문의 관리자 페이지 (비밀번호 인증)"
              >
                <ShieldCheck className="w-4 h-4 text-[#5C320A]" />
              </button>
            </div>

            {/* Mobile Right Action Area */}
            <div className="flex items-center gap-2 sm:hidden">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="h-10 px-3.5 rounded-full bg-yellow-100 text-yellow-950 font-black text-sm sm:text-base flex items-center gap-1.5 border border-yellow-300/80 active:scale-95 transition-transform"
                aria-label="전화상담"
              >
                <Phone className="w-4 h-4 text-[#B91C1C]" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="mobile-menu-toggle"
                className="w-10 h-10 rounded-xl text-[#2D1503] hover:bg-stone-200/60 flex items-center justify-center transition-colors focus:outline-none"
                aria-label="메뉴 열기/닫기"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Integrated Rolling Notice Bar (Never covered by header) */}
      <NoticeBanner />

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="sm:hidden bg-[#FDFBF7] border-b border-[#E7E2D8] px-5 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-130px)] overflow-y-auto"
        >
          <div className="space-y-1 pt-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex items-center justify-between py-3.5 text-lg font-bold text-[#2D1503] border-b border-[#E7E2D8]/60 active:bg-yellow-50/50 rounded-lg px-2 -mx-2 transition-colors"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-[#5C320A]/60" />
              </a>
            ))}
          </div>

          {/* Contact Box in Mobile Menu */}
          <div className="bg-white rounded-2xl p-4 border border-[#E7E2D8] space-y-3 shadow-xs">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 -mx-1 rounded-xl bg-yellow-50/70 hover:bg-yellow-100/80 border border-yellow-300/80 active:scale-98 transition-all group cursor-pointer"
              title="터치 시 가맹문의 대표번호로 바로 전화 연결"
            >
              <div>
                <span className="text-xs sm:text-sm text-[#5C320A] font-bold block">가맹문의 대표전화</span>
                <span className="text-xl sm:text-2xl font-black text-[#2D1503] group-hover:text-[#B91C1C] transition-colors">{COMPANY_INFO.phone}</span>
              </div>
              <div
                className="px-3.5 py-2 rounded-xl bg-[#B91C1C] text-white font-extrabold text-sm flex items-center gap-1.5 shadow-sm group-hover:bg-red-800 transition-colors shrink-0"
              >
                <Phone className="w-4 h-4 text-yellow-300" />
                <span>대표 통화</span>
              </div>
            </a>
            <a
              href={`tel:${COMPANY_INFO.directPhone}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 -mx-1 rounded-xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-300/80 active:scale-98 transition-all group cursor-pointer"
              title="터치 시 가맹상담 직통번호로 바로 전화 연결"
            >
              <div>
                <span className="text-xs sm:text-sm text-amber-900 font-bold block">가맹상담 직통번호</span>
                <span className="text-xl sm:text-2xl font-black text-[#2D1503] group-hover:text-[#B91C1C] transition-colors">{COMPANY_INFO.directPhone}</span>
              </div>
              <div
                className="px-3.5 py-2 rounded-xl bg-[#2D1503] text-yellow-300 font-extrabold text-sm flex items-center gap-1.5 shadow-sm hover:bg-black transition-colors shrink-0"
              >
                <Phone className="w-4 h-4 text-yellow-400" />
                <span>직통 통화</span>
              </div>
            </a>
            {/* Kakao Channel Direct Chat in Mobile Drawer */}
            <a
              href={channelConfig.chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#FEE500] hover:bg-[#FDD800] border border-[#E6CF00] text-[#3C1E1E] font-black active:scale-98 transition-all shadow-xs"
              title="카카오톡 비즈니스 채널 1:1 채팅"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#3C1E1E] text-[#FEE500] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 fill-[#FEE500]" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-black block text-[#3C1E1E]">카카오톡 1:1 가맹상담 채널</span>
                  <span className="text-xs text-[#3C1E1E]/80 font-bold">실시간 1:1 채팅 문의 가능</span>
                </div>
              </div>
              <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#3C1E1E] text-yellow-300">
                채널 채팅
              </span>
            </a>

            <button
              onClick={handleCtaClick}
              id="mobile-menu-inquiry-btn"
              className="w-full py-3.5 rounded-xl bg-[#B91C1C] hover:bg-red-800 text-white font-black text-base shadow-md text-center flex items-center justify-center gap-2 active:scale-98 transition-transform"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>1:1 무료 가맹상담 신청하기</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('manna:open_admin_modal'));
              }}
              className="cursor-pointer w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#2D1503] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-[#B91C1C]" />
              <span>가맹문의 관리자 센터 로그인 (운영자 전용)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
