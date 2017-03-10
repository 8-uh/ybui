import React from 'react'
import { withTheme } from 'styled-components'

import { MessageBlobBot, MessageBlobUser } from '../primitives/MessageBlob'
// import Avatar from '../primitives/Avatar'
import AnswerButton from '../primitives/AnswerButton'
import AnswerIcon from '../primitives/AnswerIcon'

import Image from '../primitives/Image'

const Message = (props) => {
  const { message, active } = props

  return (
    <section>
      {message.sender === 'BOT' ?
        <div>
          {message.text &&
            <MessageBlobBot>
              {message.text}
            </MessageBlobBot>
          }
          {message.image &&
            <Image>
              <img src={message.image} alt={message.text} />
            </Image>
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
            <ul>
              {message.buttons.map((button, index) =>
                <AnswerButton key={index} onClick={() => props.onButtonSelect(button)}>
                  {button.text}
                </AnswerButton>
              )}
            </ul>
          }
          {/* message.type === 'final' &&
            Object.keys(answers).map((answer, index) =>
              <div key={index}>
                {answer}
                <span>{answers[answer]}</span>
              </div>
            )
          */}
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
