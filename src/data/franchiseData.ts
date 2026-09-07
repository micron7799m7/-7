import { MenuItem, StoreInfo, StartupStep, FaqItem, CostPlan, CustomerReview } from '../types';
import { BrandImages } from '../assets/images';

export const COMPANY_INFO = {
  brandName: '만나옛날통닭',
  legalName: '만나옛날통닭(주)',
  domain: 'mannachicken.co.kr',
  websiteUrl: 'https://mannachicken.co.kr',
  ceo: '이상윤',
  businessNumber: '891-65-00744',
  address: '경기도 시흥시 서울대학로264번길26-16, 10층 1010-59호',
  phone: '1661-8518',
  directPhone: '010-8111-5742',
  email: 'krook777@naver.com',
  naverEmail: 'krook777@naver.com',
  kakaoId: 'krook7799',
  kakaoEmail: 'krook7799@gmail.com',
  kakaoChannelName: '만나옛날통닭 가맹사업본부',
  kakaoChannelId: '_mannatongdak',
  kakaoChannelUrl: 'https://pf.kakao.com/_mannatongdak',
  kakaoChatUrl: 'https://pf.kakao.com/_mannatongdak/chat',
  operatingHours: '평일 09:00 - 18:00 (주말 및 공휴일 상담 예약 가능)',
  slogan: '맛있는게 생각날때~ 만나옛날통닭',
  subSlogan: '시원한 얼음 생맥 한잔과 부담 없이 즐기는 맛있는 한 마리, 동네에서 오래 사랑받는 우리 동네 통닭집',
  subCopy: '누구나 편하게 찾는 우리 동네 통닭집. 익숙한 맛에 경쟁력 있는 운영 시스템을 더했습니다.'
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'tongdak',
    name: '옛날통닭',
    category: 'tongdak',
    description: '100% 하림 국내산 신선육으로 튀겨낸 겉바속촉 시그니처. 얇고 바삭한 튀김옷과 촉촉한 육즙의 정통 옛날통닭입니다.',
    hallPrice: '1마리 12,500원 / 2마리 20,000원',
    takeoutPrice: '1마리 9,900원 / 2마리 18,000원',
    hallPriceNum: 12500,
    takeoutPriceNum: 9900,
    badge: '시그니처 No.1',
    image: BrandImages.menuTongdak,
    tags: ['겉바속촉', '100% 하림 생닭', '포장 9,900원 특가'],
    features: ['신선한 100% 국내산 닭', '특제 파우더로 얇고 바삭한 껍질', '남녀노소 누구나 좋아하는 추억의 맛']
  },
  {
    id: 'yangnyeom',
    name: '양념통닭',
    category: 'tongdak',
    description: '바삭하게 튀긴 통닭에 만나만의 비법 달콤매콤 특제 양념소스를 골고루 버무려 깊은 풍미를 자랑합니다.',
    hallPrice: '14,500원',
    takeoutPrice: '13,500원',
    hallPriceNum: 14500,
    takeoutPriceNum: 13500,
    badge: '인기메뉴',
    image: BrandImages.menuYangnyeom,
    tags: ['달콤매콤', '비법 특제소스', '중독적인 맛'],
    features: ['물리지 않는 깔끔한 단짠 매콤 소스', '바삭함을 잃지 않는 코팅 조리법', '아이부터 어른까지 온 가족 취향 저격']
  },
  {
    id: 'dakdari',
    name: '닭다리후라이드',
    category: 'specialty',
    description: '살이 통통하고 육즙 가득한 닭다리만 쏙 골라 바삭하게 튀겨낸 프리미엄 부위 메뉴 (6개 구성).',
    hallPrice: '13,500원 (6개)',
    takeoutPrice: '12,500원 (6개)',
    hallPriceNum: 13500,
    takeoutPriceNum: 12500,
    badge: '강력추천',
    image: BrandImages.menuDakdari,
    tags: ['통통한 닭다리 6개', '육즙 폭발', '겉바속촉'],
    features: ['닭다리 선호 고객을 위한 특화 메뉴', '한 입 베어물면 차오르는 풍부한 육즙', '맥주 안주로 압도적인 인기']
  },
  {
    id: 'dakdari-yangnyeom',
    name: '닭다리양념',
    category: 'specialty',
    description: '육즙 가득 부드러운 닭다리에 만나 비법 달콤매콤 특제 양념소스를 듬뿍 버무려 풍미를 극대화한 특화 메뉴.',
    hallPrice: '14,500원 (6개)',
    takeoutPrice: '13,500원 (6개)',
    hallPriceNum: 14500,
    takeoutPriceNum: 13500,
    badge: '인기신메뉴',
    image: BrandImages.menuDakdariYangnyeom,
    tags: ['달콤매콤 특제양념', '육즙 가득 닭다리', '남녀노소 취향저격'],
    features: ['통통한 닭다리와 특제 양념의 완벽한 조화', '손에 묻혀가며 먹는 중독적인 양념 맛', '어린이 간식 및 시원한 맥주 안주 최고']
  },
  {
    id: 'sunsal',
    name: '순살후라이드',
    category: 'specialty',
    description: '뼈를 발라낼 필요 없이 간편하게 즐기는 바삭고소 순살 후라이드. 아이들 간식과 가벼운 치맥에 제격입니다.',
    hallPrice: '중 13,500원 / 대 22,000원',
    takeoutPrice: '중 12,500원 / 대 21,000원',
    hallPriceNum: 13500,
    takeoutPriceNum: 12500,
    image: BrandImages.menuSunsal,
    tags: ['간편한 한입', '아이들 인기', '깔끔한 순살'],
    features: ['신선육 순살로 잡내 없이 담백', '바삭한 크런치 식감 극대화', '사이드 소스와 찰떡 궁합']
  },
  {
    id: 'gangjeong',
    name: '닭강정',
    category: 'specialty',
    description: '바삭하게 튀긴 순살에 쫀득하고 달콤한 특제 강정 소스를 버무리고 고소한 땅콩 분태를 듬뿍 올린 별미.',
    hallPrice: '중 13,500원 / 대 23,000원',
    takeoutPrice: '중 12,500원 / 대 21,000원',
    hallPriceNum: 13500,
    takeoutPriceNum: 12500,
    badge: '스테디셀러',
    image: BrandImages.menuGangjeong,
    tags: ['식어도 바삭달콤', '고소한 땅콩', '포장 인기 1위'],
    features: ['식어도 눅눅해지지 않는 비법 소스', '고소함이 배가되는 땅콩 토핑', '퇴근길 포장 구매율 최상위']
  },
  {
    id: 'gizzard',
    name: '닭똥집튀김',
    category: 'side',
    description: '신선한 닭똥집(근위)을 겉은 바삭하고 속은 쫄깃하게 튀겨내 청양마요나 특제 소스에 찍어 먹는 최고의 생맥주 안주.',
    hallPrice: '중 13,500원 / 대 22,000원',
    takeoutPrice: '중 12,500원 / 대 21,000원',
    hallPriceNum: 13500,
    takeoutPriceNum: 12500,
    badge: '생맥주 꿀조합',
    image: BrandImages.menuGizzard,
    tags: ['쫄깃고소 식감', '가성비 안주', '재주문율 1위'],
    features: ['잡내 없이 깔끔하게 손질된 신선 근위', '중독성 강한 오독쫄깃 크리스피 식감', '주류 매출을 견인하는 필수 효자 메뉴']
  }
];

