import { Map } from '../core';



export type CourseLevelType = 1 | 2 | 3;


export interface CourseLevel {
    levelId: CourseLevelType;
    levelName: string;
}

const levelMap: Map<CourseLevel> = {
    1: {
        levelId: 1,
        levelName: 'Beginner'
    },
    2: {
        levelId: 2,
        levelName: 'Intermediate'
    },
    3: {
        levelId: 3,
        levelName: 'Advanced'
    },
};



export function asCourseLevel(l: CourseLevelType | number): CourseLevel {
    return levelMap[l];
}
