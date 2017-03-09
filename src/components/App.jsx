import React from 'react'
import Conversation from '../containers/Conversation'
import theme from '../theme'


const questions = require('../questions/demo.json')

const App = (props) => {
  function getUserAnswers (answers) {
    console.log('answers', answers)
  }

  return (
    <main>
      <Conversation
        questions={questions}
        onEnded={getUserAnswers}
        theme={theme}
      />
    </main>
  )
}

export default App
