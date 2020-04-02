import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Menu, Row, Icon, Button } from 'antd'

interface Props {
  siteTitle: string
}

export class Header extends Component<Props> {
  render() {
    const { siteTitle } = this.props
    return (
      <div className={'header'}>
        <Row className={'header-aligns'}>
          <Link to="/">
            <div className="logo">
              <span className="logo-text">Documents</span> >_
            </div>
          </Link>
          <Button
            style={{ alignSelf: 'end', marginTop: '22px', marginRight: '17px' }}
            size="small"
          >
            Wisetracker Login
          </Button>
        </Row>
      </div>
    )
  }
}
