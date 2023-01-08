import * as React from 'react';
import { Link } from 'gatsby';
let Image = require('gatsby-image').default;
import { Post } from '../../../domain/models/posts/post.model';
//import { getAuthorImgSrc } from '../../../utils/urls';

interface PostsListEntryProps {
  post: Post;
}

export const PostsListEntry  = (
  props: PostsListEntryProps
) => {
  const post = props.post;

  /*
        let posterImage = null;
        if (post.image) {
            //node.frontmatter.image.publicURL
            //const pImg = node.frontmatter.image.children[0] as ImageSharp;
    
            posterImage = <Image responsiveSizes={post.image.childImageSharp.responsiveSizes} />
    
            //d = <Image sizes={pImg.sizes} />
        }
    */
  const imgStyle = {
    backgroundImage: `https://thispersondoesnotexist.com/`
  };

  const authorImgSrc = 'https://thispersondoesnotexist.com/';

  return (
    <div className="post-list-entry-container">
      <div className="post-img-container" style={imgStyle}>
        <Link to={post.path} />
      </div>

      <div className="post-body-wrapper">
        <div>
          <Link to={post.path}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </Link>
        </div>

        <div className="post-meta-container">
          <div className="post-meta-author-img-wrapper">
            <img alt={post.author.name} src={authorImgSrc} />
          </div>
          <div className="post-meta-info-wrapper">
            <div>
              <span className="post-meta-author-name">{post.author.name}</span>
            </div>
            <div className="post-meta-date-time-wrapper">
              <span>{post.updatedDate}</span>
              <span className="middot-divider" />
              <span>{post.timeLength}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
