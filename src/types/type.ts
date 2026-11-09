
export interface Icategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface Imarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Iproduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;

  change: {
    dir: "up" | "down";
    pct: number;
  };

  markets: Imarket[];
}
