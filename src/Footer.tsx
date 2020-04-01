import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Menu, Row, Icon, Button } from 'antd'

// interface Props {
//   siteTitle: string
// }

export class Footer extends Component<Props> {
  render() {
    // const { siteTitle } = this.props
    return (
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
                        <br />앱 마케팅을 최적화하세요
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
                      <a href="/features/attribution#feature03">WiseLINK™</a>
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
                      <a href="/features/analytics#feature02">Path Flow</a>
                      <a href="/features/analytics#feature03">Funnel</a>
                      <a href="/features/analytics#feature04">User Tier</a>
                      <a href="/features/analytics#feature05">
                        Custom Dashboard &amp; Datacard
                      </a>
                      <a href="/features/analytics#feature06">Raw Data</a>
                    </dd>
                  </dl>
                </li>
                <li className="n04">
                  <dl>
                    <dt>ACTION</dt>
                    <dd>
                      <a href="/features/action#feature01">Push Message</a>
                      <a href="/features/action#feature02">
                        메시징 효과를 높이는 다양한 소재
                      </a>
                      <a href="/features/action#feature03">
                        Retargeting & Marketing
                        <br />
                        Automation
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
                      <a href="/customers/#금융결제원">금융결제원</a>
                      <a href="/customers/#홈앤쇼핑">홈&amp;쇼핑</a>
                      <a href="/customers/#olleh">올레티비</a>
                      <a href="/customers/#해피포인트">해피포인트</a>
                      <a href="/customers/#신세계">신세계 면세점</a>
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
                <li className="n02">
                  <div style={{ width: '150px' }}>
                    <p className="alink">
                      <a href="/privacy">개인정보 취급방침</a>
                    </p>
                    <br />
                    <p className="alink">
                      <a href="/termsofuse">서비스 이용약관</a>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <p className="copy">
              © 2020 Wisetracker 주식회사 와이즈트래커
              <br />
              대표이사: 김선준 | 서울시 서초구 서초대로78길 22, 11층 1107, 1108
              | 02-6925-6636 | contact@wisetracker.co.kr | 사업자등록번호:
              261-81-22632 | 통신판매업신고: 2015-서울강남-02766
            </p>
          </div>
        </div>
      </footer>
    )
  }
}
