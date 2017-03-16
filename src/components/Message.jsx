import React from 'react'
import { withTheme } from 'styled-components'

import { MessageBlobBot, MessageBlobUser } from '../primitives/MessageBlob'
// import Avatar from '../primitives/Avatar'
import AnswerButton from '../primitives/AnswerButton'
import AnswerIcon from '../primitives/AnswerIcon'
import AnswerList from '../primitives/AnswerList'

import Image from '../primitives/Image'
import FileDropZone from './FileDropZone'

const Message = (props) => {
  const { message, active } = props

  return (
    <section className={message.flash ? 'flash-message' : ''}>
      {message.sender === 'BOT' ?
        <div>
          {message.text &&
            <MessageBlobBot>
              {message.text}
              {message.status &&
                <div><code>{message.status}</code></div>
              }
            </MessageBlobBot>
          }
          {message.list_data && message.list_data.length > 0 &&
            <ul className="walletList">
              {message.list_data.map((_list_data, index) =>
                <li key={index}>
                  {_list_data.address[0]}
                </li>
              )}
            </ul>
          }
          {message.image &&
            <Image>
              <img src={message.image} alt={message.text} />
            </Image>
          }
          {message.upfile &&
            <FileDropZone onDrop={() => props.onDrop(this.onDrop.bind(this))} />
          }
          {message.icons && active &&
            <div className='iconset'>
              {message.icons.map((icon, index) =>
                <AnswerIcon className='material-icons' key={index} onClick={() => props.onIconClick(icon)}>
                  {icon.icon}
                </AnswerIcon>
              )}
            </div>
          }
          {message.buttons && active &&
            <ul className='answerli'>
              {message.buttons.map((button, index) =>
                (button.value === 'more_moriz') ? (
                  <span key={index} className='spDivider'>...</span>
                ) : (
                  <AnswerButton key={index} onClick={() => props.onButtonSelect(button)}>
                    {button.text}
                  </AnswerButton>
                )
              )}
            </ul>
          }
          {message.lists && active &&
            <ul className='answerli'>
              {message.lists.map((list, index) =>
                (list.value === 'more_moriz') ? (
                  <span key={index} className='spDivider'>...</span>
                ) : (
                  <AnswerList key={index} onClick={() => props.onListClick(list)}>
                    {list.text}
                  </AnswerList>
                )
              )}
            </ul>
          }
        </div>
        :
        <div>
          <MessageBlobUser>
            {message.text}
          </MessageBlobUser>
        </div>
      }
    </section>
  )
}

export default withTheme(Message)
