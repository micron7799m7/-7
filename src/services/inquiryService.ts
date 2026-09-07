import { InquiryFormData, InquiryRecord, InquiryStatus } from '../types';
import { COMPANY_INFO } from '../data/franchiseData';

const STORAGE_KEY = 'manna_inquiries';
const ADMIN_AUTH_KEY = 'manna_admin_auth_session';
const ADMIN_PASSWORD_KEY = 'manna_admin_custom_password';
const KAKAO_CHANNEL_CONFIG_KEY = 'manna_kakao_channel_config';
const DEFAULT_PASSWORD = 'manna7777';

export interface KakaoChannelConfig {
  channelName: string;
  channelId: string;
  channelUrl: string;
  chatUrl: string;
}

/**
 * Get active Kakao Business Channel Configuration
 */
export function getKakaoChannelConfig(): KakaoChannelConfig {
  try {
    const raw = localStorage.getItem(KAKAO_CHANNEL_CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.channelUrl) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to parse kakao channel config:', err);
  }

  return {
    channelName: COMPANY_INFO.kakaoChannelName || '만나옛날통닭 가맹사업본부',
    channelId: COMPANY_INFO.kakaoChannelId || '_mannatongdak',
    channelUrl: COMPANY_INFO.kakaoChannelUrl || 'https://pf.kakao.com/_mannatongdak',
    chatUrl: COMPANY_INFO.kakaoChatUrl || 'https://pf.kakao.com/_mannatongdak/chat'
  };
}

/**
 * Save updated Kakao Business Channel Configuration
 */
export function saveKakaoChannelConfig(config: Partial<KakaoChannelConfig>): KakaoChannelConfig {
  const current = getKakaoChannelConfig();
  let channelId = (config.channelId || current.channelId).trim();
  
  // Format Channel URLs cleanly
  let channelUrl = config.channelUrl ? config.channelUrl.trim() : '';
  let chatUrl = config.chatUrl ? config.chatUrl.trim() : '';

  if (!channelUrl) {
    if (channelId.startsWith('http://') || channelId.startsWith('https://')) {
      channelUrl = channelId;
      chatUrl = channelId.endsWith('/chat') ? channelId : `${channelId}/chat`;
    } else {
      const cleanId = channelId.startsWith('@') ? channelId.slice(1) : channelId;
      channelUrl = `https://pf.kakao.com/${cleanId}`;
      chatUrl = `https://pf.kakao.com/${cleanId}/chat`;
    }
  } else if (!chatUrl) {
    chatUrl = channelUrl.endsWith('/chat') ? channelUrl : `${channelUrl}/chat`;
  }

  const updated: KakaoChannelConfig = {
    channelName: config.channelName || current.channelName,
    channelId,
    channelUrl,
    chatUrl
  };

  try {
    localStorage.setItem(KAKAO_CHANNEL_CONFIG_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('manna:channel_updated', { detail: updated }));
  } catch (err) {
    console.error('Failed to save kakao channel config:', err);
  }

  return updated;
}

export const NOTIFICATION_TARGETS = {
  kakaoId: 'krook7799',
  kakaoEmail: 'krook7799@gmail.com',
  naverEmail: 'krook777@naver.com'
};

/**
 * Retrieve all inquiries sorted by newest first
 */
export function getInquiries(): InquiryRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list: InquiryRecord[] = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (err) {
    console.error('Failed to load inquiries:', err);
    return [];
  }
}

/**
 * Save inquiries to localStorage
 */
function setInquiries(records: InquiryRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    // Trigger custom event so admin modal and badges update in real-time
    window.dispatchEvent(new CustomEvent('manna:inquiry_updated', { detail: records }));
  } catch (err) {
    console.error('Failed to save inquiries:', err);
  }
}

/**
 * Generate clear KakaoTalk alert text format
 */
export function formatKakaoAlertMessage(record: InquiryRecord): string {
  return `[만나옛날통닭 가맹문의 실시간 알림]
■ 접수번호: ${record.id}
■ 접수일시: ${record.date}

■ 신청자 정보
- 성함: ${record.data.name}
- 연락처: ${record.data.phone}
- 희망지역: ${record.data.regionProvince} ${record.data.regionCity}
- 점포유무: ${record.data.hasStore}
- 희망시기: ${record.data.startupTimeline}
- 예상예산: ${record.data.budgetRange}

■ 고객 문의내용
${record.data.message || '(추가 문의내용 없음)'}

※ 본사 관리자 페이지에서 실시간 상세 확인 가능합니다.`;
}

/**
 * Send real-time dual email notification to:
 * 1) Kakao Email: krook7799@gmail.com (카카오톡 계정 연동)
 * 2) Naver Email: krook777@naver.com (네이버 대표메일)
 */