export const STORES: StoreInfo[] = [
  {
    id: 'dalbit',
    name: '만나옛날통닭 달빛공원점',
    branchName: '달빛공원점 (직영/가맹모델)',
    address: '인천 연수구 아트센터대로168번길 100, 한라웨스턴파크 송도 G178호',
    phone: '032-832-8968',
    openHours: '매일 15:00 - 24:00 (연중무휴)',
    features: ['야외 테라스 치맥 좌석', '송도 달빛축제공원 인근', '홀+포장+배달 성업 중'],
    image: BrandImages.storeSignDalbit,
    naverMapUrl: 'https://map.naver.com/v5/search/%EB%A7%8C%EB%82%98%EC%98%9B%EB%82%A0%ED%86%B5%EB%8B%AD%20%EB%8B%AC%EB% light%EA%B3%B5%EC%9B%90%EC%A0%90',
    kakaoMapUrl: 'https://map.kakao.com/?q=%EB%A7%8C%EB%82%98%EC%98%9B%EB%82%A0%ED%86%B5%EB%8B%AD%20%EB%8B%AC%EB%B9%9B%EA%B3%B5%EC%9B%90%EC%A0%90',
    tag: '인천 송도'
  },
  {
    id: 'cheonan',
    name: '만나옛날통닭 천안1호점',
    branchName: '천안1호점 (두정동)',
    address: '충남 천안시 서북구 두정고4길 8, 1동 1층',
    phone: '041-414-8968',
    openHours: '매일 14:00 - 01:00 (연중무휴)',
    features: ['두정동 주거 및 학군 밀집 상권', '퇴근길 포장 및 단체 홀 손님 북적', '오픈 첫날부터 문전성시'],
    image: BrandImages.storeCheonan,
    naverMapUrl: 'https://map.naver.com/v5/search/%EC%B2%9C%EC%95%88%EC%8B%9C%20%EC%84%9C%EB%B6%81%EA%B5%AC%20%EB%91%90%EC%A0%95%EA%B3%A04%EA%B8%B88',
    kakaoMapUrl: 'https://map.kakao.com/?q=%EC%B2%9C%EC%95%88%EC%8B%9C%20%EC%84%9C%EB%B6%81%EA%B5%AC%20%EB%91%90%EC%A0%95%EA%B3%A04%EA%B8%B88',
    tag: '충남 천안'
  }
];

