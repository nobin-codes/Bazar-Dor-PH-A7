export type ChangeDirection = "up" | "down" | "flat";

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface ProductChange {
  dir: ChangeDirection;
  pct: number;
}

export interface Product {
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
  change: ProductChange;
  markets: Market[];
}