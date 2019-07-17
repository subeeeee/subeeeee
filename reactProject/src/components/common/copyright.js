import React from 'react'
import { Link } from 'react-router'

class Copyright extends React.Component {
  render() {
    const className = this.props.className || ''
    return (
      <div className={'bootom-common ' + className}>
        <span className="center-span">
          基金销售服务由深圳盈信基金销售公司提供
          <br />
          基金销售资格证号：000000329
          <Link className="toyxFundDetail" to={`/yxFundDetail`}>
            详情
          </Link>
          <br />
          服务电话：4007903688
        </span>
      </div>
    )
  }
}

export default Copyright
