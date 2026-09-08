import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Search,
  Download,
  Phone,
  Calendar,
  MapPin,
  Building2,
  Clock,
  Coins,
  MessageSquare,
  Mail,
  Trash2,
  Save,
  CheckCircle2,
  RefreshCw,
  LogOut,
  KeyRound,
  FileSpreadsheet,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';
import { InquiryRecord, InquiryStatus } from '../types';
import { COMPANY_INFO } from '../data/franchiseData';
import {
  getInquiries,
  updateInquiryStatus,
  updateInquiryNote,
  deleteInquiry,
  exportInquiriesToCSV,
  seedSampleInquiries,
  checkAdminPassword,
  getAdminPassword,
  setCustomAdminPassword,
  isAdminSessionActive,
  setAdminSession,
  generateMailtoUrl,
  sendRealtimeNotifications,
  copyKakaoMessageToClipboard,
  getStatusLabel,
  NOTIFICATION_TARGETS,
  getKakaoChannelConfig,
  saveKakaoChannelConfig,
  KakaoChannelConfig
} from '../services/inquiryService';

interface AdminInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminInquiryModal: React.FC<AdminInquiryModalProps> = ({ isOpen, onClose }) => {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Password change sub-state
  const [showPwdChangeModal, setShowPwdChangeModal] = useState(false);
  const [newPwdInput, setNewPwdInput] = useState('');
  const [pwdChangeSuccess, setPwdChangeSuccess] = useState('');