export const WHY_MANNA_CARDS = [
  {
    number: '01',
    title: '남녀노소 좋아하는 익숙한 메뉴',
    description: '옛날통닭을 필두로 양념통닭, 닭다리후라이드, 닭다리양념, 닭강정, 순살치킨, 닭똥집튀김 등 유행을 타지 않고 수십 년간 꾸준히 사랑받는 대중적인 스테디셀러 구성.',
    badge: '스테디셀러',
    highlight: '유행 없이 365일 안정적인 수요'
  },
  {
    number: '02',
    title: '포장 · 홀 · 배달 3-Way 구조',
    description: '상권 특성에 맞춰 다양한 판매 방식을 탄력적으로 운영합니다. 초저녁 퇴근길 포장 손님부터 늦은 밤 얼음생맥주 홀 손님, 주말 배달까지 시간대별 매출 공백이 없습니다.',
    badge: '안정적 매출',
    highlight: '시간대별 매출 공백 없는 복합 구조'
  },
  {
    number: '03',
    title: '친근한 가격과 높은 일상 접근성',
    description: '100% 하림 국내산 신선육을 본사 대량 유통으로 합리적 원가에 공급. 특별한 날만 먹는 비싼 치킨이 아닌, 매일 가볍게 들르는 동네 사랑방 가격 경쟁력.',
    badge: '가격 경쟁력',
    highlight: '포장 9,900원대의 파격적인 손님 유입력'
  },
  {
    number: '04',
    title: '초보자도 쉬운 본사 원스톱 시스템',
    description: '닭 손질부터 특제 파우더 파우더링, 튀김 온도와 타이머 매뉴얼까지 1:1 집중 실무 교육. 요리 경험이 전무한 초보 창업자도 단 며칠 만에 마스터 가능합니다.',
    badge: '이지 오퍼레이션',
    highlight: '단순화된 조리 동선으로 1~2인 운영 최적화'
  }
];

export const STARTUP_STEPS: StartupStep[] = [
  {
    step: 'STEP 01',
    number: '01',
    title: '가맹상담 & 맞춤분석',
    desc: '예산 및 희망 지역에 맞춘 1:1 상담과 창업 유형(신규/실속/업종변경) 선정',
    details: ['창업 희망 지역 및 가용 예산 진단', 'A/B/C 타입 맞춤형 모델 제안', '가맹 절차 및 지원 혜택 상세 안내']
  },
  {
    step: 'STEP 02',
    number: '02',
    title: '상권 및 입지 검토',
    desc: '본사 전문가의 철저한 현장 실사와 유동인구, 배후 주거세대 분석',
    details: ['주거단지 및 퇴근길 동선 분석', '경쟁 브랜드 현황 및 예상 객단가 조사', '가장 적합한 점포 후보지 추천']
  },
  {
    step: 'STEP 03',
    number: '03',
    title: '가맹계약 체결',
    desc: '투명하고 공정한 정보공개서 열람 및 가맹계약 정식 체결',
    details: ['가맹계약서 및 정보공개서 교부', '영업 권역 보호 구역 확정', '오픈 일정 로드맵 수립']
  },
  {
    step: 'STEP 04',
    number: '04',
    title: '매장 설계 및 시공',
    desc: '점주 맞춤형 동선 설계 및 실속형 인테리어·주방 설비 세팅',
    details: ['10~15평 기준 최적 조리/홀 동선 배치', '간판 및 내·외부 사인물 시공', '주방 튀김기, 냉장/냉동고 등 집기 입고']
  },
  {
    step: 'STEP 05',
    number: '05',
    title: '본사 운영 및 조리 교육',
    desc: '원재료 관리, 닭 튀김 실습, POS 조작, 고객 응대까지 실전 교육',
    details: ['황금빛 겉바속촉 튀김 조리 노하우 전수', '재고 관리 및 유통 발주 시스템 교육', '위생 관리 및 홀/포장 서비스 매뉴얼 교육']
  },
  {
    step: 'STEP 06',
    number: '06',
    title: '그랜드 오픈 & 본사 지원',
    desc: '본사 오픈 바이저 현장 파견 지원 및 지역 밀착 온·오프라인 마케팅',
    details: ['본사 전문 인력 오픈 현장 1:1 밀착 지원', '오픈 기념 포장 할인 및 현수막/전단 배포', '지속적인 슈퍼바이징과 원재료 안정 공급']
  }
];

