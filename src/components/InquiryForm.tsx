import React, { useState } from 'react';
import { REGIONS_KOREA, COMPANY_INFO } from '../data/franchiseData';
import { InquiryFormData, InquiryRecord } from '../types';
import { TermsModal } from './TermsModal';
import {
  Send,
  Phone,
  CheckCircle,
  ShieldAlert,
  Sparkles,
  MessageSquare,
  AlertCircle,
  Mail,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';
import {
  createInquiry,
  generateMailtoUrl,
  copyKakaoMessageToClipboard,
  formatKakaoAlertMessage,
  NOTIFICATION_TARGETS,
  getKakaoChannelConfig
} from '../services/inquiryService';

export const InquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    phone: '',
    regionProvince: '경기',
    regionCity: '',
    hasStore: '점포 없음(상권분석 필요)',
    startupTimeline: '3개월 이내',
    budgetRange: '3천만원~5천만원',
    message: '',
    agreePrivacy: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<InquiryRecord | null>(null);
  const [emailStatusNotice, setEmailStatusNotice] = useState<string>('');
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const [copiedKakao, setCopiedKakao] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errs.name = '성함을 입력해 주세요.';
    }

    if (!formData.phone.trim()) {
      errs.phone = '연락처(휴대폰 번호)를 입력해 주세요.';
    } else {
      const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 9 || cleanPhone.length > 11) {
        errs.phone = '올바른 휴대폰 번호를 입력해 주세요 (예: 010-1234-5678).';
      }
    }

    if (!formData.regionCity.trim()) {
      errs.regionCity = '상세 희망지역(구/동 또는 상권)을 입력해 주세요.';
    }

    if (!formData.agreePrivacy) {
      errs.agreePrivacy = '개인정보 수집 및 이용에 동의하셔야 신청이 가능합니다.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length > 11) val = val.slice(0, 11);

    // Auto-dash formatting for Korean phone numbers
    let formatted = val;
    if (val.length > 7) {
      formatted = `${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7)}`;
    } else if (val.length > 3) {
      formatted = `${val.slice(0, 3)}-${val.slice(3)}`;
    }

    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const { record, notificationResult } = await createInquiry(formData);
      setSubmittedData(record);
      setEmailStatusNotice(notificationResult.message);
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyKakaoText = async () => {
    if (!submittedData) return;
    const success = await copyKakaoMessageToClipboard(submittedData);
    if (success) {
      setCopiedKakao(true);
      setTimeout(() => setCopiedKakao(false), 3000);
    }
  };

  const handleOpenAdmin = () => {
    window.dispatchEvent(new CustomEvent('manna:open_admin_modal'));
  };

  const handleReset = () => {
    setSubmittedData(null);
    setEmailStatusNotice('');
    setFormData({
      name: '',
      phone: '',
      regionProvince: '경기',
      regionCity: '',
      hasStore: '점포 없음(상권분석 필요)',
      startupTimeline: '3개월 이내',
      budgetRange: '3천만원~5천만원',
      message: '',
      agreePrivacy: true,
    });
    setErrors({});
  };

  return (
    <section id="inquiry" className="py-20 sm:py-24 bg-[#FDFBF7] border-b border-[#E7E2D8] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-950 border border-yellow-300 font-black text-sm sm:text-base uppercase tracking-wider">
            1:1 맞춤 가맹상담 신청
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#2D1503] tracking-tight break-keep">
            내 지역에서 <span className="text-[#B91C1C]">만나옛날통닭</span>을 시작해보세요
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#2D1503] font-bold leading-relaxed max-w-2xl mx-auto break-keep">
            가맹 상담 및 상권 분석은 100% 무료로 진행됩니다.
            <br className="hidden sm:inline" />
            작성해 주신 내용을 바탕으로 본사 전문 창업 상담팀이 24시간 이내에 친절히 연락드립니다.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="bg-white rounded-3xl border border-[#E7E2D8] shadow-md overflow-hidden">
          {submittedData ? (
            /* Submission Received State */
            <div className="p-6 sm:p-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2">
                  <span className="text-sm font-black text-[#2D1503] bg-yellow-100 border border-yellow-300 px-3.5 py-1.5 rounded-full">
                    접수 번호: {submittedData.id}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    운영자 실시간 알림 완료
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#2D1503] pt-2 break-keep">
                  가맹상담 신청서가 정상 접수되었습니다
                </h3>
                <p className="text-base sm:text-lg text-[#2D1503] font-medium max-w-lg mx-auto break-keep leading-relaxed">
                  <strong className="text-[#2D1503] font-black">{submittedData.data.name}</strong> 님, 소중한 상담 신청 감사합니다.
                  본사 담당자가 검토 후 <strong className="text-[#B91C1C] font-black">{submittedData.data.phone}</strong> 번호로 신속히 연락드리겠습니다.
                </p>
              </div>

              {/* Real-time Notification Status Badges: Kakao & Naver */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto text-left">
                {/* 1. Kakao Alert Box (Highest Priority) */}
                <div className="bg-[#FEE500]/20 border border-[#FEE500] rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#3C1E1E] text-[#FEE500] flex items-center justify-center font-black text-xs">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-black text-[#3C1E1E] tracking-tight">
                        1순위 카카오톡 알림
                      </span>
                    </div>
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      전송 완료
                    </span>
                  </div>
                  <div className="text-xs text-[#3C1E1E] space-y-1 font-semibold">
                    <p className="flex items-center justify-between">
                      <span className="text-stone-600">카카오톡 ID:</span>
                      <strong className="font-black text-[#2D1503]">{NOTIFICATION_TARGETS.kakaoId}</strong>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-stone-600">연동 계정:</span>
                      <strong className="font-black text-[#2D1503]">{NOTIFICATION_TARGETS.kakaoEmail}</strong>
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <a
                      href={getKakaoChannelConfig().chatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer py-2 px-3 rounded-xl bg-[#FEE500] hover:bg-yellow-400 text-[#3C1E1E] font-black text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs active:scale-95"
                      title="카카오 비즈니스 채널 1:1 채팅 열기"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-[#3C1E1E]" />
                      <span>카톡 채널 1:1 대화하기</span>
                      <ExternalLink className="w-3 h-3 text-[#3C1E1E]/70" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyKakaoText}
                      className="cursor-pointer py-2 px-3 rounded-xl bg-white hover:bg-yellow-50 text-[#3C1E1E] font-black text-xs flex items-center justify-center gap-1.5 transition-colors border border-yellow-400/60 shadow-2xs active:scale-95"
                    >
                      {copiedKakao ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span className="text-emerald-800">문구 복사완료!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>상담 문구 복사</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 2. Naver Email Box */}
                <div className="bg-[#03C75A]/10 border border-[#03C75A]/40 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#03C75A] text-white flex items-center justify-center font-black text-xs">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-black text-[#0c4e2a] tracking-tight">
                        2순위 네이버 이메일
                      </span>
                    </div>
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      전송 완료
                    </span>
                  </div>
                  <div className="text-xs text-[#0c4e2a] space-y-1 font-semibold">
                    <p className="flex items-center justify-between">
                      <span className="text-stone-600">수신 이메일:</span>
                      <strong className="font-black text-[#2D1503]">{NOTIFICATION_TARGETS.naverEmail}</strong>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-stone-600">발송 형태:</span>
                      <strong className="font-bold text-stone-700">실시간 데이터 시트</strong>
                    </p>
                  </div>
                  <a
                    href="https://mail.naver.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer w-full py-2 px-3 rounded-xl bg-[#03C75A] hover:bg-[#02b350] text-white font-black text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs active:scale-95"
                  >
                    <span>네이버 메일함 바로가기</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Submitted Summary Details */}
              <div className="bg-[#FDFBF7] rounded-2xl p-5 sm:p-6 border border-[#E7E2D8] max-w-xl mx-auto text-left text-sm sm:text-base space-y-2.5 text-[#2D1503]">
                <div className="flex justify-between py-1.5 border-b border-[#E7E2D8]">
                  <span className="text-[#5C320A] font-bold">희망 지역:</span>
                  <span className="font-black">{submittedData.data.regionProvince} {submittedData.data.regionCity}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E7E2D8]">
                  <span className="text-[#5C320A] font-bold">점포 유무:</span>
                  <span className="font-black">{submittedData.data.hasStore}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E7E2D8]">
                  <span className="text-[#5C320A] font-bold">시기 / 예산:</span>
                  <span className="font-black">{submittedData.data.startupTimeline} / {submittedData.data.budgetRange}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#5C320A] font-bold">접수 일시:</span>
                  <span className="font-black">{submittedData.date}</span>
                </div>
              </div>

              {/* Direct Call / Additional Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="w-full sm:w-auto min-h-[50px] px-7 py-3.5 rounded-full bg-[#B91C1C] hover:bg-red-800 text-white font-black text-base flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>본사 즉시 전화상담 ({COMPANY_INFO.phone})</span>
                </a>
                <button
                  type="button"
                  onClick={handleOpenAdmin}
                  className="cursor-pointer w-full sm:w-auto min-h-[50px] px-6 py-3.5 rounded-full bg-[#2D1503] hover:bg-black text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-xs"
                  title="비밀번호로 보호되는 관리자 전용 접수 현황 보기"
                >
                  <ShieldCheck className="w-4 h-4 text-yellow-400" />
                  <span>운영자 접수현황 대시보드</span>
                </button>
                <button
                  onClick={handleReset}
                  className="cursor-pointer w-full sm:w-auto min-h-[50px] px-6 py-3.5 rounded-full bg-[#FDFBF7] border border-[#E7E2D8] hover:bg-yellow-50 text-[#2D1503] font-black text-sm sm:text-base transition-all"
                >
                  새로운 상담 작성하기
                </button>
              </div>
            </div>
          ) : (
            /* Active Form Inputs */
            <form onSubmit={handleSubmit} className="p-5 sm:p-10 space-y-6" noValidate>
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label htmlFor="inquiry-name" className="block text-base font-black text-[#2D1503] mb-2">
                    성함 <span className="text-[#B91C1C]">*</span>
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={`w-full px-4 py-3.5 rounded-xl border text-base text-[#2D1503] transition-colors focus:outline-none focus:ring-2 ${
                      errors.name
                        ? 'border-red-500 bg-red-50/40 focus:ring-red-500/20'
                        : 'border-[#E7E2D8] focus:border-[#B91C1C] focus:ring-[#B91C1C]/15 bg-white'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm sm:text-base text-[#B91C1C] flex items-center gap-1 font-bold">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="inquiry-phone" className="block text-base font-black text-[#2D1503] mb-2">
                    연락처 (휴대폰) <span className="text-[#B91C1C]">*</span>
                  </label>
                  <input
                    id="inquiry-phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="010-1234-5678"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`w-full px-4 py-3.5 rounded-xl border text-base text-[#2D1503] transition-colors focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? 'border-red-500 bg-red-50/40 focus:ring-red-500/20'
                        : 'border-[#E7E2D8] focus:border-[#B91C1C] focus:ring-[#B91C1C]/15 bg-white'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-sm sm:text-base text-[#B91C1C] flex items-center gap-1 font-bold">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Region Preference */}
              <div>
                <label className="block text-base font-black text-[#2D1503] mb-2">
                  창업 희망 지역 <span className="text-[#B91C1C]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  <div className="sm:col-span-1">
                    <select
                      id="inquiry-region-province"
                      value={formData.regionProvince}
                      onChange={(e) => setFormData({ ...formData, regionProvince: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#E7E2D8] text-base text-[#2D1503] font-bold focus:border-[#B91C1C] focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/15 bg-white"
                    >
                      {REGIONS_KOREA.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      id="inquiry-region-city"
                      type="text"
                      placeholder="상세 지역 (예: 인천 송도동, 천안 두정동, 수원 영통구 등)"
                      value={formData.regionCity}
                      onChange={(e) => {
                        setFormData({ ...formData, regionCity: e.target.value });
                        if (errors.regionCity) setErrors({ ...errors, regionCity: '' });
                      }}
                      className={`w-full px-4 py-3.5 rounded-xl border text-base text-[#2D1503] transition-colors focus:outline-none focus:ring-2 ${
                        errors.regionCity
                          ? 'border-red-500 bg-red-50/40 focus:ring-red-500/20'
                          : 'border-[#E7E2D8] focus:border-[#B91C1C] focus:ring-[#B91C1C]/15 bg-white'
                      }`}
                    />
                  </div>
                </div>
                {errors.regionCity && (
                  <p className="mt-1.5 text-sm sm:text-base text-[#B91C1C] flex items-center gap-1 font-bold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errors.regionCity}</span>
                  </p>
                )}
              </div>

              {/* Row 3: Store Status & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-base font-black text-[#2D1503] mb-2">
                    점포 보유 여부
                  </label>
                  <select
                    id="inquiry-has-store"
                    value={formData.hasStore}
                    onChange={(e) => setFormData({ ...formData, hasStore: e.target.value as any })}
                    className="w-full px-4 py-3.5 rounded-xl border border-[#E7E2D8] text-base text-[#2D1503] font-semibold focus:border-[#B91C1C] focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/15 bg-white"
                  >
                    <option value="점포 없음(상권분석 필요)">점포 없음 (본사 무료 상권분석 필요)</option>
                    <option value="보유 중">현재 점포 보유 중 (임대/소유)</option>
                    <option value="점포 물색 중">점포 물색 중</option>
                  </select>
                </div>

                <div>
                  <label className="block text-base font-black text-[#2D1503] mb-2">
                    예상 창업 시기
                  </label>
                  <select
                    id="inquiry-timeline"
                    value={formData.startupTimeline}
                    onChange={(e) => setFormData({ ...formData, startupTimeline: e.target.value as any })}
                    className="w-full px-4 py-3.5 rounded-xl border border-[#E7E2D8] text-base text-[#2D1503] font-semibold focus:border-[#B91C1C] focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/15 bg-white"
                  >
                    <option value="1개월 이내">1개월 이내 (즉시 착수 희망)</option>
                    <option value="3개월 이내">3개월 이내</option>
                    <option value="6개월 이내">6개월 이내</option>
                    <option value="미정">미정 (상권 및 조건 탐색 중)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Budget Range */}
              <div>
                <label className="block text-base font-black text-[#2D1503] mb-2">
                  예상 창업 예산 (점포 보증금 제외)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['3천만원 미만', '3천만원~5천만원', '5천만원~7천만원', '7천만원 이상'] as const).map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setFormData({ ...formData, budgetRange: b })}
                      className={`cursor-pointer min-h-[48px] py-3 px-3.5 rounded-xl text-sm sm:text-base font-black border transition-all ${
                        formData.budgetRange === b
                          ? 'border-[#B91C1C] bg-yellow-100 text-[#2D1503] shadow-xs ring-2 ring-[#B91C1C]/20'
                          : 'border-[#E7E2D8] bg-[#FDFBF7] text-[#2D1503] hover:border-[#B91C1C]'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
                <div className="mt-2.5 flex items-center gap-2 text-sm sm:text-base text-[#2D1503] font-bold p-2.5 rounded-lg bg-yellow-50/70 border border-yellow-200">
                  <span className="px-2 py-0.5 rounded bg-[#B91C1C] text-white text-xs sm:text-sm font-black shrink-0">NOTICE</span>
                  <span className="text-[#B91C1C] font-black">본사협력 1000만원 무이자 대출 프로모션 진행 가능!</span>
                  <span className="hidden sm:inline text-stone-600 font-medium">(상담 시 무이자 금융 연계 혜택을 함께 안내해 드립니다)</span>
                </div>
              </div>

              {/* Row 5: Message */}
              <div>
                <label htmlFor="inquiry-message" className="block text-base font-black text-[#2D1503] mb-2">
                  상세 문의 및 희망사항 (선택)
                </label>
                <textarea
                  id="inquiry-message"
                  rows={3}
                  placeholder="예: 업종변경 창업을 희망합니다 / 송도 인근 아파트 상권에 관심이 많습니다 등 편하게 적어주세요."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-[#E7E2D8] text-base text-[#2D1503] focus:border-[#B91C1C] focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/15 bg-white"
                />
              </div>

              {/* Row 6: Privacy Consent */}
              <div className="pt-1">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-yellow-50/70 border border-yellow-200/70">
                  <input
                    id="inquiry-privacy-agree"
                    type="checkbox"
                    checked={formData.agreePrivacy}
                    onChange={(e) => {
                      setFormData({ ...formData, agreePrivacy: e.target.checked });
                      if (e.target.checked && errors.agreePrivacy) {
                        setErrors({ ...errors, agreePrivacy: '' });
                      }
                    }}
                    className="w-5 h-5 rounded text-[#B91C1C] accent-[#B91C1C] focus:ring-[#B91C1C] border-[#E7E2D8] mt-0.5 cursor-pointer shrink-0"
                  />
                  <label htmlFor="inquiry-privacy-agree" className="text-base text-[#2D1503] cursor-pointer break-keep font-medium">
                    <span className="font-black text-[#B91C1C]">[필수]</span> 개인정보 수집 및 이용에 동의합니다.{' '}
                    <button
                      type="button"
                      onClick={() => setIsTermsOpen(true)}
                      className="cursor-pointer text-[#B91C1C] underline underline-offset-2 hover:text-red-800 font-black ml-1"
                    >
                      [전문보기]
                    </button>
                  </label>
                </div>
                {errors.agreePrivacy && (
                  <p className="mt-1.5 text-sm sm:text-base text-[#B91C1C] font-bold">
                    {errors.agreePrivacy}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="inquiry-submit-btn"
                  className="cursor-pointer w-full min-h-[56px] py-4 rounded-2xl bg-[#B91C1C] hover:bg-red-800 text-white font-black text-lg shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>상담 신청서 접수 중...</span>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-yellow-300 shrink-0" />
                      <span>무료 가맹상담 신청하기</span>
                    </>
                  )}
                </button>

                <p className="text-center text-base text-[#452005] font-semibold mt-3 break-keep">
                  * 본 상담 신청은 비용이 전혀 발생하지 않으며, 어떠한 계약 강요도 없습니다.
                </p>
              </div>
            </form>
          )}

          {/* Bottom Fast Contact Channels */}
          <div className="bg-[#FDFBF7] border-t border-[#E7E2D8] p-5 sm:p-6 sm:px-10 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-3 text-center sm:text-left group cursor-pointer p-2 rounded-2xl hover:bg-yellow-50/80 active:scale-98 transition-all"
                title="클릭 시 가맹문의 대표번호로 바로 전화 연결"
              >
                <div className="w-12 h-12 rounded-2xl bg-yellow-100 group-hover:bg-red-100 flex items-center justify-center text-[#2D1503] shrink-0 transition-colors">
                  <Phone className="w-6 h-6 text-[#B91C1C]" />
                </div>
                <div className="text-left">
                  <span className="text-xs sm:text-sm text-[#5C320A] font-bold block">가맹문의 대표전화</span>
                  <span className="text-xl sm:text-2xl font-black text-[#2D1503] group-hover:text-[#B91C1C] transition-colors flex items-center gap-1.5">
                    <span>{COMPANY_INFO.phone}</span>
                  </span>
                </div>
              </a>

              <span className="hidden sm:inline text-stone-300 font-light">|</span>

              <a
                href={`tel:${COMPANY_INFO.directPhone}`}
                className="flex items-center gap-3 text-center sm:text-left group cursor-pointer p-2 rounded-2xl hover:bg-amber-50/80 active:scale-98 transition-all"
                title="클릭 시 가맹상담 직통번호로 바로 전화 연결"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-100 group-hover:bg-amber-200 flex items-center justify-center text-[#2D1503] shrink-0 transition-colors">
                  <Phone className="w-6 h-6 text-amber-800" />
                </div>
                <div className="text-left">
                  <span className="text-xs sm:text-sm text-amber-900 font-bold block">가맹상담 직통전화</span>
                  <span className="text-xl sm:text-2xl font-black text-[#B91C1C] flex items-center gap-1.5">
                    <span>{COMPANY_INFO.directPhone}</span>
                  </span>
                </div>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full lg:w-auto">
              <a
                href={getKakaoChannelConfig().chatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer w-full sm:w-auto min-h-[50px] px-6 py-3.5 rounded-xl bg-[#FEE500] hover:bg-[#FDD800] text-[#3C1E1E] text-base font-black flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 border border-[#E6CF00]"
                title="카카오톡 비즈니스 채널 1:1 상담창 열기"
              >
                <div className="w-5 h-5 rounded-full bg-[#3C1E1E] flex items-center justify-center text-[#FEE500] shrink-0">
                  <MessageCircle className="w-3.5 h-3.5 fill-[#FEE500]" />
                </div>
                <span>카톡 1:1 채널 상담</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.directPhone}`}
                className="cursor-pointer w-full sm:w-auto min-h-[50px] px-6 py-3.5 rounded-xl bg-[#B91C1C] hover:bg-red-800 text-white text-base font-black flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <Phone className="w-4 h-4 text-yellow-300" />
                <span>{COMPANY_INFO.directPhone} 직통 통화</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} type="privacy" />
    </section>
  );
};
