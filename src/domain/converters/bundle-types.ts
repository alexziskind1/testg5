import { defaultArray } from '../core';
import { productFromBundlesJsonProducts } from './product-types';
import { Course, asCourseLevel, asCourseFlavorType, Bundle } from '../models';

export function bundleFromBundlesJsonEdge(
  edge: Queries.BundlesJsonEdge,
  allCourses: Course[],
): Bundle {
  const n = edge.node;

  const courses = n.courseIds.map(id => allCourses.find(c => c.courseId === id));

  return {
    bundleId: n.bundleId,
    title: n.title,
    url: n.url,
    bundleLevel: n.bundleLevel,
    courses: courses,
    promoremaining: n.promoremaining,
    promototal: n.promototal,
    subtitle: n.subtitle,
    description: n.description,
    products: defaultArray(n.products).map(productFromBundlesJsonProducts)
  };
}