export const RECOMMENDED_AREAS = [
  {
    title: '대단지 아파트 배후 상권',
    desc: '가족 단위 간식 및 주말 야식 수요가 꾸준하며, 아이들 하교 및 퇴근 시간대 포장 매출이 높은 안정적 상권',
    features: ['가족 고객 단위 다수', '주말/평일 저녁 포장·배달 집중', '입소문 재방문율 우수']
  },
  {
    title: '주거 밀집 및 빌라촌 상권',
    desc: '1~2인 가구 및 직장인 주거 밀집지로 가성비 높은 1마리/순살 치맥 소비가 활발한 생활 밀착형 상권',
    features: ['1인~소인 가구 타겟', '부담 없는 가격대로 잦은 방문', '단골 손님 확보 용이']
  },
  {
    title: '퇴근길 버스정류장/역세권 동선',
    desc: '지하철역 또는 주요 버스정류장에서 주거지로 이어지는 귀가 동선상 매장으로 퇴근길 충동 구매와 테이크아웃 극대화',
    features: ['저녁 6시~9시 포장 폭발', '지나가는 손님의 시각·후각 자극', '높은 회전율']
  },
  {
    title: '배달 & 테이크아웃 복합 수요지',
    desc: '임대료 부담이 적은 이면도로에서도 빠른 포장 픽업과 배달 반경을 넓게 확보할 수 있는 알짜 입지',
    features: ['상대적으로 저렴한 월 임대료', '배달앱 효율 극대화', '고정비 절감형 창업']
  },
  {
    title: '접근성 좋은 1층 로드샵',
    desc: '보행자 시야에 즉시 노출되는 1층 매장으로 갓 튀겨낸 고소한 통닭 냄새와 노릇한 디스플레이가 직접 고객 유치',
    features: ['자연스러운 시선 유입', '픽업이 편리한 전면 구조', '야외 테이블 설치 시 추가 매출']
  }
];

