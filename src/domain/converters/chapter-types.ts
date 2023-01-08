
import { Chapter } from '../models';
import { lessonFromLesson_2 } from './lesson-types';

export function chapterFromChapter_2(l: Queries.CoursesJsonChapters, index: number, lessonPreviews: readonly Queries.PreviewsJsonLessonPreviews[]): Chapter {
  return {
    chapterId: l.chapterId,
    name: l.name,
    lessons: l.lessons.map((l, idx) => lessonFromLesson_2(l, idx, lessonPreviews))
  };
}
