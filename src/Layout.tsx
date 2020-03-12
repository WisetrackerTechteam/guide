import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Header } from './Header'
import { pathPrefix } from '../gatsby-config'
import { Layout } from 'antd'
import { Sidebar } from './sidebar'
import { TableOfContents } from './TableOfContents'
import './css/style.css'
const { Sider, Content, Footer } = Layout

export function RootLayout({ children, sidebarRoot }: any) {
  console.log('layout', children)
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
        // const breadCrumb = pathName.splice(0, 1)
        console.log(window.location.pathname, pathName)
        console.log('from layout ', window)
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
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                height: '100%',
              }}
            >
              <div className="sider">
                <Sidebar root={sidebarRoot} />
              </div>
              <Layout>
                <Content
                  style={{
                    background: '#fff',
                    margin: 0,
                  }}
                >
                  <div>
                    <span>Home</span>
                    {pathName.map(step => (
                      <span> > {step}</span>
                    ))}
                  </div>
                  {children}
                </Content>
              </Layout>
              <TableOfContents />
            </div>
            {/* <Layout>
              <Sider
                width={200}
                style={{ background: '#fff', height: '100%' }}
              />
            </Layout> */}
            <Footer>
              <footer className="footer">
                <div className="inner">
                  <div className="footer_in">
                    <div className="foot_box">
                      <ul className="footer_list">
                        <li className="footer_logo">
                          <dl>
                            <dt>
                              <p></p>
                            </dt>
                            <dd>
                              정밀한 IN-APP ANALYTICS 가 결합된
                              <br />
                              MOBILE APP
                              <span>
                                ATTRIBUTION으로
                                <br />앱 마케팅을 최적화 하세요
                              </span>
                            </dd>
                          </dl>
                        </li>
                        <li className="n02">
                          <dl>
                            <dt>ATTRIBUTION</dt>
                            <dd>
                              <a href="/features/attribution#feature01">
                                Web To App Conversion Tracking
                              </a>
                              <a href="/features/attribution#feature02">
                                Multi Touch Attribution
                              </a>
                              <a href="/features/attribution#feature03">
                                Wise Link
                              </a>
                              <a href="/features/attribution#feature04">
                                Retargeting Attribution
                              </a>
                              <a href="/features/attribution#feature05">
                                Custom In App Event &amp; Lookback Window
                              </a>
                              <a href="/features/attribution#feature06">
                                Advanced Audience
                              </a>
                            </dd>
                          </dl>
                        </li>
                        <li className="n03">
                          <dl>
                            <dt>ANALYTICS</dt>
                            <dd>
                              <a href="/features/analytics#feature01">
                                Advanced Filter
                              </a>
                              <a href="/features/analytics#feature02">
                                Path Flow
                              </a>
                              <a href="/features/analytics#feature03">Funnel</a>
                              <a href="/features/analytics#feature04">
                                User Tier
                              </a>
                              <a href="/features/analytics#feature05">
                                Custom Dashboard &amp; Datacard
                              </a>
                              <a href="/features/analytics#feature06">
                                Raw Data
                              </a>
                            </dd>
                          </dl>
                        </li>
                        <li className="n04">
                          <dl>
                            <dt>ACTION</dt>
                            <dd>
                              <a href="/features/action#feature01">
                                Push Message
                              </a>
                              <a href="/features/action#feature02">
                                Multi Push Type(Image, Video, Hidden)
                              </a>
                              <a href="/features/action#feature03">
                                Triggered Delivery &amp; Retargeting
                              </a>
                            </dd>
                          </dl>
                        </li>
                      </ul>
                      <ul className="footer_list list02">
                        <li className="n02">
                          <dl>
                            <dt>CUSTOMER STORY</dt>
                            <dd>
                              <a href="#">금융결제원</a>
                              <a href="#">홈&amp;쇼핑</a>
                              <a href="#">올레티비</a>
                              <a href="#">해피포인트</a>
                              <a href="#">뉴발란스</a>
                              <a href="#">신세계 면세점</a>
                            </dd>
                          </dl>
                        </li>
                        <li>
                          <div className="box">
                            <p className="alink">
                              <a href="/price">PRICE</a>
                            </p>
                            <p className="alink">
                              <a href="/guide">SERVICE GUIDE</a>
                            </p>
                          </div>
                        </li>
                      </ul>
                      <ul className="footer_list list03">
                        <li>
                          <p className="alink">
                            <a href="#">개인정보 취급방침</a>
                          </p>
                        </li>
                      </ul>
                    </div>

                    <p className="copy">© 2020 Wisetracker</p>
                  </div>
                </div>
              </footer>
            </Footer>
          </div>
        )
      }}
    />
  )
}

export default RootLayout
