import { defaultArray } from '../core';

import { Author, asContentType } from '../models';


export function authorFromAuthorsJsonEdge(edge: Queries.AuthorsJsonEdge): Author {
    const n = edge.node;

    return {
        authorId: n.authorId,
        name: n.name,
        title: n.title,
        bio: n.bio,
        biolong: n.biolong,
        picture: n.picture,
        twitter: n.twitter,
        github: n.github,
        contentTypes: defaultArray(n.contentTypes).map(asContentType)
    };
}
