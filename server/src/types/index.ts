export interface ConversionRate {
  [x: string]: any;
  timestamp: Date;
  totalAssets: string;
  totalSupply: string;
  rate: number;
}