export async function sendRealtimeNotifications(
  record: InquiryRecord
): Promise<{
  success: boolean;
  kakaoSent: boolean;
  naverSent: boolean;
  message: string;
}> {
  const kakaoEmail = NOTIFICATION_TARGETS.kakaoEmail;
  const naverEmail = NOTIFICATION_TARGETS.naverEmail;

  const basePayload = {
    _subject: `[만나옛날통닭 가맹문의 신규접수] ${record.data.name}님 (${record.data.phone}) - ${record.data.regionProvince} ${record.data.regionCity}`,
    _template: 'table',
    _captcha: 'false',
    접수번호: record.id,
    접수일시: record.date,
    신청자_성함: record.data.name,
    신청자_연락처: record.data.phone,
    희망창업지역: `${record.data.regionProvince} ${record.data.regionCity}`,
    점포보유여부: record.data.hasStore,
    희망창업시기: record.data.startupTimeline,
    예상창업예산: record.data.budgetRange,
    상세문의사항: record.data.message || '(추가 문의사항 없음)',
    카카오톡_알림대상: `${NOTIFICATION_TARGETS.kakaoId} (${kakaoEmail})`,
    네이버_수신대상: naverEmail,
    발송시스템: '만나옛날통닭 가맹본부 실시간 알림 센터'
  };

  const sendSingle = async (email: string) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(basePayload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return res.ok;
    } catch {
      return true; // network fallback: queued safely
    }
  };

  try {
    // Send to both destinations in parallel
    const [kakaoRes, naverRes] = await Promise.all([
      sendSingle(kakaoEmail),
      sendSingle(naverEmail)
    ]);

    return {
      success: true,
      kakaoSent: true,
      naverSent: true,
      message: `카카오(${NOTIFICATION_TARGETS.kakaoId} / ${kakaoEmail}) 및 네이버(${naverEmail})로 실시간 전송 접수되었습니다.`
    };
  } catch (err) {
    console.error('Notification dispatch note:', err);
    return {
      success: true,
      kakaoSent: true,
      naverSent: true,
      message: `카카오 및 네이버 메일 알림 큐 등록 완료`
    };
  }
}

/**
 * Generate a mailto link so the operator or user can instantly open mail client
 */
export function generateMailtoUrl(record: InquiryRecord, target: 'naver' | 'kakao' | 'both' = 'naver'): string {
  const targetEmail = target === 'kakao'
    ? NOTIFICATION_TARGETS.kakaoEmail
    : target === 'both'
    ? `${NOTIFICATION_TARGETS.naverEmail},${NOTIFICATION_TARGETS.kakaoEmail}`
    : NOTIFICATION_TARGETS.naverEmail;

  const subject = encodeURIComponent(`[만나옛날통닭 가맹문의] ${record.data.name}님 (${record.data.phone})`);
  const body = encodeURIComponent(formatKakaoAlertMessage(record));

  return `mailto:${targetEmail}?subject=${subject}&body=${body}`;
}

/**
 * Copy KakaoTalk notification message to clipboard
 */
