import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Draggable } from 'react-beautiful-dnd'

import { StatusBarElementTypes } from '../../helpers/statusbar.js'

config.autoAddCss = false
library.add(faTimes)

class StatusBarElement extends React.Component {
  constructor(props) {
    super(props)
  }

  deleteClicked = e => {
    if (e) e.stopPropagation()
    const { onDelete = () => {} } = this.props
    onDelete()
  }

  render() {
    const { item, index } = this.props
    const type = item.split('_')[0]

    // Format date and time in Hebrew
    const now = new Date()
    const formattedDate = new Intl.DateTimeFormat('he-IL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(now)
    const formattedTime = now.toLocaleTimeString('he-IL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })

    return (
      <Draggable key={item} draggableId={item} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={'statusBarEl'}
            style={{
              ...provided.draggableProps.style
            }}
          >
            <div className={'controls'}>
              <div className={'delete'} onClick={this.deleteClicked}>
                <FontAwesomeIcon icon={faTimes} size={'xs'} fixedWidth />
              </div>
            </div>
            <div className={'info'}>
              {type === 'time' ? (
                <div className={'time-text'}>
                  <div>{formattedDate}</div>
                  <div>{formattedTime}</div>
                </div>
              ) : type === 'welcome' ? (
                <div className={'welcome-text'}>
                  ברוכים הבאים לחיל החימוש 20
                </div>
              ) : (
                <>
                  <div className={'icon'}>
                    <FontAwesomeIcon icon={StatusBarElementTypes[type] && StatusBarElementTypes[type].icon || faTimes} size={'sm'} />
                  </div>
                  <span className={'type'}>{type || 'Unknown'}</span>
                </>
              )}
            </div>
            <style jsx>
              {`
                .statusBarEl {
                  background-color: rgba(108, 108, 108, 1);
                  border-radius: 6px;
                  height: 100%;
                  width: 100%;
                  box-sizing: border-box;
                  padding: 8px;
                  margin-left: 4px;
                  margin-right: 4px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  cursor: move;
                  overflow: hidden;
                  position: relative;
                }
                .statusBarEl .info {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  color: white;
                }
                .statusBarEl .info .icon {
                  color: white;
                  margin-right: 16px;
                }
                .statusBarEl .info .type {
                  color: white;
                  font-family: 'Open Sans', sans-serif;
                  text-transform: uppercase;
                  font-size: 14px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  max-width: 100%;
                }
                .statusBarEl .info .welcome-text {
                  font-family: 'Open Sans', sans-serif;
                  font-size: 18px;
                  font-weight: bold;
                  text-align: center;
                  color: #fff;
                }
                .statusBarEl .info .time-text {
                  font-family: 'Open Sans', sans-serif;
                  font-size: 16px;
                  font-weight: bold;
                  text-align: center;
                  color: #fff;
                }
                .statusBarEl .controls {
                  position: absolute;
                  font-family: 'Open Sans', sans-serif;
                  height: 100%;
                  justify-content: flex-end;
                  align-items: center;
                  display: none;
                  top: 0px;
                  right: 0px;
                }
                .statusBarEl .delete {
                  display: flex;
                  font-family: 'Open Sans', sans-serif;
                  width: 32px;
                  height: 32px;
                  justify-content: center;
                  align-items: center;
                  color: white;
                  border-radius: 50%;
                  cursor: pointer;
                  margin-right: 8px;
                }

                .statusBarEl .delete {
                  background: rgba(252, 50, 50, 0.6);
                }

                .statusBarEl:hover .controls {
                  display: flex;
                }
              `}
            </style>
          </div>
        )}
      </Draggable>
    )
  }
}

export default StatusBarElement
