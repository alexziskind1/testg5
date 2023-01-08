import { Course } from './course.model';
import { Product } from './product.model';


export interface Bundle {
    bundleId: string;
    title: string;
    subtitle: string;
    description: string;
    url: string;
    promototal: number;
    promoremaining: number;
    bundleLevel: number;
    products: Product[];
    courses: Course[];
}
