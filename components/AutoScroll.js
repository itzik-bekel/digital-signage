import React from 'react'

class AutoScroll extends React.Component {
  render() {
    const { children, style = {}, duration = 90 } = this.props
    const speed = `${duration}s`

    return (
      <div className='scroll-container'>
        <div className='scroll-content'>
          {children}
          {/* Duplicate content for seamless loop */}
          {children}
        </div>
        <style jsx>{`
          .scroll-container {
            display: flex;
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: relative;
            align-items: center;
            justify-content: center;
            ${Object.entries(style)
              .map(([key, value]) => `${key}: ${value};`)
              .join('\n')}
          }
          
          .scroll-content {
            display: flex;
            flex-direction: row;
            position: absolute;
            white-space: nowrap;
            will-change: transform;
            animation: scroll ${speed} linear infinite;
            align-items: center;
            min-height: 100%;
          }

          @keyframes scroll {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          /* Pause animation on hover */
          .scroll-container:hover .scroll-content {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    )
  }
}

export default AutoScroll
