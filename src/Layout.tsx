import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Header } from './Header'
import { Footer } from './Footer'
import { pathPrefix } from '../gatsby-config'
import { Layout } from 'antd'
import { Sidebar } from './sidebar'
import { TableOfContents } from './TableOfContents'
import './css/style.css'

const { Sider, Content } = Layout

export function RootLayout({ children, sidebarRoot }: any) {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
          allMdx {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `}
      render={data => {
        const allPosts = data.allMdx.edges.map(
          (edge: any) => edge.node.fields.slug
        )
        let onPostPage
        if (typeof window !== 'undefined') {
          const path = window.location.pathname.replace(
            pathPrefix.slice(0, -1),
            ''
          )
          if (
            allPosts.indexOf(path) >= 0 ||
            allPosts.indexOf(path.slice(0, -1)) >= 0
          ) {
            onPostPage = true
          } else {
            onPostPage = false
          }
        }

        const { title } = data.site.siteMetadata
        const pathName = window.location.pathname.split('/').slice(1)
        // const h3TagList = document.getElementsByTagName('H3')
        const [h3TagList, setH3TagList] = useState(null)
        useEffect(() => {
          //   console.log('LAYOUT 2')
          setH3TagList([...document.querySelectorAll('H2')])
        }, [])

        // console.log(pathName)
        // console.log(h3TagList)
        // console.log('LAYOUT 1')
        return (
          <div style={{ width: '100%', padding: 0, overflow: 'hidden' }}>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' },
              ]}
            >
              <html lang="en" />
            </Helmet>
            <Header siteTitle={title} />

            <div
              style={{
                height: '100%',
                paddingTop: '70px',
              }}
            >
              <div className="sider">
                <div>
                  <Sidebar root={sidebarRoot} />
                </div>
              </div>
              <Layout>
                <Content
                  className={
                    pathName[0] === 'docs' ? 'contents-doc' : 'contents-page'
                  }
                >
                  <div className={'container-breadCrumb'}>
                    <span className={'step'}>Home</span>
                    {pathName.map(step => (
                      <span key={step}>
                        {' '}
                        > <span className={'step'}>{step}</span>
                      </span>
                    ))}
                  </div>
                  {children}
                </Content>
                {pathName[0] === 'docs' ? (
                  <div className="contents-list">
                    <div className="contents-list-title">Table of Contents</div>
                    {h3TagList === null
                      ? null
                      : h3TagList.map((h3s, idx) => (
                          // console.log(h3s),
                          <div key={idx} className="lists-h2s">
                            <a href={'#' + h3s.id}>{h3s.textContent}</a>
                          </div>
                        ))}
                  </div>
                ) : null}
              </Layout>
              <TableOfContents />
            </div>

            <Layout>
              <Sider
                width={200}
                style={{ background: '#fff', height: '100%' }}
              />
            </Layout>
            <Footer />
          </div>
        )
      }}
    />
  )
}

export default RootLayout
