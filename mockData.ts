export interface PriceHistory {
  date: string;
  price: number;
}

export interface Card {
  card_id: string;
  card_name: string;
  rarity: string;
  expansion_pack: string;
  current_price: number;
  price_change_percent: number;
  image_url: string;
  price_history: PriceHistory[];
}

export interface ExpansionPack {
  id: string;
  name: string;
  release_date: string;
  banner_url: string;
}

export const mockCards: Card[] = [
  {
    card_id: "SV8a-125",
    card_name: "피카츄 ex",
    rarity: "SAR",
    expansion_pack: "초전브레이크",
    current_price: 250000,
    price_change_percent: 4.2,
    image_url: "https://images.pokemontcg.io/sv8/238_hires.png",
    price_history: [
      { date: "2026-06-11", price: 230000 },
      { date: "2026-06-13", price: 245000 },
      { date: "2026-06-15", price: 240000 },
      { date: "2026-06-18", price: 250000 }
    ]
  },
  {
    card_id: "SV4a-349",
    card_name: "리자몽 ex",
    rarity: "SAR",
    expansion_pack: "샤이니트레저ex",
    current_price: 320000,
    price_change_percent: -1.5,
    image_url: "https://images.pokemontcg.io/sv4pt5/234_hires.png",
    price_history: [
      { date: "2026-06-11", price: 330000 },
      { date: "2026-06-13", price: 325000 },
      { date: "2026-06-15", price: 328000 },
      { date: "2026-06-18", price: 320000 }
    ]
  },
  {
    card_id: "SV6-130",
    card_name: "오거폰 벽록의 가면 ex",
    rarity: "SAR",
    expansion_pack: "변환의 가면",
    current_price: 180000,
    price_change_percent: 12.5,
    image_url: "https://images.pokemontcg.io/sv6/211_hires.png",
    price_history: [
      { date: "2026-06-11", price: 150000 },
      { date: "2026-06-13", price: 160000 },
      { date: "2026-06-15", price: 175000 },
      { date: "2026-06-18", price: 180000 }
    ]
  },
  {
    card_id: "SV5M-093",
    card_name: "무쇠잎새 ex",
    rarity: "SAR",
    expansion_pack: "사이버저지",
    current_price: 45000,
    price_change_percent: 0.5,
    image_url: "https://images.pokemontcg.io/sv5/203_hires.png",
    price_history: [
      { date: "2026-06-11", price: 44000 },
      { date: "2026-06-13", price: 44500 },
      { date: "2026-06-15", price: 45000 },
      { date: "2026-06-18", price: 45000 }
    ]
  },
  {
    card_id: "SV5K-095",
    card_name: "굽은물결 ex",
    rarity: "SAR",
    expansion_pack: "와일드포스",
    current_price: 55000,
    price_change_percent: 3.1,
    image_url: "https://images.pokemontcg.io/sv5/205_hires.png",
    price_history: [
      { date: "2026-06-11", price: 52000 },
      { date: "2026-06-13", price: 53000 },
      { date: "2026-06-15", price: 54000 },
      { date: "2026-06-18", price: 55000 }
    ]
  }
];

export const mockExpansions: ExpansionPack[] = [
  {
    id: "sv8",
    name: "초전브레이크",
    release_date: "2026-05-20",
    banner_url: "https://placehold.co/1200x400/1e3a8a/ffffff?text=초전브레이크+발매"
  },
  {
    id: "sv7",
    name: "스텔라미라클",
    release_date: "2026-04-15",
    banner_url: "https://placehold.co/1200x400/0f766e/ffffff?text=스텔라미라클+발매"
  },
  {
    id: "sv6",
    name: "변환의 가면",
    release_date: "2026-03-10",
    banner_url: "https://placehold.co/1200x400/9d174d/ffffff?text=변환의+가면+발매"
  }
];

export const getTopCards = (): Card[] => {
  return [...mockCards].sort((a, b) => b.price_change_percent - a.price_change_percent);
};

export const getCardById = (id: string): Card | undefined => {
  return mockCards.find(card => card.card_id === id);
};
