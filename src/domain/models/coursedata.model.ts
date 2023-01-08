import { Course } from './course.model';
import { Bundle } from './bundle.model';

export interface CourseData {
    courses: Course[];
    bundles: Bundle[];
}
