export type ProdType = 'once' | 'plan';

export interface Product {
  productId: string;
  name: string;
  description: string;
  pricesale: number;
  pricereg: number;
  licensesMin: number;
  licensesMax: number;
  prodType: ProdType;
  numPayments: number;
  recurring: boolean;
  code: string;
}
