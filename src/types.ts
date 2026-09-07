export interface MenuItem {
  id: string;
  name: string;
  category: 'tongdak' | 'specialty' | 'side';
  description: string;
  hallPrice: string;
  takeoutPrice: string;
  hallPriceNum: number;
  takeoutPriceNum: number;
  badge?: string;
  image: string;
  tags: string[];
  features: string[];
}

export interface StoreInfo {
  id: string;
  name: string;
  branchName: string;
  address: string;
  phone: string;
  openHours: string;
  features: string[];
  image: string;
  naverMapUrl: string;
  kakaoMapUrl: string;
  tag: string;
}

export interface StartupStep {
  step: string;
  number: string;
  title: string;
  desc: string;
  details: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: '창업' | '운영' | '비용' | '메뉴';
}

export interface InquiryFormData {
  name: string;
  phone: string;
  regionProvince: string;
  regionCity: string;
  hasStore: '보유 중' | '점포 없음(상권분석 필요)' | '점포 물색 중';
  startupTimeline: '1개월 이내' | '3개월 이내' | '6개월 이내' | '미정';
  budgetRange: '3천만원 미만' | '3천만원~5천만원' | '5천만원~7천만원' | '7천만원 이상';
  message: string;
  agreePrivacy: boolean;
}

export type InquiryStatus = 'new' | 'in_progress' | 'completed' | 'hold';

export interface InquiryRecord {
  id: string;
  date: string;
  createdAt: number;
  data: InquiryFormData;
  status: InquiryStatus;
  adminNote?: string;
  emailSent?: boolean;
  emailSentAt?: string;
  kakaoNotified?: boolean;
  naverEmailSent?: boolean;
  notificationSummary?: string;
}

export interface CostPlan {
  id: 'A' | 'B' | 'C';
  title: string;
  subtitle: string;
  standardSize: string;
  totalCost: string;
  totalCostNum: number;
  badge: string;
  description: string;
  items: {
    name: string;
    cost: string;
    note?: string;
  }[];
  recommendedFor: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  stats: string;
  visitInfo: string;
  content: string;
  tags: string[];
  dishName: string;
  image: string;
  category: 'crispy' | 'cost' | 'chimaek' | 'friendly';
  isReceiptVerified: boolean;
  highlightTag?: string;
}