export const COST_PLANS: CostPlan[] = [
  {
    id: 'A',
    title: 'A타입 (인테리어형)',
    subtitle: '감성적인 인테리어로 홀 손님과 생맥주 매출을 극대화하는 표준 모델',
    standardSize: '10평 기준',
    totalCost: '4,550만원',
    totalCostNum: 4550,
    badge: '가장 인기 있는 표준형',
    description: '홀과 포장을 동시에 운영하여 저녁 얼음생맥주 주류 매출까지 알차게 챙길 수 있는 만나옛날통닭의 대표 창업 패키지입니다.',
    recommendedFor: '홀 매장 운영으로 주류 수익까지 폭넓게 거두고 싶은 예비 창업자',
    items: [
      { name: '가맹비', cost: '700만원', note: '상권 보장 및 브랜드 사용 권한' },
      { name: '교육비', cost: '300만원', note: '조리 실무, 서비스, 매장 운영 현장 교육' },
      { name: '로열티', cost: '면제 (100만원 지원)', note: '한시적 전액 면제 프로모션' },
      { name: '계약이행 보증금', cost: '100만원', note: '계약 만료 시 전액 환급' },
      { name: '인테리어 (10평)', cost: '약 1,600만원', note: '평당 150~170만원 선' },
      { name: '주방기기 및 설비', cost: '700만원', note: '튀김기, 집기류, 냉장/냉동고 등' },
      { name: '홀 집기 및 가구', cost: '150만원', note: '테이블, 의자 등 홀 세팅' },
      { name: '간판 및 외부 사인물', cost: '최대 500만원 지원', note: '신규 가맹 한시적 본사 특별 지원!' },
      { name: '에어컨 공사', cost: '250만원', note: '냉난방기 시공' },
      { name: '가스 및 닥트 공사', cost: '150만원', note: '주방 후드 및 배관' },
      { name: 'POS 시스템', cost: '렌탈 진행', note: '초기 구매 부담 최소화' }
    ]
  },
  {
    id: 'B',
    title: 'B타입 (실속형)',
    subtitle: '소자본 창업자를 위해 초기 투자 비용을 대폭 줄인 포장·배달 집중 모델',
    standardSize: '10평 기준',
    totalCost: '2,450만원',
    totalCostNum: 2450,
    badge: '소자본 알짜형',
    description: '군더더기 없는 실용적 인테리어와 필수 주방 설비에 집중하여 소자본으로도 안정적인 창업이 가능한 실속형 모델입니다.',
    recommendedFor: '최소 자본으로 빠른 원금 회수와 실속 운영을 원하는 1인/부부 창업자',
    items: [
      { name: '가맹비 & 교육비', cost: '협의 지원', note: '소자본 프로모션 적용' },
      { name: '로열티', cost: '면제', note: '본사 부담 제로 정책' },
      { name: '필수 주방기기/설비', cost: '실속 세팅', note: '가성비 우수 검증 장비 구성' },
      { name: '실속 인테리어', cost: '자율/최소 시공', note: '필요 부분만 최적 시공' },
      { name: '간판/사인물', cost: '본사 지원 혜택', note: '외부 시인성 확보 집중' },
      { name: '상세 견적', cost: '현장 실사 후 확정', note: '점포 조건에 맞춰 1:1 맞춤 견적' }
    ]
  },
  {
    id: 'C',
    title: 'C타입 (업종변경형)',
    subtitle: '기존 매장의 주방 기물과 인테리어를 최대한 살려 재창업하는 리모델링 모델',
    standardSize: '10평 기준',
    totalCost: '1,550만원',
    totalCostNum: 1550,
    badge: '최저 비용 업종전환',
    description: '기존 식당, 주점, 분식집 등의 간판 교체와 통닭 전용 튀김 설비 보강만으로 즉시 전환하여 오픈하는 극가성비 솔루션입니다.',
    recommendedFor: '매출 부진으로 돌파구가 필요하거나 적은 비용으로 재창업하려는 기존 자영업자',
    items: [
      { name: '가맹비 & 로열티', cost: '대폭 감면/면제', note: '업종변경 지원 프로모션' },
      { name: '기존 주방기기 활용', cost: '최대 재활용 (0원)', note: '냉장고, 싱크대, 닥트 등 기존 재사용' },
      { name: '필수 통닭 튀김 설비', cost: '핵심 기기만 추가', note: '고화력 통닭 전용 튀김기 세팅' },
      { name: '간판 천갈이 및 썬팅', cost: '실비 진행', note: '만나옛날통닭 브랜드 교체' },
      { name: '1:1 밀착 조리 전수', cost: '단기 속성 교육', note: '영업 중단 최소화 후 빠른 재오픈' },
      { name: '상세 견적', cost: '현장 실사 후 확정', note: '현장 실측을 통해 불필요 공사 배제' }
    ]
  }
];

