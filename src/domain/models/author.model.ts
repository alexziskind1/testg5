export type ContentType = 'post' | 'course';

export function asContentType(stStr: ContentType): ContentType {
    return stStr;
}

export interface Author {
    authorId: string;
    name: string;
    picture: string;
    bio: string;
    biolong: string;
    title: string;
    twitter: string;
    github: string;
    contentTypes: ContentType[];
}

export function toAuthor(
    authorId: string,
    name: string,
    picture: string,
    bio: string,
    biolong: string,
    title: string,
    twitter: string,
    github: string,
    contentTypes: ContentType[],
): Author {
    return {
        authorId,
        name,
        picture,
        bio,
        biolong,
        title,
        twitter,
        github,
        contentTypes,
    }
}
