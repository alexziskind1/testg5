import { Author } from "../author.model";


export interface Post {
    title: string;
    excerpt: string;
    path: string;
    body: string;
    updatedDate: string;
    timeLength: string;
    author: Author;
    image:  Queries.File;
}
