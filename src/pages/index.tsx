import React from 'react'
import { Link } from 'gatsby'
import { Row, Col } from 'antd'
import { Header } from '../Header'
import { Footer } from '../Footer'

import AndroidIcon from '../images/icons/android.svg'
import IOSIcon from '../images/icons/apple.svg'
import RNIcon from '../images/icons/react.svg'
import CordovaIcon from '../images/icons/cordova-seeklogo.com.svg'
import UnityIcon from '../images/icons/unity-seeklogo.com.svg'
import JSIcon from '../images/icons/code.svg'

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
        <Row gutter={30}>
          <Col span={12}>
            <Link to="/docs/sdk/Android">
              <div className="index-sdk-banner">
                <img src={AndroidIcon} alt="wisetracker android sdk" />
                <div className="index-sdk-banner-content">
                  <span className="index-sdk-banner-title">Android SDK</span>
                  <span className="index-sdk-banner-text">
                    CocoaPod으로 설치할 수 있는 SDK입니다.
                    <br />
                    Objective-C와 Swift 모두 지원합니다.
                  </span>
                </div>
              </div>
            </Link>
          </Col>
          <Col span={12}>
            <Link to="docs/sdk/Swift">
              <div className="index-sdk-banner">
                <img src={IOSIcon} alt="wisetracker android sdk" />
                <div className="index-sdk-banner-content">
                  <span className="index-sdk-banner-title">iOS SDK</span>
                  <span className="index-sdk-banner-text">
                    CocoaPod으로 설치할 수 있는 SDK입니다.
                    <br />
                    Objective-C와 Swift 모두 지원합니다.
                  </span>
                </div>
              </div>
            </Link>
          </Col>
        </Row>
        <Row gutter={30}>
          <Col span={12}>
            <Link to="docs/sdk/Reactnative">
              <div className="index-sdk-banner">
                <img src={RNIcon} alt="wisetracker android sdk" />
                <div className="index-sdk-banner-content">
                  <span className="index-sdk-banner-title">
                    React Native SDK
                  </span>
                  <span className="index-sdk-banner-text">
                    CocoaPod으로 설치할 수 있는 SDK입니다.
                    <br />
                    Objective-C와 Swift 모두 지원합니다.
                  </span>
                </div>
              </div>
            </Link>
          </Col>
          <Col span={12}>
            <Link to="docs/sdk/Cordova">
              <div className="index-sdk-banner">
                <img src={CordovaIcon} alt="wisetracker android sdk" />
                <div className="index-sdk-banner-content">
                  <span className="index-sdk-banner-title">Cordova SDK</span>
                  <span className="index-sdk-banner-text">
                    CocoaPod으로 설치할 수 있는 SDK입니다.
                    <br />
                    Objective-C와 Swift 모두 지원합니다.
                  </span>
                </div>
              </div>
            </Link>
          </Col>
        </Row>
        <Row gutter={30}>
          <Col span={12}>
            <Link to="docs/sdk/Unity">
              <div className="index-sdk-banner">
                <img src={UnityIcon} alt="wisetracker android sdk" />
                <div className="index-sdk-banner-content">
                  <span className="index-sdk-banner-title">Unity SDK</span>
                  <span className="index-sdk-banner-text">
                    CocoaPod으로 설치할 수 있는 SDK입니다.
                    <br />
                    Objective-C와 Swift 모두 지원합니다.
                  </span>
                </div>
              </div>
            </Link>
          </Col>
          <Col span={12}>
            <Link to="docs/sdk/Javascript">
              <div className="index-sdk-banner">
                <img src={JSIcon} alt="wisetracker android sdk" />
                <div className="index-sdk-banner-content">
                  <span className="index-sdk-banner-title">Javascript SDK</span>
                  <span className="index-sdk-banner-text">
                    CocoaPod으로 설치할 수 있는 SDK입니다.
                    <br />
                    Objective-C와 Swift 모두 지원합니다.
                  </span>
                </div>
              </div>
            </Link>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  )
}

export default IndexPage
