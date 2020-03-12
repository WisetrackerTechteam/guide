import React from 'react'
import { graphql } from 'gatsby'
import { RootLayout as Layout } from '../Layout'
import { PostCard } from '../PostCard'
import { Row, Col } from 'antd'
const BlogPage = ({
  data: {
    allMdx: { edges },
  },
}: any) => {
  const posts = edges
    .filter((edge: any) => !!edge.node.frontmatter.date)
    .map((edge: any) => <PostCard key={edge.node.id} post={edge.node} />)
  return (
    <Layout>
      <div className="container">
        <div className="con_wr guide_wr">
          <div className="inner">
            <ul className="guide_list">
              <Row gutter={[15, 15]}>
                <Col span={12}>
                  <li className="li li01">
                    <a href="#">
                      <dl>
                        <dt>
                          Advertisement <br />
                          Tracking
                        </dt>
                        <dd>광고 분석을 위한 가이드입니다.</dd>
                      </dl>
                    </a>
                  </li>
                </Col>
                <Col span={12}>
                  <li className="li li02">
                    <a href="#">
                      <dl>
                        <dt>Android SDK</dt>
                        <dd>안드로이드 앱을 위한 SDK입니다.</dd>
                      </dl>
                    </a>
                  </li>
                </Col>
              </Row>
              <Row gutter={[15, 15]}>
                <Col span={12}>
                  <li className="li li03">
                    <a href="#">
                      <dl>
                        <dt>iOS SDK</dt>
                        <dd>
                          CocoaPod으로 설치할 수 있는 SDK입니다.
                          <br />
                          Objective-C와 Swift 모두 지원합니다.
                        </dd>
                      </dl>
                    </a>
                  </li>
                </Col>
                <Col span={12}>
                  <li className="li li04">
                    <a href="#">
                      <dl>
                        <dt>
                          React Native, Unity, <br />
                          <span>Cordova SDK</span>
                        </dt>
                        <dd>
                          React Native와 Unity, Cordova의 SDK입니다.
                          <br />각 프레임웍에 맞는 SDK를 골라 설치할 수
                          있습니다.
                        </dd>
                      </dl>
                    </a>
                  </li>
                </Col>
              </Row>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query($path: String!) {
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { root: { eq: $path } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
