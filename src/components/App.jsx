import React from 'react'
import Conversation from '../containers/Conversation'
import theme from '../theme'

const App = (props) => {
  function getUserAnswers (answers) {
    console.log('answers', answers)
  }

  return (
    <main>
      <Conversation
        onEnded={getUserAnswers}
        theme={theme}
      />
    </main>
  )
}

export default App
