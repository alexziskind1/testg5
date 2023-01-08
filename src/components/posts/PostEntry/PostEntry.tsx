import * as React from 'react';

import styled from 'styled-components';

let Image = require('gatsby-image').default;

import * as config from '../../../../config/SiteConfig';

import { Post } from '../../../domain/models/posts/post.model';


import { GridRow } from '../../../layouts/grid2/grid-row';
import { GridColumn } from '../../../layouts/grid2/grid-column';


interface PostEntryProps {
  post: Post;
}

const TwitterFollowLink = styled.a`
  margin-left: 10px;
  color: #12ffcd;
  border: 1px solid #12ffcd;
  padding: 0 5px 0 5px;
`;

const AnnounceWrapper = styled.div`
  margin: 30px;
  padding: 30px;
  background-color: #032e74;
`;

const AnnouncementText = styled.p`
  color: white;
  font-size: 18px;
`;

export const PostEntry = (
  props: PostEntryProps
) => {
  const post = props.post;

  let posterImage = null;
  if (post.image) {
    posterImage = (
      <Image alt={post.title + ' poster'} fluid={post.image.childImageSharp!.fluid} />
    );
  }

  const authorImgSrc = 'https://thispersondoesnotexist.com/';

  const twitterFollowScript = `<script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>`;

  const twitterFollowHref = `https://twitter.com/intent/user?screen_name=${
    post.author.twitter
    }`;



  const disqusShortname = 'nativescripting';
  const disqusConfig = {
    url: config.default.siteUrl + post.path,
    identifier: post.path,
    title: post.title
  };

  return (
    <div className="post-entry-container">
      <div className="post-header post-inner">
        <div className="post-meta-container">
          <div className="post-meta-author-img-wrapper">
            <img alt={post.author.name} src={authorImgSrc} />
          </div>
          <div className="post-meta-info-wrapper">
            <div>
              <span className="post-meta-author-name">{post.author.name}</span>

            </div>
            <div>
              <span className="post-meta-author-title">
                {post.author.title}
              </span>
            </div>
            <div className="post-meta-date-time-wrapper">
              <span>{post.updatedDate}</span>
              <span className="middot-divider" />
              <span>{post.timeLength}</span>
            </div>
          </div>
        </div>

        <h1>{post.title}</h1>
        <p className="post-excerpt">{post.excerpt}</p>
      </div>

      {posterImage}

      <div>
      
      </div>




      <div className="post-body">


        <div className="post-inner">

          <div dangerouslySetInnerHTML={{ __html: post.body }} />

          <div className="section-divider">
            <hr className="section-divider" />
          </div>

          <div>
            <i>{post.author.bio}</i>
          </div>

          <div style={{ textAlign: 'center', marginTop: 50, marginBottom: 50 }}>
            <h2 className="text-header">Did you enjoy this? Share it!</h2>

          </div>

          <div className="post-comments-wrapper">

          </div>
        </div>
      </div>

    </div>
  );
};
