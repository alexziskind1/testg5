import * as React from 'react';
import Helmet from 'react-helmet';
import SiteConfig from '../../../../config/SiteConfig';

import { Post } from '../../../domain/models/posts/post.model';
import { Course } from '../../../domain/models';



interface SeoProps {
  postNode?: Queries.MarkdownRemark;
  post?: Post;
  postSeo?: boolean;
  course?: Course;
  courseSeo?: boolean;
  path?: string;
}



export const Seo = (props: SeoProps): JSX.Element => {
  const { postNode, post, postSeo, course, courseSeo, path } = props;

  let title;
  let description;
  let creator = SiteConfig.userTwitter;
  let image = `/img/course_banners/nativescript_core_ng_course_banner_bg.png`;
  let twitterCard = 'summary';
  const realPrefix = SiteConfig.pathPrefix === '/' ? '' : SiteConfig.pathPrefix;
  let pageUrl;

  if (postSeo) {
    const postPath = postNode.frontmatter.path;
    const postMeta = postNode.frontmatter;
    title = postMeta.title;
    description = postNode.excerpt;
    image = postNode.frontmatter.image.childImageSharp.fluid.src;
    //image = postMeta.image.publicURL;
    pageUrl = SiteConfig.siteUrl + realPrefix + postPath;
    creator = post.author.twitter
      ? `@${post.author.twitter}`
      : SiteConfig.userTwitter;
    twitterCard = 'summary';
  } else if (courseSeo) {
    title = course.title;
    description = course.description;
    image = `/img/illustrations/png/${course.url}.png`;
    pageUrl = SiteConfig.siteUrl + realPrefix + '/course/' + course.url;
    creator = SiteConfig.userTwitter;
    twitterCard = 'product';
  } else {
    title = SiteConfig.siteTitle;
    description = SiteConfig.siteDescription;
    image = SiteConfig.siteBanner;
    if (path) {
      pageUrl = SiteConfig.siteUrl + realPrefix + path;
    }
  }

  image = SiteConfig.siteUrl + realPrefix + image;
  let schemaOrgJSONLD = [];

  schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      '@id': pageUrl,
      url: pageUrl,
      name: title,
      alternateName: SiteConfig.siteTitleAlt ? SiteConfig.siteTitleAlt : ''
    }
  ];

  if (postSeo) {
    schemaOrgJSONLD = [
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        // @ts-ignore
        '@id': pageUrl,
        // @ts-ignore
        url: pageUrl,
        name: title,
        alternateName: SiteConfig.siteTitleAlt ? SiteConfig.siteTitleAlt : '',
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image
        },
        description: SiteConfig.siteDescription,
        datePublished: postNode.frontmatter.createdDate,
        dateModified: postNode.frontmatter.updatedDate,
        author: {
          '@type': 'Person',
          name: post.author.twitter
        },
        publisher: {
          '@type': 'Organization',
          name: SiteConfig.author,
          logo: {
            '@type': 'ImageObject',
            url: SiteConfig.siteUrl + realPrefix + SiteConfig.siteLogo
          }
        },
        isPartOf: pageUrl,
        mainEntityOfPage: {
          '@type': 'WebSite',
          '@id': pageUrl
        }
      }
    ];
  }
  return (
    <Helmet
      htmlAttributes={{
        lang: SiteConfig.siteLanguage
      }}
      title={title}
      meta={[
        {
          content: description,
          name: 'description'
        },
        {
          content: title,
          property: 'og:title'
        },
        {
          content: image,
          property: 'og:image'
        },
        {
          content: description,
          property: 'og:description'
        },
        {
          content: 'website',
          property: 'og:type'
        },
        {
          content: twitterCard,
          name: 'twitter:card'
        },
        {
          content: creator,
          name: 'twitter:creator'
        },
        {
          content: title,
          name: 'twitter:title'
        },
        {
          content: description,
          name: 'twitter:description'
        },
        {
          content: pageUrl,
          name: 'twitter:url'
        },
        {
          content: image,
          name: 'twitter:image'
        }
      ]}
    />
    
    
  );
};
