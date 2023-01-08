import * as React from 'react';
import { useState, useEffect } from 'react';

import { StaticQuery, graphql } from 'gatsby';

import '../../node_modules/normalize.css/normalize.css';

import '../css/styles.css';

let signUpsData: SignUpsDataItem[] = [];

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export interface SignUpsDataItem {
  studentName: string;
  courseName: string;
}

export const MainLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query MainLayoutQuery {
        site {
          siteMetadata {
            siteName
          }
        }

        #get courses
        coursesConnection: allCoursesJson(
          sort: { order: ASC, fields: [order] }
        ) {
          totalCount
          edges {
            node {
              courseId
              title
              flavors
              url
              label
              authors
              level
              order
              products {
                productId
                name
                description
                licensesMin
                licensesMax
                pricereg
                pricesale
              }
            }
          }
        }
      }
    `}
    render={data => {

      return (
     
          <main role="main">{children}</main>

   
      );
    }}
  />
);

/*
export class MainLayout extends React.PureComponent<{}> {
  public render() {
    const { children } = this.props;

    return (
      <StaticQuery
        query={graphql`
          query MainLayoutQuery {
            site {
              siteMetadata {
                siteName
              }
            }
          }
        `}
        render={data => (
          <div>
            <Header siteName={'NativeScripting'} />

            <main role="main">{children}</main>

            <Footer />
          </div>
        )}
      />
    );
  }
}
*/

/*
interface IndexLayoutProps {
    children?: any,
    data: {
        site: {
            siteMetadata: {
                siteName: string;
                foo: string;
            };
        };
    };
}


const IndexLayout: React.StatelessComponent<IndexLayoutProps> = ({ children, data }) =>
    <div>
        <Header siteName={data.site.siteMetadata.siteName} />

        <main role="main">
            {children()}
        </main>

        <Footer />
    </div>

    ;

export const indexLayoutQuery = graphql`
  query IndexLayoutQuery {         
    site {
      siteMetadata {
        siteName
      }
    }
  }
`

export default IndexLayout;
*/
