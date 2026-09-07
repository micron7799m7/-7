import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/franchiseData';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'privacy' | 'terms';
}

export const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
  type = 'privacy'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FDFBF7] rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#E7E2D8] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#E7E2D8] flex items-center justify-between bg-yellow-50/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-yellow-800 shrink-0" />
            <h3 className="text-base sm:text-lg font-black text-[#2D1503]">
              {type === 'privacy' ? '개인정보 수집 및 이용 동의' : '홈페이지 이용약관'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg text-[#2D1503]/70 hover:text-[#2D1503] hover:bg-yellow-100 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-sm sm:text-base text-[#3E1D05] leading-relaxed bg-[#FDFBF7] break-keep">
          {type === 'privacy' ? (
            <>
              <p className="font-bold text-[#2D1503]">
                {COMPANY_INFO.legalName}(이하 &apos;회사&apos;)는 가맹점 창업 상담 및 안내를 위하여 아래와 같이 개인정보를 수집·이용합니다.
              </p>

              <div className="p-3.5 bg-white rounded-xl border border-[#E7E2D8] space-y-2 text-[#2D1503] font-medium">
                <p><strong>1. 수집하는 개인정보 항목:</strong> 성함, 연락처(휴대폰 번호), 창업 희망지역, 점포 보유 여부, 예상 창업시기 및 예산, 문의내용</p>
                <p><strong>2. 개인정보 수집 및 이용 목적:</strong> 만나옛날통닭 가맹점 개설 관련 1:1 무료 상담 및 안내, 상권 분석 결과 회신</p>
                <p><strong>3. 개인정보의 보유 및 이용 기간:</strong> 상담 완료 및 접수일로부터 1년 보관 후 지체 없이 파기 (단, 관계 법령에 따름)</p>
                <p><strong>4. 동의 거부 권리:</strong> 귀하는 개인정보 수집 및 이용에 대해 거부할 권리가 있으며, 동의 거부 시 원활한 가맹 상담 신청이 제한될 수 있습니다.</p>
              </div>

              <p className="text-[#5C320A] text-sm sm:text-base font-semibold">
                개인정보보호책임자: {COMPANY_INFO.ceo} ({COMPANY_INFO.email} / {COMPANY_INFO.phone})
              </p>
            </>
          ) : (
            <>
              <p className="font-bold text-[#2D1503]">
                {COMPANY_INFO.legalName} 공식 홈페이지 이용약관
              </p>
              <p>
                본 약관은 {COMPANY_INFO.legalName}가 제공하는 공식 프랜차이즈 홈페이지의 가맹 안내 및 제반 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
              <p>
                홈페이지 내 모든 콘텐츠(텍스트, 이미지, 로고, 디자인)에 대한 저작권은 회사에 있으며 무단 복제 및 상업적 도용을 금합니다.
              </p>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-[#E7E2D8] bg-yellow-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer min-h-[44px] px-6 py-2.5 rounded-xl bg-[#2D1503] hover:bg-[#B91C1C] text-white text-sm sm:text-base font-bold transition-colors"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
