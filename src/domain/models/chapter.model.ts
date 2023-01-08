import { Lesson } from './lesson.model';

export interface Chapter {
    chapterId: number;
    name: string;
    lessons: Lesson[];
}
