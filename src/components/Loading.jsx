import React from 'react'
import { withTheme } from 'styled-components'

import { MessageBlobBot, MessageBlobUser } from '../primitives/MessageBlob'
import DancingDot from '../primitives/DancingDot'

const Message = (props) => {
  // const { theme } = props

  return (
    <section>
      {props.bot &&
        <div>
          <MessageBlobBot>
            <DancingDot>.</DancingDot>
            <DancingDot>.</DancingDot>
            <DancingDot>.</DancingDot>
          </MessageBlobBot>
        </div>
      }
      {props.user &&
        <div>
          <MessageBlobUser>
            <DancingDot>.</DancingDot>
            <DancingDot>.</DancingDot>
            <DancingDot>.</DancingDot>
          </MessageBlobUser>
        </div>
      }
    </section>
  )
}

export default withTheme(Message)
