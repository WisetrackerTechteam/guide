import React from 'react'
import { Link } from 'gatsby'
import { Button, Icon } from 'antd'
import { StaticQuery, graphql } from 'gatsby'
import { Header } from '../Header'
import { Footer } from '../Footer'

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
      <div style={{ paddingTop: '150px' }}>asd</div>
      <Footer />
    </>
  )
}

export default IndexPage
