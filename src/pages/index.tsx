import React from 'react'
import { Link } from 'gatsby'
import { Row, Col } from 'antd'
import { Header } from '../Header'
import { Footer } from '../Footer'

import AndroidIcon from '../images/icons/android.svg'

const IndexPage = () => {
  return (
    <>
      <Header />
      <div className="index-visual">
        <div className="index-title">Measure with Wisetracker</div>
        <div className="index-btns">
          <Link className="btn-outline" to="/docs/get-started/introduction">
            Sign Up
          </Link>
          <Link className="btn-outline" to="/docs/get-started/introduction">
            Documents
          </Link>
        </div>
      </div>
      <div className="index-contents">
        <Row>
          <Col span={12}>
            <img src={AndroidIcon} alt="" />
          </Col>
          <Col span={12}>ASD</Col>
        </Row>
      </div>
      <Footer />
    </>
  )
}

export default IndexPage
