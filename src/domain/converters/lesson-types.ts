
import { Lesson } from '../models';

export function lessonFromLesson_2(l: Queries.CoursesJsonChaptersLessons, index: number, lessonPreviews: readonly Queries.PreviewsJsonLessonPreviews[]): Lesson {

  const prev = lessonPreviews.find(p => p.lessonId === l.lessonId);

  return {
    lessonId: l.lessonId,
    chapterId: l.chapterId,
    name: l.name,
    lessonNumber: index,
    isPreview: l.isPreview,
    vidId: prev?.videoId
  };
}