  // Inquiries data states
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | InquiryStatus>('all');
  const [activeNotes, setActiveNotes] = useState<{ [id: string]: string }>({});
  const [savedNoteSuccessId, setSavedNoteSuccessId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Email/Kakao test sending state
  const [testingDispatch, setTestingDispatch] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  // Kakao Business Channel Configuration State
  const [channelConfig, setChannelConfig] = useState<KakaoChannelConfig>(getKakaoChannelConfig());
  const [channelIdInput, setChannelIdInput] = useState(channelConfig.channelId);
  const [channelUrlInput, setChannelUrlInput] = useState(channelConfig.channelUrl);
  const [channelNameInput, setChannelNameInput] = useState(channelConfig.channelName);
  const [channelSavedToast, setChannelSavedToast] = useState(false);

  // Check auth session on mount & modal open
  useEffect(() => {
    if (isOpen) {
      const active = isAdminSessionActive();
      setIsAuthenticated(active);
      if (active) {
        loadData();
      }
    }
  }, [isOpen]);

  // Load inquiries
  const loadData = () => {
    let list = getInquiries();
    if (list.length === 0) {
      list = seedSampleInquiries();
    }
    setInquiries(list);

    // Sync initial notes
    const notesMap: { [id: string]: string } = {};
    list.forEach((item) => {
      notesMap[item.id] = item.adminNote || '';
    });
    setActiveNotes(notesMap);
  };

  // Listen to custom updates from other components or tabs
  useEffect(() => {
    const handleUpdate = () => {
      if (isAuthenticated) {
        loadData();
      }
    };
    window.addEventListener('manna:inquiry_updated', handleUpdate);
    return () => window.removeEventListener('manna:inquiry_updated', handleUpdate);
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) {
      setAuthError('비밀번호를 입력해주세요.');
      return;
    }

    if (checkAdminPassword(passwordInput.trim())) {
      setIsAuthenticated(true);
      setAdminSession(true);
      setAuthError('');
      setPasswordInput('');
      loadData();
    } else {
      setAuthError('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminSession(false);
    setPasswordInput('');
  };

  // Handle Status change
  const handleStatusChange = (id: string, newStatus: InquiryStatus) => {
    updateInquiryStatus(id, newStatus);
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  // Handle Note Save
  const handleSaveNote = (id: string) => {
    const note = activeNotes[id] || '';
    updateInquiryNote(id, note);
    setSavedNoteSuccessId(id);
    setTimeout(() => {
      setSavedNoteSuccessId(null);
    }, 2000);
  };

  // Copy Kakao Alert text
  const handleCopyKakao = async (item: InquiryRecord) => {
    const ok = await copyKakaoMessageToClipboard(item);
    if (ok) {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  // Handle Delete
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`[${name}] 님의 가맹문의 접수 건을 정말 삭제하시겠습니까?`)) {
      deleteInquiry(id);
      setInquiries((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Handle Password Change
  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPwdInput.trim().length < 4) {
      alert('비밀번호는 최소 4자리 이상 입력해주세요.');
      return;
    }
    setCustomAdminPassword(newPwdInput.trim());
    setShowPwdChangeModal(false);
    setNewPwdInput('');
    setPwdChangeSuccess('비밀번호가 성공적으로 변경되었습니다.');
    setTimeout(() => setPwdChangeSuccess(''), 3000);
  };

  // Test Realtime Dual Dispatch (Kakao Email + Naver Email)
  const handleTestDualDispatch = async () => {
    setTestingDispatch(true);
    setTestResult(null);

    const testRecord: InquiryRecord = {
      id: `MN-TEST-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      createdAt: Date.now(),
      data: {
        name: '만나본사테스트',
        phone: '1661-8518',
        regionProvince: '경기',
        regionCity: '시흥시 배곧동',
        hasStore: '보유 중',
        startupTimeline: '1개월 이내',
        budgetRange: '3천만원~5천만원',
        message: '카카오톡(krook7799) 및 네이버(krook777@naver.com) 실시간 연동 테스트 건입니다.',
        agreePrivacy: true
      },
      status: 'new'
    };

    const res = await sendRealtimeNotifications(testRecord);
    setTestingDispatch(false);
    setTestResult(res.message);
  };

  // Save Kakao Business Channel Config
  const handleSaveChannelConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveKakaoChannelConfig({
      channelName: channelNameInput,
      channelId: channelIdInput,
      channelUrl: channelUrlInput
    });
    setChannelConfig(updated);
    setChannelIdInput(updated.channelId);
    setChannelUrlInput(updated.channelUrl);
    setChannelSavedToast(true);
    setTimeout(() => setChannelSavedToast(false), 3000);
  };

  // Filtered inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      const matchStatus = statusFilter === 'all' || item.status === statusFilter;
      const query = searchQuery.trim().toLowerCase();
      const matchQuery =
        !query ||
        item.data.name.toLowerCase().includes(query) ||
        item.data.phone.includes(query) ||
        item.data.regionProvince.includes(query) ||
        item.data.regionCity.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        (item.adminNote && item.adminNote.toLowerCase().includes(query));

      return matchStatus && matchQuery;
    });
  }, [inquiries, statusFilter, searchQuery]);

  // Stats calculation
  const stats = useMemo(() => {
    return {
      total: inquiries.length,
      newCount: inquiries.filter((i) => i.status === 'new').length,
      inProgressCount: inquiries.filter((i) => i.status === 'in_progress').length,
      completedCount: inquiries.filter((i) => i.status === 'completed').length
    };
  }, [inquiries]);

  if (!isOpen) return null;

  return (
    <div
      id="admin-inquiry-modal-overlay"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="admin-inquiry-modal-container"
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E7E2D8] w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Header */}
        <div className="bg-[#2D1503] text-white px-5 sm:px-7 py-4 flex items-center justify-between border-b border-[#452005] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 text-[#2D1503] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-black tracking-tight">가맹문의 통합 관리 센터</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300">
                실시간 간편접수 즉시 통보 및 고객 상담 이력 관리 시스템
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <button
                  onClick={() => setShowPwdChangeModal(true)}
                  className="cursor-pointer hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-stone-200 font-bold transition-colors"
                  title="관리자 비밀번호 변경"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>비밀번호 변경</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-red-900/60 text-xs text-stone-200 font-bold transition-colors"
                  title="로그아웃"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>로그아웃</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="cursor-pointer w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-stone-300 hover:text-white transition-colors ml-1"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {!isAuthenticated ? (
          /* 1. Password Login View */
          <div className="p-6 sm:p-12 max-w-md mx-auto my-auto w-full text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-yellow-100 text-[#2D1503] flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8 text-[#B91C1C]" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-[#2D1503]">운영자 관리자 인증</h4>
              <p className="text-sm sm:text-base text-[#5C320A] leading-relaxed break-keep font-medium">
                고객 가맹상담 접수 내역 열람 및 실시간 카카오톡/네이버 발송 현황을 확인하려면 관리자 비밀번호를 입력해주세요.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-black text-[#2D1503] mb-1.5">
                  관리자 비밀번호
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setAuthError('');
                    }}
                    placeholder="비밀번호를 입력하세요"
                    autoFocus
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-[#E7E2D8] focus:outline-none focus:ring-2 focus:ring-[#B91C1C] text-base font-bold bg-[#FAF7F0]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {authError && (
                  <p className="mt-2 text-sm text-[#B91C1C] flex items-center gap-1 font-bold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full py-3.5 rounded-xl bg-[#B91C1C] hover:bg-red-800 text-white font-black text-base shadow-md active:scale-98 transition-all"
              >
                관리자 대시보드 로그인
              </button>
            </form>
          </div>
        ) : (
          /* 2. Authenticated Dashboard Content */
          <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6">
            {pwdChangeSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-sm font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{pwdChangeSuccess}</span>
              </div>
            )}

            {/* Top Stat Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-[#FAF7F0] p-4 rounded-2xl border border-[#E7E2D8]">
                <span className="text-xs sm:text-sm text-[#5C320A] font-bold block">전체 접수 누적</span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-[#2D1503]">{stats.total}</span>
                  <span className="text-xs text-stone-500 font-bold">건</span>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-2xl border border-red-200">
                <span className="text-xs sm:text-sm text-[#B91C1C] font-black block flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#B91C1C] animate-ping" />
                  신규 접수 대기
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-[#B91C1C]">{stats.newCount}</span>
                  <span className="text-xs text-red-700 font-bold">즉각 상담필요</span>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                <span className="text-xs sm:text-sm text-amber-800 font-bold block">상담 진행 중</span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-amber-900">{stats.inProgressCount}</span>
                  <span className="text-xs text-amber-700 font-bold">실측/상권조사</span>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                <span className="text-xs sm:text-sm text-emerald-800 font-bold block">상담 완료</span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-900">{stats.completedCount}</span>
                  <span className="text-xs text-emerald-700 font-bold">가계약/오픈</span>
                </div>
              </div>
            </div>

            {/* Notification Target Info Center (Kakao + Naver) */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E7E2D8] shadow-xs space-y-3">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm sm:text-base font-black text-[#2D1503]">
                      가맹문의 접수 즉시 2단계 실시간 알림 연동
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-black text-xs rounded-full">
                      자동 연동 On
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5C320A] font-medium break-keep">
                    고객이 [무료 가맹상담 신청]을 누르는 즉시 아래 카카오톡 및 네이버 메일 주소로 상세 상담카드가 전송됩니다.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full lg:w-auto">
                  <button
                    onClick={handleTestDualDispatch}
                    disabled={testingDispatch}
                    className="cursor-pointer flex-1 lg:flex-initial px-3.5 py-2.5 rounded-xl bg-yellow-50 hover:bg-yellow-100 active:scale-95 text-[#2D1503] font-black text-xs sm:text-sm border border-yellow-300 flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                    title="카카오 및 네이버로 테스트 알림 발송"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testingDispatch ? 'animate-spin' : ''}`} />
                    <span>{testingDispatch ? '동시 발송 테스트 중...' : '알림 발송 테스트'}</span>
                  </button>

                  <a
                    href="https://mail.naver.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer flex-1 lg:flex-initial px-3.5 py-2.5 rounded-xl bg-[#03C75A] hover:bg-[#02b350] active:scale-95 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>네이버 메일함</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Target Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-[#FEE500]/15 border border-[#FEE500] rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#3C1E1E] text-[#FEE500] flex items-center justify-center font-black">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-stone-500 block">1순위 카카오톡 알림 대상</span>
                      <span className="text-xs sm:text-sm font-black text-[#2D1503]">
                        ID: {NOTIFICATION_TARGETS.kakaoId} ({NOTIFICATION_TARGETS.kakaoEmail})
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-white/80 px-2 py-0.5 rounded-md border border-emerald-200">
                    실시간 알림
                  </span>
                </div>

                <div className="bg-[#03C75A]/10 border border-[#03C75A]/30 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#03C75A] text-white flex items-center justify-center font-black">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-stone-500 block">2순위 네이버 대표 이메일</span>
                      <span className="text-xs sm:text-sm font-black text-[#2D1503]">
                        {NOTIFICATION_TARGETS.naverEmail}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-white/80 px-2 py-0.5 rounded-md border border-emerald-200">
                    자동 수신
                  </span>
                </div>
              </div>

              {/* Troubleshooting Guide Box */}
              <div className="p-3.5 bg-amber-50/90 rounded-xl border border-amber-200 text-xs sm:text-sm space-y-2">
                <div className="flex items-center gap-1.5 font-black text-amber-900">
                  <AlertCircle className="w-4 h-4 text-[#B91C1C] shrink-0" />
                  <span>💡 알림이 도착하지 않을 때 2가지 필수 확인 사항</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-stone-700 leading-relaxed">
                  <div className="p-2.5 bg-white rounded-lg border border-amber-200/80">
                    <strong className="text-[#2D1503] block mb-1">1. 네이버/지메일 최초 1회 승인 필수:</strong>
                    첫 발송 시 <span className="text-[#B91C1C] font-bold">krook777@naver.com</span> 또는 <span className="text-[#B91C1C] font-bold">krook7799@gmail.com</span> 메일함(또는 스팸함)으로 온 <strong>[FormSubmit: Confirm your email]</strong> 메일에서 <span className="bg-yellow-200 px-1 font-black text-[#2D1503] rounded">Activate Form</span> 버튼을 1번 꼭 눌러주셔야 그 이후 모든 접수가 실시간 수신됩니다.
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-amber-200/80">
                    <strong className="text-[#2D1503] block mb-1">2. 스마트폰 카톡 푸시 알림 받기:</strong>
                    카카오톡 본사 정책상 개인 ID로는 외부 시스템이 카톡을 직접 쏠 수 없습니다. 스마트폰에 <strong>네이버 앱</strong>이나 <strong>Gmail 앱</strong>을 깔고 '새 메일 푸시 알림'을 켜두시면 고객 접수 시 카카오톡처럼 스마트폰 화면에 즉시 팝업 알림이 울립니다!
                  </div>
                </div>
              </div>

              {testResult && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{testResult}</span>
                  </div>
                  <button onClick={() => setTestResult(null)} className="text-emerald-700 hover:text-emerald-950 p-1">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Kakao Business Channel Management Center */}
            <div className="bg-[#FEE500]/10 border-2 border-[#FEE500] p-4 sm:p-5 rounded-2xl shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#3C1E1E] text-[#FEE500] flex items-center justify-center font-black shrink-0">
                    <MessageCircle className="w-5 h-5 fill-[#FEE500]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-black text-[#2D1503]">
                        카카오 비즈니스 채널 1:1 상담 및 알림톡 연동 설정
                      </h4>
                      <span className="px-2 py-0.5 bg-yellow-300 text-[#3C1E1E] font-black text-xs rounded-full border border-yellow-400">
                        실시간 연동 활성화
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#5C320A] font-medium break-keep">
                      홈페이지의 모든 [카톡 1:1 상담] 버튼(플로팅, 모바일 하단바, 헤더, 신청완료창, 푸터)이 본 비즈니스 채널로 바로 연결됩니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                  <a
                    href={channelConfig.chatUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-[#FEE500] hover:bg-yellow-400 active:scale-95 text-[#3C1E1E] font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-2xs border border-yellow-400 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-[#3C1E1E]" />
                    <span>1:1 채팅 테스트 열기</span>
                    <ExternalLink className="w-3 h-3 text-[#3C1E1E]/60" />
                  </a>

                  <a
                    href="https://business.kakao.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-stone-900 hover:bg-black active:scale-95 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>카카오 비즈니스 센터</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Form to update Kakao Channel URL/ID */}
              <form onSubmit={handleSaveChannelConfig} className="bg-white p-3.5 sm:p-4 rounded-xl border border-yellow-300/80 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-4">
                    <label className="text-xs font-black text-[#2D1503] block mb-1">
                      카카오 채널 표시명
                    </label>
                    <input
                      type="text"
                      value={channelNameInput}
                      onChange={(e) => setChannelNameInput(e.target.value)}
                      placeholder="예: 만나옛날통닭 가맹본부"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-bold text-[#2D1503]"
                    />
                  </div>

                  <div className="sm:col-span-5">
                    <label className="text-xs font-black text-[#2D1503] block mb-1">
                      카카오 비즈니스 채널 URL 또는 검색용 ID
                    </label>
                    <input
                      type="text"
                      value={channelUrlInput}
                      onChange={(e) => setChannelUrlInput(e.target.value)}
                      placeholder="예: http://pf.kakao.com/_xxxx 또는 _xxxx"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-mono font-bold text-[#2D1503]"
                    />
                  </div>

                  <div className="sm:col-span-3 flex items-end">
                    <button
                      type="submit"
                      className="cursor-pointer w-full py-2 px-3 rounded-lg bg-[#2D1503] hover:bg-[#452005] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shadow-2xs active:scale-95"
                    >
                      <Save className="w-4 h-4 text-yellow-400" />
                      <span>채널 설정 저장하기</span>
                    </button>
                  </div>
                </div>

                {channelSavedToast && (
                  <div className="p-2.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-black flex items-center gap-1.5 animate-in fade-in duration-200">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>카카오 비즈니스 채널 정보가 성공적으로 저장되었습니다! 사이트의 모든 버튼이 즉시 갱신되었습니다.</span>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#2D1503]">현재 연결된 1:1 대화 주소:</span>
                    <code className="px-2 py-0.5 bg-stone-100 text-[#B91C1C] rounded font-bold">{channelConfig.chatUrl}</code>
                  </div>
                  <span className="text-[11px] text-stone-500">
                    * 카카오 비즈니스 관리자센터 대시보드에서 채널 홈 URL 복사 후 입력하시면 됩니다.
                  </span>
                </div>
              </form>

              {/* Kakao Business Notification Guide */}
              <div className="bg-white/80 p-3 rounded-xl border border-yellow-200 text-xs text-stone-700 space-y-1.5 leading-relaxed">
                <div className="font-black text-[#2D1503] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>💬 카카오 알림톡(카톡 자동 알림) 정식 연동 안내</span>
                </div>
                <p>
                  개설하신 카카오 비즈니스 채널로 고객 접수 시 사장님 카톡으로 <strong>'알림톡(공식 비즈니스 메시지)'</strong>을 자동 수신하시려면, 카카오 비즈니스 관리자센터 승인 후 알림톡 API 대행사(<strong>알리고 / 쿨SMS / 비즈엠 / 토스트 등</strong>)에 발송 키를 등록하여 연동하실 수 있습니다.
                </p>
                <p className="text-[#5C320A] font-bold">
                  현재는 실시간 <strong>네이버 메일 알림</strong>과 <strong>스마트폰 앱 푸시</strong>를 통해 1초 만에 알림을 즉시 받아보실 수 있도록 완벽히 설정되어 있습니다.
                </p>
              </div>
            </div>

            {/* Filter, Search & Export Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {[
                  { key: 'all', label: '전체', count: stats.total },
                  { key: 'new', label: '신규 접수', count: stats.newCount },
                  { key: 'in_progress', label: '상담 진행', count: stats.inProgressCount },
                  { key: 'completed', label: '상담 완료', count: stats.completedCount }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setStatusFilter(tab.key as any)}
                    className={`cursor-pointer px-3.5 py-2 rounded-xl font-black text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      statusFilter === tab.key
                        ? 'bg-[#2D1503] text-white shadow-xs'
                        : 'bg-[#FAF7F0] text-[#5C320A] hover:bg-yellow-100/70 border border-[#E7E2D8]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-xs px-1.5 py-0.2 rounded-full ${
                        statusFilter === tab.key
                          ? 'bg-yellow-400 text-[#2D1503]'
                          : 'bg-[#E7E2D8] text-[#5C320A]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search & Action Buttons */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="성함, 연락처, 지역 검색"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E7E2D8] bg-[#FAF7F0] text-xs sm:text-sm font-bold text-[#2D1503] focus:outline-none focus:ring-2 focus:ring-[#B91C1C]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="cursor-pointer absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <a
                  href="/gabia-upload-dist.zip"
                  download="gabia-upload-dist.zip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shrink-0 transition-colors shadow-xs active:scale-95"
                  title="가비아 웹호스팅 html 폴더에 바로 올릴 수 있는 빌드 파일 압축본"
                >
                  <Download className="w-4 h-4 text-emerald-200" />
                  <span className="hidden md:inline">가비아 호스팅용 ZIP</span>
                </a>

                <a
                  href="/manna-tongdak-homepage.zip"
                  download="manna-tongdak-homepage.zip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer px-3.5 py-2 rounded-xl bg-[#2D1503] hover:bg-black text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shrink-0 transition-colors shadow-xs active:scale-95"
                  title="홈페이지 전체 소스코드 압축파일을 내 컴퓨터(바탕화면)에 저장"
                >
                  <Download className="w-4 h-4 text-yellow-400" />
                  <span className="hidden md:inline">홈페이지 ZIP 다운로드</span>
                </a>

                <button
                  onClick={() => exportInquiriesToCSV(inquiries)}
                  className="cursor-pointer px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shrink-0 transition-colors shadow-xs active:scale-95"
                  title="엑셀 호환 CSV 파일로 전체 내역 다운로드"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span className="hidden sm:inline">CSV 엑셀 다운로드</span>
                </button>
              </div>
            </div>

            {/* Inquiries Cards List */}
            {filteredInquiries.length === 0 ? (
              <div className="text-center py-16 bg-[#FAF7F0] rounded-2xl border border-dashed border-[#E7E2D8] space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-200/80 text-stone-500 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <p className="text-base font-black text-[#2D1503]">해당 조건의 가맹문의 접수 내역이 없습니다.</p>
                <p className="text-xs sm:text-sm text-[#5C320A]">
                  검색어를 변경하거나 필터를 초기화해보세요.
                </p>
                <button
                  onClick={loadData}
                  className="cursor-pointer mt-2 px-4 py-2 rounded-xl bg-yellow-400 text-[#2D1503] font-black text-xs sm:text-sm shadow-xs"
                >
                  새로고침 / 샘플 데이터 다시 불러오기
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInquiries.map((item) => {
                  const mailtoUrl = generateMailtoUrl(item, 'naver');

                  return (
                    <div
                      key={item.id}
                      className={`bg-white rounded-2xl border transition-all p-4 sm:p-6 space-y-4 shadow-xs ${
                        item.status === 'new'
                          ? 'border-red-300 ring-2 ring-red-100'
                          : 'border-[#E7E2D8]'
                      }`}
                    >
                      {/* Card Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#E7E2D8]">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="px-2.5 py-1 rounded-md bg-stone-100 text-[#2D1503] font-black text-xs">
                            {item.id}
                          </span>
                          <span className="text-xs sm:text-sm text-stone-500 font-bold flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.date}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300 text-xs font-black flex items-center gap-1">
                            <MessageCircle className="w-3 h-3 text-[#3C1E1E]" />
                            카톡({NOTIFICATION_TARGETS.kakaoId}) 알림연동
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black flex items-center gap-1">
                            <Mail className="w-3 h-3 text-emerald-600" />
                            네이버({NOTIFICATION_TARGETS.naverEmail}) 수신
                          </span>
                        </div>

                        {/* Status Change Selector */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#5C320A]">상태:</span>
                          <select
                            value={item.status}
                            onChange={(e) => handleStatusChange(item.id, e.target.value as InquiryStatus)}
                            className={`cursor-pointer text-xs sm:text-sm font-black px-3 py-1.5 rounded-lg border focus:outline-none transition-colors ${
                              item.status === 'new'
                                ? 'bg-red-50 text-[#B91C1C] border-red-300'
                                : item.status === 'in_progress'
                                ? 'bg-amber-50 text-amber-900 border-amber-300'
                                : item.status === 'completed'
                                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                : 'bg-stone-100 text-stone-700 border-stone-300'
                            }`}
                          >
                            <option value="new">🔴 신규 접수</option>
                            <option value="in_progress">🟠 상담 진행 중</option>
                            <option value="completed">🟢 상담 완료</option>
                            <option value="hold">⚪ 보류 / 추후 연락</option>
                          </select>

                          <button
                            onClick={() => handleDelete(item.id, item.data.name)}
                            className="cursor-pointer p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                            title="접수 내역 삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Main Data Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Column 1: Applicant Profile */}
                        <div className="space-y-2 bg-[#FAF7F0] p-3.5 rounded-xl border border-[#E7E2D8]">
                          <span className="text-xs font-bold text-[#5C320A] block">신청자 인적사항</span>
                          <div className="space-y-1.5">
                            <p className="text-lg font-black text-[#2D1503]">{item.data.name}</p>
                            <div className="flex items-center gap-2">
                              <a
                                href={`tel:${item.data.phone}`}
                                className="cursor-pointer inline-flex items-center gap-1 text-sm font-black text-[#B91C1C] hover:underline"
                                title="클릭하여 바로 전화걸기"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                <span>{item.data.phone}</span>
                              </a>
                            </div>
                            <p className="text-xs text-stone-600 flex items-center gap-1 font-semibold pt-1">
                              <MapPin className="w-3.5 h-3.5 text-[#B91C1C] shrink-0" />
                              <span>
                                {item.data.regionProvince} {item.data.regionCity}
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Column 2: Startup Intent Details */}
                        <div className="space-y-2 bg-[#FAF7F0] p-3.5 rounded-xl border border-[#E7E2D8]">
                          <span className="text-xs font-bold text-[#5C320A] block">창업 조건 및 환경</span>
                          <div className="space-y-1.5 text-xs sm:text-sm text-[#2D1503]">
                            <div className="flex items-center justify-between">
                              <span className="text-stone-500 font-bold flex items-center gap-1">
                                <Building2 className="w-3.5 h-3.5" /> 점포 유무:
                              </span>
                              <span className="font-black">{item.data.hasStore}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-stone-500 font-bold flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" /> 희망 시기:
                              </span>
                              <span className="font-black">{item.data.startupTimeline}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-stone-500 font-bold flex items-center gap-1">
                                <Coins className="w-3.5 h-3.5" /> 예상 예산:
                              </span>
                              <span className="font-black text-[#B91C1C]">{item.data.budgetRange}</span>
                            </div>
                          </div>
                        </div>

                        {/* Column 3: Customer Message & Fast Actions */}
                        <div className="space-y-2 bg-[#FAF7F0] p-3.5 rounded-xl border border-[#E7E2D8] flex flex-col justify-between">
                          <div>
                            <span className="text-xs font-bold text-[#5C320A] block flex items-center gap-1">
                              <MessageSquare className="w-3.5 h-3.5" /> 고객 상세 문의사항
                            </span>
                            <p className="text-xs sm:text-sm text-[#2D1503] font-medium mt-1.5 leading-relaxed break-keep line-clamp-4">
                              {item.data.message || '(추가 문의내용 없음)'}
                            </p>
                          </div>

                          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleCopyKakao(item)}
                              className="cursor-pointer w-full sm:flex-1 py-1.5 px-2 rounded-lg bg-[#FEE500] hover:bg-yellow-400 text-[#3C1E1E] text-xs font-black flex items-center justify-center gap-1 transition-colors shadow-2xs"
                              title="카카오톡 1:1 전송용 텍스트 복사"
                            >
                              {copiedId === item.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-700" />
                                  <span>카톡문구 복사됨!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>카톡 알림문구 복사</span>
                                </>
                              )}
                            </button>
                            <a
                              href={`tel:${item.data.phone}`}
                              className="cursor-pointer w-full sm:flex-1 py-1.5 px-2 rounded-lg bg-[#2D1503] hover:bg-black text-white text-xs font-black flex items-center justify-center gap-1 transition-colors"
                            >
                              <Phone className="w-3 h-3 text-yellow-400" />
                              <span>전화 걸기</span>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Internal Admin Note Row */}
                      <div className="pt-2 border-t border-[#E7E2D8]">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-[#5C320A] flex items-center gap-1">
                            📝 본사 상담원 내부 메모 (운영자 전용)
                          </span>
                          {savedNoteSuccessId === item.id && (
                            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-in fade-in">
                              <CheckCircle2 className="w-3.5 h-3.5" /> 저장 완료!
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={activeNotes[item.id] !== undefined ? activeNotes[item.id] : item.adminNote || ''}
                            onChange={(e) => {
                              setActiveNotes({
                                ...activeNotes,
                                [item.id]: e.target.value
                              });
                            }}
                            placeholder="상담 결과, 방문 일정, 추천 상권 메모를 입력하세요 (예: 9/5 14:00 1차 전화상담 완료)"
                            className="flex-1 px-3 py-2 rounded-xl border border-[#E7E2D8] text-xs sm:text-sm font-semibold text-[#2D1503] bg-[#FAF7F0] focus:outline-none focus:ring-1 focus:ring-[#B91C1C]"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveNote(item.id);
                            }}
                          />
                          <button
                            onClick={() => handleSaveNote(item.id)}
                            className="cursor-pointer px-3 py-2 rounded-xl bg-[#2D1503] hover:bg-black text-white text-xs font-black flex items-center gap-1 shrink-0 transition-colors shadow-2xs"
                          >
                            <Save className="w-3.5 h-3.5 text-yellow-400" />
                            <span>메모 저장</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="bg-[#FAF7F0] px-5 sm:px-7 py-3.5 border-t border-[#E7E2D8] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#5C320A] shrink-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold">만나옛날통닭 가맹사업본부</span>
            <span>|</span>
            <span>카카오톡: {NOTIFICATION_TARGETS.kakaoId}</span>
            <span>|</span>
            <span>대표전화: {COMPANY_INFO.phone}</span>
            <span>|</span>
            <span>네이버메일: {NOTIFICATION_TARGETS.naverEmail}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="cursor-pointer px-5 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-[#2D1503] font-black text-xs sm:text-sm transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>

      {/* Submodal: Change Password */}
      {showPwdChangeModal && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-[#E7E2D8] animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-[#E7E2D8]">
              <h5 className="font-black text-lg text-[#2D1503] flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-[#B91C1C]" />
                관리자 비밀번호 변경
              </h5>
              <button
                onClick={() => setShowPwdChangeModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNewPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-[#2D1503] mb-1">
                  새로운 비밀번호 (4자리 이상)
                </label>
                <input
                  type="password"
                  value={newPwdInput}
                  onChange={(e) => setNewPwdInput(e.target.value)}
                  placeholder="새 비밀번호 입력"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E2D8] text-sm font-bold bg-[#FAF7F0] focus:outline-none focus:ring-2 focus:ring-[#B91C1C]"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPwdChangeModal(false)}
                  className="cursor-pointer px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#2D1503] text-xs font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-2 rounded-xl bg-[#B91C1C] hover:bg-red-800 text-white text-xs font-black shadow-xs"
                >
                  변경 저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