export const PROMOTION_NOTICES = [
  {
    id: 'loan-promotion',
    badge: 'NOTICE',
    tag: '본사 특별 금융지원',
    title: '본사협력 1000만원 무이자 대출 프로모션 진행 가능',
    desc: '초기 창업 자금 부담을 완화해 드리고자 만나옛날통닭 본사 협력 금융 프로그램을 통해 최대 1,000만원 무이자 대출 프로모션 진행이 가능합니다.',
    subText: '간판·사인물 최대 500만원 지원 혜택과 중복 적용 가능'
  },
  {
    id: 'signage-promotion',
    badge: 'NOTICE',
    tag: '한시적 시설지원',
    title: '신규 가맹 시 간판·외부 사인물 최대 500만원 지원',
    desc: '시인성 높은 매장 연출과 초기 인테리어 부담 경감을 위한 본사 한시 특별 지원 프로모션 진행 중입니다.',
    subText: '선착순 한정 프로모션'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-loan',
    category: '비용',
    question: '초기 창업 자금이 부족한데 대출 지원이나 금융 프로모션이 있나요?',
    answer: '네, 현재 [NOTICE] 본사협력 1000만원 무이자 대출 프로모션 진행이 가능합니다. 예비 점주님의 초기 창업 자금 부담을 덜어드리기 위해 본사 협력 금융 연계를 통해 최대 1,000만원 무이자 대출 지원 프로모션을 제공합니다. 또한 신규 가맹 시 간판·외부 사인물 최대 500만원 지원 혜택과도 중복 적용이 가능하므로, 소자본으로도 부담 없이 오픈하실 수 있습니다. 상세 조건은 1:1 무료 가맹 상담을 통해 맞춤 안내해 드립니다.'
  },
  {
    id: 'faq-1',
    category: '창업',
    question: '외식업이나 치킨 장사 경험이 전혀 없는 초보자도 창업할 수 있나요?',
    answer: '네, 가능합니다! 만나옛날통닭은 100% 손질된 신선육과 본사 전용 특제 파우더, 과학적인 튀김 온도와 타이머 레시피를 매뉴얼화하여 제공합니다. 본사 교육장에서의 실습과 오픈 시 본사 슈퍼바이저의 1:1 현장 밀착 지도를 통해 요리 초보자도 며칠 만에 능숙하게 매장을 운영할 수 있습니다.'
  },
  {
    id: 'faq-2',
    category: '운영',
    question: '어떤 상권이나 입지가 가장 적합한가요?',
    answer: '만나옛날통닭은 화려한 1급 번화가보다 대단지 아파트 배후, 빌라/주거 밀집지, 퇴근길 버스정류장 동선 등 ‘생활 밀착형 주거 상권’에서 가장 강력한 매출을 보입니다. 월 임대료 부담이 적은 상권에서도 포장과 배달, 저녁 치맥 손님으로 높은 실질 수익률을 달성할 수 있습니다. 본사 입지 분석 전문가가 무료로 상권 실사를 지원해 드립니다.'
  },
  {
    id: 'faq-3',
    category: '운영',
    question: '매장 크기는 어느 정도가 가장 적당한가요?',
    answer: '포장 및 배달 중심의 실속 매장은 8~10평 규모로도 충분하며 1인 운영이 가능합니다. 홀 테이블을 두고 생맥주 주류 매출까지 적극적으로 창출하시려면 10~15평 내외가 가장 추천되는 최적의 매장 규모입니다.'
  },
  {
    id: 'faq-4',
    category: '메뉴',
    question: '주방 조리가 복잡하거나 인건비가 많이 들지 않나요?',
    answer: '전혀 복잡하지 않습니다. 본사에서 완벽하게 전처리된 100% 국내산 하림 생닭과 계량된 특제 소스가 배송되므로 주방에서는 ‘반죽 묻혀 튀기기’만 하면 완성됩니다. 동선이 단순하여 피크 타임에도 1~2인 인력으로 여유 있게 소화할 수 있어 고정 인건비를 획기적으로 줄일 수 있습니다.'
  },
  {
    id: 'faq-5',
    category: '창업',
    question: '가맹 상담부터 실제 매장 오픈까지 기간은 얼마나 걸리나요?',
    answer: '점포가 이미 확보되어 있는 경우 인테리어 및 교육을 포함하여 통상 2~3주 내에 오픈이 가능합니다. 점포가 없으신 경우 본사 상권분석팀의 입지 조사 기간(약 1~2주)을 포함해 총 3~4주 정도 소요됩니다. 업종변경의 경우 기존 시설을 활용하여 7~10일 만에 초고속 재오픈도 가능합니다.'
  },
  {
    id: 'faq-6',
    category: '비용',
    question: '가맹 상담을 신청하면 바로 계약해야 하나요?',
    answer: '절대 아닙니다. 가맹 상담은 100% 무료이며 어떠한 계약 강요도 없습니다. 예비 점주님의 상황과 예산에 맞춰 가장 현실적인 창업 계획을 함께 고민해 드리고, 정보공개서와 예상 견적을 투명하게 안내해 드린 뒤 충분한 숙고 후 결정하실 수 있도록 돕습니다.'
  }
];

export const REGIONS_KOREA = [
  '서울', '경기', '인천', '충남', '충북', '대전', '세종',
  '강원', '부산', '대구', '울산', '경남', '경북', '전남', '전북', '광주', '제주'
];

