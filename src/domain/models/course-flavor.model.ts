import { Map } from '../core';

export type CourseFlavorType = 'Core' | 'Angular' | 'Vue';

export function isCoreCourseFlavor<K extends string>(
  ft: CourseFlavorType | K
): ft is 'Core' {
  return ft === 'Core';
}

export function isAngularCourseFlavor<K extends string>(
  ft: CourseFlavorType | K
): ft is 'Angular' {
  return ft === 'Angular';
}

export function isVueCourseFlavor<K extends string>(
  ft: CourseFlavorType | K
): ft is 'Vue' {
  return ft === 'Vue';
}

export function asCourseFlavorType<K extends string>(
  str: CourseFlavorType | K
): CourseFlavorType {
  return str as CourseFlavorType;
}
