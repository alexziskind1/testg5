require('source-map-support').install();
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
});

const config = require('./config/SiteConfig').default;
const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;

module.exports = {
  siteMetadata: {
    siteName: `NativeScript Courses`,
    siteUrl: config.siteUrl + pathPrefix,
  },
  graphqlTypegen: true,
  plugins: [
    // Add typescript stack into webpack
    'gatsby-plugin-styled-components',
    `gatsby-plugin-typescript`,
    `gatsby-transformer-json`,
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-sitemap`,
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`, //UNCHANGED

        // UNCHANGED
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        // anny added categoies would be appended to these
        exclude: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          `/offline-plugin-app-shell-fallback`,
        ],
        createLinkInHead: true, //UNCHANGED
        sitemapSize: Infinity, //UNCHANGED
        //UNCHANGED
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }

            allSitePage {
              nodes {
                path
              }
            }
          }`
        ,
        /**
         * @name resolveSiteUrl
         *
         * UNCHANGED
         * @param {Object} data - results of the GraphQL query
         * @returns {string}
         */
        resolveSiteUrl: (data) => data.site.siteMetadata.siteUrl,
        /**
         * @name resolvePagePath
         *
         * NEW - This allows passing any data, it just has to end up in an array being
         * returned with "path" as the object property the uri.
         *
         * if you don't want to place the URI in "path" then resolvePagePath
         * are needed.
         *
         * @param {Object|string} page - Array Item returned from reolvePages
         * @returns {string}
         */
        resolvePagePath: (page) => page.path,
        /**
         * @name resolvePages
         *
         * NEW - This allows custom resolution of the array of pages.
         * This also where user's could merge multiple sources into
         * a single array if needed.
         *
         * @param {Object} data - results of the GraphQL query
         * @returns {Array}
         */
        resolvePages: (data) => data.allSitePage.nodes,
        /**
         * @name filterPages
         *
         * NEW - This allows filtering any data in any way.
         *
         * This Function is executed via allPages.map((page) => !excludes.some((excludedRoute) => thisFunc(page, ecludedRoute, tools)))
         * allPages is the results of the resolvePages
         *
         * @param {Object} page
         * @param {string} excludedRoute - Array from plugin config `options.exclude`
         * @param {Object} tools - contains required tools for filtering
         *
         * @returns {Array}
         */
        /*filterPages: (page, excludedRoute, { minimatch, withoutTrailingSlash, resolvePagePath }) =>
          minimatch(
            withoutTrailingSlash(resolvePagePath(page),
              withoutTrailingSlash(excludedRoute)
            )
          ),
          */
        /**
         * @name serialize
         *
         * MODIFIED - the idea of passing specific siteUrl, and allPages values
         * instead of the rawQuery data is that devs would not need to rewrite
         * seralize, if the data structures changed. They would only need to change the
         * resolution functions and not how the data is being seralized.
         *
         * Hopefully this allow slower ejection from the defaults.
         *
         * This funciton would be exectuted after the array is filtered with the default or custom filter
         *
         * This funciton is executed by allPages.map(page => thisFunc(page, siteUrl, tools))
         * allpages is the result of the filter process
         *
         * @param {Object} page - results of the resolvePages function
         * @param {string} siteUrl - results of the resolveSiteUrl function
         * @param {Object} tools - contains tools for serializing
         *
        */
        /*serialize: (page, siteUrl, { resolvePagePath }) => {
          return {
            url: `${siteUrl}${resolvePagePath(page)}`,
            changefreq: `daily`,
            priority: 0.7,
          }
        },
        */
      }
    
    },

    // Expose `/data` to graphQL layer
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`
        ]
      }
    },

    // Parse all images files
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`
  ]
};