export const REVIEW_SUMMARY_TAGS = [
  { label: '맛', count: 26, highlight: true },
  { label: '만족도', count: 15, highlight: true },
  { label: '치킨', count: 10 },
  { label: '옛날통닭', count: 8 },
  { label: '통닭', count: 8 },
  { label: '맥주', count: 5 },
  { label: '서비스', count: 3 },
  { label: '위치', count: 1 }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'review-1',
    author: '라비앙로즈54',
    stats: '리뷰 28 · 사진 68',
    visitInfo: '밤에 방문 · 예약 없이 이용 · 대기 시간 바로 입장 · 데이트',
    content: '너무 맛나고 가성비가좋네요 담엔 두마리 먹어야겠습니다 다른곳은 느끼한데 바삭하고 ㅎㅎ 맛나요',
    tags: ['음식이 맛있어요', '재료가 신선해요', '가성비가 좋아요', '혼밥하기 좋아요', '대화하기 좋아요'],
    dishName: '정통 옛날통닭 & 양배추 샐러드 한상',
    image: BrandImages.foodSpread,
    category: 'crispy',
    isReceiptVerified: true,
    highlightTag: '담엔 두마리 예약!'
  },
  {
    id: 'review-2',
    author: '숭상쏭',
    stats: '리뷰 21 · 사진 16',
    visitInfo: '저녁에 방문 · 예약 없이 이용 · 대기 시간 바로 입장 · 데이트',
    content: '맛있게 잘 먹고 갑니다! 감사합니다',
    tags: ['기본 안주가 좋아요', '가성비가 좋아요', '단체모임 하기 좋아요', '혼밥하기 좋아요'],
    dishName: '바삭한 정통 옛날통닭',
    image: BrandImages.reviewPhoto2,
    category: 'cost',
    isReceiptVerified: true,
    highlightTag: '정갈한 옛날통닭'
  },
  {
    id: 'review-3',
    author: '한쑤76',
    stats: '리뷰 16 · 사진 28',
    visitInfo: '저녁에 방문 · 예약 없이 이용 · 대기 시간 바로 입장 · 친목',
    content: '너무 맛있어요!! 몇번째 방문인지~~ 한번씩 생각나는 그맛!',
    tags: ['음식이 맛있어요', '재료가 신선해요', '가성비가 좋아요'],
    dishName: '겉바속촉 닭똥집튀김 & 통닭 닭다리',
    image: BrandImages.reviewPhoto3,
    category: 'crispy',
    isReceiptVerified: true,
    highlightTag: '단골 인증 N번째 방문'
  },
  {
    id: 'review-4',
    author: '숨드',
    stats: '리뷰 35 · 사진 74',
    visitInfo: '저녁에 방문 · 예약 없이 이용 · 대기 시간 바로 입장 · 나들이, 여행',
    content: '매장도 너무 깔끔하고, 쾌적하고 너무 좋아요 치킨도 너무 맛있고 공원 산책 후 방문하기 너무 좋습니다!! 그리고 무엇보다 너무 친절하셔서 조아용',
    tags: ['음식이 맛있어요', '단체모임 하기 좋아요', '대화하기 좋아요', '친절해요', '매장이 청결해요'],
    dishName: '만나옛날통닭 쾌적한 매장 인테리어',
    image: BrandImages.reviewPhoto4,
    category: 'friendly',
    isReceiptVerified: true,
    highlightTag: '청결하고 친절한 매장'
  },
  {
    id: 'review-5',
    author: '열무네39',
    stats: '리뷰 55 · 사진 83',
    visitInfo: '저녁에 방문 · 예약 없이 이용 · 대기 시간 바로 입장 · 친구',
    content: '펜타포트 락페 마지막 일정을 치킨과 함께❤️ 작년에 못 먹어서 아쉬워서 1년을 기다려 첫날부터 방문 했습니다! 맛있게 잘 먹구 하루 행복하게 마무리 할 수 있었습니당💛',
    tags: ['음식이 맛있어요', '가성비가 좋아요', '잡내가 적어요', '매장이 청결해요'],
    dishName: '노릇노릇 황금빛 옛날통닭',
    image: BrandImages.reviewPhoto5,
    category: 'crispy',
    isReceiptVerified: true,
    highlightTag: '1년 기다린 인생 치킨'
  },
  {
    id: 'review-6',
    author: '찰시의 대장간',
    stats: '리뷰 36 · 사진 58',
    visitInfo: '점심에 방문 · 예약 없이 이용 · 대기 시간 바로 입장 · 데이트',
    content: '송도 여행와서 숙소 앞이라 와봤는데 치킨이 너무 바삭해서 맛있고 특히 생맥이 맘에듭니다♡♡',
    tags: ['음식이 맛있어요', '재료가 신선해요', '가성비가 좋아요', '인테리어가 멋져요'],
    dishName: '얼음 생맥주 & 바삭 통닭 치맥',
    image: BrandImages.reviewPhoto6,
    category: 'chimaek',
    isReceiptVerified: true,
    highlightTag: '치킨 바삭 & 생맥주 최고'
  },
  {
    id: 'review-7',
    author: '현재1665',
    stats: '리뷰 4 · 사진 3',
    visitInfo: '저녁에 방문 · 예약 없이 이용 · 대기 시간 바로 입장 · 일상',
    content: '송도에서 오랜만에 맛보는 근본치킨👍👍👍 튀김옷이 예술이네요. 평일인데도 사람 많아서 들어와본건데 주1회 이상 올 것 같습니다ㅋㅋ',
    tags: ['음식이 맛있어요', '가성비가 좋아요', '잡내가 적어요', '매장이 청결해요'],
    dishName: '튀김옷 예술! 4조각 커팅 옛통',
    image: BrandImages.reviewPhoto7,
    category: 'crispy',
    isReceiptVerified: true,
    highlightTag: '주 1회 이상 필수 방문'
  },
  {
    id: 'review-8',
    author: 'hongyeb',
    stats: '리뷰 169 · 사진 192',
    visitInfo: '저녁에 방문 · 예약 없이 이용 · 대기 시간 바로 입장 · 일상',
    content: '바로 나오자 마자 먹다보니. 사진이. 맛 나네요.',
    tags: ['음식이 맛있어요', '재료가 신선해요', '가성비가 좋아요'],
    dishName: '갓 튀겨 김 솔솔 통닭',
    image: BrandImages.reviewPhoto8,
    category: 'cost',
    isReceiptVerified: true,
    highlightTag: '나오자마자 순삭'
  },
  {
    id: 'review-9',
    author: '김*은 글씨씁니다',
    stats: '리뷰 567 · 사진 3,220 · 팔로워 105',
    visitInfo: '저녁에 방문 · 예약 없이 이용 · 대기 시간 바로 입장 · 지인·동료',
    content: '가심비 짱이네요. 가격도 저렴하면서 치킨이 느끼하지 않고 담백하거 빠삭하고 고소해요. 송도에서 시원한 맥주 한잔 하시고 싶다면 강추드려요.',
    tags: ['친절해요', '매장이 청결해요', '음식이 맛있어요', '재료가 신선해요', '가성비가 좋아요'],
    dishName: '윤기 흐르는 양념치킨 & 바삭 통닭',
    image: BrandImages.reviewPhoto9,
    category: 'cost',
    isReceiptVerified: true,
    highlightTag: '가심비 짱! 느끼함 제로'
  },
  {
    id: 'review-10',
    author: '강철의 사나이',
    stats: '리뷰 876 · 사진 2,221 · 팔로워 93',
    visitInfo: '저녁에 방문 · 예약 없이 이용 · 대기 시간 바로 입장 · 친목',
    content: '가성비 너무 좋아요. 닭다리 넘 튼실하고, 옛날통닭도 먹을게 많아요. 치킨엔 맥주^^',
    tags: ['양이 많아요', '가성비가 좋아요', '친절해요', '매장이 청결해요'],
    dishName: '매콤달콤 닭강정 & 튼실 닭다리 6개',
    image: BrandImages.reviewPhoto10,
    category: 'chimaek',
    isReceiptVerified: true,
    highlightTag: '닭다리 튼실 & 가성비 갑'
  },
  {
    id: 'review-11',
    author: '푸른하늘3211',
    stats: '리뷰 106 · 사진 20',
    visitInfo: '저녁에 방문 · 예약 없이 이용 · 대기 시간 바로 입장 · 친목',
    content: '가성비좋고통닭맛이정말짱이에요. 6명이생맥2개씩먹어도 와~가성비짱입니다. 옛통도바삭하게 잘익혀주셔서 기분좋게 잘먹고왔습니당.',
    tags: ['음식이 맛있어요', '재료가 신선해요', '가성비가 좋아요', '친절해요', '매장이 청결해요'],
    dishName: '6인 단체 치맥 회식 갓성비 한상',
    image: BrandImages.reviewPhoto11,
    category: 'cost',
    isReceiptVerified: true,
    highlightTag: '6명 단체 치맥 갓성비'
  }
];

