
import * as React from 'react';
import { graphql } from "gatsby";

import { Helmet } from 'react-helmet';

import { postFromMarkdownRemark } from '../domain/converters/post-types';
import { authorFromAuthorsJsonEdge } from '../domain/converters';
import { PostEntry } from '../components/posts/PostEntry/PostEntry';

import 'prismjs/themes/prism-okaidia.css';
import '../css/post-single.css';


import { Seo } from '../components/shared/Seo/Seo';
import { MainLayout } from '../layouts/MainLayout';

interface PostPageProps {
  data: {
    authorsConnection: Queries.AuthorsJsonConnection;
    mdRemark: Queries.MarkdownRemark;
    mdRemarkPrev: Queries.MarkdownRemark;
    mdRemarkNext: Queries.MarkdownRemark;
  };
}

class PostTemplate extends React.Component<
  PostPageProps,
  any
  > {

  constructor(props: PostPageProps) {
    super(props);
  }

  public componentDidMount() {
    this.mountAddThis();
  }

  private mountAddThis() {
    const script = document.createElement("script");
    script.src =
      `//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-597d29b3b4e298a5`;
    script.async = true;
    document.body.appendChild(script);
  }

  public render() {
    const authors = this.props.data.authorsConnection.edges.map(
      authorFromAuthorsJsonEdge
    );

    const post = postFromMarkdownRemark(this.props.data.mdRemark, authors);

    const breadCrumbs = [
      { name: 'Courses', url: '/' },
      { name: 'Posts', url: '/posts' },
      { name: 'Current post', url: '' }
    ];

    const pageTitle = `${post.title} | NativeScripting`;

    const postPrev = postFromMarkdownRemark(this.props.data.mdRemarkPrev, authors);
    const postNext = postFromMarkdownRemark(this.props.data.mdRemarkNext, authors);

    return (
      <MainLayout>
        <Seo postNode={this.props.data.mdRemark} post={post} postSeo />
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>




        <PostEntry post={post} />







      </MainLayout>
    );
  }
}

export const query = graphql`
  query BlogPostQuery(
    $slug: String!
    $prevPostPath: String!
    $nextPostPath: String!
  ) {
    #get authors
    authorsConnection: allAuthorsJson(filter: { contentTypes: { in: "post" } }) {
      totalCount
      edges {
        node {
          authorId
          title
          name
          picture
          bio
          biolong
          twitter
          github
          contentTypes
        }
      }
    }

    # get post
    mdRemark: markdownRemark(frontmatter: { path: { eq: $slug } }) {
      id
      timeToRead
      excerpt
      html
      frontmatter {
        title
        path
        author
        updatedDate(formatString: "DD MMMM, YYYY")
        image {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fluid(maxWidth: 1000) {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    }

    #get prev post
    mdRemarkPrev: markdownRemark(frontmatter: { path: { eq: $prevPostPath } }) {
      id
      timeToRead
      excerpt
      frontmatter {
        title
        path
        author
        updatedDate(formatString: "DD MMMM, YYYY")
        image {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fluid(maxWidth: 1000) {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    }

    #get next post
    mdRemarkNext: markdownRemark(frontmatter: { path: { eq: $nextPostPath } }) {
      id
      timeToRead
      excerpt
      frontmatter {
        title
        path
        author
        updatedDate(formatString: "DD MMMM, YYYY")
        image {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fluid(maxWidth: 1000) {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    }
  }
`;

export default PostTemplate;
