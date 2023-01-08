
import { Product, ProdType } from '../models';

function descriptionLegible(p: Queries.CoursesJsonProducts | Queries.BundlesJsonProducts) {
  let licMin = p.licensesMin;
  let licMax = p.licensesMax;
  if (!licMax) {
    licMax = licMin;
  }
  if (licMax === 1) {
    return `1 user`;
  } else if (licMin === licMax) {
    return `${licMin} users`;
  } else {
    return `${licMin}-${licMax} users`;
  }
}

export function productFromCoursesJsonProducts(
  p: Queries.CoursesJsonProducts
): Product {
  return {
    productId: p.productId,
    name: p.name,
    description: descriptionLegible(p),
    licensesMin: p.licensesMin,
    licensesMax: p.licensesMax,
    pricereg: p.pricereg,
    pricesale: p.pricesale,
    numPayments: p.numPayments,
    recurring: p.recurring,
    prodType: p.prodType as ProdType,
    code: p.code
  };
}

export function productFromBundlesJsonProducts(
  p: Queries.BundlesJsonProducts
): Product {
  return {
    productId: p.productId,
    name: p.name,
    description: descriptionLegible(p),
    licensesMin: p.licensesMin,
    licensesMax: p.licensesMax,
    pricereg: p.pricereg,
    pricesale: p.pricesale,
    numPayments: 0,
    recurring: false,
    prodType: 'once',
    code: ''
  };
}
