import React from 'react'
import { Link } from 'react-router'

class CopyrightStrategy extends React.Component {
  render() {
    const className = this.props.className || ''
    return (
      <div className={'bootom-common ' + className}>
        <span className="left-span">
          风险提示：基金过往业绩不代表其未来表现。本策略观点不构成投资建议或承诺。基金投资人在投资前请确认已知晓并理解该页面产品相关风险和产品特征。基金投资人据此操作，风险自担。市场有风险，投资需谨慎。
        </span>
      </div>
    )
  }
}

export default CopyrightStrategy
