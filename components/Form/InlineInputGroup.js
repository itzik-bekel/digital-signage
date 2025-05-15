import React from 'react'

class InlineInputGroup extends React.Component {
  render() {
    const { children } = this.props
    const childrenArray = React.Children.toArray(children)
    return (
      <div className={'inputGroup'}>
        {childrenArray.map((child, index) => (
          <div key={`input-${index}`} className={index === childrenArray.length - 1 ? 'last' : 'notlast'}>
            {child}
          </div>
        ))}
        <style jsx>{`
          .inputGroup {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            flex: 1;
          }
          .notlast {
            margin-right: 16px;
          }
        `}</style>
      </div>
    )
  }
}

export default InlineInputGroup
