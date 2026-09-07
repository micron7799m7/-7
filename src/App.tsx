import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyManna } from './components/WhyManna';
import { MenuSection } from './components/MenuSection';
import { BrandEmotion } from './components/BrandEmotion';
import { StartupSteps } from './components/StartupSteps';
import { RecommendedAreas } from './components/RecommendedAreas';
import { StoresSection } from './components/StoresSection';
import { ReviewsSection } from './components/ReviewsSection';
import { CostSection } from './components/CostSection';
import { FAQSection } from './components/FAQSection';
import { ClosingBanner } from './components/ClosingBanner';
import { InquiryForm } from './components/InquiryForm';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { FloatingActions } from './components/FloatingActions';
import { AdminInquiryModal } from './components/AdminInquiryModal';

export default function App() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenAdmin = () => {
      setIsAdminModalOpen(true);
    };
    window.addEventListener('manna:open_admin_modal', handleOpenAdmin);
    return () => window.removeEventListener('manna:open_admin_modal', handleOpenAdmin);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D1503] flex flex-col selection:bg-yellow-100 selection:text-[#2D1503]">
      {/* 1. Global Header (Navigation + Integrated Rolling Notice Bar) */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1 pt-24 sm:pt-28 pb-20 sm:pb-0">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Why 만나옛날통닭 (브랜드 경쟁력) */}
        <WhyManna />

        {/* 4. 대표 메뉴 (6대 메뉴 및 포장 9,900원 특가 토글) */}
        <MenuSection />

        {/* 5. 브랜드 감성 (퇴근길 만나는 정겨운 우리 동네 통닭집) */}
        <BrandEmotion />

        {/* 6. 창업 경쟁력 & 6단계 원스톱 절차 */}
        <StartupSteps />

        {/* 7. 추천 상권 분석 */}
        <RecommendedAreas />

        {/* 8. 실제 매장 소개 (달빛공원점, 천안1호점) */}
        <StoresSection />

        {/* 9. 실제 고객 후기 (네이버 플레이스 방문자 영수증 실후기 & 사진) */}
        <ReviewsSection />

        {/* 10. 투명한 가맹비용 안내 (A/B/C 맞춤 타입) */}
        <CostSection />

        {/* 10. 자주 묻는 질문 (FAQ 아코디언) */}
        <FAQSection />

        {/* 11. 마지막 전환 화면 ("좋은 자리는 기다려주지 않습니다") */}
        <ClosingBanner />

        {/* 12. 1:1 무료 가맹상담 신청 폼 */}
        <InquiryForm />
      </main>

      {/* 13. Official Headquarters Footer */}
      <Footer />

      {/* 14. Mobile Sticky Bottom CTA Bar */}
      <MobileBottomBar />

      {/* 15. Desktop Floating Action Buttons */}
      <FloatingActions />

      {/* 16. Password-Protected Admin Dashboard Modal */}
      <AdminInquiryModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
}
