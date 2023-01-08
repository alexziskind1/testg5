const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

//const config = require('./config/SiteConfig').default;


exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allCoursesJson {
          totalCount
          edges {
            node {
              courseId
              title
              flavors
              url
              authors
            }
          }
        }

        allTracksJson {
          totalCount
          edges {
            node {
              trackId
              levels {
                levelId
                title
                description
              }
            }
          }
        }

        allMarkdownRemark(
          filter: { frontmatter: { draft: { ne: true } } }
          sort: { order: ASC, fields: [frontmatter___updatedDate] }
          limit: 1000
        ) {
          edges {
            node {
              excerpt(pruneLength: 250)
              html
              id
              timeToRead
              frontmatter {
                createdDate
                updatedDate
                tags
                path
                title
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }


      const posts = result.data.allMarkdownRemark.edges;
      const postsPerPage = 5;
      const numPages = Math.ceil(posts.length / postsPerPage);

      createPostPages(createPage, posts, postsPerPage, numPages);
      resolve('done');
    });
  });
};



const isZero = a => a === 0;
const inc = a => a + 1;
const dec = a => a - 1;
const isFirst = isZero;
const isLast = (index, total) => index === dec(total);

/*
const isFirstPage = isZero;
const isLastPage = (index, total) => index === dec(total);
const previousPostPath = (articlePagePath, groupIndex) =>
  !isFirstPage(groupIndex) ? articlePagePath(dec(groupIndex)) : null;
const nextPostPath = (articlePagePath, groupIndex, groupTotal) =>
  !isLastPage(groupIndex, groupTotal) ? articlePagePath(inc(groupIndex)) : null;
*/

const prevPost = (posts, curIdx) =>
  isFirst(curIdx) ? null : posts[dec(curIdx)];

const nextPost = (posts, curIdx) =>
  isLast(curIdx, posts.length) ? null : posts[inc(curIdx)];

const createPostPages = (createPage, posts, postsPerPage, numPages) => {
  const postTemplate = path.resolve(`src/templates/post.tsx`);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/posts` : `/posts/${i + 1}`,
      component: path.resolve(`src/templates/posts.tsx`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        totalPages: numPages,
        currentPage: i + 1
      }
    });
  });

  posts.forEach(({ node }, postIdx) => {
    const prev = prevPost(posts, postIdx);
    const next = nextPost(posts, postIdx);

    const prevPath = prev && prev.node && prev.node.frontmatter.path;
    const nextPath = next && next.node && next.node.frontmatter.path;

    //console.log(
    //  'creating post: ' + node.frontmatter.path + ' , next path: ' + nextPath
    //);

    createPage({
      path: node.frontmatter.path,
      component: postTemplate,
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug: node.frontmatter.path,
        prevPostPath: prevPath || '',
        nextPostPath: nextPath || ''
      }
    });
  });
};

