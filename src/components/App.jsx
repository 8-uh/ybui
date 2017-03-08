import React from 'react'
import Conversation from '../containers/Conversation'
import theme from '../theme'

const questions = [{
  text: 'Hello!'
}, {
  text: 'What is your first name?',
  key: 'firstName'
}, {
  text: 'How are you?',
  key: 'emotion',
  buttons: [{
    text: 'Awesome!',
    value: 'great'
  }, {
    text: 'Good',
    value: 'good'
  }, {
    text: 'Could be better',
    value: 'medium'
  }, {
    text: 'Not so good...',
    value: 'bad'
  }]
}, {
  text: 'Do you like this image?',
  key: 'imageLike',
  image: 'https://placeimg.com/640/480/any',
  buttons: [{
    text: 'Yes, looks great!',
    value: 'yes'
  }, {
    text: 'No really...',
    value: 'no'
  }]
}]

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