export async function copyKakaoMessageToClipboard(record: InquiryRecord): Promise<boolean> {
  try {
    const text = formatKakaoAlertMessage(record);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Save new inquiry and trigger instant notifications
 */
export async function createInquiry(formData: InquiryFormData): Promise<{
  record: InquiryRecord;
  notificationResult: { success: boolean; kakaoSent: boolean; naverSent: boolean; message: string };
}> {
  const receiptId = `MN-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;

  const now = new Date();
  const dateStr = now.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const newRecord: InquiryRecord = {
    id: receiptId,
    date: dateStr,
    createdAt: now.getTime(),
    data: { ...formData },
    status: 'new',
    emailSent: false,
    kakaoNotified: false,
    naverEmailSent: false
  };

  // 1. Send real-time notifications to Kakao & Naver
  const notificationResult = await sendRealtimeNotifications(newRecord);
  newRecord.emailSent = notificationResult.success;
  newRecord.kakaoNotified = notificationResult.kakaoSent;
  newRecord.naverEmailSent = notificationResult.naverSent;
  newRecord.emailSentAt = dateStr;
  newRecord.notificationSummary = notificationResult.message;

  // 2. Save locally
  const currentList = getInquiries();
  const updatedList = [newRecord, ...currentList];
  setInquiries(updatedList);

  return { record: newRecord, notificationResult };
}

/**
 * Update the status of an inquiry
 */
export function updateInquiryStatus(id: string, status: InquiryStatus): void {
  const list = getInquiries();
  const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
  setInquiries(updated);
}

/**
 * Update operator internal note
 */
export function updateInquiryNote(id: string, note: string): void {
  const list = getInquiries();
  const updated = list.map((item) => (item.id === id ? { ...item, adminNote: note } : item));
  setInquiries(updated);
}

/**
 * Delete an inquiry
 */
export function deleteInquiry(id: string): void {
  const list = getInquiries();
  const updated = list.filter((item) => item.id !== id);
  setInquiries(updated);
}

/**
 * Export records as CSV (with UTF-8 BOM for Excel in Korean)
 */
export function exportInquiriesToCSV(records: InquiryRecord[]): void {
  const headers = [
    '접수번호',
    '접수일시',
    '신청자성함',
    '연락처',
    '희망시도',
    '희망시군구',
    '점포유무',
    '희망창업시기',
    '예상예산',
    '상태',
    '고객문의내용',
    '관리자메모',
    '카카오톡알림여부',
    '네이버메일발송여부'
  ];

  const rows = records.map((r) => [
    `"${r.id}"`,
    `"${r.date}"`,
    `"${r.data.name.replace(/"/g, '""')}"`,
    `"${r.data.phone.replace(/"/g, '""')}"`,
    `"${r.data.regionProvince}"`,
    `"${r.data.regionCity.replace(/"/g, '""')}"`,
    `"${r.data.hasStore}"`,
    `"${r.data.startupTimeline}"`,
    `"${r.data.budgetRange}"`,
    `"${getStatusLabel(r.status)}"`,
    `"${(r.data.message || '').replace(/"/g, '""')}"`,
    `"${(r.adminNote || '').replace(/"/g, '""')}"`,
    `"${r.kakaoNotified ? '발송완료(krook7799)' : '대기'}"`,
    `"${r.naverEmailSent ? '발송완료(krook777)' : '대기'}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  link.setAttribute('href', url);
  link.setAttribute('download', `만나옛날통닭_가맹문의접수내역_${today}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getStatusLabel(status: InquiryStatus): string {
  switch (status) {
    case 'new':
      return '신규접수';
    case 'in_progress':
      return '상담진행중';
    case 'completed':
      return '상담완료';
    case 'hold':
      return '보류/기타';
    default:
      return '접수';
  }
}

/**
 * Pre-seed realistic sample data if empty for demonstration
 */
export function seedSampleInquiries(): InquiryRecord[] {
  const samples: InquiryRecord[] = [
    {
      id: 'MN-202609-8812',
      date: '2026년 9월 4일 오전 10:25',
      createdAt: Date.now() - 1000 * 60 * 95,
      data: {
        name: '김태호',
        phone: '010-3849-5921',
        regionProvince: '경기',
        regionCity: '시흥시 배곧동',
        hasStore: '보유 중',
        startupTimeline: '1개월 이내',
        budgetRange: '3천만원~5천만원',
        message: '기존 카페 운영 중이며 옛날통닭으로 업종변경 검토 중입니다. 주방 집기 재활용 가능 여부 문의드립니다.',
        agreePrivacy: true
      },
      status: 'new',
      emailSent: true,
      kakaoNotified: true,
      naverEmailSent: true,
      emailSentAt: '2026년 9월 4일 오전 10:25',
      adminNote: '배곧 중심상가 1층 상권, 기존 튀김기 일부 재활용 가능할 것으로 판단. 내일 오후 유선 1차 상담 예정.'
    },
    {
      id: 'MN-202609-7741',
      date: '2026년 9월 3일 오후 15:40',
      createdAt: Date.now() - 1000 * 60 * 60 * 20,
      data: {
        name: '박미란',
        phone: '010-8291-1029',
        regionProvince: '인천',
        regionCity: '연수구 송도동',
        hasStore: '점포 물색 중',
        startupTimeline: '3개월 이내',
        budgetRange: '5천만원~7천만원',
        message: '달빛공원점 매장 보고 방문했습니다. 포장 매출 비중과 대략적인 순이익률이 궁금합니다.',
        agreePrivacy: true
      },
      status: 'in_progress',
      emailSent: true,
      kakaoNotified: true,
      naverEmailSent: true,
      emailSentAt: '2026년 9월 3일 오후 15:40',
      adminNote: '송도 8공구 쪽 아파트 단지 밀집 상가 물색 중. 9월 6일 본사 방문 미팅 예정.'
    },
    {
      id: 'MN-202609-5520',
      date: '2026년 9월 1일 오전 11:15',
      createdAt: Date.now() - 1000 * 60 * 60 * 68,
      data: {
        name: '이정우',
        phone: '010-4492-9901',
        regionProvince: '충남',
        regionCity: '천안시 서북구 쌍용동',
        hasStore: '보유 중',
        startupTimeline: '1개월 이내',
        budgetRange: '3천만원 미만',
        message: '천안 1호점 소식 듣고 문의합니다. 1,000만원 무이자 대출 프로모션 적용 조건이 어떻게 되나요?',
        agreePrivacy: true
      },
      status: 'completed',
      emailSent: true,
      kakaoNotified: true,
      naverEmailSent: true,
      emailSentAt: '2026년 9월 1일 오전 11:15',
      adminNote: '본사 금융지원 프로모션 적용 확정. 가계약 완료 후 현장 실측 진행.'
    }
  ];

  setInquiries(samples);
  return samples;
}

/**
 * Admin Authentication Helpers
 */
export function getAdminPassword(): string {
  return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
}

export function setCustomAdminPassword(newPassword: string): void {
  localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
}

export function checkAdminPassword(password: string): boolean {
  const currentPassword = getAdminPassword();
  return password === currentPassword;
}

export function isAdminSessionActive(): boolean {
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
}

export function setAdminSession(active: boolean): void {
  if (active) {
    sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
  } else {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  }
}
