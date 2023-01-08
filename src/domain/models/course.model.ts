import { Author } from './author.model';
import { Product } from './product.model';
import { Chapter } from './chapter.model';
import { CourseLevel } from './course-level.model';
import { CourseFlavorType } from './course-flavor.model';
import { PublishingScheduleItem } from './publishing-schedule-item.model';

export interface DescriptionHtmlSection {
  title: string;
  descriptionHtml: string;
}

export interface Course {
  courseId: string;
  title: string;
  subtitle: string;
  description: string;
  descriptionHtmlSections: DescriptionHtmlSection[];
  notes: string[];
  url: string;
  flavors: CourseFlavorType[];
  level: CourseLevel;
  label: string;
  launchdate: Date;
  authors: Author[];
  products: Product[];
  publishedChapters: number[];
  publishingScheduleItems: PublishingScheduleItem[];
  chapters: Chapter[];
  previewVideoId?: string;
}
